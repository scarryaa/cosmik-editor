import { PieceTable } from "./PieceTable.svelte";

export class Editor {
	content: PieceTable = $state(new PieceTable(""));
	cursor: {
		line: number;
		column: number;
	} = $state({
		line: 0,
		column: 0,
	});
	lineBreakIndices: number[] = $state([]);

	constructor(text: string) {
		this.content = new PieceTable(text);
		this.cursor = {
			line: 0,
			column: 0,
		};
		this.lineBreakIndices = this.calculateLineBreaks();
	}

	private calculateLineBreaks(): number[] {
		let indices = [];
		let text = this.content.getText();
		let position = text.indexOf("\n");
	
		while (position !== -1) {
			indices.push(position);
			position = text.indexOf("\n", position + 1);
		}
	
		// add a final line break index if the last character is not a newline
		if (text.length > 0 && text[text.length - 1] !== '\n') {
			indices.push(text.length);
		}
	
		return indices;
	}
	

	getLineContent(lineNumber: number): string {
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
	}

	addLine(): void {
		// Calculate the global index from the cursor's line and column
		const globalIndex = this.calculateGlobalIndex(
			this.cursor.line,
			this.cursor.column,
		);
		this.content.insert("\n", globalIndex);
		this.cursor.line += 1;
		this.cursor.column = 0;
		this.lineBreakIndices = this.calculateLineBreaks();
	}

	calculateGlobalIndex(line: number, column: number): number {
		let index = 0;
		for (let i = 0; i < line; i++) {
			index += this.getLineContent(i).length + 1;
		}
		return index + column;
	}

	add(text: string): void {
		// Calculate the global index from the cursor's line and column
		const globalIndex = this.calculateGlobalIndex(
			this.cursor.line,
			this.cursor.column,
		);

		this.content.insert(text, globalIndex);
		this.cursor.column += text.length;

		this.lineBreakIndices = this.calculateLineBreaks();

		if (text.includes("\n")) {
			const linesAdded = text.split("\n").length - 1;
			this.cursor.line += linesAdded;
			this.cursor.column = text.length - text.lastIndexOf("\n") - 1;
		}
	}

	backspace(): void {
		const globalIndex = this.calculateGlobalIndex(
			this.cursor.line,
			this.cursor.column,
		);
		const currentTextLength = this.content.getText().length;
		if (currentTextLength > 0 && this.cursor.column > 0) {
			// Decrement cursor position
			this.cursor.column -= 1;

			this.content.delete(globalIndex - 1, 1);
		}
		this.lineBreakIndices = this.calculateLineBreaks();
	}

	moveRight(): void {
		if (this.cursor.line < this.lineBreakIndices.length) {
			// There are more lines, so just move right normally
			if (this.cursor.column < this.getLineContent(this.cursor.line).length) {
				this.cursor.column += 1;
			}
		} else {
			if (
				this.cursor.column <
				this.getLineContent(this.cursor.line).length
			) {
				this.cursor.column += 1;
			}
		}
	}

	moveLeft(): void {
		if (this.cursor.column > 0) {
			this.cursor.column -= 1;
		}
	}

	moveUp(): void {
		this.cursor.line -= 1;
	}

	moveDown(): void {
		if (this.cursor.line < this.lineBreakIndices.length) this.cursor.line += 1;
	}
}
