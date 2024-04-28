import type { Writable } from "svelte/store";
import type { CursorPosition } from "../models/Cursor";
import type { Editor } from "../models/Editor";
import { calculateCharIndex } from "./editorUtils";

const calculatePositionFromEvent = (
	event: MouseEvent,
	$editorModel: Editor,
	editorElement: HTMLDivElement,
): CursorPosition => {
	const editorRect = editorElement.getBoundingClientRect();
	const clickY = event.clientY - editorRect.top;

	let lineNumber = 0;
	let charIndex = 0;

	// Find the closest line based on the Y position of the click
	const lines = editorElement.querySelectorAll("[data-line-number]");
	for (const line of lines) {
		const lineRect = line.getBoundingClientRect();
		if (
			clickY >= lineRect.top - editorRect.top &&
			clickY <= lineRect.bottom - editorRect.top
		) {
			lineNumber = Number(line.getAttribute("data-line-number"));
			break;
		}
	}

	const lineElement = editorElement.querySelector(
		`[data-line-number="${lineNumber}"]`,
	) as HTMLDivElement;

	if (!lineElement) {
		const lastLine = $editorModel.getNumberOfLines() + 1;
		const lineLength = $editorModel.getLineLength(lastLine - 1);
		return {
			cursorBasis: lineLength,
			cursorCharacter: lineLength,
			cursorLine: lastLine,
		};
	}

	charIndex = calculateCharIndex(event, lineElement);

	return {
		cursorCharacter: charIndex,
		cursorLine: lineNumber,
		cursorBasis: charIndex,
	};
};

export const updateSelection = (
	event: MouseEvent,
	$mouseDown: boolean,
	editorElement: HTMLDivElement,
	editorModel: Writable<Editor>,
	$editorModel: Editor,
) => {
    event.preventDefault();

	if (!$mouseDown) return;
	const position = $editorModel.cursor.position;

	const startPosition = position;

	// Assuming calculatePositionFromEvent is implemented elsewhere
	const endPosition = calculatePositionFromEvent(
		event,
		$editorModel,
		editorElement,
	);

    if (
		position.cursorLine === endPosition.cursorLine &&
		position.cursorCharacter === endPosition.cursorCharacter
	)
		return;

	editorModel.update((model) => {
		model.selection.setStart(
			startPosition.cursorLine,
			startPosition.cursorCharacter,
		);
		// Use the calculated end position from the mouse event
		model.selection.setEnd(endPosition.cursorLine, endPosition.cursorCharacter);
		return model;
	});
};
