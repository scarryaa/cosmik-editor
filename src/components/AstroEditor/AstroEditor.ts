import { tick } from "svelte";
import type { Writable } from "svelte/store";
import type { Editor } from "../../models/Editor";
import { type ContentStore, contentStore } from "../../stores/content";
import { focusedEditorId, setFocusedEditorId, updateCurrentEditor } from "../../stores/editor";
import { setFocusedPaneId } from "../../stores/pane";
import { lastMousePosition, selecting } from "../../stores/selection";
import { closeTab } from "../../stores/tabs";
import { getCharacterIndex, getLineIndex } from "../../util/text";
import { pasteInternal } from "../../util/util";
import type { Tab } from "../TabWrapper/Tabs/types";
import { getNumberOfLinesOnScreen } from "./AstroEditorScrolling";
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
	$editor: () => Editor,
	$astroWrapper: () => HTMLDivElement,
	$app: HTMLDivElement,
	$astroEditor: () => HTMLDivElement,
	currentLineElement: () => HTMLDivElement,
	$astroWrapperInner: () => HTMLDivElement,
	$activeTabId: string,
	$contentStore: ContentStore,
	$cursor: () => HTMLDivElement,
	$totalLines: Writable<number>,
	$tabs: Map<string, Tab>,
) => {
	event.preventDefault();

	// Ignore Ctrl, Ctrl + Shift, Ctrl + Z, Ctrl + Shift + Z, Shift
	if (
		event.key === "Control" ||
		event.key === "Shift" ||
		(event.ctrlKey && event.key === "Shift") ||
		(event.ctrlKey && event.key === "z") ||
		(event.ctrlKey && event.shiftKey && event.key === "Z")
	) {
		return;
	}

	let keyHandled = false;

	// Ctrl combos
	if (event.key === "A" || event.key === "a") {
		if (event.ctrlKey) {
			keyHandled = true;
		}
	} else if (event.key === "V" || event.key === "v") {
		if (event.ctrlKey && event.shiftKey) {
			keyHandled = true;
			captureStateForUndo();

			await handleCtrlShiftV(
				$cursor(),
				$astroWrapperInner(),
				$editor(),
				$astroEditor(),
			);
		}
	} else if (event.ctrlKey && event.key === "w") {
		keyHandled = true;
		handleCtrlW($activeTabId, $contentStore, $tabs);
	}

	if (event.key === "Backspace") {
		captureStateForUndo();

		handleBackspace(
			event,
			$editor(),
			$astroWrapper(),
			$app,
			$contentStore,
			$activeTabId,
			$astroEditor(),
			$totalLines,
		);
	} else if (event.code === "Tab") {
		captureStateForUndo();

		// For some reason this works with shift but "Tab" does not
		if (event.shiftKey) {
			handleShiftTab(event, $editor(), $astroEditor());
		} else {
			handleTab(event, $editor(), $astroEditor());
		}
	} else if (event.key === "Delete") {
		captureStateForUndo();
		handleDelete(event, $editor(), $astroEditor(), $totalLines);
	} else if (event.key === "Home") {
		handleHome(event, $editor(), $astroEditor());
	} else if (event.key === "End") {
		handleEnd(event, $editor(), $astroEditor());
	} else if (event.key === "PageUp") {
		handlePageUp(event, $editor(), $astroEditor());
	} else if (event.key === "PageDown") {
		handlePageDown(event, $editor(), $astroEditor());
	} else if (event.key === "Enter") {
		captureStateForUndo();

		handleEnter(
			event,
			$editor(),
			$astroEditor(),
			$astroWrapperInner(),
			currentLineElement(),
			$cursor(),
			$totalLines,
		);
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
	} else if (event.key.length === 1 && !keyHandled) {
		captureStateForUndo();

		handleKey(
			event,
			$editor(),
			$astroEditor(),
			$astroEditor(),
			$astroWrapper(),
		);
	}

	await tick();
	contentStore.updateContent($activeTabId, $editor().getContentString());
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

    updateCurrentEditor((model) => {
        model.getCursor().setPosition(maxLines, content, char, line - 1, char);
        model.getSelection().setSelectionEnd(model.getCursor().getPosition());
        model.getSelection().setSelectionStart(model.getCursor().getPosition());
        return model;
    });

    selecting.set(true);

    // updateTextareaPosition(event, input);
    focusEditor(input);
    setFocusedEditorId($editor.getId());
	setFocusedPaneId($editor.getPaneId());

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

const captureStateForUndo = () => {
	updateCurrentEditor((model) => {
		model.captureStateForUndo();
		return model;
	});
};

const handleCtrlShiftV = async (
	$cursor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	await pasteInternal($cursor, $astroWrapperInner, $astroEditor);
};

const handleCtrlW = (
	$activeTabId: string,
	$contentStore: ContentStore,
	$tabs: Map<string, Tab>,
) => {
	if ($activeTabId) {
		closeTab($activeTabId, $contentStore, $tabs);
	}
};

const handleShiftTab = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Handle shift+tab (un-indent)
	updateCurrentEditor((model) => {
		model.deleteTabAtStart();
		return model;
	});
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
		updateCurrentEditor((model) => {
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			return model;
		});
	} else {
		// Insert tab
		updateCurrentEditor((model) => {
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			model.insertCharacter(" ");
			return model;
		});
	}
};

const handleHome = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Move to beginning of line
	updateCurrentEditor((model) => {
		model.getCursor().moveToBeginningOfLine();
		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});
};

const handleEnd = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	// Move to end of line
	updateCurrentEditor((model) => {
		model
			.getCursor()
			.moveToEndOfLine(
				model.getContent()[model.getCursorLine()].getContent().length,
			);

		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});
};

