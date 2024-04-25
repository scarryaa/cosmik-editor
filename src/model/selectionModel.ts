import { EventEmitter } from "../event-emitter/eventEmitter";
import type { CursorPosition } from "../hooks/useCursorManagement";

export enum SelectionEvents {
	selectionChanged = "selectionChanged",
}

export enum SelectionDirection {
	left = "left",
	right = "right",
	up = "up",
	down = "down",
}

export type SelectionChangeOptions = {
	direction: SelectionDirection;
	amount: number;
};

export interface SelectionOptions {
	content?: string;
	startLine: number;
	endLine: number;
	selectionStart: number;
	selectionEnd: number;
	selectionBasis: number;
	direction: SelectionDirection;
}

export type UpdateSelectionOptions = SelectionOptions;
/**
 * A class for managing selection as it relates to a text editor.
 */
export class Selection extends EventEmitter {
	public content: string;
	public startLine: number;
	public endLine: number;
	public selectionStart: number;
	public selectionEnd: number;
	public selectionBasis: number;
	public direction: SelectionDirection;
	public shouldUpdateCursor = true;

	constructor(
		content = "",
		startLine = 0,
		endLine = 0,
		selectionStart = 0,
		selectionEnd = 0,
		selectionBasis = 0,
		direction = SelectionDirection.right,
	) {
		super();
		this.content = content;
		this.startLine = startLine;
		this.endLine = endLine;
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.direction = direction;
		this.selectionBasis = selectionBasis;
	}

	private getSelectionContent = (document: string[]) => {
		if (this.startLine === this.endLine) {
			console.log(this.startLine);
			// Selection within a single line
			this.content = document[this.startLine].slice(
				this.selectionStart,
				this.selectionEnd,
			);
		} else {
			// Selection spans multiple lines
			// Start with the partial content from the first line
			let content = document[this.startLine].slice(this.selectionStart);
			// Concatenate the full content of any lines between the first and last
			for (let i = this.startLine + 1; i < this.endLine; i++) {
				content += `\n${document[i]}`;
			}
			// Add the partial content from the last line
			content += `\n${document[this.endLine].slice(0, this.selectionEnd)}`;
			this.content = content;
		}
	};

	private handleSelectionInversion() {
		switch (this.direction) {
			case SelectionDirection.left:
			case SelectionDirection.right: {
				if (
					this.selectionStart > this.selectionEnd &&
					this.startLine === this.endLine
				) {
					const temp = this.selectionStart;
					this.selectionStart = this.selectionEnd;
					this.selectionEnd = temp;
				} else {
					return;
				}
				break;
			}
			default:
				return;
		}

		this.invertSelectionDirection();
	}

	private invertSelectionDirection = () => {
		switch (this.direction) {
			case SelectionDirection.left:
				this.direction = SelectionDirection.right;
				break;
			case SelectionDirection.right:
				this.direction = SelectionDirection.left;
				break;
			case SelectionDirection.up:
				this.direction = SelectionDirection.down;
				break;
			case SelectionDirection.down:
				this.direction = SelectionDirection.up;
				break;
		}
	};

	private setSelectionToCursorPositon = (cursor: CursorPosition) => {
		this.startLine = cursor.line;
		this.selectionStart = cursor.char;
		this.endLine = cursor.line;
		this.selectionEnd = cursor.char;
		this.selectionBasis = cursor.char;
	};

	private startNewSelection = (
		document: string[],
		direction: SelectionDirection,
		cursor: CursorPosition,
	) => {
		switch (direction) {
			case SelectionDirection.left:
				this.setSelectionToCursorPositon(cursor);
				this.moveSelectionLeft(document, { amount: 1, direction });
				break;
			case SelectionDirection.right:
				this.setSelectionToCursorPositon(cursor);
				this.moveSelectionRight(document, { amount: 1, direction });
				break;
			case SelectionDirection.up:
				this.setSelectionToCursorPositon(cursor);
				this.moveSelectionUp(document, { amount: 1, direction });
				break;
			case SelectionDirection.down:
				this.setSelectionToCursorPositon(cursor);
				this.moveSelectionDown(document, { amount: 1, direction });
				break;
		}
		this.direction = direction;
	};

