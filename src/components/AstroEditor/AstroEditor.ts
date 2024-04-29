import { tick } from "svelte";
import type { Writable } from "svelte/store";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import { measureTextWidth } from "../../util/text";
import {
	getNumberOfLinesOnScreen,
	scrollToCurrentLine,
	scrollToCursor,
	scrollToElement,
} from "./AstroEditorScrolling";

export const cursorHorizOffset = 5;
export const cursorVertOffset = 5;

export const updateTextareaPosition = (
	event: MouseEvent,
	input: HTMLTextAreaElement,
) => {
	const { x, y } = { x: event.clientX, y: event.clientY };
	input.style.left = `${x}px`;
	input.style.top = `${y}px`;
};

export const focusEditor = (input: HTMLTextAreaElement) => {
	input.focus();
};

export const handleKeyDown = async (
	event: KeyboardEvent,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroWrapper: HTMLDivElement,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$cursor: HTMLDivElement,
) => {
	event.preventDefault();

	if (event.key === "Backspace") {
		handleBackspace(event, editor, $editor, $astroWrapper, $app, $astroEditor);
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	} else if (event.key === "Tab") {
		handleTab(event, $editor, $astroEditor);
	} else if (event.key === "Delete") {
		handleDelete(event, $editor);
	} else if (event.key === "Home") {
		handleHome(event, $editor, $astroEditor);
	} else if (event.key === "End") {
		handleEnd(event, $editor, $astroEditor);
	} else if (event.key === "PageUp") {
		handlePageUp(event, $editor, $astroEditor);
		await tick();
		scrollToCurrentLine(
			currentLineElement,
			$astroWrapperInner,
			"up",
			$editor.getCursorLine() + 1,
		);
	} else if (event.key === "PageDown") {
		handlePageDown(event, $editor, $astroEditor);
		await tick();
		scrollToCurrentLine(
			currentLineElement,
			$astroWrapperInner,
			"down",
			$editor.getCursorLine() + 1,
		);
	} else if (event.key === "Enter") {
		handleEnter(
			event,
			editor,
			$editor,
			$astroEditor,
			$astroWrapperInner,
			currentLineElement,
			$cursor,
		);

		scrollToCurrentLine(currentLineElement, $astroWrapperInner, "down");
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	} else if (
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)
	) {
		handleArrowKeys(
			event,
			$editor,
			$astroEditor,
			currentLineElement,
			$astroWrapperInner,
		);
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	} else if (event.key.length === 1) {
		handleKey(
			event,
			editor,
			$editor,
			$astroEditor,
			$astroEditor,
			$astroWrapper,
		);

		scrollToCursor($cursor, $editor, $astroWrapperInner);
	}
};

export const handleMouseDown = (
	event: MouseEvent,
	input: HTMLTextAreaElement,
) => {
	event.preventDefault();

	updateTextareaPosition(event, input);
	focusEditor(input);
};

// Private

const updateCursorHorizontalPosition = (
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	const cursorLeft = $astroEditor?.getBoundingClientRect().left ?? 0;
	if (cursorLeft === 0) return;

	const cursorPosition = $editor.getCursor().getPosition();
	const lineContent = $editor.getContent()[cursorPosition.line]?.content ?? "";
	const textUpToCursor = lineContent.substring(0, cursorPosition.character);

	const measuredWidth = measureTextWidth(textUpToCursor);
	cursorHorizPos.set(measuredWidth + cursorHorizOffset + cursorLeft);
};

const updateCursorVerticalPosition = (add: boolean) => {
	cursorVertPos.update((value) => value + (add ? lineHeight : -lineHeight));
};

