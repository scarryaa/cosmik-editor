import { findNextWordOrSymbol, findPreviousWordOrSymbol } from "../util/text";
import type { Content } from "./Editor";

export type CursorPosition = {
	line: number;
	character: number;
	characterBasis: number;
};

export enum CursorDirection {
	Left = "left",
	Right = "right",
	Up = "up",
	Down = "down",
}

export class Cursor {
	private position: CursorPosition;
	private direction: CursorDirection;

	constructor(
		private line = 0,
		private character = 0,
		private characterBasis = 0,
	) {
		this.position = { line, character, characterBasis };
		this.direction = CursorDirection.Right;
	}

	moveUp = (content: Content): void => {
		// If at first line, move to the start
		if (this.isAtFirstLine()) {
			this.moveToBeginningOfLine();
			this.direction = CursorDirection.Up;
		} else if (this.position.line > 0) {
			// Try to move to character basis
			const newLine = this.position.line - 1;
			this.position.line = newLine;
			this.position.character = Math.min(
				this.position.characterBasis,
				content[newLine].getContent().length,
			);
			this.direction = CursorDirection.Up;
		}
	};

	moveDown = (content: Content, totalLines: number): void => {
		// If at the last line, move to the end
		if (this.isAtLastLine(totalLines)) {
			this.moveToEndOfLine(content[totalLines - 1].getContent().length);
			this.direction = CursorDirection.Down;
		} else if (this.position.line < totalLines - 1) {
			// Try to move to character basis
			const newLine = this.position.line + 1;
			this.position.line = newLine;
			this.position.character = Math.min(
				this.position.characterBasis,
				content[newLine].getContent().length,
			);
			this.direction = CursorDirection.Down;
		}
	};

	moveLeft = (content: Content): void => {
		if (this.position.character === 0) {
			// If not on the first line, move up a line
			if (this.position.line > 0) {
				this.position.line -= 1;
				// Set character position to the end of the previous line
				this.position.character =
					content[this.position.line].getContent().length;
				this.direction = CursorDirection.Left;
			}
			// If on the first line, do nothing
		} else {
			// Check for a tab (4 spaces) before the cursor and move left by 4 if found
			const isTabBeforeCursor =
				content[this.position.line]
					.getContent()
					.substring(this.position.character - 4, this.position.character) ===
				"    ";
			if (isTabBeforeCursor) {
				this.position.character -= 4;
			} else {
				// Normal left movement within the line
				this.position.character -= 1;
			}
			this.direction = CursorDirection.Left;
		}

		this.position.characterBasis = this.position.character;
	};

	moveRight = (content: Content): void => {
		const currentLineLength = content[this.position.line].getContent().length;
		if (this.position.character >= currentLineLength) {
			// Move to the next line if not the last line
			if (this.position.line < content.length - 1) {
				this.position.line += 1;
				this.position.character = 0; // Start at the beginning of the next line
			}
			this.direction = CursorDirection.Right;
			// If it's the last line and character is at the end, do nothing
		} else {
			// Check for a tab (4 spaces) after the cursor and move right by 4 if found
			const isTabAfterCursor =
				content[this.position.line]
					.getContent()
					.substring(this.position.character, this.position.character + 4) ===
				"    ";
			if (isTabAfterCursor) {
				this.position.character += 4;
			} else {
				// Normal right movement within the line
				this.position.character += 1;
			}
			this.direction = CursorDirection.Right;
		}

		this.position.characterBasis = this.position.character;
	};

	moveToBeginningOfLine = (): void => {
		this.position.character = 0;
		this.position.characterBasis = 0;
		this.direction = CursorDirection.Left;
	};

	moveToEndOfLine = (lineLength: number): void => {
		this.position.character = lineLength;
		this.position.characterBasis = lineLength;
		this.direction = CursorDirection.Right;
	};

	moveToPreviousWord = (maxLines: number, content: Content): void => {
		const newPosition = findPreviousWordOrSymbol(content, this.position);
		this.setPosition(
			maxLines,
			content,
			newPosition.character,
			newPosition.line,
			newPosition.characterBasis,
		);
	};

	moveToNextWord = (maxLines: number, content: Content): void => {
		const newPosition = findNextWordOrSymbol(content, this.position);
		this.setPosition(
			maxLines,
			content,
			newPosition.character,
			newPosition.line,
			newPosition.character,
		);
	};

	moveToEndOfDocument = (
		maxLines: number,
		content: Content,
		character: number,
		line: number,
	): void => {
		this.setPosition(maxLines, content, character, line, character);
	};

	setPosition = (
		maxLines: number,
		content: Content,
		character: number,
		line: number,
		basis?: number,
	): void => {
		// Capture the old position
		const oldPosition = { ...this.position };
	
		// Update the position with the new values
		this.position = {
			character: Math.max(
				0,
				Math.min(
					basis ?? character,
					content[Math.max(0, Math.min(line, maxLines - 1))].getContent().length,
				),
			),
			line: Math.max(0, Math.min(line, maxLines - 1)),
			characterBasis: basis ?? this.position.characterBasis,
		};
	
		// Determine the direction based on old and new positions
		if (this.position.line < oldPosition.line) {
			this.direction = CursorDirection.Up;
		} else if (this.position.line > oldPosition.line) {
			this.direction = CursorDirection.Down;
		} else if (this.position.character < oldPosition.character) {
			this.direction = CursorDirection.Left;
		} else if (this.position.character > oldPosition.character) {
			this.direction = CursorDirection.Right;
		}
	};

	getDirection = (): CursorDirection => {
		return this.direction;
	}

	getPosition = (): CursorPosition => {
		return this.position;
	};

	isAtFirstLine = (): boolean => {
		return this.position.line === 0;
	};

	isAtLastLine = (numberOfLines: number): boolean => {
		return this.position.line === numberOfLines - 1;
	};

	isAtBeginningOfDocument = (): boolean => {
		return this.isAtBeginningOfLine() && this.position.line === 0;
	};

	isAtBeginningOfLine = (): boolean => {
		return this.getPosition().character === 0;
	};

	isAtEndofLine = (lineLength: number): boolean => {
		return this.getPosition().character === lineLength;
	};
}
