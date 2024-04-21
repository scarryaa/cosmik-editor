import type { EditorModel } from "../model/editorModel";

export const useEditorEvents = (
	editorRef: React.RefObject<HTMLDivElement>,
	editorModelRef: React.RefObject<EditorModel>,
	updateEditorContent: (newContent: string) => void,
	updateCursor: (opts: { line: number; char: number }) => void,
) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const content = editorRef.current;
		const model = editorModelRef.current;
		const cursorPosition = model?.getCursorPosition();

		if (!content || !model || !cursorPosition) return;
		e.preventDefault();

		switch (e.key) {
			case "Backspace": {
				deleteCharacter(model);
				break;
			}
			case "Enter": {
				insertCharacter(model, "\n");

				requestAnimationFrame(() => {
					if (content) {
						const lastLine = content.lastChild;
						if (lastLine && lastLine instanceof Element) {
							lastLine.scrollIntoView({ behavior: "instant", block: "end" });
						}
					}
				});
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
				break;
			}
			case "ArrowDown": {
				moveCursorDown(model, cursorPosition, content);
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
	};

	const updateCursorInDOM = () => {
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
	};

	const getDOMLineLength = (line: number): number => {
		const content = editorRef.current;

		if (line >= 0 && content?.children && line < content.children.length) {
			const textNode = content.children[line].firstChild;
			if (textNode?.nodeType === Node.TEXT_NODE) {
				const textNodeAsText = textNode as Text;
				return textNodeAsText.length;
			}
		}

		return 0;
	};

	const moveCursorLeft = (
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
	};

	const moveCursorRight = (
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
	};

	const moveCursorUp = (
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
	};

	const moveCursorDown = (
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
	};

	const insertCharacter = (model: EditorModel, character: string) => {
		model.insert(character);
	};

	const deleteCharacter = (model: EditorModel) => {
		model.delete();
	};

	return {
		handleKeyDown,
	};
};
