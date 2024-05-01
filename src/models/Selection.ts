import type { Cursor } from "./Cursor";
import type { Content } from "./Editor";
import type { Line } from "./Line";

export type SelectionProps = { line: number; character: number };
export enum SelectionDirection {
	Right = "right",
	Left = "left",
	Down = "down",
	Up = "up",
	Unknown = "unknown",
}
export class Selection {
	private selectionStart: SelectionProps;
	private selectionEnd: SelectionProps;
	private content: string;
	private direction: SelectionDirection;

	constructor(
		selectionStart = { line: -1, character: -1 },
		selectionEnd = { line: -1, character: -1 },
		content = "",
	) {
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.content = content;
		this.direction = SelectionDirection.Unknown;
	}

	private swapDirection = (currentDirection: SelectionDirection) => {
		switch (currentDirection) {
			case SelectionDirection.Right:
				return SelectionDirection.Left;
			case SelectionDirection.Left:
				return SelectionDirection.Right;
			case SelectionDirection.Down:
				return SelectionDirection.Up;
			case SelectionDirection.Up:
				return SelectionDirection.Down;
			case SelectionDirection.Unknown:
				return SelectionDirection.Unknown;
		}
	};

	private normalizeSelection = (): {
		start: SelectionProps;
		end: SelectionProps;
		direction: SelectionDirection;
	} => {
		// Ensure the selection start is not greater than the selection end
		if (
			this.selectionStart.line > this.selectionEnd.line ||
			(this.selectionStart.line === this.selectionEnd.line &&
				this.selectionStart.character > this.selectionEnd.character)
		) {
			// Swap start and end
			const temp = this.selectionStart;
			const newDirection = this.swapDirection(this.direction);
			return { start: this.selectionEnd, end: temp, direction: newDirection };
		}

		return {
			start: this.selectionStart,
			end: this.selectionEnd,
			direction: this.direction,
		};
	};

	private clearSelectionIfEmpty = (content: Content): void => {
		if (
			this.selectionStart.character === this.selectionEnd.character &&
			this.selectionStart.line === this.selectionEnd.line
		) {
			this.clearSelection();
			this.updateAllLnes(content);
		}
	};

	private invertSelectionUpInternal = (content: Content) => {
		if (this.selectionStart.line > 0) {
			const diff = this.selectionEnd.character - this.selectionStart.character;
			this.selectionStart.line -= 1;
			this.selectionStart.character += Math.min(
				diff,
				content[this.selectionStart.line].getContent().length,
			);
			this.selectionEnd.character -= diff;
		} else if (this.selectionEnd.character < this.selectionStart.character) {
			const temp = this.selectionStart.character;
			this.selectionEnd.line -= 1;
			this.selectionStart.character = this.selectionEnd.character;
			this.selectionEnd.character = temp;
		} else {
			this.selectionEnd.character = this.selectionStart.character;
			this.selectionStart.character = 0;
		}

		this.direction = SelectionDirection.Up;
	};

	private invertSelectionDownInternal = (content: Content) => {
		if (this.selectionStart.line === content.length) {
			const diff = this.selectionEnd.character - this.selectionStart.character;
			this.selectionEnd.line += 1;
			this.selectionStart.character += Math.min(
				diff,
				content[this.selectionStart.line].getContent().length,
			);
			this.selectionEnd.character -= diff;
		} else if (this.selectionEnd.character < this.selectionStart.character) {
			const temp = this.selectionStart.character;
			this.selectionStart.line += 1;
			this.selectionStart.character = this.selectionEnd.character;
			this.selectionEnd.character = temp;
		} else {
			const diff = this.selectionEnd.character - this.selectionStart.character;
			this.selectionStart.character = this.selectionEnd.character;
			this.selectionEnd.character -= diff;
			this.selectionEnd.line += 1;
		}

		this.direction = SelectionDirection.Down;
	};

	private invertSelection = (
		cursor: Cursor,
		direction: SelectionDirection,
		content: Content,
	): void => {
		const shouldInvertSelection =
			this.selectionStart.line === this.selectionEnd.line ||
			(this.selectionStart.line + 1 === this.selectionEnd.line &&
				this.selectionEnd.character < this.selectionStart.character);

		if (shouldInvertSelection) {
			switch (direction) {
				case SelectionDirection.Down: {
					this.invertSelectionDownInternal(content);
					break;
				}
				case SelectionDirection.Up: {
					this.invertSelectionUpInternal(content);
					break;
				}
			}
		}
	};

