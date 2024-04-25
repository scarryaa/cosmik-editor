import type { CursorPosition } from "../hooks/useCursorManagement";
import { ScrollDirection } from "../hooks/useScrollManagement";
import type { EditorModel } from "../model/editorModel";

interface KeyActionsParams {
	deleteCharacter: (model: EditorModel, isDelete?: boolean) => void;
	insertCharacter: (model: EditorModel, character: string) => void;
	moveCursorLeft: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorRight: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorDown: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorUp: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	handleEnterScroll: () => void;
	scrollToCursorIfNeeded: (direction: ScrollDirection) => void;
	selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>;
}

export const keyActions = ({
	deleteCharacter,
	insertCharacter,
	moveCursorLeft,
	moveCursorRight,
	moveCursorDown,
	moveCursorUp,
	handleEnterScroll,
	scrollToCursorIfNeeded,
}: KeyActionsParams) => ({
	Delete: (model: EditorModel) => deleteCharacter(model, true),
	Backspace: (model: EditorModel) => {
		deleteCharacter(model);
		scrollToCursorIfNeeded(ScrollDirection.Up);
	},
	Enter: (model: EditorModel) => {
		insertCharacter(model, "\n");
		handleEnterScroll();
	},
	ArrowLeft: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>,
	) => {
		if (event.shiftKey) {
			selectionSourceRef.current = "keyboard";
			model.updateSelectionForShiftLeft(model.getCursorPosition());
		} else {
			model.clearSelection();
			moveCursorLeft(model, cursorPosition, content);
		}
	},
	ArrowRight: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>,
	) => {
		if (event.shiftKey) {
			selectionSourceRef.current = "keyboard";
			model.updateSelectionForShiftRight(model.getCursorPosition());
		} else {
			model.clearSelection();
			moveCursorRight(model, cursorPosition, content);
		}
	},
	ArrowDown: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>,
	) => {
		if (event.shiftKey) {
			selectionSourceRef.current = "keyboard";
			model.updateSelectionForShiftDown(model.getCursorPosition());
		} else {
			model.clearSelection();
			moveCursorDown(model, cursorPosition, content);
			scrollToCursorIfNeeded(ScrollDirection.Down);
		}

	},
	ArrowUp: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>,
	) => {
		if (event.shiftKey) {
			selectionSourceRef.current = "keyboard";
			model.updateSelectionForShiftUp(model.getCursorPosition());
		} else {
			model.clearSelection();
			moveCursorUp(model, cursorPosition, content);
			scrollToCursorIfNeeded(ScrollDirection.Up);
		}
	},
});
