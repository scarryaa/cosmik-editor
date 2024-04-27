<script lang="ts">
import { onDestroy, onMount, tick } from "svelte";
import { editorModel } from "../stores/editorModel";
import { LINE_HEIGHT } from "../utils/consts";
import {
	ScrollDirection,
	scrollToCursorIfNeeded,
} from "../utils/editorScrolling";
import {
	calculateCharIndex,
	placeCursorAtPosition,
	placeCursorInDiv,
	resetEditorContent,
	updateLastCursorPosition,
} from "../utils/editorUtils";
import Cursor from "./Cursor.svelte";

export let content = "";

let cachedLineNumberLeft: number | undefined;
let cursorLeft = 0;
let cursorTop = 0;
let editorElement: HTMLDivElement;
let editorWrapper: HTMLDivElement | null;
let app: HTMLElement | null;

tick().then(() => {
	editorWrapper = document.querySelector("#editor-wrapper");
	app = document.querySelector("#app");
	cachedLineNumberLeft = editorElement
		?.querySelector?.(`[data-line-number="${1}"]`)
		?.getBoundingClientRect().left;

	// Have to add it here
	app?.addEventListener?.("scroll", updateCursorPosition);
});

const handleMouseDown = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	let lineNumber = 0;
	let charIndex = 0;

	if (target.dataset.lineNumber) {
		lineNumber = Number(target.dataset.lineNumber);
		charIndex = calculateCharIndex(event, target);
	} else {
		const clickY = event.clientY;
		let closestLineElement: HTMLElement | null = null;
		let smallestYDiff = Number.POSITIVE_INFINITY;

		for (const lineElement of document.querySelectorAll("[data-line-number]")) {
			const lineRect = lineElement.getBoundingClientRect();
			const lineYMid = lineRect.top + lineRect.height / 2;
			const yDiff = Math.abs(clickY - lineYMid);

			if (yDiff < smallestYDiff) {
				smallestYDiff = yDiff;
				closestLineElement = lineElement as HTMLElement;
			}
		}

		if (closestLineElement) {
			lineNumber = Number(closestLineElement.dataset.lineNumber);
			charIndex = closestLineElement.textContent?.length || 0;
		}
	}

	if (lineNumber > 0) {
		// Logic to update the model and place the cursor
		editorModel.update((model) => {
			model.cursor.moveCursor({
				cursorBasis: charIndex,
				cursorCharacter: charIndex,
				cursorLine: lineNumber,
			});
			return model;
		});
		placeCursorAtPosition(lineNumber, editorElement, charIndex);
	}
};

const handleBackspace = (event: KeyboardEvent) => {
	event.preventDefault();

	if (
		editorElement.children.length === 1 &&
		editorElement.textContent?.trim() === ""
	) {
		resetEditorContent(editorElement, editorModel);
	} else {
		editorModel.update((model) => {
			model.deleteCharacter(
				$editorModel.cursor.position.cursorLine,
				$editorModel.cursor.position.cursorCharacter,
			);
			return model;
		});
	}

	scrollToCursorIfNeeded(
		ScrollDirection.Right,
		$editorModel,
		app,
		editorElement,
		editorWrapper,
	);
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
		editorElement,
		$editorModel.cursor.position.cursorCharacter + 1,
	);
	scrollToCursorIfNeeded(
		ScrollDirection.Right,
		$editorModel,
		app,
		editorElement,
		editorWrapper,
	);
};