const handlePageDown = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	updateCurrentEditor((model) => {
		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});

	// If at last line, go to end of last line
	if ($editor.getCursor().isAtLastLine($editor.getTotalLines())) {
		updateCurrentEditor((model) => {
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
		updateCurrentEditor((model) => {
			model.moveCursor(
				cursorPosition.character,
				cursorPosition.line + getNumberOfLinesOnScreen(),
			);
			return model;
		});
	}
};

const handlePageUp = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	updateCurrentEditor((model) => {
		// Clear selection
		model.getSelection().clearSelection();
		return model;
	});

	// If at first line, go to end of last line
	if ($editor.getCursor().isAtFirstLine()) {
		updateCurrentEditor((model) => {
			model.getCursor().moveToBeginningOfLine();
			return model;
		});
	} else {
		// Move the cursor up a "page"
		const cursorPosition = $editor.getCursor().getPosition();
		updateCurrentEditor((model) => {
			model.moveCursor(
				cursorPosition.character,
				cursorPosition.line - getNumberOfLinesOnScreen(),
			);
			return model;
		});
	}
};

const handleDelete = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	$totalLines: Writable<number>,
) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtEndOfLine()) {
			updateCurrentEditor((model) => {
				model.forwardDelete();
				return model;
			});
		} else {
			updateCurrentEditor((model) => {
				model.deleteNextWord();
				return model;
			});
		}
	} else {
		updateCurrentEditor((model) => {
			model.forwardDelete();
			return model;
		});
	}

	$totalLines.set($editor.getTotalLines());
};

const handleArrowLeft = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtBeginningOfLine()) {
			updateCurrentEditor((model) => {
				model.moveCursorLeft();
				return model;
			});
		} else {
			updateCurrentEditor((model) => {
				model.moveCursorToPreviousWord();
				return model;
			});
		}
	} else if (event.shiftKey) {
		handleSelectionLeft();
	} else {
		// If there is a selection, move cursor to start and deselect
		if ($editor.getSelection().isSelection()) {
			updateCurrentEditor((model) => {
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
			}

			updateCurrentEditor((model) => {
				model.moveCursorLeft();
				return model;
			});
		}
	}
};

const handleArrowRight = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	if (event.ctrlKey) {
		if ($editor.cursorIsAtEndOfLine()) {
			updateCurrentEditor((model) => {
				model.moveCursorRight();
				return model;
			});
		} else {
			updateCurrentEditor((model) => {
				model.moveCursorToNextWord();
				return model;
			});
		}
	} else if (event.shiftKey) {
		handleSelectionRight();
	} else {
		// If there is a selection, move cursor to end and deselect
		if ($editor.getSelection().isSelection()) {
			updateCurrentEditor((model) => {
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
			}

			updateCurrentEditor((model) => {
				model.moveCursorRight();
				return model;
			});
		}
	}
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
			updateCurrentEditor((model) => {
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
			updateCurrentEditor((model) => {
				model.moveCursorUp();
				return model;
			});
		}
	}
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
			updateCurrentEditor((model) => {
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
			updateCurrentEditor((model) => {
				model.moveCursorDown();
				return model;
			});
		}
	}
};

const handleArrowKeys = (
	event: KeyboardEvent,
	$editor: () => Editor,
	$astroEditor: () => HTMLDivElement,
	currentLineElement: () => HTMLDivElement,
	$astroWrapperInner: () => HTMLDivElement,
) => {
	switch (event.key) {
		case "ArrowRight":
			handleArrowRight(event, $editor(), $astroEditor());
			break;
		case "ArrowLeft":
			handleArrowLeft(event, $editor(), $astroEditor());
			break;
		case "ArrowUp":
			handleArrowUp(event, $editor(), $astroEditor());
			break;
		case "ArrowDown":
			handleArrowDown(event, $editor(), $astroEditor());
			break;
	}
};

const handleBackspace = (
	event: KeyboardEvent,
	$editor: Editor,
	$astroWrapper: HTMLDivElement,
	$app: HTMLDivElement,
	$contentStore: {
		contents: Map<string, string>;
		contentModified: Map<string, boolean>;
	},
	$activeTabId: string,
	$astroEditor: HTMLDivElement,
	$totalLines: Writable<number>,
) => {
	let isSelection = $editor.getSelection().isSelection();

	if (event.ctrlKey) {
		updateCurrentEditor((model) => {
			if (
				!$editor.cursorIsAtBeginningOfDocument() &&
				$editor.cursorIsAtBeginningOfLine()
			) {
				model.deleteCharacter();
				return model;
			}

			model.deletePreviousWord();
			return model;
		});
	} else {
		updateCurrentEditor((model) => {
			if (
				!$editor.cursorIsAtBeginningOfDocument() &&
				$editor.cursorIsAtBeginningOfLine()
			) {
			}

			model.deleteCharacter();
			return model;
		});
	}

	$contentStore.contents.set($activeTabId, $editor.getContentString());

	if (isSelection) {
	}

	$totalLines.set($editor.getTotalLines());
};

const handleEnter = (
	event: Event,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$cursor: HTMLDivElement,
	$totalLines: Writable<number>,
) => {
	updateCurrentEditor((model) => {
		model.insertCharacter("\n");
		return model;
	});

	$totalLines.set($editor.getTotalLines());
};

const handleKey = (
	event: KeyboardEvent,
	$editor: Editor,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
	$astroWrapper: HTMLDivElement,
) => {
	updateCurrentEditor((model) => {
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
};
