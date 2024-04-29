export class Selection {
	private selectionStart: number;
	private selectionEnd: number;
	private content: string;

	constructor(selectionStart = 0, selectionEnd = 0, content = "") {
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.content = content;
	}

	public getSelectionStart(): number {
		return this.selectionStart;
	}

	public setSelectionStart(start: number): void {
		this.selectionStart = start;
	}

	public getSelectionEnd(): number {
		return this.selectionEnd;
	}

	public setSelectionEnd(end: number): void {
		this.selectionEnd = end;
	}

	public getContent(): string {
		return this.content;
	}

	public setContent(content: string): void {
		this.content = content;
	}

	public updateSelection(start: number, end: number, content: string): void {
		this.selectionStart = start;
		this.selectionEnd = end;
		this.content = content;
	}
}
