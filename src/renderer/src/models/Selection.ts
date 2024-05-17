import { type Signal, createSignal } from "solid-js";
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

	constructor(pieceTable: PieceTable, startIndex: number, endIndex: number, public startLine: number, public endLine: number) {
		this.pieceTable = pieceTable;

		this.startIndexSignal = createSignal(startIndex);
		this.endIndexSignal = createSignal(endIndex);
        this.startLineSignal = createSignal<number>(0);
        this.endLineSignal = createSignal<number>(0);
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

	get direction(): SelectionDirection {
		return this.directionSignal[0]();
	}

	isEmpty(): boolean {
		return this.startIndex === this.endIndex;
	}

	length(): number {
		return this.endIndex - this.startIndex;
	}

	expandTo(newEndIndex: number): void {
		this.endIndexSignal[1](newEndIndex);
		this.updateCachedContent();
	}

	handleSelection(direction: SelectionDirection): void {
		switch (this.direction) {
			case SelectionDirection.Forward:
				{
					// If the direction is the same as the current direction,
					// expand the end index by 1
					if (direction === this.direction) {
                        this.endLineSignal[1](this.endLine + 1);
					} else {
						// Otherwise, contract the end index by 1
						this.startIndexSignal[1](this.endIndex - 1);
					}
				}
				break;
			case SelectionDirection.Backward:
				{
					// If the direction is the same as the current direction,
					// expand the start index by 1
					if (direction === this.direction) {
						this.startIndexSignal[1](this.startIndex + 1);
					} else {
						// Otherwise, contract the start index by 1
						this.endIndexSignal[1](this.startIndex - 1);
					}
				}
				break;
			case SelectionDirection.Up:
				{
					// If the direction is the same as the current direction,
					// expand the start index by 1
					if (direction === this.direction) {
						this.startIndexSignal[1](this.startIndex + 1);
					} else {
						// Otherwise, contract the start index by 1
						this.endIndexSignal[1](this.startIndex - 1);
					}
				}
				break;
			case SelectionDirection.Down:
				// If the direction is the same as the current direction,
				// expand the start index by 1
				if (direction === this.direction) {
					this.startIndexSignal[1](this.startIndex + 1);
				} else {
					// Otherwise, contract the start index by 1
					this.endIndexSignal[1](this.startIndex - 1);
				}
				break;
		}
	}

	expandLeft(): void {
        this.handleSelection(SelectionDirection.Backward);
		this.updateCachedContent();
	}

	expandRight(): void {
        this.handleSelection(SelectionDirection.Forward);
        this.updateCachedContent();
	}

	expandUp(): void {
        this.handleSelection(SelectionDirection.Up);
        this.updateCachedContent();
	}

	expandDown(): void {
        this.handleSelection(SelectionDirection.Down);
        this.updateCachedContent();
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
		this.startIndexSignal[1](0);
		this.endIndexSignal[1](0);
		this.updateCachedContent();
	}
}
