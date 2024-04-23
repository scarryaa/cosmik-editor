import type { CursorPosition } from "../hooks/useCursorManagement";
import { ScrollDirection } from "../hooks/useScrollManagement";
import type { EditorModel } from "../model/editorModel";
import { SelectionDirection, SelectionEvents } from "../model/selectionModel";

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
	) => {
		if (event.shiftKey) {
			const currentSelection = model.getSelection();

			if (
				!currentSelection.isEmpty() &&
				currentSelection.direction === SelectionDirection.leftToRight
			) {
				currentSelection.contractSelection({
					direction: SelectionDirection.leftToRight,
					amount: 1,
				});
				model.updateAndSetSelection(currentSelection);
				model.emit(SelectionEvents.selectionChanged, currentSelection);
			} else {
				model.updateSelectionForShiftLeft();
			}
		} else {
			moveCursorLeft(model, cursorPosition, content);
		}
	},
	ArrowRight: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => {
		if (event.shiftKey) {
			const currentSelection = model.getSelection();

			if (
				!currentSelection.isEmpty() &&
				currentSelection.direction === SelectionDirection.rightToLeft
			) {
				currentSelection.contractSelection({
					direction: SelectionDirection.rightToLeft,
					amount: 1,
				});
				model.updateAndSetSelection(currentSelection);
				model.emit(SelectionEvents.selectionChanged, currentSelection);
			} else {
				model.updateSelectionForShiftRight();
			}
		} else {
			moveCursorRight(model, cursorPosition, content);
		}
	},
	ArrowDown: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => {
		moveCursorDown(model, cursorPosition, content);
		scrollToCursorIfNeeded(ScrollDirection.Down);
	},
	ArrowUp: (
		event: React.KeyboardEvent<HTMLDivElement>,
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => {
		moveCursorUp(model, cursorPosition, content);
		scrollToCursorIfNeeded(ScrollDirection.Up);
	},
});
