import { EventEmitter } from "../event-emitter/eventEmitter";
import {
	Selection,
	type SelectionChangeOptions,
	SelectionDirection,
	SelectionEvents,
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
			this.selection.content = this.getSelectionContent(newSelection);
			this.selection.startLine = newSelection.startLine;
			this.selection.endLine = newSelection.endLine;
			this.selection.startIndex = newSelection.startIndex;
			this.selection.endIndex = newSelection.endIndex;

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
			this.moveCursorX(1);
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
				this.moveCursorY(-1);
				this.cursorPosition.char = this.document[line - 1].length;
				this.document[line - 1] += this.document[line];
				this.document.splice(line, 1);
				this.numberOfLines--;
			} else {
				const currentLine = this.document[line];
				const newLine =
					currentLine.slice(0, charPos - 1) + currentLine.slice(charPos);
				this.document[line] = newLine;
				this.moveCursorX(-1);
			}
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

		if (startLine === endLine) {
			// Selection within a single line
			const lineContent = this.document[startLine];
			this.document[startLine] =
				lineContent.slice(0, this.selection.startIndex) +
				lineContent.slice(this.selection.endIndex);
		} else {
			// Selection spans multiple lines
			// Keep the content before the selection in the start line
			this.document[startLine] =
				this.document[startLine].slice(0, this.selection.startIndex) +
				this.document[endLine].slice(this.selection.endIndex);
			this.document.splice(startLine + 1, endLine - startLine);
		}

		this.numberOfLines -= endLine - startLine;
		this.positionCursorAfterSelectionDeletion(startLine);
		this.setSelectionToEmpty();
	};

	private positionCursorAfterSelectionDeletion = (startLine: number) => {
		// Adjust cursor position to the start of the selection
		this.cursorPosition.line = startLine;
		this.cursorPosition.char = this.selection.startIndex;
	};

	private setSelectionToEmpty = () => {
		this.selection.clearSelection();
	};

	private recordHistory = () => {
		this.history.push(this.document.slice());
		this.historyIndex++;
	};

	private getSelectionContent = (selection: Selection) => {
		return selection.startLine === selection.endLine
			? this.document[selection.startLine].slice(
					selection.startIndex,
					selection.endIndex,
				)
			: this.document[selection.startLine].slice(selection.startIndex) +
					this.document[selection.endLine].slice(0, selection.endIndex);
	};

	public setSelection = (newSelection: Selection): void => {
		this.selection = newSelection;
	};

	public getContent = (): string => {
		return this.document.join("\n");
	};

	public getCursorPosition = (): { line: number; char: number } => {
		return this.cursorPosition;
	};

	public getNumberOfLines = (): number => {
		return this.numberOfLines;
	};

	public getCurrentLineLength = (): number => {
		return this.document[this.cursorPosition.line].length;
	};

	public getSelection = (): Selection => {
		return this.selection;
	};

	public updateAndSetSelection = (newSelection: Selection) => {
		newSelection.content = this.getSelectionContent(newSelection);
		this.setSelection(newSelection);
	}

	public updateSelectionForShiftLeft = (): void => {
		if (this.selection.isEmpty()) {
			// Start a new selection at the cursor position, moving left
			const newSelection = new Selection(
				"",
				this.cursorPosition.line,
				this.cursorPosition.line,
				Math.max(0, this.cursorPosition.char - 1),
				this.cursorPosition.char,
				SelectionDirection.rightToLeft,
			);

			this.updateAndSetSelection(newSelection);
		} else {
			// Contract or expand the existing selection
			const options: SelectionChangeOptions = {
				direction: SelectionDirection.rightToLeft,
				amount: 1,
			};
			if (this.selection.direction === SelectionDirection.leftToRight) {
				this.selection.contractSelection(options);
			} else {
				this.selection.expandSelection(options);
			}

			this.selection.content = this.getSelectionContent(this.selection);
		}

		this.emit(SelectionEvents.selectionChanged, this.selection);
	};

	public updateSelectionForShiftRight = (): void => {
		if (this.selection.isEmpty()) {
			// Start a new selection at the cursor position
			const newSelection = new Selection(
				"",
				this.cursorPosition.line,
				this.cursorPosition.line,
				this.cursorPosition.char,
				Math.min(this.cursorPosition.char + 1, this.getCurrentLineLength()),
				SelectionDirection.leftToRight,
			);

			this.updateAndSetSelection(newSelection);
		} else {
			// Expand the existing selection
			const options: SelectionChangeOptions = {
				direction: SelectionDirection.leftToRight,
				amount: 1,
			};
			this.selection.expandSelection(options);
			this.selection.content = this.getSelectionContent(this.selection);
		}
		this.emit(SelectionEvents.selectionChanged, this.selection);
	};

	public cleanUp = () => {
		this.cleanUpSelectionEvents();
	};
}
