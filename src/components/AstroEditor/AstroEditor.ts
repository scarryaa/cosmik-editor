import { tick } from "svelte";
import type { Writable } from "svelte/store";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import { lastMousePosition, selecting } from "../../stores/selection";
import {
	getCharacterIndex,
	getLineIndex,
	measureTextWidth,
} from "../../util/text";
import {
	getNumberOfLinesOnScreen,
	scrollToCurrentLine,
	scrollToCursor,
} from "./AstroEditorScrolling";
import {
	handleMouseSelection,
	handleSelectionDown,
	handleSelectionLeft,
	handleSelectionRight,
	handleSelectionUp,
} from "./AstroEditorSelection";

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
	let keyHandled = false;

	// Ctrl combos
	if (event.key === "A" || event.key === "a") {
		if (event.ctrlKey) {
			handleCtrlA(event, $editor);
			keyHandled = true;

			updateCursorVerticalPosition(false);
			updateCursorHorizontalPosition($editor, $astroEditor);
		}
	}

	if (event.key === "Backspace") {
		handleBackspace(event, editor, $editor, $astroWrapper, $app, $astroEditor);
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	} else if (event.code === "Tab") {
		// For some reason this works with shift but "Tab" does not
		if (event.shiftKey) {
			handleShiftTab(event, $editor, $astroEditor);
		} else {
			handleTab(event, $editor, $astroEditor);
		}
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	} else if (event.key === "Delete") {
		handleDelete(event, $editor, $astroEditor);
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
	} else if (event.key.length === 1 && !keyHandled) {
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
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	event.preventDefault();

	const maxLines = $editor.getTotalLines();
	const content = $editor.getContent();
	const char = getCharacterIndex(event, $editor);
	const line = getLineIndex(event, $editor.getTotalLines());

	editor.update((model) => {
		model.getCursor().setPosition(maxLines, content, char, line - 1, char);
		model.getSelection().setSelectionEnd(model.getCursor().getPosition());
		model.getSelection().setSelectionStart(model.getCursor().getPosition());
		return model;
	});

	selecting.set(true);

	updateCursorVerticalPosition(false);
	updateCursorHorizontalPosition($editor, $astroEditor);

	updateTextareaPosition(event, input);
	focusEditor(input);
};

export const handleMouseUp = (event: MouseEvent) => {
	event.preventDefault();
	selecting.set(false);
};

export const handleMouseMove = (
	event: MouseEvent,
	$editor: Editor,
	$selecting: boolean,
	$lastMousePosition: { left: number; top: number },
) => {
	event.preventDefault();

	if ($selecting) {
		handleMouseSelection(event, $editor, $lastMousePosition);
	}

	lastMousePosition.set({ left: event.clientX, top: event.clientY });
};

// Private

const updateCursorHorizontalPosition = (
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	const cursorLeft = $astroEditor?.getBoundingClientRect().left ?? 0;
	if (cursorLeft === 0) return;

	const cursorPosition = $editor.getCursor().getPosition();
	const lineContent =
		$editor.getContent()[cursorPosition.line]?.getContent() ?? "";
	const textUpToCursor = lineContent.substring(0, cursorPosition.character);

	const measuredWidth = measureTextWidth(textUpToCursor);
	cursorHorizPos.set(measuredWidth + cursorHorizOffset + cursorLeft);
};

const updateCursorVerticalPosition = (add: boolean) => {
	cursorVertPos.update((value) => value + (add ? lineHeight : -lineHeight));
};

const handleCtrlA = (event: KeyboardEvent, $editor: Editor) => {
	const totalLines = $editor.getTotalLines();
	const content = $editor.getContent();
	const lineLength = content[totalLines - 1].getContent().length;

	editor.update((model) => {
		model.getSelection().selectAll(lineLength, totalLines, content);

		// Place the cursor at the end of the last line
		const line = $editor.getTotalLines();
		const character = content[line - 1].getContent().length;
		model.getCursor().moveToEndOfDocument(line, content, character, line);

		return model;
	});
};

