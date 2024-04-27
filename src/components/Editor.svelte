    <script lang="ts">
import { onMount, tick } from "svelte";
import { editorModel } from "../stores/editorModel";
import Cursor from "./Cursor.svelte";

export let content = "";

let cursorLeft = 0;
let cursorTop = 0;
let editorElement: HTMLDivElement;
let editorWrapper: HTMLDivElement | null;
let app: HTMLElement | null;
const textWidthCache = new Map<string, number>();
const LINE_HEIGHT = 20;
const SCROLL_OFFSET = LINE_HEIGHT * 3;
const SCROLL_HORIZ_OFFSET = LINE_HEIGHT * 2;

tick().then(() => {
	editorWrapper = document.querySelector("#editor-wrapper");
	app = document.querySelector("#app");

	// Have to add it here
	app?.addEventListener?.("scroll", updateCursorPosition);
});

// ---------------------- SCROLLING ------------------------------

enum ScrollDirection {
	Left = "left",
	Right = "right",
	Up = "up",
	Down = "down",
}

const elementIsBelowView = (element: Element, paddingBottom: number) => {
	return element.getBoundingClientRect().bottom > paddingBottom;
};

const elementIsAboveView = (element: Element) => {
	return (
		element.getBoundingClientRect().bottom < SCROLL_OFFSET + LINE_HEIGHT / 2
	);
};

const scrollElementIntoView = (
	element: Element,
	block: ScrollLogicalPosition,
	offsetElement?: Element,
	topOffset?: number,
) => {
	element.scrollIntoView({ behavior: "auto", block });

	if (topOffset && offsetElement) {
		offsetElement.scrollBy({ top: topOffset });
	}
};

const scrollToCursorIfNeeded = (direction: ScrollDirection) => {
	const model = $editorModel;
	const content = editorElement;
	const cursorPosition = model.cursor.position;
	const lineElement = document.querySelector(
		`[data-line-number="${cursorPosition.cursorLine}"]`,
	);
	const cursorElement = document.querySelector(".cursor");

	if (!cursorPosition || !content || !lineElement || !app || !cursorElement)
		return;

	const style = window.getComputedStyle(content);
	const paddingBottom = Number(style.paddingBottom.replace("px", ""));

	if (!editorWrapper) return;

	// Left and Right
	if (
		direction === ScrollDirection.Right ||
		direction === ScrollDirection.Left
	) {
		const cursorLeftEdge = cursorElement.getBoundingClientRect().left;
		const editorLeftEdge = editorElement.getBoundingClientRect().left;
		const cursorRightEdge = cursorElement.getBoundingClientRect().right;
		const editorRightEdge = editorElement.getBoundingClientRect().right;

		if (cursorRightEdge + SCROLL_HORIZ_OFFSET > editorRightEdge) {
			// Scroll right to bring the cursor into view smoothly
			editorElement.scrollBy({
				left: cursorRightEdge - editorRightEdge + SCROLL_HORIZ_OFFSET,
			});
		}

		if (cursorLeftEdge < editorLeftEdge + SCROLL_HORIZ_OFFSET) {
			// Scroll left to bring the cursor into view smoothly
			editorElement.scrollBy({
				left: -(editorLeftEdge - cursorLeftEdge + SCROLL_HORIZ_OFFSET),
			});
		}
	}

	// Up & Down
	if (direction === ScrollDirection.Up && elementIsAboveView(lineElement)) {
		scrollElementIntoView(lineElement, "start", app, -SCROLL_OFFSET);
	} else if (
		direction === ScrollDirection.Down &&
		elementIsBelowView(lineElement, paddingBottom)
	) {
		scrollElementIntoView(lineElement, "end", app, LINE_HEIGHT);
	}
};

// ---------------------- END SCROLLING ------------------------------

const placeCursorAtPosition = async (lineNumber: number, charIndex = 0) => {
	const targetLineElement = editorElement.querySelector(
		`[data-line-number="${lineNumber}"]`,
	);
	if (targetLineElement) {
		// Attempt to find a text node within the target line element
		let targetNode = Array.from(targetLineElement.childNodes).find(
			(node) => node.nodeType === Node.TEXT_NODE,
		);
		let adjustedCharIndex = charIndex;
		const range = document.createRange();
		const selection = window.getSelection();

		await tick();
		if (targetNode) {
			// If a text node is found, adjust the char index to not exceed the node's length
			adjustedCharIndex = Math.min(
				adjustedCharIndex,
				targetNode.textContent?.length ?? 0,
			);
			range.setStart(targetNode, adjustedCharIndex);
		} else {
			// If no text node is found, default to the start of the target line element
			range.setStart(targetLineElement, 0);
		}

		range.collapse(true); // Collapse the range to the start, making it a single point
		selection?.removeAllRanges();
		selection?.addRange(range);
	}
};

const resetEditorContent = () => {
	if (editorElement.innerHTML.trim() === "") {
		editorModel.update((model) => {
			model.resetContent();
			return model;
		});

		placeCursorInDiv(editorElement.firstChild as HTMLDivElement);
	}
};

