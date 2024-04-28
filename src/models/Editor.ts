import { Cursor } from "./Cursor";

export type Content = Array<{ number: number; content: string }>;

export class Editor {
	private static EDITOR_DEFAULT_CONTENT = "";

	private content: Content;
	private cursor: Cursor;

	constructor() {
		this.cursor = new Cursor();
		this.content = this.parseInitialContent(Editor.EDITOR_DEFAULT_CONTENT);
	}

	private parseInitialContent = (content: string): Content => {
		return content.split("\n").map((lineContent, index) => ({
			number: index + 1,
			content: lineContent,
		}));
	};

	private resetContent = (): void => {
		this.content = Array.from(Editor.EDITOR_DEFAULT_CONTENT).map(
			(line, index) => {
				return {
					number: index + 1,
					content: line,
				};
			},
		);
	};

	setContent = (content: string): void => {
		this.content = this.parseInitialContent(content);
	};

	getContent = (): Content => {
		return this.content;
	};

	getContentString = (): string => {
		return this.content.map((line) => line.content).join("\n");
	};

	insertCharacter = (char: string): void => {
		this.setContent(this.getContentString() + char);
		this.cursor.moveRight(this.content);
	};

	deleteCharacter = (): void => {
		this.setContent(
			this.getContentString().substring(0, this.getContentString().length - 1),
		);
		this.cursor.moveLeft(this.content);
	};

	// Cursor

    cursorIsAtBeginningOfLine = (): boolean => {
        return this.cursor.getPosition().character === 0;
    }

    getCursorLine = (): number => {
        return this.cursor.getPosition().line;
    }

    cursorIsAtBeginningOfDocument = (): boolean => {
        return this.cursorIsAtBeginningOfLine() && this.getCursorLine() === 0;
    }

	moveCursorUp = (): void => {
		this.cursor.moveUp();
	};

	moveCursorDown = (): void => {
		this.cursor.moveDown();
	};

	moveCursorLeft = (): void => {
		this.cursor.moveLeft(this.content);
	};

	moveCursorRight = (): void => {
		this.cursor.moveRight(this.content);
	};

	getCursor = (): Cursor => {
		return this.cursor;
	};
}