const handleTab = (event: KeyboardEvent, $editor: Editor, $astroEditor: HTMLDivElement) => {
	// Insert tab
	editor.update((model) => {
		model.insertCharacter(" ");
		model.insertCharacter(" ");
		model.insertCharacter(" ");
		model.insertCharacter(" ");
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleHome = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Move to beginning of line
	editor.update((model) => {
		model.getCursor().moveToBeginningOfLine();
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleEnd = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Move to end of line
	editor.update((model) => {
		model
			.getCursor()
			.moveToEndOfLine(
				model.getContent()[model.getCursorLine()].content.length,
			);
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handlePageDown = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// If at last line, go to end of last line
	if ($editor.getCursor().isAtLastLine($editor.getTotalLines())) {
		editor.update((model) => {
			model
				.getCursor()
				.moveToEndOfLine(
					model.getContent()[model.getCursorLine()].content.length,
				);
			return model;
		});
	} else {
		// Move the cursor down a "page"
		const cursorPosition = $editor.getCursor().getPosition();
		editor.update((model) => {
			model.moveCursor(
				cursorPosition.character,
				cursorPosition.line + getNumberOfLinesOnScreen(),
			);
			return model;
		});
	}

	updateCursorHorizontalPosition($editor, $astroEditor);
	updateCursorVerticalPosition(true);
};

const handlePageUp = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// If at fiorst line, go to end of last line
	if ($editor.getCursor().isAtFirstLine()) {
		editor.update((model) => {
			model.getCursor().moveToBeginningOfLine();
			return model;
		});
	} else {
		// Move the cursor up a "page"
		const cursorPosition = $editor.getCursor().getPosition();
		editor.update((model) => {
			model.moveCursor(
				cursorPosition.character,
				cursorPosition.line - getNumberOfLinesOnScreen(),
			);
			return model;
		});
	}

	updateCursorHorizontalPosition($editor, $astroEditor);
	updateCursorVerticalPosition(false);
};

const handleDelete = (event: KeyboardEvent, $editor: Editor) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtEndOfLine()) {
			editor.update((model) => {
				model.forwardDelete();
				return model;
			});
		} else {
			editor.update((model) => {
				model.deleteNextWord();
				return model;
			});
		}
	} else {
		editor.update((model) => {
			model.forwardDelete();
			return model;
		});
	}
};

const handleArrowLeft = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtBeginningOfLine()) {
			editor.update((model) => {
				model.moveCursorLeft();
				return model;
			});
			updateCursorVerticalPosition(false);
		} else {
			editor.update((model) => {
				model.moveCursorToPreviousWord();
				return model;
			});
		}
	} else {
		if (
			!$editor.cursorIsAtBeginningOfDocument() &&
			$editor.cursorIsAtBeginningOfLine()
		) {
			updateCursorVerticalPosition(false);
		}

		editor.update((model) => {
			model.moveCursorLeft();
			return model;
		});
	}

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowRight = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtEndOfLine()) {
			editor.update((model) => {
				model.moveCursorRight();
				return model;
			});
			updateCursorVerticalPosition(false);
		} else {
			editor.update((model) => {
				model.moveCursorToNextWord();
				return model;
			});
		}
	} else {
		if (
			!$editor.cursorIsAtBeginningOfDocument() &&
			$editor.cursorIsAtEndOfLine()
		) {
			updateCursorVerticalPosition(false);
		}

		editor.update((model) => {
			model.moveCursorRight();
			return model;
		});
	}

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowUp = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	editor.update((model) => {
		model.moveCursorUp();
		return model;
	});
	updateCursorVerticalPosition(false);
	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowDown = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	editor.update((model) => {
		model.moveCursorDown();
		return model;
	});
	updateCursorVerticalPosition(true);
	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowKeys = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
) => {
	switch (event.key) {
		case "ArrowRight":
			handleArrowRight(event, $editor, $astroEditor);
			scrollToCurrentLine(currentLineElement, $astroWrapperInner, "down");
			break;
		case "ArrowLeft":
			handleArrowLeft(event, $editor, $astroEditor);
			scrollToCurrentLine(currentLineElement, $astroWrapperInner, "up");
			break;
		case "ArrowUp":
			handleArrowUp(event, $editor, $astroEditor);
			scrollToCurrentLine(currentLineElement, $astroWrapperInner, "up");
			break;
		case "ArrowDown":
			handleArrowDown(event, $editor, $astroEditor);
			scrollToCurrentLine(currentLineElement, $astroWrapperInner, "down");
			break;
	}
};

const handleBackspace = (
	event: KeyboardEvent,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroWrapper: HTMLDivElement,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
) => {
	if (event.ctrlKey) {
		editor.update((model) => {
			if (
				!$editor.cursorIsAtBeginningOfDocument() &&
				$editor.cursorIsAtBeginningOfLine()
			) {
				updateCursorVerticalPosition(false);

				model.deleteCharacter();
				return model;
			}

			model.deletePreviousWord();
			return model;
		});
	} else {
		editor.update((model) => {
			if (
				!$editor.cursorIsAtBeginningOfDocument() &&
				$editor.cursorIsAtBeginningOfLine()
			) {
				updateCursorVerticalPosition(false);
			}

			model.deleteCharacter();
			return model;
		});
	}

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleEnter = (
	event: Event,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$cursor: HTMLDivElement,
) => {
	editor.update((model) => {
		model.insertCharacter("\n");
		return model;
	});

	updateCursorVerticalPosition(true);
	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleKey = (
	event: KeyboardEvent,
	editor: Writable<Editor>,
	$editor: Editor,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
	$astroWrapper: HTMLDivElement,
) => {
	editor.update((model) => {
		model.insertCharacter(event.key);
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};