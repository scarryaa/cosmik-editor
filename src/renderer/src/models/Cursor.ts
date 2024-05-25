import { createSignal } from "solid-js";

export interface ICursor {
	character: number;
	line: number;
	basis: number;
}

export class Cursor {
	private _character: [() => number, (v: number) => void];
	private _line: [() => number, (v: number) => void];
	private _basis: [() => number, (v: number) => void];

	constructor(character = 0, line = 0) {
		this._character = createSignal(character);
		this._line = createSignal(line);
		this._basis = createSignal(0);
	}

	get character() {
		return this._character[0]();
	}

	set character(value: number) {
		this._character[1](value);
	}

	get line() {
		return this._line[0]();
	}

	set line(value: number) {
		this._line[1](value);
	}

	get basis() {
		return this._basis[0]();
	}

	set basis(value: number) {
		this._basis[1](value);
	}

	moveTo(
		character: number,
		line: number,
		lineLength: number,
		totalLines: number,
	) {
		let adjustedCharacter = character;
		let adjustedLine = line;

		// Bounds checking
		if (character < 0) {
			adjustedCharacter = 0;
		} else if (character > lineLength) {
			adjustedCharacter = lineLength;
		}

		if (line < 0) {
			adjustedLine = 0;
		} else if (line > totalLines) {
			adjustedLine = totalLines;
		}

		this._basis[1](adjustedCharacter);
		this._character[1](adjustedCharacter);
		this._line[1](adjustedLine);
	}

	moveRight(lineLength: number, totalLines: number) {
		if (this.character < lineLength) {
			this._character[1](this.character + 1);
			this._basis[1](this.character);
		} else if (this.line < totalLines - 1) {
			this._line[1](this.line + 1);
			this._character[1](0);
			this._basis[1](0);
		}
	}

	moveLeft(lineLength: number) {
		if (this.character > 0) {
			this._character[1](this.character - 1);
			this._basis[1](this.character);
		} else if (this.line > 0) {
			this._line[1](this.line - 1);
			this._character[1](lineLength);
			this._basis[1](lineLength);
		}
	}

	moveUp(prevLineLength: number) {
		if (this.line > 0) {
			this._line[1](this.line - 1);
			this._character[1](Math.min(prevLineLength, this.basis));
		}
	}

	moveDown(totalLines: number, nextLineLength: number) {
		if (this.line < totalLines - 1) {
			this._line[1](this.line + 1);
			this._character[1](Math.min(this.basis, nextLineLength));
		}
	}
}
