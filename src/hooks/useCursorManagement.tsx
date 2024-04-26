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

	const moveToPreviousLine = useCallback(
		(model: EditorModel, moveToEnd = false) => {
			if (moveToEnd) {
				const lineLength = getDOMLineLength(cursorPosition.line - 1);
				model.moveCursor(0, -1);
				model.moveCursor(lineLength, 0);
			} else {
				model.moveCursor(0, -1);
				model.moveCursor(0, 0);
			}
		},
		[cursorPosition],
	);

	const moveToNextLine = useCallback(
		(model: EditorModel, moveToEnd = false) => {
			if (moveToEnd) {
				model.moveCursor(0, 1);
				model.moveCursor(cursorPosition.char, 0);
			} else {
				model.moveCursor(0, 1);
				model.moveCursor(-cursorPosition.char, 0);
			}
		},
		[cursorPosition],
	);

	const findNextWordStartPosition = (
		text: string,
		startPosition: number,
	): number => {
		let foundSpaceOrSymbol = false;
		for (let i = startPosition; i < text.length; i++) {
			if (text[i].match(/[\s\/.,;(){}[\]=+*&|<>-]/)) {
				foundSpaceOrSymbol = true; // Mark when a space or symbol is found
			} else if (foundSpaceOrSymbol) {
				return i; // Return the start position of the next word or symbol
			}
		}
		return text.length; // If no next word or symbol is found, return the end of the text
	};

	const moveToPreviousWord = useCallback(
		(
			model: EditorModel,
			cursorPosition: CursorPosition,
			documentLines: string[],
		) => {
			let currentLineIndex = cursorPosition.line;
			let startPosition = cursorPosition.char;

			while (currentLineIndex >= 0) {
				const text = documentLines[currentLineIndex];
				const previousWordStartPos = findPreviousWordStartPosition(
					text,
					startPosition,
				);

				// If a previous word is found in the current line
				if (previousWordStartPos > 0) {
					model.setCursorPosition({
						xPosition: previousWordStartPos,
						yPosition: currentLineIndex,
					});
					break; // Exit the loop
				}

				// Move to the previous line and start from the end of the line
				currentLineIndex--;
				if (currentLineIndex < 0) {
					model.setCursorPosition({
						xPosition: 0,
						yPosition: 0,
					});
					break;
				}
				startPosition = documentLines[currentLineIndex].length;

				// If the line is blank, move there
				if (
					currentLineIndex < documentLines.length &&
					documentLines[currentLineIndex].length === 0
				) {
					model.setCursorPosition({
						xPosition: 0,
						yPosition: currentLineIndex,
					});
					break;
				}
			}
		},
		[],
	);

	const moveToNextWord = useCallback(
		(
			model: EditorModel,
			cursorPosition: CursorPosition,
			documentLines: string[],
		) => {
			let currentLineIndex = cursorPosition.line;
			let startPosition = cursorPosition.char;

			while (currentLineIndex < documentLines.length) {
				const text = documentLines[currentLineIndex];
				const nextWordStartPos = findNextWordStartPosition(text, startPosition);

				// If a next word is found in the current line
				if (nextWordStartPos < text.length) {
					model.setCursorPosition({
						xPosition: nextWordStartPos,
						yPosition: currentLineIndex,
					});
					break; // Exit the loop since we've found the next word
				}

				// Move to the next line and start from the beginning of the line
				currentLineIndex++;
				startPosition = 0;

				// If it is the last line, set cursor to the end
				if (currentLineIndex === documentLines.length) {
					model.setCursorPosition({
						xPosition: documentLines[currentLineIndex - 1].length,
						yPosition: currentLineIndex - 1,
					});
				}

				// If the line is blank, move there
				if (
					currentLineIndex < documentLines.length &&
					documentLines[currentLineIndex].length === 0
				) {
					model.setCursorPosition({
						xPosition: 0,
						yPosition: currentLineIndex,
					});
					break;
				}
			}
		},
		[findNextWordStartPosition],
	);

	const findPreviousWordStartPosition = (
		text: string,
		startPosition: number,
	): number => {
		for (let i = startPosition - 1; i > 0; i--) {
			if (
				text[i].match(/[\s\/.,;(){}[\]=+*&|<>-]/) &&
				!text[i - 1].match(/[\s\/.,;(){}[\]=+*&|<>-]/)
			) {
				return i;
			}
		}
		return 0; // If no previous word or symbol is found, return the start of the text
	};

	const moveCursorDown = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
			ctrlModifier: boolean,
		) => {
			// @TODO multi-cursor
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
			ctrlModifier: boolean,
		) => {
			// @TODO multi-cursor
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
			ctrlModifier: boolean,
		) => {
			if (!model.getSelection().isEmpty()) {
				cursorPosition.char = model.getSelection().selectionEnd;
				cursorPosition.line = model.getSelection().endLine;
			}

			if (ctrlModifier) {
				const document = model.getContent().split("\n");

				moveToNextWord(model, cursorPosition, document);
				return;
			}

			if (
				cursorPosition.char === getDOMLineLength(cursorPosition.line) &&
				cursorPosition.line < content.children.length - 1
			) {
				moveToNextLine(model, false);
			} else {
				// Default behavior: move one character to the right
				model.moveCursor(1, 0);
			}
		},
		[moveToNextLine, moveToNextWord],
	);

	const moveCursorLeft = useCallback(
		(
			model: EditorModel,
			cursorPosition: { line: number; char: number },
			content: HTMLDivElement,
			ctrlModifier: boolean,
		) => {
			if (!model.getSelection().isEmpty()) {
				cursorPosition.char = model.getSelection().selectionStart;
				cursorPosition.line = model.getSelection().startLine;
			}

			if (ctrlModifier) {
				const document = model.getContent().split("\n");

				moveToPreviousWord(model, cursorPosition, document);
				return;
			}

			if (cursorPosition.char === 0 && cursorPosition.line > 0) {
				moveToPreviousLine(model, true);
			} else {
				model.moveCursor(-1, 0);
			}
		},
		[moveToPreviousLine, moveToPreviousWord],
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
