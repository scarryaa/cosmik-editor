import { useCallback, useEffect, useState } from "react";
import type { EditorModel } from "../model/editorModel";

export type CursorPosition = { line: number; char: number };

/**
 * A custom hook for managing cursor position and updates within a text editor component.
 * @param editorRef A ref object pointing to the editor's DOM element.
 * @param initialPosition The initial cursor position.
 */
export const useCursorManagement = (
	editorRef: React.RefObject<HTMLDivElement>,
	initialPosition = { line: 0, char: 0 },
) => {
	const [cursorPosition, setCursorPosition] = useState(initialPosition);

	// Function to update the cursor position in state
	const updateCursorPosition = useCallback(
		(model: EditorModel, newPosition: CursorPosition) => {
			setCursorPosition(newPosition);
			model.setCursorPosition({
				xPosition: newPosition.char,
				yPosition: newPosition.line,
			});
		},
		[],
	);

	// Effect to update the cursor position in the DOM
	useEffect(() => {
		if (!editorRef.current) return;

		const { line, char } = cursorPosition;
		const currentNode = editorRef.current.querySelector(
			`[data-line-number="${line}"]`,
		);
		const textNode = currentNode?.firstChild;
		if (!textNode?.textContent) return;

		if (textNode?.nodeType === Node.TEXT_NODE) {
			const range = document.createRange();
			const sel = window.getSelection();
			
			range.setStart(textNode, Math.min(char, textNode.textContent.length));
			range.collapse(true);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [cursorPosition, editorRef]);

	const moveCursorDown = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
		) => {
			const lineLength = getDOMLineLength(cursorPosition?.line);
			model.setCursorPosition({
				xPosition:
					cursorPosition.line === content?.children.length - 1
						? lineLength
						: cursorPosition.char,
				yPosition:
					cursorPosition.line === content?.children.length - 1
						? cursorPosition.line
						: cursorPosition.line + 1,
			});
		},
		[],
	);

	const moveCursorUp = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
		) => {
			model.setCursorPosition({
				xPosition: cursorPosition.line === 0 ? 0 : cursorPosition.char,
				yPosition:
					cursorPosition.line === 0
						? cursorPosition.line
						: cursorPosition.line - 1,
			});
		},
		[],
	);

	const moveCursorRight = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
		) => {
			if (
				cursorPosition.char === getDOMLineLength(cursorPosition.line) &&
				cursorPosition.line < content.children.length - 1
			) {
				// Move to the next line
				model.moveCursor(0, 1);
				model.moveCursor(-cursorPosition.char, 0);
			} else {
				model.moveCursor(1, 0);
			}
		},
		[],
	);

	const moveCursorLeft = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
		) => {
			if (cursorPosition.char === 0 && cursorPosition.line > 0) {
				// Move to the previous line
				const lineLength = getDOMLineLength(cursorPosition.line - 1);
				model.moveCursor(0, -1);
				model.moveCursor(lineLength, 0);
			} else {
				model.moveCursor(-1, 0);
			}
		},
		[],
	);

	const getDOMLineLength = useCallback(
		(line: number): number => {
			const content = editorRef.current;
			if (line >= 0 && content?.children && line < content.children.length) {
				const textNode = content.children[line].firstChild;
				if (textNode?.nodeType === Node.TEXT_NODE) {
					const textContent = textNode.textContent;
					if (!textContent) return 0;
					if (textContent === "\u200B") {
						return 0; // Treat the zero-width space as 0
					}
					return textContent.length;
				}
			}
			return 0;
		},
		[editorRef],
	);

	const updateCursor = (
		model: EditorModel,
		opts: { line: number; char: number },
	) => {
		updateCursorPosition(model, opts);
	};

	return {
		cursorPosition,
		updateCursorPosition,
		moveCursorDown,
		moveCursorUp,
		moveCursorLeft,
		moveCursorRight,
		updateCursor,
	};
};