	private moveSelectionLeft = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Line start
		if (this.selectionStart === 0 && this.startLine > 0) {
			this.startLine--;
			this.selectionStart = document[this.startLine].length;
		} else {
			// Document start
			if (this.selectionStart > 0) {
				this.selectionStart -= opts.amount;
			}
		}
	};

	private moveSelectionRight = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Line end
		if (this.selectionEnd >= document[this.endLine].length) {
			if (this.endLine < document.length - 1) {
				this.endLine += 1;
				this.selectionEnd = 0;
			}
		} else {
			// Document end
			if (this.selectionEnd <= document[this.endLine].length) {
				this.selectionEnd += opts.amount;
			}
		}
	};

	private moveSelectionUp = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document start
		if (this.startLine === 0) {
			// Check if we are past the selection baasis
			if (this.selectionEnd > this.selectionBasis) {
				this.selectionEnd = this.selectionBasis;
			} else {
				// Select all
				this.selectionStart = 0;
				// Prevent cursor adjustment
				this.shouldUpdateCursor = false;
			}
		} else {
			this.startLine -= opts.amount;

			// Blank line
			if (document[this.startLine].length === 0) {
				this.selectionStart = 0;
			}

			this.selectionStart = Math.min(
				document[this.startLine].length,
				this.selectionStart,
			);
		}
	};

	private moveSelectionDown = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document end
		if (this.endLine === document.length - 1) {
			// Select all
			this.selectionEnd = document[this.endLine].length;
			// Prevent cursor adjustment
			this.shouldUpdateCursor = false;
		} else {
			this.endLine += opts.amount;

			// Blank line
			if (document[this.endLine].length === 0) {
				this.selectionEnd = 0;
			}

			// Check if we are before the selection baasis
			if (this.selectionStart < this.selectionBasis) {
				this.selectionStart = this.selectionBasis;
			}

			this.selectionEnd = Math.min(
				document[this.endLine].length,
				this.selectionEnd,
			);
		}
	};

	private contractSelectionLeft = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document start
		if (this.selectionEnd > 0) {
			this.selectionEnd -= opts.amount;

			// If selectionStart surpasses selectionEnd after contraction, invert the selection
			this.handleSelectionInversion();
		} else {
			// Line start
			if (this.selectionEnd === 0 && this.endLine > 0) {
				this.endLine -= 1;
				this.selectionEnd = document[this.endLine].length;
			}
		}
	};

	private contractSelectionRight = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document end
		if (this.selectionStart <= document[this.endLine].length) {
			// Check for blank lines
			if (document[this.startLine].length === 0) {
				this.selectionStart = 0;
				this.startLine++;
				return;
			}

			this.selectionStart += opts.amount;

			// Line end
			if (
				this.selectionStart === document[this.startLine].length &&
				this.startLine < document.length - 1
			) {
				this.selectionStart = 0;
				this.startLine += 1;
			}

			// If selectionStart surpasses selectionEnd after contraction, invert the selection
			this.handleSelectionInversion();
		}
	};

	private contractSelectionUp = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document start
		if (this.endLine === 0) {
			// Check if we are past the selection baasis
			if (this.selectionEnd > this.selectionBasis) {
				this.selectionEnd = this.selectionBasis;
			}
			// Select all
			this.selectionStart = 0;
		} else if (this.endLine > 0) {
			// Check if we are past the selection baasis
			if (
				this.selectionEnd > this.selectionBasis &&
				this.startLine === this.endLine
			) {
				this.selectionEnd = this.selectionBasis;
			}

			this.endLine -= opts.amount;

			// Blank line
			if (document[this.endLine].length === 0) {
				this.selectionEnd = 0;
			}

			// Invert selection
			if (this.startLine > this.endLine) {
				const temp = this.startLine;
				this.startLine = this.endLine;
				this.endLine = temp;
				this.invertSelectionDirection();
			}

			this.selectionEnd = Math.min(
				document[this.endLine].length,
				this.selectionEnd,
			);
		}
	};

	private contractSelectionDown = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		// Document end
		if (this.startLine < document.length - 1) {
			// Check if we are before the selection baasis
			if (
				this.selectionStart < this.selectionBasis &&
				this.startLine === this.endLine
			) {
				this.selectionStart = this.selectionBasis;
			}

			this.startLine += opts.amount;

			// Blank line
			if (document[this.startLine].length === 0) {
				this.selectionStart = 0;
			}

			// Check if selectionStart > selectionEnd
			if (this.selectionStart > this.selectionEnd) {
				const tmp = this.selectionEnd;
				this.selectionEnd = Math.min(
					document[this.endLine].length,
					this.selectionStart,
				);
				this.selectionStart = tmp;
				this.invertSelectionDirection();
			}

			// Invert selection
			if (this.startLine > this.endLine) {
				const temp = this.startLine;
				this.startLine = this.endLine;
				this.endLine = temp;
				this.invertSelectionDirection();
			}

			this.selectionStart = Math.min(
				document[this.startLine].length,
				this.selectionStart,
			);
		} // Collapse to end on last line
		else if (this.startLine === document.length - 1) {
			this.selectionStart = this.selectionBasis;
			this.selectionEnd = document[this.endLine].length;
			this.invertSelectionDirection();
		}
	};

	private shouldExpandSelection = (
		newDirection: SelectionDirection,
	): boolean => {
		switch (newDirection) {
			case SelectionDirection.right: {
				if (this.direction === newDirection) return true;
				if (this.direction === SelectionDirection.left) return false;
				if (this.direction === SelectionDirection.down) return true;
				return false;
			}
			case SelectionDirection.left: {
				if (this.direction === newDirection) return true;
				if (this.direction === SelectionDirection.right) return false;
				if (this.direction === SelectionDirection.up) return true;
				return false;
			}
			case SelectionDirection.down: {
				if (this.direction === newDirection) return true;
				if (this.direction === SelectionDirection.up) return false;
				if (this.direction === SelectionDirection.left) return false;
				return true;
			}
			case SelectionDirection.up: {
				if (this.direction === newDirection) return true;
				if (this.direction === SelectionDirection.down) return false;
				if (this.direction === SelectionDirection.right) return false;
				return true;
			}
		}
	};

	private expandSelection = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		switch (opts.direction) {
			case SelectionDirection.left: {
				this.moveSelectionLeft(document, opts);
				break;
			}
			case SelectionDirection.right: {
				this.moveSelectionRight(document, opts);
				break;
			}
			case SelectionDirection.up: {
				this.moveSelectionUp(document, opts);
				break;
			}
			case SelectionDirection.down: {
				this.moveSelectionDown(document, opts);
				break;
			}
		}
	};

	private contractSelection = (
		document: string[],
		opts: SelectionChangeOptions,
	) => {
		switch (opts.direction) {
			case SelectionDirection.left:
				this.contractSelectionLeft(document, opts);
				break;
			case SelectionDirection.right:
				this.contractSelectionRight(document, opts);
				break;
			case SelectionDirection.up:
				this.contractSelectionUp(document, opts);
				break;
			case SelectionDirection.down:
				this.contractSelectionDown(document, opts);
				break;
		}
	};

	public updateSelection(
		cursor: CursorPosition,
		document: string[],
		direction: SelectionDirection,
		amount: number,
	): void {
		// Start a new selection?
		if (this.isEmpty()) {
			this.startNewSelection(document, direction, cursor);
		} else {
			if (this.shouldExpandSelection(direction)) {
				this.expandSelection(document, { amount, direction });
			} else {
				this.contractSelection(document, { amount, direction });
			}
		}

		this.getSelectionContent(document);
		this.emit(SelectionEvents.selectionChanged, this);
	}

	public deleteSelection(document: string[]): string[] {
		const startLine = this.startLine;
		const endLine = this.endLine;

		if (startLine === endLine) {
			// Selection within a single line
			const lineContent = document[startLine];
			document[startLine] =
				lineContent.slice(0, this.selectionStart) +
				lineContent.slice(this.selectionEnd);
		} else {
			// Selection spans multiple lines
			// Keep the content before the selection in the start line
			document[startLine] =
				document[startLine].slice(0, this.selectionStart) +
				document[endLine].slice(this.selectionEnd);
			document.splice(startLine + 1, endLine - startLine);
		}

		return document;
	}

	public clearSelection = () => {
		if (this.isEmpty()) return;

		this.content = "";
		this.startLine = 0;
		this.endLine = 0;
		this.selectionStart = 0;
		this.selectionEnd = 0;
		this.selectionBasis = 0;

		this.emit(SelectionEvents.selectionChanged, this);
	};

	public isEmpty = () => {
		return (
			this.selectionStart === this.selectionEnd &&
			this.startLine === this.endLine &&
			this.content === "" &&
			this.startLine === 0 &&
			this.endLine === 0 &&
			this.selectionStart === 0 &&
			this.selectionEnd === 0 &&
			this.selectionBasis === 0
		);
	};

	public setSelection = (newSelection: Selection) => {
		this.content = newSelection.content;
		this.startLine = newSelection.startLine;
		this.endLine = newSelection.endLine;
		this.selectionStart = newSelection.selectionStart;
		this.selectionEnd = newSelection.selectionEnd;
		this.direction = newSelection.direction;
		this.selectionBasis = newSelection.selectionBasis;

		this.emit(SelectionEvents.selectionChanged, this);
	};

	static empty = (): Selection => {
		return new Selection();
	};
}
