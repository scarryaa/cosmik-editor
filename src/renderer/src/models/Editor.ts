import { batch, createSignal } from "solid-js";
import { Cursor } from "./Cursor";
import { PieceTable } from "./PieceTable";
import { Selection } from "./Selection";

export interface IEditor {
	content: PieceTable;
	lineBreakIndices: number[];
	id: string;
}

export class Editor implements IEditor {
	content: PieceTable;
	lineBreakIndices: number[];
	id: string;
	tabId: string | null = null;

	private contentSignal;
	private selectionSignal = createSignal<Selection[]>([]);
	private cursorsSignal = createSignal<Cursor[]>([]);
	private lineNumbersSignal = createSignal<number>(1);

	constructor(text: string, id: string) {
		this.content = new PieceTable(text);
		this.lineBreakIndices = [0];
		this.id = id;

		this.contentSignal = createSignal(this.content.getText());
		this.cursorsSignal[1]([new Cursor()]);

		this.selectionSignal[1]([
			new Selection(this.content, -100, -100, -100, -100),
		]);
	}

	deleteSelectionIfNeeded = (): void => {
		if (!this.selectionSignal[0]()[0].isEmpty()) {
			this.deleteSelection(0);
		}
	};

	setPieceTable = (pieceTable: PieceTable): void => {
		this.content = pieceTable;
		this.contentSignal[1](this.content.getText());

		this.lineBreakIndices = this.calculateLineBreaks();
		this.lineNumbersSignal[1](this.lineBreakIndices.length);
		this.cursorAt(0).moveTo(0, 0, this.lineLength(0), this.totalLines());
	};

	setContent = (text: string): void => {
		const newText = this.convertTabsToSpaces(text);
		this.content.restoreText(newText);
		this.contentSignal[1](this.content.getText());
		this.lineNumbersSignal[1](this.calculateLineBreaks().length);
		this.lineBreakIndices = this.calculateLineBreaks();
	};

	convertTabsToSpaces = (text: string): string => {
		return text.replace(/\t/g, "    ");
	};

	calculateLineBreaks = (): number[] => {
		let indices: number[] = [];
		let text = this.content.getText();
		let position = text.indexOf("\n");

		while (position !== -1) {
			indices.push(position);
			position = text.indexOf("\n", position + 1);
		}

		// Handle case where last line has text followed by a newline
		if (text.length > 0 && text[text.length - 1] !== "\n") {
			indices.push(text.length);
		}

		// Explicitly add an extra line if the text ends with a newline
		if (text.endsWith("\n")) {
			indices.push(text.length);
		}

		return indices;
	};

	getText(): string {
		return this.contentSignal[0]();
	}

	tab = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const globalIndex = this.calculateGlobalIndex(
			cursor.line,
			this.cursorAt(0).character,
		);

		this.deleteSelectionIfNeeded();

		this.content.insert("    ", globalIndex);
		this.contentSignal[1](this.content.getText());
		this.lineBreakIndices = this.calculateLineBreaks();

