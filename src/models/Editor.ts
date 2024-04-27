import { Cursor } from "./Cursor";

export class Editor {
	lines: Array<{ number: number; content: string }>;
	cursor: Cursor;
	private static EDITOR_DEFAULT_CONTENT =
		'<div data-line-number="1"><br></div>';

	constructor(initialContent: string) {
		this.lines = this.parseInitialContent(initialContent);
		this.cursor = new Cursor();
	}

	resetContent(): void {
		this.lines = Array.from(Editor.EDITOR_DEFAULT_CONTENT).map(
			(line, index) => {
				return {
					number: index + 1,
					content: line,
				};
			},
		);
	}

	parseInitialContent(
		content: string,
	): Array<{ number: number; content: string }> {
		return content.split("\n").map((lineContent, index) => ({
			number: index + 1,
			content: lineContent,
		}));
	}

	addLine(index: number, content = "") {
		const newLine = { number: this.lines.length + 1, content };
		this.lines.splice(index, 0, newLine);
		this.updateLineNumbers();
		this.cursor.moveCursor({
			cursorCharacter: 0,
			cursorLine: this.cursor.position.cursorLine + 1,
		});
	}

	insertCharacter(char: string, cursorLine: number, cursorCharacter: number) {
		// Check if the specified line exists
		if (this.lines.length >= cursorLine) {
			// Get the current content of the line
			let lineContent = this.lines[cursorLine - 1].content;
			// Insert the character at the specified character position
			lineContent =
				lineContent.substring(0, cursorCharacter) +
				char +
				lineContent.substring(cursorCharacter);
			// Update the line content
			this.lines[cursorLine - 1].content = lineContent;
			// Move the cursor forward by one character
			this.cursor.shiftCursor(this.getNumberOfLines(), { deltaChar: 1 });
		}
	}

	deleteCharacter(cursorLine: number, cursorCharacter: number) {
		if (cursorCharacter > 0) {
			// Case where the cursor is not at the beginning of a line
			const line = this.lines[cursorLine - 1];
			line.content =
				line.content.substring(0, cursorCharacter - 1) +
				line.content.substring(cursorCharacter);
			this.cursor.shiftCursor(this.getNumberOfLines(), { deltaChar: -1 }); // Move cursor back by one character
		} else if (cursorLine > 1) {
			// Case where the cursor is at the beginning of a line and not the first line
			const currentLineContent = this.lines[cursorLine - 1].content;
			const previousLineLength = this.lines[cursorLine - 2].content.length;

			// Merge content with previous line
			this.lines[cursorLine - 2].content += currentLineContent;
			// Remove the current line
			this.removeLine(cursorLine - 1);
			// Move cursor to the end of the previous line
			this.cursor.moveCursor({
				cursorLine: cursorLine - 1,
				cursorCharacter: previousLineLength,
			});
		}
	}

	removeLine(index: number) {
		if (this.lines.length > 1) {
			this.lines.splice(index, 1);
			this.updateLineNumbers();
		}
		this.cursor.shiftCursor(this.getNumberOfLines(), { deltaLine: -1 });
	}

	lineExists(lineNumber: number): boolean {
		return Boolean(this.lines[lineNumber - 1]);
	}

	updateLineNumbers() {
		this.lines.forEach((line, index) => {
			line.number = index + 1;
		});
	}

	getNumberOfLines() {
		return this.lines.length - 1;
	}

	getLineLength(lineNumber: number) {
		return this.lines[lineNumber].content.length;
	}

	// Method to convert the model to HTML for rendering
	toHTML() {
		return this.lines
			.map(
				(line) =>
					`<div data-line-number="${line.number}">${
						line.content || "<br>"
					}</div>`,
			)
			.join("");
	}
}
