import { useCallback } from "react";
import type { EditorModel } from "../model/editorModel";
import { keyActions } from "../util/keyActions";
import type { CursorPosition } from "./useCursorManagement";
import type { ScrollDirection } from "./useScrollManagement";

/**
 * A custom hook for managing common events (like input) within a text editor component.
 */
export const useEditorEvents = (
	editorRef: React.RefObject<HTMLDivElement>,
	editorModelRef: React.RefObject<EditorModel>,
	updateEditorContent: (newContent: string) => void,
	updateCursor: (
		model: EditorModel,
		opts: { line: number; char: number },
	) => void,
	scrollToCursorIfNeeded: (direction: ScrollDirection) => void,
	handleEnterScroll: () => void,
	moveCursorDown: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void,
	moveCursorUp: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void,
	moveCursorLeft: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void,
	moveCursorRight: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void,
	insertCharacter: (model: EditorModel, character: string) => void,
	deleteCharacter: (model: EditorModel, isDeleteKey?: boolean) => void,
) => {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const content = editorRef.current;
			const model = editorModelRef.current;
			const cursorPosition = model?.getCursorPosition();

			if (!content || !model || !cursorPosition) return;

			const action = keyActions({
				deleteCharacter,
				handleEnterScroll,
				insertCharacter,
				moveCursorDown,
				moveCursorLeft,
				moveCursorRight,
				moveCursorUp,
				scrollToCursorIfNeeded,
			})[e.key as keyof typeof keyActions];
			if (action || e.key.length === 1) {
				// Prevent default only if an action is defined or it's a printable character
				e.preventDefault();

				if (action) {
					if (
						e.key === "Delete" ||
						e.key === "Backspace" ||
						e.key === "Enter"
					) {
						(action as (model: EditorModel) => void)(model);
					} else if (
						["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(e.key)
					) {
						(
							action as (
								event: React.KeyboardEvent<HTMLDivElement>,
								model: EditorModel,
								cursorPosition: CursorPosition,
								content: HTMLDivElement,
							) => void
						)(e, model, cursorPosition, content);
					}
				} else if (e.key.length === 1) {
					insertCharacter(model, e.key);
				}

				updateEditorContent(model.getContent());
				updateCursor(model, {
					char: cursorPosition.char,
					line: cursorPosition.line,
				});
			}
		},
		[
			editorModelRef,
			editorRef,
			insertCharacter,
			updateCursor,
			updateEditorContent,
			deleteCharacter,
			handleEnterScroll,
			insertCharacter,
			moveCursorDown,
			moveCursorLeft,
			moveCursorRight,
			moveCursorUp,
			scrollToCursorIfNeeded,
		],
	);

	return {
		handleKeyDown,
	};
};
