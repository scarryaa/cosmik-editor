import type { Content } from "./Editor";

export type SelectionProps = { line: number; character: number };

export class Selection {
	private selectionStart: SelectionProps;
	private selectionEnd: SelectionProps;
	private content: string;

	constructor(
		selectionStart = { line: -1, character: -1 },
		selectionEnd = { line: -1, character: -1 },
		content = "",
	) {
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.content = content;
	}

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
		this.selectionEnd = { line: totalLines - 1, character: textLength + 1 };
		this.content = this.getContent(content);
	};

	public calculateTotalCharactersSelected = (): number => {
		let totalCharacters = 0;
		// If the selection is within a single line
		if (this.selectionStart.line === this.selectionEnd.line) {
			totalCharacters =
				this.selectionEnd.character - this.selectionStart.character;
		} else {
			// Calculate characters from the start line to the end of the line
			totalCharacters +=
				this.content[this.selectionStart.line].length -
				this.selectionStart.character;
			// Add characters for lines fully within the selection
			for (
				let i = this.selectionStart.line + 1;
				i < this.selectionEnd.line;
				i++
			) {
				totalCharacters += this.content[i].length;
			}
			// Add characters from the start of the end line to the selection end
			totalCharacters += this.selectionEnd.character;
		}
		return totalCharacters;
	};

	public getContent = (content: Content): string => {
		return this.content;
	};

	public isSelection = (): boolean => {
		return this.selectionStart.character !== this.selectionEnd.character;
	};

	public clearSelection = (): void => {
		this.selectionStart = { line: -1, character: -1 };
		this.selectionEnd = { line: -1, character: -1 };
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
