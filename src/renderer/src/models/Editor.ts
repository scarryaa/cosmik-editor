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

		this.selectionSignal[1]([new Selection(-100, -100, -100, -100)]);
	}

	deleteSelectionIfNeeded = (): void => {
		if (!this.selectionSignal[0]()[0].isEmpty()) {
			this.deleteSelection(0);
		}
		this.selectionSignal[1]([new Selection(-100, -100, -100, -100)]);
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

		// If there are no line breaks, add one at the start of the text
		if (indices.length === 0) {
			indices.push(0);
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
		this.deleteSelectionIfNeeded();

		const cursor = this.cursorsSignal[0]()[cursorIndex];

		if (this.content.getText().length === 0) {
			cursor.moveTo(0, 0, 0, 1);
		}

		const globalIndex = this.calculateGlobalIndex(
			cursor.line,
			cursor.character,
		);

		batch(() => {
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
	};

	deleteSelection = (selectionIndex: number): void => {
		const selection = this.selections[selectionIndex];

		const globalIndexStart = this.calculateGlobalIndex(
			selection.startLine,
			selection.startIndex,
		);

		const globalIndexEnd = this.calculateGlobalIndex(
			selection.endLine,
			selection.endIndex,
		);

		batch(() => {
			this.content.delete(globalIndexStart, globalIndexEnd - globalIndexStart);

			// Reset cursor to the beginning of the document
			this.cursorAt(0).moveTo(0, 0, 1, 1);

			// Deselect
			this.selections[0].reset();

			// Update content and line breaks
			this.lineBreakIndices = this.calculateLineBreaks();
			this.contentSignal[1](this.content.getText());
			this.lineNumbersSignal[1](1);
		});
	};

	delete = (cursorIndex: number): void => {
		const cursor = this.cursors[cursorIndex];

		// Check if any text is selected
		if (this.selections.some((selection) => !selection.isEmpty())) {
			const selection = this.selections.findIndex(
				(selection) => !selection.isEmpty(),
			);
			this.deleteSelection(selection);
			return;
		}

		// Check if at beginning of document
		if (cursor.line === 0 && cursor.character === 0) {
			return;
		}

		batch(() => {
			if (cursor.character === 0) {
				const prevLineEndIndex = this.lineBreakIndices[cursor.line - 1];
				this.content.delete(prevLineEndIndex, 1);

				// Join current line with previous line
				cursor.moveTo(
					this.lineContent(cursor.line - 1).length,
					cursor.line - 1,
					this.lineLength(cursor.line - 1),
					this.lineBreakIndices.length - 1,
				);
			} else {
				const globalIndex = this.calculateGlobalIndex(
					cursor.line,
					cursor.character,
				);
				this.content.delete(globalIndex - 1, 1);
				cursor.moveLeft(this.lineContent(cursor.line).length);
			}

			// Update editor state
			this.lineBreakIndices = this.calculateLineBreaks();
			this.contentSignal[1](this.content.getText());
			this.lineNumbersSignal[1](this.lineBreakIndices.length);
		});
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
			console.warn(`Invalid line number ${lineNumber}`);
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
		let currentLine = cursor.line;
		let currentChar = cursor.character;

		batch(() => {
			if (!this.selections[0].isEmpty()) {
				this.deleteSelection(0);
				// Update the cursor position after deleting the selection
				currentLine = this.cursors[0].line;
				currentChar = this.cursors[0].character;
			}

			const globalIndex = this.calculateGlobalIndex(currentLine, currentChar);

			this.content.insert("\n", globalIndex);
			this.lineBreakIndices = this.calculateLineBreaks();
			this.contentSignal[1](this.content.getText());
			this.lineNumbersSignal[1](this.lineBreakIndices.length);

			// Adjust cursor position
			const newLine = currentLine + 1;
			cursor.moveTo(0, newLine, 0, this.lineBreakIndices.length - 1);
		});
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

	moveTo = (character: number, line: number, cursorIndex = 0): void => {
		const cursor = this.cursors[cursorIndex];
		const totalLines = this.lineBreakIndices.length;

		cursor.moveTo(
			character,
			line,
			this.lineContent(cursor.line).length,
			totalLines - 1,
		);

		// Ensure cursor stays within line bounds
		if (cursor.line === 0) {
			this.moveToLineStart(cursorIndex); // Ensure it's not before line start
		} else if (cursor.line === totalLines - 1) {
			this.moveToLineEnd(cursorIndex); // Ensure it's not past line end
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

	copy = (): string => {
		const selection = this.selections.find((selection) => !selection.isEmpty());

		if (selection && !selection?.isEmpty()) {
			const text = this.content.getText();
			const startIndex = this.calculateGlobalIndex(
				selection!.startLine,
				selection!.startIndex,
			);
			const endIndex = this.calculateGlobalIndex(
				selection!.endLine,
				selection!.endIndex,
			);
			return text.substring(startIndex, endIndex);
		}

		return this.lineContent(this.cursors[0].line);
	};

	cut(): string {
		const selection = this.selections.find((selection) => !selection.isEmpty());
		const textToCut =
			selection && !selection.isEmpty()
				? this.content
						.getText()
						.substring(
							this.calculateGlobalIndex(
								selection.startLine,
								selection.startIndex,
							),
							this.calculateGlobalIndex(selection.endLine, selection.endIndex),
						)
				: this.lineContent(this.cursors[0].line);

		// Delete the text being cut
		const startIndex = this.calculateGlobalIndex(
			selection?.startLine ?? this.cursors[0].line,
			selection?.startIndex ?? this.cursors[0].character,
		);
		this.content.delete(startIndex, textToCut.length);

		// Update editor state
		this.lineBreakIndices = this.calculateLineBreaks();
		const totalLines = this.lineBreakIndices.length;

		batch(() => {
			this.contentSignal[1](this.content.getText());
			this.lineNumbersSignal[1](totalLines);
		});

		// Reset cursor position
		if (selection) {
			this.cursors[0].line = selection.startLine;
			this.cursors[0].character = selection.startIndex;
		} else {
			this.cursors[0].character = 0;
		}

		return textToCut;
	}

	paste = (text: string): void => {
		this.deleteSelectionIfNeeded();
		const initialLine = this.cursors[0].line;
		const initialChar = this.cursors[0].character;

		// Check if the cursor is at the end of the line
		const isAtLineEnd =
			initialChar === this.lineLength(initialLine) && initialChar !== 0;

		const index = this.calculateGlobalIndex(initialLine, initialChar);

		// Adjust insertion index if at the end of a line
		this.content.insert(
			this.convertTabsToSpaces(text),
			isAtLineEnd ? index + 1 : index,
		);

		this.lineBreakIndices = this.calculateLineBreaks();
		const totalLines = this.lineBreakIndices.length;

		batch(() => {
			this.contentSignal[1](this.content.getText());
			this.lineNumbersSignal[1](totalLines);

			const pastedLines = text.split("\n").length;
			const linesAdded = pastedLines - 1;

			// Update cursor position based on pasted lines
			this.cursorAt(0).line =
				linesAdded > 0 ? initialLine + linesAdded : initialLine;

			this.cursorAt(0).character =
				linesAdded > 0
					? text.split("\n")[linesAdded].length
					: initialChar + text.length;
		});
	};

	selectAll = (): void => {
		this.selectionSignal[1]([
			new Selection(0, this.length(), 0, this.totalLines()),
		]);
	};

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