	private contractSelectionLeftInternal = (
		selectionEnd: SelectionProps,
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		if (selectionEnd.character > 0) {
			return { ...selectionEnd, character: selectionEnd.character - 1 };
		}

		if (selectionEnd.line > 0) {
			const previousLineLength =
				content[selectionEnd.line - 1].getContent().length;
			return { line: selectionEnd.line - 1, character: previousLineLength };
		}

		return selectionEnd;
	};

	private contractSelectionRightInternal = (
		selectionStart: SelectionProps,
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		// Contract the selection by moving the start character right
		const lineLength = content[this.selectionStart.line].getContent().length;
		if (this.selectionStart.character < lineLength) {
			return { ...selectionStart, character: selectionStart.character + 1 };
		}

		if (this.selectionStart.line < this.selectionEnd.line) {
			// If at the end of a line, move to the start of the next line
			return { line: selectionStart.line + 1, character: 0 };
		}

		if (this.selectionStart.character === lineLength) {
			return { line: -1, character: -1 };
		}

		return selectionStart;
	};

	private contractSelectionUpInternal = (
		selectionStart: SelectionProps,
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		// Contract the selection by moving the start downwards
		if (this.selectionStart.line < content.length - 1) {
			return {
				line: selectionStart.line + 1,
				character: Math.min(
					cursor.getPosition().characterBasis,
					content[this.selectionStart.line].getContent().length,
				),
			};
		}

		// If already at the bottom line, just move the character to the end
		return {
			...selectionStart,
			character: content[this.selectionStart.line].getContent().length,
		};
	};

	private contractSelectionDownInternal = (
		selectionEnd: SelectionProps,
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		// If the selection spans multiple lines
		if (this.selectionEnd.line > this.selectionStart.line) {
			// Move the selection end up to the previous line
			return {
				line: selectionEnd.line - 1,
				character: Math.min(
					cursor.getPosition().characterBasis,
					content[this.selectionEnd.line].getContent().length,
				),
			};
		}

		if (
			this.direction === SelectionDirection.Right &&
			this.selectionEnd.character > this.selectionStart.character
		) {
			return { ...selectionEnd, character: 0 };
		}

		if (this.selectionEnd.character > this.selectionStart.character) {
			// If the selection is within a single line, reduce the selection by moving the end character left
			return { ...selectionEnd, character: selectionEnd.character - 1 };
		}

		return selectionEnd;
	};

	private contractSelection = (
		cursor: Cursor,
		direction: SelectionDirection,
		content: Content,
	): void => {
		if (this.isSelection()) {
			switch (direction) {
				case SelectionDirection.Right:
					this.selectionStart = this.contractSelectionRightInternal(
						this.selectionStart,
						cursor,
						content,
					);
					break;
				case SelectionDirection.Left:
					this.selectionEnd = this.contractSelectionLeftInternal(
						this.selectionEnd,
						cursor,
						content,
					);
					break;
				case SelectionDirection.Down:
					this.selectionEnd = this.contractSelectionDownInternal(
						this.selectionEnd,
						cursor,
						content,
					);
					break;
				case SelectionDirection.Up:
					this.selectionStart = this.contractSelectionUpInternal(
						this.selectionStart,
						cursor,
						content,
					);
					break;
			}
		}
	};

	private adjustSelectionBoundaryLeft = (
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		const { line, character } = this.selectionStart;
		if (character > 0) {
			return { line, character: character - 1 };
		}

		if (line > 0) {
			const previousLineLength = content[line - 1].getContent().length;
			return {
				line: line - 1,
				character: previousLineLength ? previousLineLength : 0,
			};
		}

		return { line, character };
	};

	private adjustSelectionBoundaryRight = (
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		const { line, character } = this.selectionEnd;
		const currentLineLength =
			content[this.selectionEnd.line].getContent().length;

		if (this.selectionEnd.character < currentLineLength) {
			return { line, character: character + 1 };
		}

		if (this.selectionEnd.line < content.length - 1) {
			return { line: line + 1, character: 0 };
		}

		return { line, character };
	};

	private adjustSelectionBoundaryUp = (
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		const { line } = this.selectionStart;

		if (this.selectionStart.line > 0) {
			return {
				line: line - 1,
				character: Math.min(
					cursor.getPosition().characterBasis,
					content[this.selectionStart.line].getContent().length,
				),
			};
		}

		return { line, character: 0 };
	};

