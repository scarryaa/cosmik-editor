import { createSignal } from "solid-js";

export class Cursor {
	private _character: [() => number, (v: number) => void];
	private _line: [() => number, (v: number) => void];

	constructor(character = 0, line = 0) {
		this._character = createSignal(character);
		this._line = createSignal(line);
	}

	get character() {
		return this._character[0]();
	}

	get line() {
		return this._line[0]();
	}

	moveTo(character: number, line: number) {
		this._character[1](character);
		this._line[1](line);
	}

	moveRight(lineLength: number, totalLines: number) {
		if (this.character < lineLength) {
			this._character[1](this.character + 1);
		} else if (this.line < totalLines - 1) {
			this._line[1](this.line + 1);
			this._character[1](0);
		}
	}

	moveLeft(lineLength: number) {
		if (this.character > 0) {
			this._character[1](this.character - 1);
		} else if (this.line > 0) {
			this._line[1](this.line - 1);
			this._character[1](lineLength);
		}
	}

	moveUp() {
		if (this.line > 0) {
			this._line[1](this.line - 1);
		}
	}

	moveDown(totalLines: number, nextLineLength: number) {
		if (this.line < totalLines - 1) {
			this._line[1](this.line + 1);
			this._character[1](Math.min(this.character, nextLineLength));
		}
	}
}
