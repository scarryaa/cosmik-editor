import type { Writable } from "svelte/store";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import { measureTextWidth } from "../../util/text";

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

export const handleKeyDown = (
	event: KeyboardEvent,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroWrapper: HTMLDivElement,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
) => {
	event.preventDefault();

	if (event.key === "Backspace") {
		handleBackspace(event, editor, $editor, $astroWrapper, $app, $astroEditor);
	} else if (event.key === "Enter") {
		handleEnter(event, editor, $editor, $astroEditor, $app, $astroWrapper);
	} else if (
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)
	) {
		handleArrowKeys(event, $editor, $astroEditor);
	} else if (event.key.length === 1) {
		handleKey(
			event,
			editor,
			$editor,
			$astroEditor,
			$astroEditor,
			$astroWrapper,
		);
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
) => {
	switch (event.key) {
		case "ArrowRight":
			handleArrowRight(event, $editor, $astroEditor);
			break;
		case "ArrowLeft":
			handleArrowLeft(event, $editor, $astroEditor);
			break;
		case "ArrowUp":
			handleArrowUp(event, $editor, $astroEditor);
			break;
		case "ArrowDown":
			handleArrowDown(event, $editor, $astroEditor);
			break;
	}
};

const handleBackspace = (
	event: Event,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroWrapper: HTMLDivElement,
	$app: HTMLDivElement,
	$astroEditor: HTMLDivElement,
) => {
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

	updateCursorHorizontalPosition($editor, $astroEditor);
};

const handleEnter = (
	event: Event,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	$app: HTMLDivElement,
	$astroWrapper: HTMLDivElement,
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
