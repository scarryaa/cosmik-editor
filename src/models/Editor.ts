import { findNextWordOrSymbol, findPreviousWordOrSymbol } from "../util/text";
import { Cursor, type CursorPosition } from "./Cursor";
import { Selection } from "./Selection";

export type Content = Array<{ number: number; content: string }>;

export class Editor {
	private static EDITOR_DEFAULT_CONTENT = "";

	private content: Content;
	private cursor: Cursor;
	private selection: Selection;

	constructor() {
		this.cursor = new Cursor();
		this.content = this.parseInitialContent(Editor.EDITOR_DEFAULT_CONTENT);
		this.selection = new Selection();
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

		// Check for selection and delete
		if (this.selection.isSelection()) {
			this.selection.deleteSelection(this.content, this.cursor);
		}

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
			this.cursor.setPosition(
				this.getTotalLines(),
				this.content,
				0,
				lineIndex + 1,
			);
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

	deletePreviousWord = (): void => {
		const lastWordPosition: CursorPosition = findPreviousWordOrSymbol(
			this.content,
			this.cursor.getPosition(),
		);
		if (lastWordPosition) {
			// Check for selection and delete
			if (this.selection.isSelection()) {
				this.selection.deleteSelection(this.content, this.cursor);
			}

			const currentLineIndex = this.cursor.getPosition().line;
			const currentCharIndex = this.cursor.getPosition().character;
			const lastWordLineIndex = lastWordPosition.line;
			const lastWordCharIndex = lastWordPosition.character;

			// Ensure deletion occurs within the same line
			if (currentLineIndex === lastWordLineIndex) {
				let line = this.content[currentLineIndex];
				let newContent =
					line.content.substring(0, lastWordCharIndex) +
					line.content.substring(currentCharIndex);
				line.content = newContent;

				// Move cursor to the start of the deleted word
				this.cursor.setPosition(
					this.getTotalLines(),
					this.content,
					lastWordCharIndex,
					currentLineIndex,
				);
			}
		}
	};

	deleteNextWord = () => {
		const cursorPos = this.cursor.getPosition();
		const nextWordPosition: CursorPosition = findNextWordOrSymbol(
			this.content,
			cursorPos,
		);
		if (nextWordPosition) {
			// Check for selection and delete
			if (this.selection.isSelection()) {
				this.selection.deleteSelection(this.content, this.cursor);
			}

			const currentLineIndex = cursorPos.line;
			const currentCharIndex = cursorPos.character;
			const nextWordCharIndex = nextWordPosition.character;
			let line = this.content[currentLineIndex];

			// Ensure deletion occurs within the same line and there is a word to delete
			if (
				currentLineIndex === nextWordPosition.line &&
				nextWordCharIndex > currentCharIndex
			) {
				let newContent =
					line.content.substring(0, currentCharIndex) +
					line.content.substring(nextWordCharIndex);
				line.content = newContent;
			}
		}
	};

	forwardDelete = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		let line = this.content[lineIndex];

		// Check for selection and delete
		if (this.selection.isSelection()) {
			this.selection.deleteSelection(this.content, this.cursor);
		}

		// Attempt to delete a tab forward first
		const originalContent = line.content;
		this.deleteTabForward();
		// If the content has changed, a tab was deleted, and we don't need to do anything further
		if (line.content !== originalContent) {
			return;
		}

		// If no tab was deleted, proceed with the original forward delete logic
		if (charIndex < line.content.length) {
			// Delete character immediately after the cursor in the current line
			let newContent =
				line.content.substring(0, charIndex) +
				line.content.substring(charIndex + 1);
			line.content = newContent;
		} else if (lineIndex < this.content.length - 1) {
			// If at the end of a line, merge this line with the next line
			let nextLine = this.content[lineIndex + 1];
			line.content += nextLine.content;
			this.content.splice(lineIndex + 1, 1); // Remove the next line

			// Update line numbers for all lines following the merged line
			for (let i = lineIndex + 1; i < this.content.length; i++) {
				this.content[i].number = i + 1;
			}
		}
	};

	deleteTabAtStart = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		if (lineIndex < 0) return; // Ensure valid line index

