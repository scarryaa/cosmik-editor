import { Cursor } from "./Cursor";

export type Content = Array<{ number: number; content: string }>;

export class Editor {
	private static EDITOR_DEFAULT_CONTENT = "";

	private content: Content;
	private cursor: Cursor;

	constructor() {
		this.cursor = new Cursor();
		this.content = this.parseInitialContent(Editor.EDITOR_DEFAULT_CONTENT);
	}

	private parseInitialContent = (content: string): Content => {
		return content.split("\n").map((lineContent, index) => ({
			number: index + 1,
			content: lineContent,
		}));
	};

	private resetContent = (): void => {
		this.content = Array.from(Editor.EDITOR_DEFAULT_CONTENT).map(
			(line, index) => {
				return {
					number: index + 1,
					content: line,
				};
			},
		);
	};

	setContent = (content: string): void => {
		this.content = this.parseInitialContent(content);
	};

	getContent = (): Content => {
		return this.content;
	};

	getContentString = (): string => {
		return this.content.map((line) => line.content).join("\n");
	};

	insertCharacter = (char: string): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		let line = this.content[lineIndex];

		// Check if the character being inserted is a newline character
		if (char === "\n") {
			// Split the current line at the cursor position
			const beforeCursor = line.content.substring(0, charIndex);
			const afterCursor = line.content.substring(charIndex);

			// Update the current line with the content before the cursor
			line.content = beforeCursor;

			// Create a new line with the content after the cursor
			const newLine = { number: lineIndex + 2, content: afterCursor };

			// Insert the new line into the content array
			this.content.splice(lineIndex + 1, 0, newLine);

			// Update line numbers for all lines following the new line
			for (let i = lineIndex + 2; i < this.content.length; i++) {
				this.content[i].number = i + 1;
			}

			// Move the cursor to the beginning of the new line
			this.cursor.setPosition(0, lineIndex + 1);
		} else {
			// If not inserting a newline, proceed with normal character insertion
			let newContent =
				line.content.substring(0, charIndex) +
				char +
				line.content.substring(charIndex);
			line.content = newContent;

			// Move the cursor to the right
			this.cursor.moveRight(this.content);
		}
	};

	deleteCharacter = (): void => {
		const cursorPos = this.cursor.getPosition();
		if (cursorPos.character > 0 || cursorPos.line > 0) {
			const lineIndex = cursorPos.line;
			const charIndex = cursorPos.character;

			if (charIndex > 0) {
				// Delete character in the current line
				let line = this.content[lineIndex];
				let newContent =
					line.content.substring(0, charIndex - 1) +
					line.content.substring(charIndex);
				line.content = newContent;

				this.cursor.moveLeft(this.content);
			} else if (lineIndex > 0) {
				// Delete character from the end of the previous line if at the beginning of a line
				let prevLine = this.content[lineIndex - 1];
				let currentLine = this.content[lineIndex];
				prevLine.content += currentLine.content;
				this.content.splice(lineIndex, 1); // Remove the current line
				this.cursor.setPosition(prevLine.content.length, lineIndex - 1);
			}
		}
	};

	getTotalLines = (): number => {
		return this.content.length;
	};

	// Cursor

	cursorIsAtBeginningOfLine = (): boolean => {
		return this.cursor.getPosition().character === 0;
	};

	cursorIsAtEndOfLine = (): boolean => {
		return (
			this.cursor.getPosition().character ===
			this.content[this.cursor.getPosition().line].content.length
		);
	};

	getCursorLine = (): number => {
		return this.cursor.getPosition().line;
	};

	cursorIsAtBeginningOfDocument = (): boolean => {
		return this.cursorIsAtBeginningOfLine() && this.getCursorLine() === 0;
	};

	moveCursorUp = (): void => {
		this.cursor.moveUp();
	};

	moveCursorDown = (): void => {
		this.cursor.moveDown(this.getTotalLines());
	};

	moveCursorLeft = (): void => {
		this.cursor.moveLeft(this.content);
	};

	moveCursorRight = (): void => {
		this.cursor.moveRight(this.content);
	};

	getCursor = (): Cursor => {
		return this.cursor;
	};
}