		cursor.moveTo(
			cursor.character + 4,
			cursor.line,
			this.lineContent(cursor.line).length,
			this.lineBreakIndices.length - 1,
		);
	};

	insert = (text: string, cursorIndex: number): void => {
		const cursor = this.cursorsSignal[0]()[cursorIndex];
		const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.character);
	
		batch(() => {
			this.deleteSelectionIfNeeded();
			this.content.insert(text, globalIndex);
			this.contentSignal[1](this.content.getText());
			this.lineBreakIndices = this.calculateLineBreaks();
			this.lineNumbersSignal[1](this.lineBreakIndices.length);
	
			const selections = this.selectionSignal[0]();
			selections[0].reset();
			this.selectionSignal[1](selections);
	
			cursor.character += text.length;
			this.cursorsSignal[1](this.cursorsSignal[0]());
		});
	}
	

	deleteSelection = (selectionIndex: number): void => {
		const globalIndexStart = this.calculateGlobalIndex(
			this.selections[selectionIndex].startLine,
			this.selections[selectionIndex].startIndex,
		);

		const globalIndexEnd = this.calculateGlobalIndex(
			this.selections[selectionIndex].endLine,
			this.selections[selectionIndex].endIndex,
		);

		this.content.delete(globalIndexStart, globalIndexEnd - globalIndexStart);

		// Set cursor to start of selection
		this.cursorAt(0).moveTo(
			this.selections[selectionIndex].startIndex,
			this.selections[selectionIndex].startLine,
			this.lineContent(this.selections[selectionIndex].startLine).length,
			this.lineBreakIndices.length - 1,
		);

		// Deselect
		this.selections[0].reset();

		// Update content and line breaks
		this.contentSignal[1](this.content.getText());
		this.lineBreakIndices = this.calculateLineBreaks();
		this.lineNumbersSignal[1](this.lineBreakIndices.length);
	};

	delete = (cursorIndex: number): void => {
		if (this.selections[0].isEmpty()) {
			const cursor = this.cursors[cursorIndex];
			const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.character);
			const currentTextLength = this.content.getText().length;
	
			if (currentTextLength > 0) {
				if (cursor.character === 0 && cursor.line > 0) {
					const prevLineLength = this.lineContent(cursor.line - 1).length;
	
					this.content.delete(globalIndex - 1, 1); // Delete the line break
					this.lineBreakIndices = this.calculateLineBreaks();
					this.contentSignal[1](this.content.getText());
					this.lineNumbersSignal[1](this.lineBreakIndices.length);
	
					const newChar = prevLineLength; // Cursor goes to end of previous line
					cursor.moveTo(newChar, cursor.line - 1, newChar, this.lineBreakIndices.length - 1);
				} else if (cursor.character > 0) {
					// Delete character before cursor in the middle of a line
					this.content.delete(globalIndex - 1, 1);
					cursor.moveLeft(this.lineContent(cursor.line).length);
					this.lineBreakIndices = this.calculateLineBreaks();
					this.contentSignal[1](this.content.getText());
				} else if (cursor.character === 0 && cursor.line === 0) {
					return;
				}
			}
		} else {
			this.deleteSelectionIfNeeded();
		}
	};
	
	
	length(): number {
		return this.content.length() ?? 0;
	}

	numberOfLines(): number {
		return this.lineBreakIndices.length;
	}

	text(): string {
		return this.content.getText();
	}

	totalLines = (): number => {
		return this.lineNumbersSignal[0]();
	};

	lineLength = (lineNumber: number): number => {
		return this.lineContent(lineNumber).length;
	};

	lineContent = (lineNumber: number): string => {
		// Return an empty string if the line number is out of valid range
		if (lineNumber < 0 || lineNumber >= this.numberOfLines()) {
			return "";
		}

		// Start at the previous index if lineNumber is not 0
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
		const currentLine = cursor.line;
		const currentChar = cursor.character;
		const globalIndex = this.calculateGlobalIndex(currentLine, currentChar);
	
		this.deleteSelectionIfNeeded();
		this.content.insert("\n", globalIndex);
		this.contentSignal[1](this.content.getText());
	
		this.lineBreakIndices = this.calculateLineBreaks();
		const totalLines = this.lineBreakIndices.length;
		this.lineNumbersSignal[1](totalLines);
	
		if (currentChar === this.lineContent(currentLine).length) {
			cursor.moveDown(totalLines - 1, 0);
		} else {
			cursor.moveDown(totalLines - 1, currentChar);
		}
	};
	

	calculateGlobalIndex = (line: number, column: number): number => {
		let index = 0;
		for (let i = 0; i < line; i++) {
			index += this.lineContent(i).length + 1;
		}
		return index + column;
	};

	// Cursor Management

	cursorAt(index: number): Cursor {
		return this.cursors[index];
	}

	get cursors() {
		return this.cursorsSignal[0]();
	}

	set cursors(newCursors: Cursor[]) {
		this.cursorsSignal[1](newCursors);
	}

	moveTo = (cursorIndex: number, character: number, line: number): void => {
		const cursor = this.cursors[cursorIndex];
		const totalLines = this.lineBreakIndices.length;
		cursor.moveTo(
			character,
			line,
			this.lineContent(cursor.line).length,
			totalLines - 1,
		);

		if (cursor.line === 0) {
			this.moveToLineStart(cursorIndex);
		} else if (cursor.line === totalLines - 1) {
			this.moveToLineEnd(cursorIndex);
		}
	};

	moveToLineStart = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		cursor.moveTo(
			0,
			cursor.line,
			this.lineContent(cursor.line).length,
			this.lineBreakIndices.length - 1,
		);
	};

	moveToLineEnd = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const lineLength = this.lineContent(cursor.line).length;

		cursor.moveTo(
			lineLength,
			cursor.line,
			lineLength,
			this.lineBreakIndices.length - 1,
		);
	};

	moveRight = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const lineLength = this.lineContent(cursor.line).length;
		const totalLines = this.lineBreakIndices.length;

		cursor.moveRight(lineLength, totalLines);
	};

	moveLeft = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];

		const prevLineLength = this.lineContent(
			cursor.line === 0 ? 0 : cursor.line - 1,
		).length;
		cursor.moveLeft(prevLineLength);
	};

	moveUp = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const prevLineLength = this.lineContent(
			cursor.line === 0 ? 0 : cursor.line - 1,
		).length;
		cursor.moveUp(prevLineLength);
	};

	moveDown = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];
		const totalLines = this.lineBreakIndices.length;
		const nextLineLength = this.lineContent(cursor.line + 1).length;

		cursor.moveDown(totalLines, nextLineLength);
	};

	addCursor(cursor: Cursor): void {
		this.cursors = [...this.cursors, cursor];
	}

	removeCursor(index: number): void {
		this.cursors = this.cursors.filter((_, i) => i !== index);
	}

	// Selection management

	addSelection(selection: Selection): void {
		this.selectionSignal[1]([...this.selectionSignal[0](), selection]);
	}

	removeSelection(index: number): void {
		this.selectionSignal[1](
			this.selectionSignal[0]().filter((_, i) => i !== index),
		);
	}

	clearSelection(index: number): void {
		this.selections[index].reset();
	}

	updateSelection(index: number, selection: Selection): void {
		const selections = this.selectionSignal[0]();
		selections[index] = selection;
		this.selectionSignal[1]([...selections]);
	}

	getSelection(index: number): Selection | undefined {
		return this.selectionSignal[0]()[index];
	}

	get selections(): Selection[] {
		return this.selectionSignal[0]();
	}

	clearSelections(): void {
		this.selectionSignal[1]([]);
	}
}
