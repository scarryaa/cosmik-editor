import type { Editor } from "../../models/Editor";
import type { Selection } from "../../models/Selection";
import { editor } from "../../stores/editor";
import { getCharacterIndex, getLineIndex } from "../../util/text";

export const handleMouseSelection = (
	event: MouseEvent,
	$editor: Editor,
	$lastMousePosition: { left: number; top: number },
): void => {
	const char = getCharacterIndex(event, $editor);
	const line = getLineIndex(event, $editor.getTotalLines());

	editor.update((model) => {
		const selectionStart = model.getSelection().getSelectionStart();

		const isSelectingDownwards =
			line > selectionStart.line ||
			(line === selectionStart.line && char > selectionStart.character);
		const isSelectingUpwards =
			line < selectionStart.line ||
			(line === selectionStart.line && char < selectionStart.character);

		// Determine if we need to update the start or end based on the direction of the selection
		if (isSelectingDownwards) {
			model.getSelection().setSelectionEnd({ line, character: char });
		} else if (isSelectingUpwards) {
			model.getSelection().setSelectionStart({ line, character: char });
		} else {
		}

		return model;
	});
};

export const handleSelectionLeft = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();
		const cursorPosition = model.getCursor().getPosition();

		// Check for tab
		if (
			model
				.getContent()
				[cursorPosition.line].getContent()
				.substring(cursorPosition.character - 4, cursorPosition.character) ===
			" ".repeat(4)
		) {
			selection.handleSelectionLeft(model.getCursor(), model.getContent(), 4);
		} else {
			selection.handleSelectionLeft(model.getCursor(), model.getContent(), 1);
		}

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionRight = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();
		const cursorPosition = model.getCursor().getPosition();

		// Check for tab
		if (
			model
				.getContent()
				[cursorPosition.line].getContent()
				.substring(cursorPosition.character, cursorPosition.character + 4) ===
			" ".repeat(4)
		) {
			selection.handleSelectionRight(model.getCursor(), model.getContent(), 4);
		} else {
			selection.handleSelectionRight(model.getCursor(), model.getContent(), 1);
		}

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionUp = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionUp(model.getCursor(), model.getContent(), 1);

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionDown = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionDown(model.getCursor(), model.getContent(), 1);

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

const setSelectionStartAndEnd = (selection: Selection) => {
	// Needed to trigger reactivity
	selection.setSelectionEnd({ ...selection.getSelectionEnd() });
	selection.setSelectionStart({ ...selection.getSelectionStart() });
};
