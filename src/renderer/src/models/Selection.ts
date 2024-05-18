import { type Signal, createSignal } from "solid-js";
import type { Cursor } from "./Cursor";
import type { PieceTable } from "./PieceTable";

export enum SelectionDirection {
	Forward = 0,
	Backward = 1,
	Up = 2,
	Down = 3,
}

export class Selection {
	private pieceTable: PieceTable;

	private startIndexSignal: Signal<number>;
	private endIndexSignal: Signal<number>;
	private startLineSignal: Signal<number>;
	private endLineSignal: Signal<number>;
	private cachedContentSignal: Signal<string>;
	private directionSignal: Signal<SelectionDirection>;

	constructor(
		pieceTable: PieceTable,
		startIndex: number,
		endIndex: number,
		startLine: number,
		endLine: number,
	) {
		this.pieceTable = pieceTable;

		this.startIndexSignal = createSignal(startIndex);
		this.endIndexSignal = createSignal(endIndex);
		this.startLineSignal = createSignal<number>(startLine);
		this.endLineSignal = createSignal<number>(endLine);
		this.cachedContentSignal = createSignal("");
		this.directionSignal = createSignal<SelectionDirection>(
			SelectionDirection.Forward,
		);

		this.updateCachedContent();
	}

	private updateCachedContent(): void {
		const startIndex = this.startIndexSignal[0]();
		const endIndex = this.endIndexSignal[0]();
		const content = this.pieceTable.extractText(startIndex, endIndex);
		this.cachedContentSignal[1](content);
	}

	get content(): string {
		return this.cachedContentSignal[0]();
	}

	get startIndex(): number {
		return this.startIndexSignal[0]();
	}

	get endIndex(): number {
		return this.endIndexSignal[0]();
	}

	get startLine(): number {
		return this.startLineSignal[0]();
	}

	get endLine(): number {
		return this.endLineSignal[0]();
	}

	get direction(): SelectionDirection {
		return this.directionSignal[0]();
	}

	isEmpty(): boolean {
		return this.startIndex === this.endIndex && this.startLine === this.endLine;
	}

	length(): number {
		return this.cachedContentSignal[0]().length;
	}

	expandTo(newEndIndex: number): void {
		this.endIndexSignal[1](newEndIndex);
		this.updateCachedContent();
	}

