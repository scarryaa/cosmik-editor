import { EventEmitter } from "../event-emitter/eventEmitter";
import type { CursorPosition } from "../hooks/useCursorManagement";
import {
	Selection,
	SelectionDirection,
	SelectionEvents,
	type UpdateSelectionOptions,
} from "./selectionModel";

export class EditorModel extends EventEmitter {
	private document: string[];
	private cursorPosition: { line: number; char: number };
	private history: string[][];
	private historyIndex: number;
	private numberOfLines: number;
	private selection: Selection;

	private onSelectionChanged: (newSelection: Selection) => void;

	constructor(props: { initialContent: string }) {
		super();
		this.document = props.initialContent.split("\n") || [""];
		this.cursorPosition = { line: 0, char: 0 };
		this.history = [this.document.slice()];
		this.historyIndex = 0;
		this.numberOfLines = 0;
		this.selection = Selection.empty();

		this.onSelectionChanged = (newSelection: Selection) => {
			this.selection.content = newSelection.content;
			this.selection.startLine = newSelection.startLine;
			this.selection.endLine = newSelection.endLine;
			this.selection.selectionStart = newSelection.selectionStart;
			this.selection.selectionEnd = newSelection.selectionEnd;

			this.emit(SelectionEvents.selectionChanged, newSelection);
		};

		this.setUpSelectionEvents();
	}

	insert(character: string) {
		// Check if there is an active selection
		if (!this.selection.isEmpty()) {
			// Delete the selection first
			this.deleteSelection();
		}

		// Handle new line
		if (character === "\n") {
			this.numberOfLines++;
			this.cursorPosition.line++;
			this.cursorPosition.char = 0;
			this.document.push("");
			this.history.push(this.document.slice());
		} else {
			const { line, char: charPos } = this.cursorPosition;
			const currentLine = this.document[line];
			const newLine =
				currentLine.slice(0, charPos) + character + currentLine.slice(charPos);
			this.document[line] = newLine;
			this.moveCursor(1, 0);
			this.recordHistory();
		}
	}

	delete(isDeleteKey = false) {
		if (!this.selection.isEmpty()) {
			this.deleteSelection();
			return;
		}

		// Single character deletion
		const { line, char: charPos } = this.cursorPosition;
		if (isDeleteKey) {
			// Forward delete key behavior
			if (charPos >= this.document[line].length) {
				// At the end of a line, merge with the next line if not the last line
				if (line < this.document.length - 1) {
					this.document[line] += this.document[line + 1];
					this.document.splice(line + 1, 1);
					this.numberOfLines--;
				}
			} else {
				// Delete character in front of the cursor
				const currentLine = this.document[line];
				const newLine =
					currentLine.slice(0, charPos) + currentLine.slice(charPos + 1);
				this.document[line] = newLine;
			}
		} else {
			// Backspace
			if (charPos === 0) {
				if (line === 0) return;
				// Handle line merging on backspace at the beginning of a line
				this.moveCursor(0, -1);
				this.cursorPosition.char = this.document[line - 1].length;
				this.document[line - 1] += this.document[line];
				this.document.splice(line, 1);
				this.numberOfLines--;
			} else {
				const currentLine = this.document[line];
				const newLine =
					currentLine.slice(0, charPos - 1) + currentLine.slice(charPos);
				this.document[line] = newLine;
				this.moveCursor(-1, 0);
			}
		}

		this.recordHistory();
	}

	moveCursor(xOffset: number, yOffset: number) {
		// Handle X movement
		const newXPosition = this.cursorPosition.char + xOffset;
		if (
			newXPosition >= 0 &&
			newXPosition <= this.document[this.cursorPosition.line].length
		) {
			this.cursorPosition.char = newXPosition;
		}

		// Handle Y movement
		const newYPosition = this.cursorPosition.line + yOffset;
		if (newYPosition >= 0 && newYPosition < this.document.length) {
			this.cursorPosition.line = newYPosition;
			// Adjust X position if the new line is shorter
			if (this.cursorPosition.char > this.document[newYPosition].length) {
				this.cursorPosition.char = this.document[newYPosition].length;
			}
		}
	}

	setCursorPosition(opts: { xPosition: number; yPosition: number }) {
		this.cursorPosition.char = opts.xPosition;
		this.cursorPosition.line = opts.yPosition;
	}

	private setUpSelectionEvents = () => {
		this.selection.on(
			SelectionEvents.selectionChanged,
			this.onSelectionChanged,
		);
	};

	private cleanUpSelectionEvents = () => {
		this.selection.off(
			SelectionEvents.selectionChanged,
			this.onSelectionChanged,
		);
	};

	private deleteSelection = () => {
		const startLine = this.selection.startLine;
		const endLine = this.selection.endLine;

		this.selection.deleteSelection(this.document);
		this.numberOfLines -= endLine - startLine;

		// Adjust cursor position to the start of the selection
		this.cursorPosition.line = startLine;
		this.cursorPosition.char = this.selection.selectionStart;

		this.selection.clearSelection();
	};

	private recordHistory = () => {
		this.history.push(this.document.slice());
		this.historyIndex++;
	};

	public updateSelection(options: UpdateSelectionOptions): void {
		const {
			startLine = 0,
			endLine = 0,
			selectionStart = 0,
			selectionEnd = 0,
			content = "",
			direction = this.selection.direction,
		} = options;

		const newSelection = new Selection(
			content,
			startLine,
			endLine,
			selectionStart,
			selectionEnd,
			this.selection.selectionBasis,
			direction,
		);

		this.selection = newSelection;
		this.selection.on(
			SelectionEvents.selectionChanged,
			this.onSelectionChanged,
		);

		this.emit(SelectionEvents.selectionChanged, this.selection);
	}

	public getContent = (): string => {
		return this.document.join("\n");
	};

	public getCursorPosition = (): { line: number; char: number } => {
		return this.cursorPosition;
	};

	public getNumberOfLines = (): number => {
		return this.numberOfLines;
	};

	public getLineLength = (lineNumber: number): number => {
		return this.document[lineNumber].length;
	};

	public getSelection = (): Selection => {
		return this.selection;
	};

	public updateSelectionForShiftLeft = (cursor: CursorPosition): void => {
		this.selection.updateSelection(cursor, this.document, SelectionDirection.left, 1);
	};

	public updateSelectionForShiftRight = (cursor: CursorPosition): void => {
		this.selection.updateSelection(cursor, this.document, SelectionDirection.right, 1);
	};

	public updateSelectionForShiftDown = (cursor: CursorPosition): void => {
		this.selection.updateSelection(cursor, this.document, SelectionDirection.down, 1);
	};

	public updateSelectionForShiftUp = (cursor: CursorPosition): void => {
		this.selection.updateSelection(cursor, this.document, SelectionDirection.up, 1);
	};

	public clearSelection = () => {
		this.selection.clearSelection();
	}

	public cleanUp = () => {
		this.cleanUpSelectionEvents();
	};
}
