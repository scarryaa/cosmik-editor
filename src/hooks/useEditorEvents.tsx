import { useCallback } from "react";
import type { EditorModel } from "../model/editorModel";
import type { CursorPosition } from "./useCursorManagement";
import { ScrollDirection } from "./useScrollManagement";

/**
 * A custom hook for managing common events (like input) within a text editor component.
 */
export const useEditorEvents = (
	editorRef: React.RefObject<HTMLDivElement>,
	editorModelRef: React.RefObject<EditorModel>,
	updateEditorContent: (newContent: string) => void,
	updateCursor: (opts: { line: number; char: number }) => void,
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
			e.preventDefault();

			switch (e.key) {
				case "Delete": {
					deleteCharacter(model, true);
					break;
				}
				case "Backspace": {
					deleteCharacter(model);
					scrollToCursorIfNeeded(ScrollDirection.Up);
					break;
				}
				case "Enter": {
					insertCharacter(model, "\n");
					handleEnterScroll();
					break;
				}
				// Arrow Keys
				case "ArrowLeft": {
					moveCursorLeft(model, cursorPosition, content);
					break;
				}
				case "ArrowRight": {
					moveCursorRight(model, cursorPosition, content);
					break;
				}
				case "ArrowUp": {
					moveCursorUp(model, cursorPosition, content);
					scrollToCursorIfNeeded(ScrollDirection.Up);
					break;
				}
				case "ArrowDown": {
					moveCursorDown(model, cursorPosition, content);
					scrollToCursorIfNeeded(ScrollDirection.Down);
					break;
				}
				default: {
					if (e.key.length === 1) insertCharacter(model, e.key);
					break;
				}
			}

			// Update the content state with the new model content
			updateEditorContent(model.getContent());

			// Ensure the cursor is updated in the DOM
			updateCursor({ char: cursorPosition.char, line: cursorPosition.line });
		},
		[
			editorRef,
			editorModelRef,
			updateEditorContent,
			scrollToCursorIfNeeded,
			handleEnterScroll,
			moveCursorDown,
			moveCursorUp,
			moveCursorLeft,
			moveCursorRight,
			updateCursor,
			insertCharacter,
			deleteCharacter,
		],
	);

	return {
		handleKeyDown,
	};
};