const handleShiftTab = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Handle shift+tab (un-indent)
	editor.update((model) => {
		model.deleteTabAtStart();
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleTab = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Hacky fix -- if there was a selection, and we are not on the same line,
	// insert 5 spaces (because one gets eaten)
	if (
		$editor.getSelection().isSelection() &&
		$editor.getSelection().getSelectionStart().line !== $editor.getCursorLine()
	) {
		editor.update((model) => {
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			return model;
		});
	} else {
		// Insert tab
		editor.update((model) => {
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			return model;
		});
	}

	updateCursorVerticalPosition(false);
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
		// Clear selection
		model.getSelection().clearSelection();
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
				model.getContent()[model.getCursorLine()].getContent().length,
			);

		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handlePageDown = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	editor.update((model) => {
		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});

	// If at last line, go to end of last line
	if ($editor.getCursor().isAtLastLine($editor.getTotalLines())) {
		editor.update((model) => {
			model
				.getCursor()
				.moveToEndOfLine(
					model.getContent()[model.getCursorLine()].getContent().length,
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
	editor.update((model) => {
		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});

	// If at first line, go to end of last line
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

const handleDelete = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
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

	updateCursorHorizontalPosition($editor, $astroEditor);
	updateCursorVerticalPosition(false);
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
	} else if (event.shiftKey) {
		handleSelectionLeft();
	} else {
		// If there is a selection, move cursor to start and deselect
		if ($editor.getSelection().isSelection()) {
			editor.update((model) => {
				const selectionStart = model.getSelection().getSelectionStart();
				const maxLines = model.getTotalLines();
				const content = model.getContent();

				model
					.getCursor()
					.setPosition(
						maxLines,
						content,
						selectionStart.character,
						selectionStart.line,
						selectionStart.character,
					);
				model.getSelection().clearSelection();
				return model;
			});
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
	}

	updateCursorVerticalPosition(false);
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
	} else if (event.shiftKey) {
		handleSelectionRight();
	} else {
		// If there is a selection, move cursor to end and deselect
		if ($editor.getSelection().isSelection()) {
			editor.update((model) => {
				const selectionEnd = model.getSelection().getSelectionEnd();
				const maxLines = model.getTotalLines();
				const content = model.getContent();

				model
					.getCursor()
					.setPosition(
						maxLines,
						content,
						selectionEnd.character,
						selectionEnd.line,
						selectionEnd.character,
					);
				model.getSelection().clearSelection();
				return model;
			});
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
	}

	updateCursorVerticalPosition(true);
	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowUp = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.shiftKey) {
		handleSelectionUp();
	} else {
		// If there is a selection, move cursor to one line above start and deselect
		if ($editor.getSelection().isSelection()) {
			editor.update((model) => {
				const selectionStart = model.getSelection().getSelectionStart();
				const maxLines = model.getTotalLines();
				const content = model.getContent();

				model
					.getCursor()
					.setPosition(
						maxLines,
						content,
						selectionStart.character,
						selectionStart.line - 1,
						selectionStart.character,
					);
				model.getSelection().clearSelection();
				return model;
			});
		} else {
			editor.update((model) => {
				model.moveCursorUp();
				return model;
			});
		}
	}

	updateCursorVerticalPosition(false);
	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleArrowDown = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.shiftKey) {
		handleSelectionDown();
	} else {
		// If there is a selection, move cursor to one line below end and deselect
		if ($editor.getSelection().isSelection()) {
			editor.update((model) => {
				const selectionEnd = model.getSelection().getSelectionEnd();
				const maxLines = model.getTotalLines();
				const content = model.getContent();

				model
					.getCursor()
					.setPosition(
						maxLines,
						content,
						selectionEnd.character,
						selectionEnd.line + 1,
						selectionEnd.character,
					);
				model.getSelection().clearSelection();
				return model;
			});
		} else {
			editor.update((model) => {
				model.moveCursorDown();
				return model;
			});
		}
	}

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
	let isSelection = $editor.getSelection().isSelection();

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

	if (isSelection) {
		updateCursorVerticalPosition(false);
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
		// Hacky fix -- if there was a selection and we are not on the same line, insert twice
		if (
			$editor.getSelection().isSelection() &&
			$editor.getSelection().getSelectionStart().line !==
				$editor.getCursorLine()
		) {
			model.insertCharacter(event.key);
			model.insertCharacter(event.key);
		} else {
			model.insertCharacter(event.key);
		}
		return model;
	});

	updateCursorVerticalPosition(true);
	updateCursorHorizontalPosition($editor, $astroEditor);
};