const placeCursorInDiv = (divElement: HTMLDivElement) => {
	const range = document.createRange();
	const selection = window.getSelection();
	range.setStart(divElement, 0);

	// Collapse the range to the start, making it a single point
	range.collapse(true);
	selection?.removeAllRanges();
	selection?.addRange(range);
};

const handleMouseDown = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	let lineNumber = 0;
	let charIndex = 0;

	if (target.dataset.lineNumber) {
		// If the click is directly on a line
		lineNumber = Number(target.dataset.lineNumber);
		charIndex = calculateCharIndex(event, target);
	} else {
		// If the click is not directly on a line, find the closest parent with a line number
		const lineElement = target.closest("[data-line-number]");
		if (lineElement) {
			lineNumber = Number((lineElement as HTMLElement).dataset.lineNumber);
			charIndex = calculateCharIndex(event, lineElement as HTMLElement);
		}
	}

	if (lineNumber > 0) {
		editorModel.update((model) => {
			model.cursor.moveCursor({
				cursorBasis: charIndex,
				cursorCharacter: charIndex,
				cursorLine: lineNumber,
			});
			return model;
		});
		placeCursorAtPosition(lineNumber, charIndex);
	} else {
		// If there is no line, set the cursor to the end of the last line
		lineNumber = $editorModel.getNumberOfLines();
		charIndex = $editorModel.getLineLength(lineNumber);
		editorModel.update((model) => {
			model.cursor.moveCursor({
				cursorBasis: charIndex,
				cursorCharacter: charIndex,
				cursorLine: lineNumber + 1,
			});
			return model;
		});
		placeCursorAtPosition(lineNumber + 1, charIndex);
	}
};

const measureTextWidth = (text: string, font: string): number => {
	const cacheKey = `${font}-${text}`;
	if (textWidthCache.has(cacheKey)) {
		// biome-ignore lint/style/noNonNullAssertion: We check if it has the key
		return textWidthCache.get(cacheKey)!;
	}

	// Create a temporary span element
	const element = document.createElement("span");
	element.textContent = text;
	element.style.font = font;
	element.style.whiteSpace = "pre";
	element.style.visibility = "hidden";
	document.body.appendChild(element);
	const width = element.offsetWidth;
	document.body.removeChild(element);

	// Cache the measured width
	textWidthCache.set(cacheKey, width);
	return width;
};

const calculateCharIndex = (
	event: MouseEvent,
	lineElement: HTMLElement,
): number => {
	const clickX = event.clientX;
	const lineStartX = lineElement.getBoundingClientRect().left;
	const clickPositionRelativeToLine = clickX - lineStartX;

	const lineText = lineElement.textContent || "";
	const fontStyling = window.getComputedStyle(lineElement).font;

	let closestCharIndex = 0;
	let smallestDifference = Number.POSITIVE_INFINITY;

	for (let i = 0; i <= lineText.length; i++) {
		const textUpToChar = lineText.slice(0, i);
		const measuredWidth = measureTextWidth(textUpToChar, fontStyling);

		const difference = Math.abs(clickPositionRelativeToLine - measuredWidth);
		if (difference < smallestDifference) {
			smallestDifference = difference;
			closestCharIndex = i;
		} else {
			break;
		}
	}

	return closestCharIndex;
};

const handleBackspace = (event: KeyboardEvent) => {
	event.preventDefault();

	if (
		editorElement.children.length === 1 &&
		editorElement.textContent?.trim() === ""
	) {
		resetEditorContent();
	} else {
		editorModel.update((model) => {
			model.deleteCharacter(
				$editorModel.cursor.position.cursorLine,
				$editorModel.cursor.position.cursorCharacter,
			);
			return model;
		});
	}

	scrollToCursorIfNeeded(ScrollDirection.Left);
};

const handleLetterKey = (event: KeyboardEvent) => {
	event.preventDefault();
	editorModel.update((model) => {
		model.insertCharacter(
			event.key,
			$editorModel.cursor.position.cursorLine,
			$editorModel.cursor.position.cursorCharacter,
		);
		return model;
	});

	placeCursorAtPosition(
		$editorModel.cursor.position.cursorLine,
		$editorModel.cursor.position.cursorCharacter + 1,
	);
	scrollToCursorIfNeeded(ScrollDirection.Right);
};

const handleEnterKey = (event: KeyboardEvent) => {
	event.preventDefault();

	editorModel.update((model) => {
		model.addLine(model.lines.length);
		return model;
	});

	// Wait for the DOM to update
	tick().then(() => {
		const lastElement = editorElement.lastChild;
		if (lastElement) placeCursorInDiv(lastElement as HTMLDivElement);
		scrollToCursorIfNeeded(ScrollDirection.Down);
	});
};

