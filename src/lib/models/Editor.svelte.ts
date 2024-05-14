import { Cursor } from "./Cursor.svelte";
import { PieceTable } from "./PieceTable.svelte";

export class Editor {
	content: PieceTable = $state(new PieceTable(""));
	cursors: Cursor[] = $state([]);
	lineBreakIndices: number[] = $state([]);

	constructor(text: string) {
		this.content = new PieceTable(text);
		this.cursors.push(new Cursor(0, 0));
		this.lineBreakIndices = this.calculateLineBreaks();

		console.log(this.cursors);
	}

	private calculateLineBreaks = (): number[] => {
		let indices = [];
		let text = this.content.getText();
		let position = text.indexOf("\n");
	
		while (position !== -1) {
			indices.push(position);
			position = text.indexOf("\n", position + 1);
		}
	
		// Handle case where last line has text followed by a newline
		if (text.length > 0 && text[text.length - 1] !== '\n') {
			indices.push(text.length);
		}

		// Explicitly add an extra line if the text ends with a newline
		if (text.endsWith('\n')) {
			indices.push(text.length);
		}
	
		return indices;
	};
	
	

	getLineContent = (lineNumber: number): string => {
		if (
			lineNumber < 0 ||
			(this.lineBreakIndices.length > 0 &&
				lineNumber >= this.lineBreakIndices.length)
		) {
			throw new Error(`Line number ${lineNumber} out of bounds`);
		}

		const startIndex =
			lineNumber === 0 ? 0 : this.lineBreakIndices[lineNumber - 1] + 1;
		const endIndex =
			lineNumber < this.lineBreakIndices.length
				? this.lineBreakIndices[lineNumber]
				: this.content.getText().length;

		return this.content.extractText(startIndex, endIndex);
	};

	addLine = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.column);
		this.content.insert("\n", globalIndex);
		cursor.line += 1;
		cursor.column = 0;
		this.lineBreakIndices = this.calculateLineBreaks();
	};

	calculateGlobalIndex = (line: number, column: number): number => {
		let index = 0;
		for (let i = 0; i < line; i++) {
			index += this.getLineContent(i).length + 1;
		}
		return index + column;
	};

	add = (text: string, cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.column);

		this.content.insert(text, globalIndex);
		cursor.column += text.length;

		this.lineBreakIndices = this.calculateLineBreaks();

		if (text.includes("\n")) {
			const linesAdded = text.split("\n").length - 1;
			cursor.line += linesAdded;
			cursor.column = text.length - text.lastIndexOf("\n") - 1;
		}
	};

	backspace = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.column);
		const currentTextLength = this.content.getText().length;
	
		if (currentTextLength > 0) {
			if (cursor.column === 0 && cursor.line > 0) {
				// Move cursor to the end of the previous line
				
				// Delete the newline character between the current line and the previous line
				this.content.delete(this.calculateGlobalIndex(cursor.line, cursor.column) - 1, 1);
				cursor.moveTo(cursor.line - 1, this.getLineContent(cursor.line - 1).length);
			} else if (cursor.column > 0) {
				// Decrement cursor position normally and delete one character
				cursor.column -= 1;
				this.content.delete(globalIndex - 1, 1);
			}
		}
		this.lineBreakIndices = this.calculateLineBreaks();
	};
	

	moveRight = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const lineLength = this.getLineContent(cursor.line).length;
		const totalLines = this.lineBreakIndices.length;

		cursor.moveRight(lineLength, totalLines);
	};

	moveLeft = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];

		const prevLineLength = this.getLineContent(
			cursor.line === 0 ? 0 : cursor.line - 1,
		).length;
		cursor.moveLeft(prevLineLength);
	};

	moveUp = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		cursor.moveUp();
	};

	moveDown = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const totalLines = this.lineBreakIndices.length;
		const nextLineLength = this.getLineContent(cursor.line).length;

		cursor.moveDown(totalLines, nextLineLength);
	};

	addCursor = (line: number, column: number): void => {
		this.cursors.push(new Cursor(line, column));
	};

	removeCursor = (cursorIndex: number): void => {
		// Ensure there's always at least one cursor
		if (this.cursors.length > 1) {
			this.cursors.splice(cursorIndex, 1);
		}
	};
}
