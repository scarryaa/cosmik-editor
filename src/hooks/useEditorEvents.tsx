import { useCallback } from "react";
import type { EditorModel } from "../model/editorModel";

const LINE_HEIGHT = 20;
const SCROLL_OFFSET = LINE_HEIGHT * 3;

enum ScrollDirection {
	Up = "up",
	Down = "down",
}

export const useEditorEvents = (
	editorRef: React.RefObject<HTMLDivElement>,
	editorModelRef: React.RefObject<EditorModel>,
	updateEditorContent: (newContent: string) => void,
	updateCursor: (opts: { line: number; char: number }) => void,
) => {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const content = editorRef.current;
			const model = editorModelRef.current;
			const cursorPosition = model?.getCursorPosition();

			if (!content || !model || !cursorPosition) return;
			e.preventDefault();

			switch (e.key) {
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
			requestAnimationFrame(() => updateCursorInDOM());
		},
		[editorRef, editorModelRef, updateEditorContent],
	);

	const updateCursorInDOM = useCallback(() => {
		const model = editorModelRef.current;
		if (!model) return;

		const cursorPosition = model.getCursorPosition();
		if (!cursorPosition || !editorRef.current) return;

		const range = document.createRange();
		const sel = window.getSelection();

		const currentNode = document.querySelector(
			`[data-line-number="${cursorPosition.line}"]`,
		);
		const textNode = currentNode?.firstChild;
		if (textNode?.nodeType === Node.TEXT_NODE) {
			const textNodeAsText = textNode as Text;
			let charPosition = cursorPosition.char;

			if (textNodeAsText.length < charPosition) {
				charPosition = textNodeAsText.length;
			}
			// Set the range to the correct position within the text node
			range.setStart(textNodeAsText, charPosition);
			range.collapse(true);
			sel?.removeAllRanges();
			sel?.addRange(range);

			// Update the cursor model state
			if (cursorPosition) {
				updateCursor({
					line: cursorPosition.line + 1,
					char: charPosition + 1,
				});
			}
		}
	}, [editorRef, editorModelRef, updateCursor]);

	const getDOMLineLength = useCallback(
		(line: number): number => {
			const content = editorRef.current;

			if (line >= 0 && content?.children && line < content.children.length) {
				const textNode = content.children[line].firstChild;
				if (textNode?.nodeType === Node.TEXT_NODE) {
					const textNodeAsText = textNode as Text;
					return textNodeAsText.length;
				}
			}

			return 0;
		},
		[editorRef],
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
				model.moveCursorY(-1);
				model.moveCursorX(lineLength);
			} else {
				model.moveCursorX(-1);
			}
		},
		[getDOMLineLength],
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
				model.moveCursorY(1);
				model.moveCursorX(-cursorPosition.char);
			} else {
				model.moveCursorX(1);
			}
		},
		[getDOMLineLength],
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
		[getDOMLineLength],
	);

	const insertCharacter = useCallback(
		(model: EditorModel, character: string) => {
			model.insert(character);
		},
		[],
	);

	const deleteCharacter = useCallback((model: EditorModel) => {
		model.delete();
	}, []);

	const handleEnterScroll = useCallback(() => {
		const model = editorModelRef.current;
		const content = editorRef.current;
		const lastLine = content?.lastChild;
		const cursorPosition = model?.getCursorPosition();

		if (!cursorPosition || !content) return;

		const cursorElement = document.querySelector(
			`[data-line-number="${cursorPosition?.line - 1}"]`,
		);
		const editorBottom = content?.getBoundingClientRect().bottom;
		const style = window.getComputedStyle(content);
		const paddingBottom = Number(style.paddingBottom.replace("px", ""));
		const editorWrapper = document.querySelector(".editor-wrapper");

		if (
			!editorWrapper ||
			!cursorElement ||
			!lastLine ||
			!(lastLine instanceof Element) ||
			!content
		)
			return;

		if (elementIsAtBottomOfView(cursorElement, editorBottom, paddingBottom)) {
			// We are at the bottom of the visible part of the editor
			const lastLineBottom = lastLine.getBoundingClientRect().bottom;

			// Check if the last line is below the bottom of the content view
			if (lastLineBottom > editorBottom - paddingBottom) {
				// Check if user scrolled past content and preserve
				if (lastLineBottom + LINE_HEIGHT > paddingBottom) {
					scrollElementIntoView(
						lastLine,
						"end",
						editorWrapper,
						LINE_HEIGHT * 2,
					);
				}
			}
		} else {
			// Check if we are going offscreen
			scrollToCursorIfNeeded(ScrollDirection.Down);
		}
	}, [editorModelRef, editorRef]);

	const scrollToCursorIfNeeded = useCallback(
		(direction: ScrollDirection) => {
			const model = editorModelRef.current;
			const content = editorRef.current;
			const cursorPosition = model?.getCursorPosition();
			const cursorElement = document.querySelector(
				`[data-line-number="${cursorPosition?.line}"]`,
			);

			if (!cursorPosition || !content || !cursorElement) return;

			const paddingBottom = Number(
				window.getComputedStyle(content).paddingBottom.replace("px", ""),
			);
			const editorWrapper = document.querySelector(".editor-wrapper");

			if (!editorWrapper) return;

			if (
				direction === ScrollDirection.Up &&
				elementIsAboveView(cursorElement)
			) {
				scrollElementIntoView(
					cursorElement,
					"start",
					editorWrapper,
					-SCROLL_OFFSET,
				);
			} else if (
				direction === ScrollDirection.Down &&
				elementIsBelowView(cursorElement, paddingBottom)
			) {
				scrollElementIntoView(cursorElement, "end", editorWrapper, LINE_HEIGHT);
			}
		},
		[editorModelRef, editorRef],
	);

	const elementIsAboveView = useCallback((element: Element) => {
		return (
			element.getBoundingClientRect().bottom < SCROLL_OFFSET + LINE_HEIGHT / 2
		);
	}, []);

	const elementIsBelowView = useCallback(
		(element: Element, paddingBottom: number) => {
			return element.getBoundingClientRect().bottom > paddingBottom;
		},
		[],
	);

	const elementIsAtBottomOfView = useCallback(
		(element: Element, editorBottom: number, paddingBottom: number) => {
			return (
				element.getBoundingClientRect().bottom ===
				Math.ceil(editorBottom - paddingBottom)
			);
		},
		[],
	);

	const scrollElementIntoView = useCallback(
		(
			element: Element,
			block: ScrollLogicalPosition,
			offsetElement?: Element,
			topOffset?: number,
		) => {
			element.scrollIntoView({ behavior: "auto", block });

			if (topOffset && offsetElement) {
				offsetElement.scrollBy({ top: topOffset });
			}
		},
		[],
	);

	return {
		handleKeyDown,
	};
};