	private adjustSelectionBoundaryDown = (
		cursor: Cursor,
		content: Content,
	): SelectionProps => {
		const { line } = this.selectionEnd;

		if (this.selectionEnd.line < content.length - 1) {
			return {
				line: line + 1,
				character: Math.min(
					cursor.getPosition().characterBasis,
					content[this.selectionEnd.line].getContent().length,
				),
			};
		}

		return {
			line,
			character: content[this.selectionEnd.line].getContent().length,
		};
	};

	private adjustSelectionBoundary = (
		adjustmentFunction: (
			selection: SelectionProps,
			content: Content,
		) => SelectionProps,
		content: Content,
		direction: SelectionDirection,
	): void => {
		const newSelectionStart = adjustmentFunction(this.selectionStart, content);
		const newSelectionEnd = adjustmentFunction(this.selectionEnd, content);

		switch (direction) {
			case SelectionDirection.Right:
				this.setSelectionEnd(newSelectionEnd);
				break;
			case SelectionDirection.Left:
				this.setSelectionStart(newSelectionStart);
				break;
			case SelectionDirection.Down:
				this.setSelectionEnd(newSelectionEnd);
				break;
			case SelectionDirection.Up:
				this.setSelectionStart(newSelectionStart);
				break;
		}
	};

	private startNewSelectionIfNeeded = (
		cursor: Cursor,
		direction: SelectionDirection,
	): void => {
		if (!this.isSelection()) {
			// Initialize selection at the cursor position if no selection exists
			this.selectionStart = {
				character: cursor.getPosition().characterBasis,
				line: cursor.getPosition().line,
			};
			this.selectionEnd = {
				character: cursor.getPosition().characterBasis,
				line: cursor.getPosition().line,
			};

			switch (direction) {
				case SelectionDirection.Down:
					this.direction = SelectionDirection.Down;
					break;
				case SelectionDirection.Up:
					this.direction = SelectionDirection.Up;
					break;
				case SelectionDirection.Left:
					this.direction = SelectionDirection.Left;
					break;
				case SelectionDirection.Right:
					this.direction = SelectionDirection.Right;
					break;
			}
		}
	};

	private selectAllLines = (content: Content): void => {
		for (const line of content) {
			line.selectAll();
		}
	};

	private updateAllLnes = (content: Content): void => {
		for (const line of content) {
			this.updateLineSelection(line);
		}
	};

	public updateLineSelection = (line: Line) => {
		const lineNumber = line.getLineNumber();

		if (
			lineNumber === this.selectionStart.line + 1 &&
			lineNumber === this.selectionEnd.line + 1
		) {
			// The line is the only line in the selection
			line.setSelectionStart(this.selectionStart.character);
			line.setSelectionEnd(this.selectionEnd.character);
		} else if (lineNumber === this.selectionStart.line + 1) {
			// The line is the start line of the selection
			line.setSelectionStart(this.selectionStart.character);
			// Select to the end of the line since the selection extends beyond this line
			line.setSelectionEnd(line.getContent().length);
		} else if (lineNumber === this.selectionEnd.line + 1) {
			// The line is the end line of the selection
			// Start selection from the beginning of the line up to the selectionEnd.character
			line.setSelectionStart(0);
			line.setSelectionEnd(this.selectionEnd.character);
		} else if (
			lineNumber > this.selectionStart.line + 1 &&
			lineNumber < this.selectionEnd.line + 1
		) {
			// The line is within the selection range but not the start or end line
			// Select the entire line
			line.setSelectionStart(0);
			line.setSelectionEnd(line.getContent().length);
		}
		// If the line number does not fall within the selection range, clear
		else {
			line.setSelectionStart(-99);
			line.setSelectionEnd(-99);
		}
	};

	public handleSelectionLeft = (cursor: Cursor, content: Content): void => {
		if (
			this.direction === SelectionDirection.Left ||
			this.direction === SelectionDirection.Unknown ||
			this.direction === SelectionDirection.Up
		) {
			// Expand selection (or start a new one)
			this.expandSelectionLeft(cursor, content);
		} else {
			// Contract selection
			this.contractSelectionLeft(cursor, content);
		}

		this.updateAllLnes(content);
	};

	public handleSelectionRight = (cursor: Cursor, content: Content): void => {
		if (
			this.direction === SelectionDirection.Right ||
			this.direction === SelectionDirection.Unknown ||
			this.direction === SelectionDirection.Down
		) {
			// Expand selection (or start a new one)
			this.expandSelectionRight(cursor, content);
		} else {
			// Contract selection
			this.contractSelectionRight(cursor, content);
		}

		this.updateAllLnes(content);
	};

