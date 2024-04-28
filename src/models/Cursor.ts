import { cursorPosition } from "../stores/cursorPosition";

export interface CursorPosition {
	cursorLine: number;
	cursorCharacter: number;
	cursorBasis: number;
}

export class Cursor {
	position: CursorPosition;

	constructor() {
		this.position = { cursorCharacter: 0, cursorLine: 1, cursorBasis: 0 };
		cursorPosition.set({ cursorLine: 1, cursorCharacter: 0 });
	}

	private setCursorPosition() {
		cursorPosition.set({
			cursorLine: this.position.cursorLine,
			cursorCharacter: this.position.cursorCharacter,
		});
	}

	moveCursor(newPosition: Partial<CursorPosition>) {
		this.position = {
			cursorBasis: newPosition.cursorBasis ?? this.position.cursorBasis,
			cursorCharacter:
				newPosition.cursorCharacter ?? this.position.cursorCharacter,
			cursorLine: newPosition.cursorLine ?? this.position.cursorLine,
		};
		this.setCursorPosition();
	}

	moveCursorLeft(previousLineContentLength?: number) {
		// If we are at the beginning of the first line, return
		if (this.position.cursorCharacter === 0 && this.position.cursorLine === 1)
			return;

		if (this.isAtLineStart()) {
			if (typeof previousLineContentLength === "number") {
				// Move cursor to the end of the previous line
				this.moveCursor({
					cursorCharacter: previousLineContentLength,
					cursorLine: this.position.cursorLine - 1,
				});
			}
		} else {
			// Move the cursor one character to the left
			this.moveCursor({ cursorCharacter: this.position.cursorCharacter - 1 });
		}
	}

	moveCursorRight(currentLineContentLength: number, totalLines: number) {
		// If we are at the end of the last line, return
		if (
			this.position.cursorCharacter === currentLineContentLength &&
			this.position.cursorLine === totalLines
		)
			return;

		if (this.isAtLineEnd(currentLineContentLength)) {
			// Move cursor to start of next line
			this.moveCursor({
				cursorCharacter: 0,
				cursorLine: this.position.cursorLine + 1,
			});
		} else {
			// Move the cursor one character to the right
			this.shiftCursor(totalLines, { deltaChar: 1 });
		}
	}

	moveCursorUp(previousLineContentLength: number) {
		// If we are at the first line, return
		if (this.position.cursorLine === 1) return;

		this.moveCursor({
			cursorCharacter: Math.min(
				this.position.cursorCharacter,
				previousLineContentLength,
			),
			cursorLine: this.position.cursorLine - 1,
		});
	}

	moveCursorDown(nextLineContentLength: number, totalLines: number) {
		// If we are at the last line, return
		if (this.position.cursorLine === totalLines) return;

		this.moveCursor({
			cursorCharacter: Math.min(
				this.position.cursorCharacter,
				nextLineContentLength,
			),
			cursorLine: this.position.cursorLine + 1,
		});
	}

	shiftCursor(
		maxLines: number,
		adjustment: { deltaChar?: number; deltaLine?: number },
	) {
		// Bounds checking
		if (
			adjustment?.deltaLine &&
			this.position.cursorLine + adjustment.deltaLine < 1
		) {
			this.position = {
				cursorBasis: this.position.cursorBasis + (adjustment?.deltaChar ?? 0),
				cursorCharacter:
					this.position.cursorCharacter + (adjustment?.deltaChar ?? 0),
				cursorLine: 1,
			};
		} else if (
			adjustment?.deltaLine &&
			this.position.cursorLine + adjustment.deltaLine > maxLines
		) {
			this.position = {
				cursorBasis: this.position.cursorBasis + (adjustment?.deltaChar ?? 0),
				cursorCharacter:
					this.position.cursorCharacter + (adjustment?.deltaChar ?? 0),
				cursorLine: maxLines + 1,
			};
		} else {
			this.position = {
				cursorBasis: this.position.cursorBasis + (adjustment?.deltaChar ?? 0),
				cursorCharacter:
					this.position.cursorCharacter + (adjustment?.deltaChar ?? 0),
				cursorLine: this.position.cursorLine + (adjustment?.deltaLine ?? 0),
			};
		}
		this.setCursorPosition();
	}

	isAtLineStart() {
		return this.position.cursorCharacter === 0;
	}

	isAtLineEnd(lineLength: number) {
		return this.position.cursorCharacter === lineLength;
	}
}