	handleSelection(
		direction: SelectionDirection,
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		if (this.isEmpty()) {
			this.startNewSelection(direction, cursor, prevLineIndex, lineEndIndex);
			this.directionSignal[1](direction);
		} else {
			this.updateSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines);
		}
		this.updateCachedContent();
	}

    private startNewSelection(
        direction: SelectionDirection,
        cursor: Cursor,
        prevLineIndex: number,
        lineEndIndex: number,
    ): void {
        switch (direction) {
            case SelectionDirection.Forward:
                // Handle new line
                if (cursor.basis === lineEndIndex) {
                } else {
                    this.startLineSignal[1](cursor.line);
                    this.endLineSignal[1](cursor.line);
                    this.startIndexSignal[1](cursor.character);
                    this.endIndexSignal[1](cursor.character + 1);
                }
                break;
            case SelectionDirection.Backward:
                this.startLineSignal[1](cursor.line);
                this.endLineSignal[1](cursor.line);
                if (cursor.character > 0) {
                    this.startIndexSignal[1](cursor.character - 1);
                    this.endIndexSignal[1](cursor.character);
                } else if (cursor.line > 0) {
                    this.startIndexSignal[1](prevLineIndex);
                    this.endIndexSignal[1](cursor.character);
                    this.startLineSignal[1](cursor.line - 1);
                } else {
                    this.startIndexSignal[1](cursor.character);
                    this.endIndexSignal[1](cursor.character);
                }
                break;
            case SelectionDirection.Up:
                this.startLineSignal[1](cursor.line - 1);
                this.endLineSignal[1](cursor.line);
                this.startIndexSignal[1](cursor.character);
                this.endIndexSignal[1](cursor.character);
                break;
            case SelectionDirection.Down:
                this.startLineSignal[1](cursor.line);
                this.endLineSignal[1](cursor.line + 1);
                this.startIndexSignal[1](cursor.character);
                this.endIndexSignal[1](cursor.character);
                break;
        }
    }

    private normalizeSelection(
    ): void {
        if (this.startLine > this.endLine) {
            const tmp = this.startLineSignal[0]();
            this.startLineSignal[1](this.endLineSignal[0]());
            this.endLineSignal[1](tmp);
        }

        if (this.startIndex > this.endIndex && this.endLine === this.startLine) {
            const tmp = this.startIndexSignal[0]();
            this.startIndexSignal[1](this.endIndexSignal[0]());
            this.endIndexSignal[1](tmp);
        }
    }

	private contractSelection(
		direction: SelectionDirection,
		cursor: Cursor,
        lineEndIndex: number,
        prevLineIndex: number,
	): void {
		if (this.isEmpty()) {
			return;
		}

		switch (direction) {
			case SelectionDirection.Forward:
                // Handle new line
                if (cursor.basis === lineEndIndex) {
                    this.startLineSignal[1](this.startLine + 1);
                    this.startIndexSignal[1](0);
                } else {
                    this.startIndexSignal[1](this.startIndex + 1);
                }
				break;
			case SelectionDirection.Backward:
                // Handle new line
                if (cursor.basis === 0) {
                    this.endLineSignal[1](this.endLine - 1);
                    this.endIndexSignal[1](prevLineIndex);
                } else {
                    this.endIndexSignal[1](this.endIndex - 1);
                }
				break;
			case SelectionDirection.Up:
				this.endLineSignal[1](this.endLine - 1);
				this.endIndexSignal[1](cursor.basis);
                this.normalizeSelection();
                console.log(this.startIndex);
                console.log(this.endIndex);
                console.log(this.startLine);
                console.log(this.endLine);
				break;
			case SelectionDirection.Down:
				this.startLineSignal[1](this.startLine + 1);
				this.startIndexSignal[1](cursor.basis);
				break;
		}
	}

	private expandSelection(
		direction: SelectionDirection,
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		switch (direction) {
			case SelectionDirection.Forward: {
				if (this.endIndex === lineEndIndex) {
					// Move to start of next line
					if (cursor.line < totalLines - 1) {
						this.endIndexSignal[1](0);
						this.endLineSignal[1](this.endLine + 1);
					}
				} else {
					this.endIndexSignal[1](this.endIndex + 1);
				}
				break;
			}
			case SelectionDirection.Backward: {
				if (this.startIndex === 0) {
					if (cursor.line > 0) {
						// Move to end of previous line
						const newStartIndex = Math.max(0, prevLineIndex);
						this.startIndexSignal[1](newStartIndex);
						this.startLineSignal[1](this.startLine - 1);
					}
				} else {
					this.startIndexSignal[1](this.startIndex - 1);
				}
				break;
			}
			case SelectionDirection.Up:
				this.startLineSignal[1](Math.max(0, cursor.line - 1));
				this.startIndexSignal[1](cursor.basis);
				break;
			case SelectionDirection.Down:
				this.endLineSignal[1](Math.min(totalLines, cursor.line + 1));
				this.endIndexSignal[1](cursor.basis);
				break;
		}
	}

	private handleInversion(direction: SelectionDirection, cursor: Cursor) {
		// Swap start and end indices
		const tmpIndex = this.startIndex;
		this.startIndexSignal[1](this.endIndex);
		this.endIndexSignal[1](tmpIndex);

		// Adjust lines based on direction AND cursor position
		if (direction === SelectionDirection.Up) {
			this.startLineSignal[1](cursor.line - 1);
		} else if (direction === SelectionDirection.Down) {
			this.endLineSignal[1](cursor.line + 1);
		}

		// Update direction
		this.directionSignal[1](direction);
	}

	private updateSelection(
		direction: SelectionDirection,
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		const expandOrContract = (
			expandDirections: SelectionDirection[],
			contractCondition: boolean,
		) => {
			if (expandDirections.includes(this.direction)) {
				this.expandSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines);
			} else if (contractCondition) {
				this.contractSelection(direction, cursor, lineEndIndex, prevLineIndex);
			}
		};

		switch (direction) {
			case SelectionDirection.Forward:
				expandOrContract(
					[SelectionDirection.Forward, SelectionDirection.Down],
					true,
				);
				break;
			case SelectionDirection.Backward:
				expandOrContract(
					[SelectionDirection.Backward, SelectionDirection.Up],
					true,
				);
				break;
			case SelectionDirection.Up:
				expandOrContract(
					[SelectionDirection.Up, SelectionDirection.Backward],
					cursor.line !== this.startLine,
				);
				if (
					this.direction === SelectionDirection.Forward &&
					cursor.line === this.startLine
				) {
					this.handleInversion(SelectionDirection.Up, cursor);
				} else if (
					this.direction === SelectionDirection.Down &&
					this.startLine === this.endLine
				) {
					this.handleInversion(SelectionDirection.Up, cursor);
				}
				break;

			case SelectionDirection.Down:
				expandOrContract(
					[SelectionDirection.Down, SelectionDirection.Forward],
					cursor.line !== this.endLine,
				);
				if (
					this.direction === SelectionDirection.Backward &&
					cursor.line === this.endLine
				) {
					this.handleInversion(SelectionDirection.Down, cursor);
				} else if (
					this.direction === SelectionDirection.Up &&
					this.startLine === this.endLine
				) {
					this.handleInversion(SelectionDirection.Down, cursor);
				}
				break;
		}

        this.normalizeSelection();
	}

	handleSelectionLeft(
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Backward,
			cursor,
			lineEndIndex,
            prevLineIndex,
			totalLines,
		);
	}

	handleSelectionRight(
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Forward,
			cursor,
			lineEndIndex,
            prevLineIndex,
			totalLines,
		);
	}

	handleSelectionUp(
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Up,
			cursor,
			lineEndIndex,
            prevLineIndex,
			totalLines,
		);
	}

	handleSelectionDown(
		cursor: Cursor,
		lineEndIndex: number,
        prevLineIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Down,
			cursor,
			lineEndIndex,
            prevLineIndex,
			totalLines,
		);
	}

	setStartIndex(newStartIndex: number): void {
		this.startIndexSignal[1](newStartIndex);
		this.updateCachedContent();
	}

	setEndIndex(newEndIndex: number): void {
		this.endIndexSignal[1](newEndIndex);
		this.updateCachedContent();
	}

	reset(): void {
		this.startIndexSignal[1](-100);
		this.endIndexSignal[1](-100);
		this.startLineSignal[1](-100);
		this.endLineSignal[1](-100);
		this.directionSignal[1](SelectionDirection.Forward);
		this.updateCachedContent();
		this.cachedContentSignal[1]("");
	}
}