const handleEnterKey = async (event: KeyboardEvent) => {
    event.preventDefault();

    editorModel.update((model) => {
        const cursorLine = model.cursor.position.cursorLine;
        const cursorCharacter = model.cursor.position.cursorCharacter;
        const currentLineContent = model.lines[cursorLine - 1]?.content || "";
        const beforeCursor = currentLineContent.substring(0, cursorCharacter);
        const afterCursor = currentLineContent.substring(cursorCharacter);

        // Update the current line with the text before the cursor
        model.lines[cursorLine - 1].content = beforeCursor;

        // Insert a new line after the current line with the text after the cursor
        model.lines.splice(cursorLine, 0, { number: cursorLine + 1, content: afterCursor });

        // Update line numbers for all lines after the new line
        for (let i = cursorLine + 1; i < model.lines.length; i++) {
            model.lines[i].number = i + 1;
        }

        // Move the cursor to the beginning of the new line
        model.cursor.moveCursor({
            cursorBasis: 0,
            cursorCharacter: 0,
            cursorLine: cursorLine + 1,
        });

        return model;
    });
	
    await tick();
	const lastElement = editorElement.lastChild;
	if (lastElement) placeCursorInDiv(lastElement as HTMLDivElement);
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
			scrollToCursorIfNeeded(
				ScrollDirection.Down,
				$editorModel,
				app,
				editorElement,
				editorWrapper,
			);
			break;
		}
		case "ArrowUp": {
			const cursorPosition = $editorModel.cursor.position;
			const previousLineLength =
				$editorModel.lines[cursorPosition.cursorLine - 2]?.content?.length;

			$editorModel.cursor.moveCursorUp(previousLineLength);
			scrollToCursorIfNeeded(
				ScrollDirection.Up,
				$editorModel,
				app,
				editorElement,
				editorWrapper,
			);
			break;
		}
		default:
			return;
	}
};

const handleKeyDown = async (event: KeyboardEvent) => {
	if (event.key === "Enter") {
		await handleEnterKey(event);
		await updateCursorPosition();
		await tick();
		scrollToCursorIfNeeded(
			ScrollDirection.Down,
			$editorModel,
			app,
			editorElement,
			editorWrapper,
		);
	} else if (event.key === "PageDown") {
		event.preventDefault();

		const editorHeight = app?.getBoundingClientRect().bottom;
		editorModel.update((model) => {
			model.cursor.shiftCursor($editorModel.getNumberOfLines(), {
				deltaLine: Math.floor((editorHeight ?? 0) / 20),
			});
			return model;
		});
		scrollToCursorIfNeeded(
			ScrollDirection.Down,
			$editorModel,
			app,
			editorElement,
			editorWrapper,
		);
	} else if (event.key === "PageUp") {
		event.preventDefault();

		const editorHeight = app?.getBoundingClientRect().bottom;
		editorModel.update((model) => {
			model.cursor.shiftCursor($editorModel.getNumberOfLines(), {
				deltaLine: -Math.floor((editorHeight ?? 0) / 20),
			});
			return model;
		});
		scrollToCursorIfNeeded(
			ScrollDirection.Up,
			$editorModel,
			app,
			editorElement,
			editorWrapper,
		);
	} else if (event.key === "Backspace") {
		handleBackspace(event);
	} else if (
		["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)
	) {
		handleArrowKey(event);
		await placeCursorAtPosition(
			$editorModel.cursor.position.cursorLine,
			editorElement,
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
			direction,
			$editorModel,
			app,
			editorElement,
			editorWrapper,
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
		// @TODO fix x equaling 0 on first load
		const lineNumber = $editorModel.cursor.position.cursorLine;
		const scrollTop = app?.scrollTop ?? 0;

		x = cachedLineNumberLeft ?? 0;
		y = LINE_HEIGHT * (lineNumber - 1) + 5 - scrollTop;

		if (!cachedLineNumberLeft) cachedLineNumberLeft = x;

		return {
			x,
			y,
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

// Reactive statement to update the last cursor position
$: if ($editorModel.cursor.position) {
	updateLastCursorPosition($editorModel.cursor.position.cursorLine);
}

$: if (editorElement && $editorModel.cursor.position) {
	tick().then(() => {
		placeCursorAtPosition(
			$editorModel.cursor.position.cursorLine,
			editorElement,
			$editorModel.cursor.position.cursorCharacter,
		);
	});
}

onMount(() => {
	resetEditorContent(editorElement, editorModel);
	// Needed so the cursor doesn't lag behind 1 char
	editorElement.addEventListener("keydown", (e) => {
		if (e.key.length === 1 || e.key === "Backspace") updateCursorPosition();
	});
	editorElement.addEventListener("mousedown", updateCursorPosition);
	editorElement.addEventListener("scroll", updateCursorPosition);
});

onDestroy(() => {
	editorElement.removeEventListener("keydown", updateCursorPosition);
	editorElement.removeEventListener("mousedown", updateCursorPosition);
	editorElement.removeEventListener("scroll", updateCursorPosition);
	app?.removeEventListener("scroll", updateCursorPosition);
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
                width: 100%;
                position: relative;
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