export class Line {
	private content: string;
	private selectionStart: number;
	private selectionEnd: number;
	private number: number;

	constructor(content = "", number = 0) {
		this.content = content;
		this.selectionStart = -99;
		this.selectionEnd = -99;
		this.number = number;
	}

	setContent = (newContent: string) => {
		this.content = newContent;
	};

	appendContent = (additionalContent: string) => {
		this.content += additionalContent;
	};

	getContent = (): string => {
		return this.content;
	};

	getLength = (): number => {
		return this.content.length;
	};

	isSelected = (): boolean => {
		return this.selectionStart !== this.selectionEnd;
	};

	setSelectionStart = (start: number): void => {
		this.selectionStart = start;
	};

	setSelectionEnd = (end: number): void => {
		this.selectionEnd = end;
	};

	getSelectionStart = (): number => {
		return this.selectionStart;
	};

	getSelectionEnd = (): number => {
		return this.selectionEnd;
	};

	setLineNumber = (number: number): void => {
		this.number = number;
	};

	getLineNumber = (): number => {
		return this.number;
	};

	selectAll = (): void => {
		this.selectionStart = 0;
		this.selectionEnd = this.content.length;
	};
}
