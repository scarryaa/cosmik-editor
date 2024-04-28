import type { Content } from "./Editor";

type CursorPosition = { line: number; character: number };

export class Cursor {
	private position: CursorPosition;

	constructor() {
		this.position = { line: 0, character: 0 };
	}

    moveUp = (): void => {
        this.position.line = Math.max(0, this.position.line - 1);
    };
    
    moveDown = (): void => {
        this.position.line += 1;
    };
    
    moveLeft = (content: Content): void => {
        if (this.position.character === 0) {
            // If not on the first line, move up a line
            if (this.position.line > 0) {
                this.position.line -= 1;
                // Set character position to the end of the previous line
                this.position.character = content[this.position.line].content.length;
            }
            // If on the first line, do nothing
        } else {
            // Normal left movement within the line
            this.position.character -= 1;
        }
    };
    
    moveRight = (content: Content): void => {
        const currentLineLength = content[this.position.line].content.length;
        if (this.position.character >= currentLineLength) {
            // Move to the next line if not the last line
            if (this.position.line < content.length - 1) {
                this.position.line += 1;
                this.position.character = 0; // Start at the beginning of the next line
            }
            // If it's the last line and character is at the end, do nothing
        } else {
            // Normal right movement within the line
            this.position.character += 1;
        }
    };
    
    setPosition = (character: number, line: number): void => {
        this.position = { character, line };
    };

    getPosition = (): CursorPosition => {
        return this.position;
    }
}
