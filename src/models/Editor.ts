import { findNextWordOrSymbol, findPreviousWordOrSymbol } from "../util/text";
import { Cursor, type CursorPosition } from "./Cursor";
import { Line } from "./Line";
import { Selection } from "./Selection";

export type Content = Line[];

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
		return content
			.split("\n")
			.map((lineContent, index) => new Line(lineContent, index + 1));
	};

	private resetContent = (): void => {
		this.content = Array.from(Editor.EDITOR_DEFAULT_CONTENT).map(
			(line, index) => {
				return new Line(line, index + 1);
			},
		);
	};

	private convertTabsToSpaces = (): void => {
		const tabSize = 4;
		this.content = this.content.map((line) => {
			const updatedLineContent = line
				.getContent()
				.replace(/\t/g, " ".repeat(tabSize));
			line.setContent(updatedLineContent);
			return line;
		});
	};

	private convertSpacesToTabs = (content: Content): Content => {
		const spaceGroup = " ".repeat(4);
		return content.map((line) => {
			const updatedLineContent = line
				.getContent()
				.replace(new RegExp(spaceGroup, "g"), "\t");
			line.setContent(updatedLineContent);
			return line;
		});
	};

	private insertTextAtCursor = (text: string): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		const lines = text.split("\n");

		// Insert the first line of text at the cursor position
		let line = this.content[lineIndex];
		let newContent =
			line.getContent().substring(0, charIndex) +
			lines[0] +
			line.getContent().substring(charIndex);
		line.setContent(newContent);

		// Insert any additional lines as new lines in the content
		for (let i = 1; i < lines.length; i++) {
			this.content.splice(
				lineIndex + i,
				0,
				new Line(lines[i], lineIndex + i + 1),
			);
		}

		// Update line numbers for all lines following the inserted text
		for (let i = lineIndex + lines.length; i < this.content.length; i++) {
			this.content[i].setLineNumber(i + 1);
		}

		// Move the cursor to the end of the inserted text
		if (lines.length > 1) {
			// If multiple lines were inserted, move the cursor to the beginning of the last inserted line
			this.cursor.setPosition(
				this.getTotalLines(),
				this.content,
				0,
				lineIndex + lines.length - 1,
			);
		} else {
			// If only one line was inserted, move the cursor to the end of the inserted text
			this.cursor.setPosition(
				this.getTotalLines(),
				this.content,
				charIndex + lines[0].length,
				lineIndex,
			);
		}

		this.convertTabsToSpaces();
	};

	private copySelection = async (): Promise<string> => {
		const toTabs = this.convertSpacesToTabs(this.content);
		return this.selection.copy(toTabs);
	};

	private copyCurrentLine = async (): Promise<string> => {
		const cursorPositon = this.cursor.getPosition();
		const contentToCopy = this.content[cursorPositon.line].getContent();
		return contentToCopy;
	};

	private parsePastedText = (text: string): string[] => {
		return text.split("\n");
	};

	private pasteInternal = async (text: string) => {
		if (this.selection.isSelection()) {
			this.selection.deleteSelection(this.content, this.cursor);
		}
		try {
			this.insertTextAtCursor(text);
		} catch (err) {
			console.error("Failed to paste content: ", err);
		}
	};

	clearCurrentLine = (): void => {
		this.content[this.cursor.getPosition().line].clearLine();
	};

	setContent = (content: string): void => {
		this.content = this.parseInitialContent(content);
	};

	getContent = (): Content => {
		return this.content;
	};

	getContentString = (): string => {
		return this.content.map((line) => line.getContent()).join("\n");
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
			const beforeCursor = line.getContent().substring(0, charIndex);
			const afterCursor = line.getContent().substring(charIndex);

			// Update the current line with the content before the cursor
			line.setContent(beforeCursor);

			// Create a new line with the content after the cursor
			const newLine = new Line(afterCursor, lineIndex + 2);

			// Insert the new line into the content array
			this.content.splice(lineIndex + 1, 0, newLine);

			// Update line numbers for all lines following the new line
			for (let i = lineIndex + 2; i < this.content.length; i++) {
				this.content[i].setLineNumber(i + 1);
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
				line.getContent().substring(0, charIndex) +
				char +
				line.getContent().substring(charIndex);
			line.setContent(newContent);

			// Move the cursor to the right
			this.cursor.moveRight(this.content);
		}
	};

	isLineSelected = (lineNumber: number): boolean => {
		// Check if there's an active selection
		if (!this.selection.isSelection()) {
			return false;
		}

		// Get the start and end positions of the selection
		const { start, end } = this.selection.getSelectionRange();

		// Check if the line number is within the selection range
		return lineNumber >= start.line && lineNumber <= end.line;
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
					line.getContent().substring(0, lastWordCharIndex) +
					line.getContent().substring(currentCharIndex);
				line.setContent(newContent);

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
					line.getContent().substring(0, currentCharIndex) +
					line.getContent().substring(nextWordCharIndex);
				line.setContent(newContent);
			}
		}
	};

	forwardDelete = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		const charIndex = cursorPos.character;
		let line = this.content[lineIndex];
		let nextLine = this.content[lineIndex + 1];

		// Check for selection and delete
		if (this.selection.isSelection()) {
			this.selection.deleteSelection(this.content, this.cursor);
		}

		// Attempt to delete a tab forward first
		const originalContent = line.getContent();
		this.deleteTabForward();
		// If the content has changed, a tab was deleted, and we don't need to do anything further
		if (line.getContent() !== originalContent) {
			return;
		}

		// If no tab was deleted, proceed with the original forward delete logic
		if (charIndex < line.getContent().length) {
			// Delete character immediately after the cursor in the current line
			let newContent =
				line.getContent().substring(0, charIndex) +
				line.getContent().substring(charIndex + 1);
			line.setContent(newContent);
		} else if (lineIndex < this.content.length - 1) {
			// If at the end of a line, merge this line with the next line
			let currentLineContent = line.getContent();
			let nextLineContent = nextLine.getContent();

			// Merge the content of the current line with the next line
			line.setContent(currentLineContent + nextLineContent);

			// Now, you need to remove the next line from the content array
			this.content.splice(lineIndex + 1, 1);

			// Update line numbers for all lines following the merged line
			for (let i = lineIndex + 1; i < this.content.length; i++) {
				this.content[i].setLineNumber(i + 1);
			}
		}
	};

	deleteTabAtStart = (): void => {
		const cursorPos = this.cursor.getPosition();
		const lineIndex = cursorPos.line;
		if (lineIndex < 0) return; // Ensure valid line index

		let line = this.content[lineIndex];

		// Check for 4 spaces or a tab character at the start of the line
		if (line.getContent().startsWith("    ")) {
			// Delete 4 spaces at the start
			line.setContent(line.getContent().substring(4));
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
		if (line.getContent().substring(charIndex - 4, charIndex) === "    ") {
			// Delete 4 spaces
			line.setContent(
				line.getContent().substring(0, charIndex - 4) +
					line.getContent().substring(charIndex),
			);
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
		if (line.getContent().substring(charIndex, charIndex + 4) === "    ") {
			// Delete 4 spaces
			line.setContent(
				line.getContent().substring(0, charIndex) +
					line.getContent().substring(charIndex + 4),
			);
		} else if (line.getContent().charAt(charIndex) === "\t") {
			// Delete a tab character
			line.setContent(
				line.getContent().substring(0, charIndex) +
					line.getContent().substring(charIndex + 1),
			);
		}
	};

	copy = async (): Promise<string> => {
		// Copy selection or the current line
		if (this.selection.isSelection()) {
			return this.copySelection();
		}

		return this.copyCurrentLine();
	};

	paste = async (text: string): Promise<void> => {
		await this.pasteInternal(text);
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
						line.setContent(
							line.getContent().substring(0, charIndex - 1) +
								line.getContent().substring(charIndex),
						);
						this.cursor.moveLeft(this.content);
					}
				} else if (lineIndex > 0) {
					// Handle line merging for deletion at the beginning of a line
					let prevLine = this.content[lineIndex - 1].getContent();
					let currentLine = this.content[lineIndex];
					prevLine += currentLine.getContent();
					this.content.splice(lineIndex, 1); // Remove the current line
					this.cursor.setPosition(
						this.getTotalLines(),
						this.content,
						prevLine.length,
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
			this.content[this.cursor.getPosition().line].getContent().length,
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
