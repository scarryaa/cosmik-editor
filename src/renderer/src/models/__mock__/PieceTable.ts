export class MockPieceTable {
	text: string;

	constructor(text: string) {
		this.text = text;
	}

	getText() {
		return this.text;
	}

	insert(text: string, index: number) {
		this.text = this.text.slice(0, index) + text + this.text.slice(index);
	}

	delete(index: number, length: number) {
		this.text = this.text.slice(0, index) + this.text.slice(index + length);
	}

	extractText(start: number, end: number) {
		return this.text.slice(start, end);
	}
}
