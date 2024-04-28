<script lang="ts">
import { onDestroy, onMount, tick } from "svelte";
import { editorModel } from "../stores/editorModel";
import { mouseDown } from "../stores/mouse";
import { LINE_HEIGHT } from "../utils/consts";
import {
	ScrollDirection,
	scrollToCursorIfNeeded,
} from "../utils/editorScrolling";
import { updateSelection } from "../utils/editorSelection";
import {
	calculateCharIndex,
	findNextWordOrSymbol,
	findPreviousWordOrSymbol,
	placeCursorAtPosition,
	placeCursorInDiv,
	resetEditorContent,
	updateLastCursorPosition,
} from "../utils/editorUtils";
import Cursor from "./Cursor.svelte";
import Line from "./Line.svelte";

export let content = "";

let cachedLineNumberLeft: number | undefined;
let cursorLeft = 0;
let cursorTop = 0;
let editorElement: HTMLDivElement;
let textareaElement: HTMLTextAreaElement;
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

const updateTextareaPosition = () => {
  const { x, y } = getCaretCoordinates();
  textareaElement.style.left = `${x}px`;
  textareaElement.style.top = `${y}px`;
};

const handleMouseUp = (event: MouseEvent) => {
	mouseDown.set(false);
};

const handleMouseDown = (event: MouseEvent) => {
	const getCharIndex = (target: HTMLElement): number => {
		lineNumber = Number(target.dataset.lineNumber);
		charIndex = calculateCharIndex(event, target) + 2;
		return charIndex;
	};

	mouseDown.set(true);

	const target = event.target as HTMLElement;
	let lineNumber = 0;
	let charIndex = 0;

	if (target.dataset.lineNumber) {
		charIndex = getCharIndex(target);
	} else if (target.parentElement?.dataset.lineNumber) {
		charIndex = getCharIndex(target.parentElement);
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

	// Update the selection start
	editorModel.update((model) => {
		model.selection.setStart(
			model.cursor.position.cursorLine,
			model.cursor.position.cursorCharacter,
		);
		return model;
	});

	if (lineNumber > 0) {
		// Logic to update the model and place the cursor
		editorModel.update((model) => {
			model.cursor.moveCursor({
				cursorBasis: charIndex - 2,
				cursorCharacter: charIndex - 2,
				cursorLine: lineNumber,
			});
			return model;
		});
		placeCursorAtPosition(lineNumber, editorElement, charIndex);
	}
};

const handleCtrlLeftArrow = async (event: KeyboardEvent) => {
	const position = $editorModel.cursor.position;

	if (position.cursorCharacter === 0 && position.cursorLine > 1) {
		// Move to end of previous line
		editorModel.update((model) => {
			const newLine = $editorModel.lines[position.cursorLine - 2];
			model.cursor.moveCursor({
				cursorCharacter: newLine.content.length,
				cursorBasis: newLine.content.length,
				cursorLine: position.cursorLine - 1,
			});
			return model;
		});
	}

	const newPosition = findPreviousWordOrSymbol(
		$editorModel.lines,
		$editorModel.cursor.position,
	);

	editorModel.update((model) => {
		model.cursor.moveCursor(newPosition);
		return model;
	});

	scrollToCursorIfNeeded(
		ScrollDirection.Left,
		$editorModel,
		app,
		editorElement,
		editorWrapper,
	);
};

const handleCtrlRightArrow = (event: KeyboardEvent) => {
	const position = $editorModel.cursor.position;
	const numberOfLines = $editorModel.getNumberOfLines();

	if (
		position.cursorCharacter ===
			$editorModel.lines[position.cursorLine - 1].content.length &&
		position.cursorLine < numberOfLines + 1
	) {
		// Move to start of next line
		editorModel.update((model) => {
			model.cursor.moveCursor({
				cursorCharacter: 0,
				cursorBasis: 0,
				cursorLine: position.cursorLine + 1,
			});
			return model;
		});
	} else {
		const newPosition = findNextWordOrSymbol(
			$editorModel.lines,
			$editorModel.cursor.position,
		);
		editorModel.update((model) => {
			model.cursor.moveCursor(newPosition);
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

const handleDelete = (event: KeyboardEvent) => {
	event.preventDefault();

	editorModel.update((model) => {
		const cursorPosition = model.cursor.position;
		const currentLineIndex = cursorPosition.cursorLine - 1;
		const currentLine = model.lines[currentLineIndex];
		const isLastCharacterInLine =
			cursorPosition.cursorCharacter === currentLine.content.length;
		const isLastLine = currentLineIndex === model.lines.length - 1;

		if (isLastCharacterInLine && !isLastLine) {
			// If cursor is at the end of a line but not the last line, merge this line with the next one
			const nextLine = model.lines[currentLineIndex + 1];
			currentLine.content += nextLine.content;
			model.lines.splice(currentLineIndex + 1, 1);

			// Update line numbers
			for (let i = currentLineIndex + 1; i < model.lines.length; i++) {
				model.lines[i].number = i + 1;
			}
		} else if (!isLastCharacterInLine) {
			// If not at the end of the line, delete the character after the cursor
			currentLine.content =
				currentLine.content.substring(0, cursorPosition.cursorCharacter) +
				currentLine.content.substring(cursorPosition.cursorCharacter + 1);
		}

		return model;
	});
};

const handleBackspace = (event: KeyboardEvent): void => {
	event.preventDefault();

	if (!$editorModel.selection.isEmpty()) {
		// Delete selection
		editorModel.update((model) => {
			model.deleteSelection();
			return model;
		});
	} else {
		if (event.ctrlKey) {
			const position = $editorModel.cursor.position;
			const atLineStart = $editorModel.cursor.isAtLineStart();

			// If at the start of a line, delete it and move to previous line
			if (atLineStart) {
				editorModel.update((model) => {
					model.deleteCharacter(position.cursorLine, position.cursorCharacter);

					return model;
				});
			} else {
				// Delete whole words
				const newPosition = findPreviousWordOrSymbol(
					$editorModel.lines,
					position,
				);

				editorModel.update((model) => {
					// Delete from newPosition.cursorCharacter to position.cursorCharacter in newPosition.cursorLine
					const lineIndex = newPosition.cursorLine - 1;
					const start = newPosition.cursorCharacter;
					const end = position.cursorCharacter;

					model.substring(newPosition, lineIndex, start, end);
					return model;
				});
			}
		} else if (
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
	}
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
		model.lines.splice(cursorLine, 0, {
			number: cursorLine + 1,
			content: afterCursor,
		});

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

const handleCtrlKey = (event: KeyboardEvent) => {
	if (event.shiftKey && event.key.toLowerCase() === "z") {
		event.preventDefault();
		console.log("Redo");
	} else if (event.key.toLowerCase() === "z") {
		event.preventDefault();
		console.log("Undo");
	}
};

const handleArrowKey = (event: KeyboardEvent) => {
	event.preventDefault();

	switch (event.key) {
		case "ArrowLeft": {
			if (event.ctrlKey) {
				handleCtrlLeftArrow(event);
			} else {
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
			}

			break;
		}
		case "ArrowRight": {
			if (event.ctrlKey) {
				handleCtrlRightArrow(event);
			} else {
				const cursorPosition = $editorModel.cursor.position;
				const currentLineLength =
					$editorModel.lines[cursorPosition.cursorLine - 1].content.length;

				$editorModel.cursor.moveCursorRight(
					currentLineLength,
					$editorModel.lines.length,
				);
			}

			break;
		}
		case "ArrowDown": {
			const cursorPosition = $editorModel.cursor.position;
			const nextLineLength =
				$editorModel.lines[cursorPosition.cursorLine]?.content?.length;

			// If at the last line, move to the end
			if (cursorPosition.cursorLine === $editorModel.getNumberOfLines() + 1) {
				const lineLength =
					$editorModel.lines[cursorPosition.cursorLine - 1].content.length;

				editorModel.update((model) => {
					model.cursor.moveCursor({
						cursorBasis: lineLength,
						cursorCharacter: lineLength,
						cursorLine: cursorPosition.cursorLine,
					});
					return model;
				});
			} else {
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
			}

			break;
		}
		case "ArrowUp": {
			const cursorPosition = $editorModel.cursor.position;
			const previousLineLength =
				$editorModel.lines[cursorPosition.cursorLine - 2]?.content?.length;

			// If at the first line, move to the start
			if (cursorPosition.cursorLine === 1) {
				editorModel.update((model) => {
					model.cursor.moveCursor({
						cursorBasis: 0,
						cursorCharacter: 0,
						cursorLine: cursorPosition.cursorLine,
					});
					return model;
				});
			} else {
				$editorModel.cursor.moveCursorUp(previousLineLength);
				scrollToCursorIfNeeded(
					ScrollDirection.Up,
					$editorModel,
					app,
					editorElement,
					editorWrapper,
				);
			}

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
	} else if (event.key === "Delete") {
		handleDelete(event);
	}

	if (event.ctrlKey) {
		event.preventDefault();
		handleCtrlKey(event);
	} else if (event.key.length === 1) {
		handleLetterKey(event);
	}

	content = $editorModel.toHTML();
};

export const getCaretCoordinates = () => {
	let x = 0;
	let y = 0;

	const selection = window.getSelection();
	if (!selection) return { x, y };

	if (selection?.rangeCount > 0) {
		const range = selection.getRangeAt(0).cloneRange();
		if (!range) return { x, y };

		range.collapse(true);
		const rect = range.getClientRects()[0];

		if (rect) {
			x = rect.left;
			y = rect.top;
		} else {
			// Fallback if rect is not available, calculate based on line number
			const anchorNode = selection?.anchorNode;
			let lineElement =
				anchorNode?.nodeType === 3 ? anchorNode.parentNode : anchorNode;
			while (
				lineElement &&
				!(lineElement as HTMLElement).classList.contains("line")
			) {
				lineElement = lineElement.parentNode;
			}

			if (lineElement) {
				const lineNumber = Number(
					(lineElement as HTMLElement).dataset.lineNumber,
				);
				if (!lineNumber) return { x, y };

				const scrollTop = app?.scrollTop ?? 0;
				y = LINE_HEIGHT * (lineNumber - 1) + 5 - scrollTop;
				x = (lineElement as HTMLElement).getBoundingClientRect().left;
			}
		}
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
	window.addEventListener("mousemove", (event) => {
		event.preventDefault();

		updateSelection(
			event as MouseEvent,
			$mouseDown,
			editorElement,
			editorModel,
			$editorModel,
		);
	});
	document.addEventListener("mousedown", updateCursorPosition);
	document.addEventListener("mouseup", handleMouseUp);
	document.addEventListener("selectstart", (event) => {
		event.preventDefault();
	});
	editorElement.addEventListener("scroll", updateCursorPosition);
});

onDestroy(() => {
	window.removeEventListener("mousemove", (event) => {
		updateSelection(
			event as MouseEvent,
			$mouseDown,
			editorElement,
			editorModel,
			$editorModel,
		);
	});
	editorElement.removeEventListener("keydown", updateCursorPosition);
	document.removeEventListener("mousedown", updateCursorPosition);
	document.removeEventListener("mouseup", handleMouseUp);
	editorElement.removeEventListener("scroll", updateCursorPosition);
	app?.removeEventListener("scroll", updateCursorPosition);
});
</script>

    <style lang="scss">
		  .invisible-textarea {
			tab-size: 33.7188px;
			appearance: none;
			font-family: "Droid Sans Mono", "monospace", monospace;
			font-weight: normal;
			font-size: 14px;
			font-feature-settings: "liga" 0, "calt" 0;
			font-variation-settings: normal;
			line-height: 19px;
			letter-spacing: 0px;
			top: 0px;
			left: 70px;
			width: 1px;
			height: 1px;
		  }

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
			font-family: "Droid Sans Mono", "monospace", monospace;

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
        bind:this={editorElement} 
        on:keydown={handleKeyDown}
        on:mousedown={handleMouseDown}
        tabindex="0"
        role="textbox" 
        aria-multiline="true">
    </div>
	<textarea bind:this={textareaElement} class="invisible-textarea"></textarea>
    <Cursor bind:left={cursorLeft} bind:top={cursorTop} />