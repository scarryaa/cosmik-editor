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
		ctrlModifier: boolean,
	) => void;
	moveCursorRight: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		ctrlModifier: boolean,
	) => void;
	moveCursorDown: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		ctrlModifier: boolean,
	) => void;
	moveCursorUp: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
		ctrlModifier: boolean,
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
			moveCursorLeft(model, cursorPosition, content, event.ctrlKey);
			model.clearSelection();
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
			moveCursorRight(model, cursorPosition, content, event.ctrlKey);
			model.clearSelection();
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
			moveCursorDown(model, cursorPosition, content, event.ctrlKey);
			scrollToCursorIfNeeded(ScrollDirection.Down);
			model.clearSelection();
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
			moveCursorUp(model, cursorPosition, content, event.ctrlKey);
			scrollToCursorIfNeeded(ScrollDirection.Up);
			model.clearSelection();
		}
	},
});