	public handleSelectionUp = (cursor: Cursor, content: Content): void => {
		if (
			this.direction === SelectionDirection.Up ||
			this.direction === SelectionDirection.Unknown ||
			this.direction === SelectionDirection.Left
		) {
			// Expand selection (or start a new one)
			this.expandSelectionUp(cursor, content);
		} else if (
			(this.direction === SelectionDirection.Right &&
				(this.selectionStart.character > this.selectionEnd.character ||
					this.selectionEnd.line === this.selectionStart.line)) ||
			(((this.direction === SelectionDirection.Down &&
				this.selectionEnd.character < this.selectionStart.character &&
				this.selectionEnd.line - this.selectionStart.line === 1) ||
				this.selectionEnd.line - this.selectionStart.line === 0) &&
				this.selectionEnd.character !== this.selectionStart.character)
		) {
			// Invert the selection
			this.invertSelectionUp(cursor, content);
		} else {
			// Contract selection
			this.contractSelectionDown(cursor, content);
		}

		this.updateAllLnes(content);
	};

	public handleSelectionDown = (cursor: Cursor, content: Content): void => {
		if (
			this.direction === SelectionDirection.Down ||
			this.direction === SelectionDirection.Unknown ||
			this.direction === SelectionDirection.Right
		) {
			// Expand selection (or start a new one)
			this.expandSelectionDown(cursor, content);
		} else if (
			(this.direction === SelectionDirection.Left &&
				(this.selectionStart.character > this.selectionEnd.character ||
					this.selectionEnd.line === this.selectionStart.line)) ||
			(this.direction === SelectionDirection.Up &&
				(this.selectionEnd.line - this.selectionStart.line === 1 ||
					this.selectionEnd.line - this.selectionStart.line === 0) &&
				this.selectionEnd.line === this.selectionStart.line)
		) {
			// Invert the selection
			this.invertSelectionDown(cursor, content);
		} else {
			// Contract selection
			this.contractSelectionUp(cursor, content);
			const { start, end, direction } = this.normalizeSelection();
			this.selectionStart = start;
			this.selectionEnd = end;
			this.direction = direction;
		}

		this.updateAllLnes(content);
	};

	public getSelectionStart = (): SelectionProps => {
		return this.selectionStart;
	};

	public setSelectionStart = (start: SelectionProps): void => {
		this.selectionStart = start;
	};

	public setSelectionEnd = (end: SelectionProps): void => {
		this.selectionEnd = end;
	};

	public getSelectionEnd = (): SelectionProps => {
		return this.selectionEnd;
	};

	public getSelectionRange = (): {
		start: SelectionProps;
		end: SelectionProps;
	} => {
		return { start: this.selectionStart, end: this.selectionEnd };
	};

	public selectAll = (
		textLength: number,
		totalLines: number,
		content: Content,
	): void => {
		this.selectionStart = { line: 0, character: 0 };
		this.selectionEnd = { line: totalLines - 1, character: textLength };

		this.content = content.map((line) => line.getContent()).join("\n");

		this.selectAllLines(content);
	};

	public invertSelectionUp = (cursor: Cursor, content: Content): void => {
		this.invertSelection(cursor, SelectionDirection.Up, content);
		cursor.moveUp(content);
	};

	public invertSelectionDown = (cursor: Cursor, content: Content): void => {
		this.invertSelection(cursor, SelectionDirection.Down, content);
		cursor.moveDown(content, content.length);
	};

	public expandSelectionDown = (cursor: Cursor, content: Content): void => {
		this.startNewSelectionIfNeeded(cursor, SelectionDirection.Down);
		this.adjustSelectionBoundary(
			(selection: SelectionProps, content: Content) =>
				this.adjustSelectionBoundaryDown(cursor, content),
			content,
			SelectionDirection.Down,
		);

		cursor.moveDown(content, content.length);
	};

	public expandSelectionUp = (cursor: Cursor, content: Content): void => {
		this.startNewSelectionIfNeeded(cursor, SelectionDirection.Up);
		this.adjustSelectionBoundary(
			(selection: SelectionProps, content: Content) =>
				this.adjustSelectionBoundaryUp(cursor, content),
			content,
			SelectionDirection.Up,
		);

		cursor.moveUp(content);
	};

	public expandSelectionLeft = (cursor: Cursor, content: Content): void => {
		this.startNewSelectionIfNeeded(cursor, SelectionDirection.Left);
		this.adjustSelectionBoundary(
			(selection: SelectionProps, content: Content) =>
				this.adjustSelectionBoundaryLeft(cursor, content),
			content,
			SelectionDirection.Left,
		);

		const { start, end, direction } = this.normalizeSelection();
		this.selectionStart = start;
		this.selectionEnd = end;
		this.direction = direction;

		cursor.moveLeft(content);
	};

