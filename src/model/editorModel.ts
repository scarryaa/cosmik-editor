export class EditorModel {
	private document: string[];
	private cursorPosition: { line: number; char: number };
	private history: string[][];
	private historyIndex: number;

	constructor(props: { initialContent: string }) {
		this.document = props.initialContent.split("\n") || [""];
		this.cursorPosition = { line: 0, char: 0 };
		this.history = [this.document.slice()];
		this.historyIndex = 0;
	}

	insert(char: string) {
		// Handle new line
		if (char === "\n") {
			this.cursorPosition.line++;
			this.cursorPosition.char = 0;
			this.document.push("");
			this.history.push(this.document.slice());
		} else {
			const { line, char: charPos } = this.cursorPosition;
			const currentLine = this.document[line];
			const newLine =
				currentLine.slice(0, charPos) + char + currentLine.slice(charPos);
			this.document[line] = newLine;
			this.moveCursorX(1);
			this.recordHistory();
		}
	}

	delete() {
		const { line, char: charPos } = this.cursorPosition;

		if (charPos === 0) {
			if (line === 0) return;
			// Handle line merging on delete at the beginning of a line
			this.moveCursorY(-1);
			this.cursorPosition.char = this.document[line - 1].length;
			this.document[line - 1] += this.document[line];
			this.document.splice(line, 1);
		} else {
			const currentLine = this.document[line];
			const newLine =
				currentLine.slice(0, charPos - 1) + currentLine.slice(charPos);
			this.document[line] = newLine;
			this.moveCursorX(-1);
		}
		this.recordHistory();
	}

	moveCursorX(offset: number) {
		// Calculate the new cursor position
		const newCharPosition = this.cursorPosition.char + offset;

		// Ensure the cursor does not move out of bounds to the left
		if (newCharPosition >= 0 && offset < 0) {
			this.cursorPosition.char = newCharPosition;
		}
		// Ensure the cursor does not move out of bounds to the right
		else if (
			newCharPosition <= this.document[this.cursorPosition.line].length &&
			offset > 0
		) {
			this.cursorPosition.char = newCharPosition;
		}
	}

	moveCursorY(offset: number) {
		// Ensure the cursor does not move above the first line
		if (offset < 0 && this.cursorPosition.line > 0) {
			this.cursorPosition.line += offset;
		}
		// Ensure the cursor does not move below the last line
		else if (
			offset > 0 &&
			this.cursorPosition.line < this.document.length - 1
		) {
			this.cursorPosition.line += offset;
		}
	}

	setCursorPosition(opts: { xPosition: number; yPosition: number }) {
        this.cursorPosition.char = opts.xPosition;
        this.cursorPosition.line = opts.yPosition;
    }

	recordHistory() {
		this.history.push(this.document.slice());
		this.historyIndex++;
	}

	public getContent(): string {
		return this.document.join("\n");
	}

	public getCursorPosition(): { line: number; char: number } {
		return this.cursorPosition;
	}
}
