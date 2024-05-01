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
		const currentSelectionEnd = model.getSelection().getSelectionEnd();
		const selectionStart = model.getSelection().getSelectionStart();

		// Improved direction determination
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
			// This case handles when the mouse moves but stays within the same character cell,
			// potentially useful for click-and-drag scenarios where the cursor doesn't move.
			// It's an edge case that might not need handling, but here for completeness.
		}

		return model;
	});
};

export const handleSelectionLeft = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionLeft(model.getCursor(), model.getContent());

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionRight = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionRight(model.getCursor(), model.getContent());

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionUp = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionUp(model.getCursor(), model.getContent());

		// Needed to trigger reactivity
		setSelectionStartAndEnd(selection);
		return model;
	});
};

export const handleSelectionDown = (): void => {
	editor.update((model) => {
		const selection = model.getSelection();

		selection.handleSelectionDown(model.getCursor(), model.getContent());

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