const handleArrowKey = (event: KeyboardEvent) => {
	event.preventDefault();

	switch (event.key) {
		case "ArrowLeft": {
			const cursorPosition = $editorModel.cursor.position;
			const previousLineExists = $editorModel.lineExists(
				$editorModel.cursor.position.cursorLine - 1,
			);

			if (previousLineExists) {
				// Subtract 2: one for the 0-based indexing, another to get the last line
				$editorModel.cursor.moveCursorLeft(
					$editorModel.lines[cursorPosition.cursorLine - 2].content.length,
				);
			} else {
				$editorModel.cursor.moveCursorLeft();
			}
			break;
		}
		case "ArrowRight": {
			const cursorPosition = $editorModel.cursor.position;
			const currentLineLength =
				$editorModel.lines[cursorPosition.cursorLine - 1].content.length;

			$editorModel.cursor.moveCursorRight(
				currentLineLength,
				$editorModel.lines.length,
			);
			break;
		}
		case "ArrowDown": {
			const cursorPosition = $editorModel.cursor.position;
			const nextLineLength =
				$editorModel.lines[cursorPosition.cursorLine]?.content?.length;

			$editorModel.cursor.moveCursorDown(
				nextLineLength,
				$editorModel.lines.length,
			);
			scrollToCursorIfNeeded(ScrollDirection.Down);
			break;
		}
		case "ArrowUp": {
			const cursorPosition = $editorModel.cursor.position;
			const previousLineLength =
				$editorModel.lines[cursorPosition.cursorLine - 2]?.content?.length;

			$editorModel.cursor.moveCursorUp(previousLineLength);
			scrollToCursorIfNeeded(ScrollDirection.Up);
			break;
		}
		default:
			return;
	}
};

const handleKeyDown = async (event: KeyboardEvent) => {
	if (event.key === "Enter") {
		handleEnterKey(event);
	} else if (event.key === "Backspace") {
		handleBackspace(event);
	} else if (
		["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)
	) {
		handleArrowKey(event);
		await placeCursorAtPosition(
			$editorModel.cursor.position.cursorLine,
			$editorModel.cursor.position.cursorCharacter,
		);
		await updateCursorPosition();

		const direction =
			event.key === "ArrowLeft"
				? ScrollDirection.Left
				: event.key === "ArrowRight"
					? ScrollDirection.Right
					: event.key === "ArrowUp"
						? ScrollDirection.Up
						: ScrollDirection.Down;

		scrollToCursorIfNeeded(
			event.key === "ArrowLeft" ? ScrollDirection.Left : ScrollDirection.Right,
		);
	} else if (event.key.length === 1) {
		handleLetterKey(event);
	}

	content = $editorModel.toHTML();
};

export const getCaretCoordinates = () => {
	let x = 0;
	let y = 0;

	const selection = window.getSelection();
	if (selection?.rangeCount !== 0) {
		const range = selection?.getRangeAt(0).cloneRange();

		if (!range) return { x, y };

		range.collapse(true);
		const rect = range.getClientRects()[0];
		if (rect) {
			x = rect.left;
			y = rect.top;
		}
	}

	if (
		selection?.anchorNode?.nodeName === "DIV" &&
		selection?.anchorNode.firstChild?.nodeName === "BR"
	) {
		const lineNumber = $editorModel.cursor.position.cursorLine;
		const targetLineElement = editorElement.querySelector(
			`[data-line-number="${lineNumber}"]`,
		);
		const scrollLeft = editorElement?.scrollLeft ?? 0;
		const scrollTop = app?.scrollTop ?? 0;
		return {
			x: (targetLineElement?.getBoundingClientRect()?.left ?? 0) - scrollLeft,
			y: LINE_HEIGHT * (lineNumber - 1) + 5 - scrollTop,
		};
	}

	return { x, y };
};

const updateCursorPosition = async () => {
	await tick();
	const { x, y } = getCaretCoordinates();
	cursorLeft = x;
	cursorTop = y;
};

$: if (editorElement && $editorModel.cursor.position) {
	tick().then(() => {
		placeCursorAtPosition(
			$editorModel.cursor.position.cursorLine,
			$editorModel.cursor.position.cursorCharacter,
		);
	});
}

onMount(() => {
	resetEditorContent();
	editorElement.addEventListener("keydown", updateCursorPosition);
	editorElement.addEventListener("mousedown", updateCursorPosition);
	editorElement.addEventListener("scroll", updateCursorPosition);
});
</script>

    <style lang="scss">
        .editor {
            display: flex;
            flex-direction: column;
            padding-top: 5px;
            padding-left: 5px;
            padding-right: 50px;
            flex-grow: 1;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: pre;
            outline: none;
            min-height: fit-content;
            padding-bottom: 93vh;
            caret-color: transparent;

            :global([data-line-number]) {
                min-height: 20px;
                white-space: pre;
            }
        }
  </style>
  
  <div 
        class="editor" 
        contenteditable="true" 
        bind:this={editorElement} 
        bind:innerHTML={content} 
        on:keydown={handleKeyDown} 
        on:mousedown={handleMouseDown}
        tabindex="0" 
        role="textbox" 
        aria-multiline="true">
    </div>
    <Cursor bind:left={cursorLeft} bind:top={cursorTop} />