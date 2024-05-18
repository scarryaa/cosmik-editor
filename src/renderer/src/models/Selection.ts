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
		totalLines: number,
	): void {
		if (this.isEmpty()) {
			this.startNewSelection(direction, cursor);
			this.directionSignal[1](direction);
		} else {
			this.updateSelection(direction, cursor, lineEndIndex, totalLines);
		}
		this.updateCachedContent();
	}

	private startNewSelection(
		direction: SelectionDirection,
		cursor: Cursor,
	): void {
		switch (direction) {
			case SelectionDirection.Forward:
				this.startLineSignal[1](cursor.line);
				this.endLineSignal[1](cursor.line);
				this.startIndexSignal[1](cursor.character);
				this.endIndexSignal[1](cursor.character + 1);
				break;
			case SelectionDirection.Backward:
				this.startLineSignal[1](cursor.line);
				this.endLineSignal[1](cursor.line);
				this.startIndexSignal[1](cursor.character - 1);
				this.endIndexSignal[1](cursor.character);
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

	private contractSelection(direction: SelectionDirection): void {
		if (this.isEmpty()) {
			return;
		}

		switch (direction) {
			case SelectionDirection.Forward:
				this.startIndexSignal[1](this.startIndex + 1);
				break;
			case SelectionDirection.Backward:
				this.endIndexSignal[1](this.endIndex - 1);
				break;
			case SelectionDirection.Up:
				this.endLineSignal[1](this.endLine - 1);
				break;
			case SelectionDirection.Down:
				this.startLineSignal[1](this.startLine + 1);
				break;
		}
	}

	private expandSelection(
		direction: SelectionDirection,
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		switch (direction) {
			case SelectionDirection.Forward:
				this.endIndexSignal[1](Math.min(lineEndIndex, this.endIndex + 1));
				break;
			case SelectionDirection.Backward:
				this.startIndexSignal[1](Math.max(0, this.startIndex - 1));
				break;
			case SelectionDirection.Up:
				this.startLineSignal[1](Math.max(0, cursor.line - 1));
				break;
			case SelectionDirection.Down:
				this.endLineSignal[1](Math.min(totalLines, cursor.line + 1));
				break;
		}
	}

	private updateSelection(
		direction: SelectionDirection,
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		const expandOrContract = (
			expandDirections: SelectionDirection[],
			contractCondition: boolean,
		) => {
			if (expandDirections.includes(this.direction)) {
				this.expandSelection(direction, cursor, lineEndIndex, totalLines);
			} else if (contractCondition) {
				this.contractSelection(direction);
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
					this.handleForwardsToUpInversion();
				}

                if (
                    this.direction === SelectionDirection.Down &&
                    cursor.line === this.endLine
                ) {
                    this.handleUpToDownInversion();
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
					this.handleBackwardsToDownInversion();
				}

                if (
                    this.direction === SelectionDirection.Up &&
                    cursor.line === this.startLine
                ) {
                    this.handleDownToUpInversion();
                }
				break;
		}
	}

	private handleForwardsToUpInversion(): void {
		// Start index becomes end index
		// End index becomes start index
		// Start line -= 1
		// End line stays the same
		const tmp = this.endIndex;
		this.endIndexSignal[1](this.startIndex);
		this.startIndexSignal[1](tmp);
		this.startLineSignal[1](this.startLine - 1);
		this.directionSignal[1](SelectionDirection.Up);
	}

	private handleBackwardsToDownInversion(): void {
		// Start index becomes end index
		// End index becomes start index
		// End line += 1
		// Start line stays the same
		const tmp = this.startIndex;
		this.startIndexSignal[1](this.endIndex);
		this.endIndexSignal[1](tmp);
		this.endLineSignal[1](this.endLine + 1);
		this.directionSignal[1](SelectionDirection.Down);
	}

	private handleDownToUpInversion(): void {
		// End line -= 1
		this.endLineSignal[1](this.endLine - 1);
		this.directionSignal[1](SelectionDirection.Up);
	}

	private handleUpToDownInversion(): void {
		// Start line += 1
		this.startLineSignal[1](this.startLine + 1);
		this.directionSignal[1](SelectionDirection.Down);
	}

	handleSelectionLeft(
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Backward,
			cursor,
			lineEndIndex,
			totalLines,
		);
	}

	handleSelectionRight(
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Forward,
			cursor,
			lineEndIndex,
			totalLines,
		);
	}

	handleSelectionUp(
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Up,
			cursor,
			lineEndIndex,
			totalLines,
		);
	}

	handleSelectionDown(
		cursor: Cursor,
		lineEndIndex: number,
		totalLines: number,
	): void {
		this.handleSelection(
			SelectionDirection.Down,
			cursor,
			lineEndIndex,
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