	public expandSelectionRight = (cursor: Cursor, content: Content): void => {
		this.startNewSelectionIfNeeded(cursor, SelectionDirection.Right);
		this.adjustSelectionBoundary(
			(selection: SelectionProps, content: Content) =>
				this.adjustSelectionBoundaryRight(cursor, content),
			content,
			SelectionDirection.Right,
		);

		const { start, end, direction } = this.normalizeSelection();
		this.selectionStart = start;
		this.selectionEnd = end;
		this.direction = direction;

		cursor.moveRight(content);
	};

	public contractSelectionLeft = (cursor: Cursor, content: Content): void => {
		this.contractSelection(cursor, SelectionDirection.Left, content);
		this.clearSelectionIfEmpty(content);
		cursor.moveLeft(content);
	};

	public contractSelectionRight = (cursor: Cursor, content: Content): void => {
		this.contractSelection(cursor, SelectionDirection.Right, content);
		this.clearSelectionIfEmpty(content);
		cursor.moveRight(content);
	};

	public contractSelectionUp = (cursor: Cursor, content: Content): void => {
		this.contractSelection(cursor, SelectionDirection.Up, content);
		this.clearSelectionIfEmpty(content);
		cursor.moveDown(content, content.length);
	};

	public contractSelectionDown = (cursor: Cursor, content: Content): void => {
		this.contractSelection(cursor, SelectionDirection.Down, content);
		this.clearSelectionIfEmpty(content);
		cursor.moveUp(content);
	};

	public calculateTotalCharactersSelected = (): number => {
		let totalCharacters = 0;
		// Split the content back into lines for calculation
		const lines = this.content.split("\n");

		// If the selection is within a single line
		if (this.selectionStart.line === this.selectionEnd.line) {
			totalCharacters =
				this.selectionEnd.character - this.selectionStart.character;
		} else {
			// Calculate characters from the start line to the end of the line
			totalCharacters +=
				lines[this.selectionStart.line].length - this.selectionStart.character;
			// Add characters for lines fully within the selection
			for (
				let i = this.selectionStart.line + 1;
				i < this.selectionEnd.line;
				i++
			) {
				totalCharacters += lines[i].length; // +1 for the newline character
			}
			// Add characters from the start of the end line to the selection end
			totalCharacters += this.selectionEnd.character;
			// Add the newline characters for the start and all full lines within the selection
			totalCharacters += this.selectionEnd.line - this.selectionStart.line;
		}
		return totalCharacters;
	};

	public deleteSelection = (content: Content, cursor: Cursor): void => {
		const { start, end } = this.getSelectionRange();
		if (start.line === end.line) {
			// Selection within a single line
			let line = content[start.line];
			line.setContent(
				line.getContent().substring(0, start.character) +
					line.getContent().substring(end.character),
			);
		} else {
			// Selection spans multiple lines
			// Remove text from the start line up to the start character
			content[start.line].setContent(
				content[start.line].getContent().substring(0, start.character),
			);
			// Remove text from the end character to the end of the end line
			content[end.line].setContent(
				content[end.line].getContent().substring(end.character),
			);
			// Remove lines fully within the selection
			content.splice(start.line + 1, end.line - start.line - 1);
			// Merge start and end lines if they are not the same
			// Merge the content of the current line with the next line
			let mergedContent =
				content[start.line].getContent() + content[start.line + 1].getContent();
			content[start.line].setContent(mergedContent);

			// Remove the next line after merging
			content.splice(start.line + 1, 1);
		}
		// Clear the selection after deleting
		this.clearSelection();

		// Move cursor to the start of the selection
		cursor.setPosition(content.length, content, start.character, start.line);
		this.updateAllLnes(content);
	};

	public getContent = (): string => {
		return this.content;
	};

	public getDirection = (): SelectionDirection => {
		return this.direction;
	};

	public isSelection = (): boolean => {
		return (
			this.selectionStart.line !== this.selectionEnd.line ||
			this.selectionStart.character !== this.selectionEnd.character
		);
	};

	public clearSelection = (): void => {
		this.selectionStart = { line: -1, character: -1 };
		this.selectionEnd = { line: -1, character: -1 };
		this.direction = SelectionDirection.Unknown;
	};

	public updateSelection = (
		start: SelectionProps,
		end: SelectionProps,
		content: string,
	): void => {
		this.selectionStart = start;
		this.selectionEnd = end;
		this.content = content;
	};
}