		let line = this.content[lineIndex];

		// Check for 4 spaces or a tab character at the start of the line
		if (line.content.startsWith("    ")) {
			// Delete 4 spaces at the start
			line.content = line.content.substring(4);
			for (let i = 0; i < 4; i++) {
				this.cursor.moveLeft(this.content);
			}
		}
	};

	deleteTab = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		if (lineIndex < 0 || charIndex < 4) return; // Ensure there's enough space for a tab and valid line index

		let line = this.content[lineIndex];

		// Check for 4 spaces before the cursor
		if (line.content.substring(charIndex - 4, charIndex) === "    ") {
			// Delete 4 spaces
			line.content =
				line.content.substring(0, charIndex - 4) +
				line.content.substring(charIndex);
			// Move cursor left by 4 for manual tab (4 spaces)
			for (let i = 0; i < 4; i++) {
				this.cursor.moveLeft(this.content);
			}
		}
	};

	deleteTabForward = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		let line = this.content[lineIndex];

		// Check for 4 spaces or a tab character immediately after the cursor
		if (line.content.substring(charIndex, charIndex + 4) === "    ") {
			// Delete 4 spaces
			line.content =
				line.content.substring(0, charIndex) +
				line.content.substring(charIndex + 4);
		} else if (line.content.charAt(charIndex) === "\t") {
			// Delete a tab character
			line.content =
				line.content.substring(0, charIndex) +
				line.content.substring(charIndex + 1);
		}
	};

	deleteCharacter = (): void => {
		const cursorPos = this.cursor.getPosition();

		// Check for selection and delete
		// Check for selection and delete
		if (this.selection.isSelection()) {
			this.selection.deleteSelection(this.content, this.cursor);
		} else {
			if (cursorPos.character > 0 || cursorPos.line > 0) {
				const lineIndex = cursorPos.line;
				const charIndex = cursorPos.character;
				let line = this.content[lineIndex];

				if (charIndex > 0) {
					// Attempt to delete a tab first
					this.deleteTab();
					// If no tab was deleted, delete a single character
					if (this.cursor.getPosition().character === charIndex) {
						line.content =
							line.content.substring(0, charIndex - 1) +
							line.content.substring(charIndex);
						this.cursor.moveLeft(this.content);
					}
				} else if (lineIndex > 0) {
					// Handle line merging for deletion at the beginning of a line
					let prevLine = this.content[lineIndex - 1];
					let currentLine = this.content[lineIndex];
					prevLine.content += currentLine.content;
					this.content.splice(lineIndex, 1); // Remove the current line
					this.cursor.setPosition(
						this.getTotalLines(),
						this.content,
						prevLine.content.length,
						lineIndex - 1,
					);
				}
			}
		}
	};

	getTotalLines = (): number => {
		return this.content.length;
	};

	// Cursor

	cursorIsAtBeginningOfLine = (): boolean => {
		return this.cursor.isAtBeginningOfLine();
	};

	cursorIsAtEndOfLine = (): boolean => {
		return this.cursor.isAtEndofLine(
			this.content[this.cursor.getPosition().line].content.length,
		);
	};

	getCursorLine = (): number => {
		return this.cursor.getPosition().line;
	};

	cursorIsAtBeginningOfDocument = (): boolean => {
		return this.cursor.isAtBeginningOfDocument();
	};

	moveCursorUp = (): void => {
		this.cursor.moveUp(this.content);
	};

	moveCursorDown = (): void => {
		this.cursor.moveDown(this.content, this.getTotalLines());
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

	moveCursorToNextWord = (): void => {
		this.cursor.moveToNextWord(this.getTotalLines(), this.content);
	};

	moveCursorToPreviousWord = (): void => {
		this.cursor.moveToPreviousWord(this.getTotalLines(), this.content);
	};

	moveCursor = (character: number, line: number, basis?: number) => {
		this.cursor.setPosition(
			this.getTotalLines(),
			this.content,
			character,
			line,
			basis,
		);
	};

	// Selection

	getSelection = (): Selection => {
		return this.selection;
	};
}
