import type { Writable } from "svelte/store";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorHorizPos, cursorVertPos } from "../../stores/editor";
import { measureText } from "../../util/text";

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
) => {
	event.preventDefault();

	if (event.key === "Backspace") {
		handleBackspace(event, editor, $editor);
	} else if (event.key === "Enter") {
		handleEnter(event, editor);
	} else if (event.key.length === 1) {
		handleKey(event, editor, $editor);
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

const updateCursorHorizontalPosition = ($editor: Editor) => {
	cursorHorizPos.set(
		measureText(
			$editor.getContent()[$editor.getCursor().getPosition().line].content,
		) + cursorHorizOffset,
	);
};

const updateCursorVerticalPosition = (add: boolean) => {
    cursorVertPos.update((value) => value + (add ? lineHeight : -lineHeight));
}

const handleBackspace = (
	event: Event,
	editor: Writable<Editor>,
	$editor: Editor,
) => {
	editor.update((model) => {
        if (!$editor.cursorIsAtBeginningOfDocument() && $editor.cursorIsAtBeginningOfLine()) {
            updateCursorVerticalPosition(false);
        }

		model.deleteCharacter();
		return model;
	});

	updateCursorHorizontalPosition($editor);
};

const handleEnter = (event: Event, editor: Writable<Editor>) => {
    updateCursorVerticalPosition(true);
	cursorHorizPos.set(cursorHorizOffset);

	editor.update((model) => {
		model.insertCharacter("\n");
		return model;
	});
};

const handleKey = (
	event: KeyboardEvent,
	editor: Writable<Editor>,
	$editor: Editor,
) => {
	editor.update((model) => {
		model.insertCharacter(event.key);
		return model;
	});

	updateCursorHorizontalPosition($editor);
};
