export class Cursor {
	line: number = $state(0);
	column: number = $state(0);

	constructor(line = 0, column = 0) {
		this.line = line;
		this.column = column;
	}

	moveTo = (line: number, column: number): void => {
		this.line = line;
		this.column = column;
	};

	moveUp = (): void => {
		if (this.line > 0) {
			this.line -= 1;
		}
	};

	moveDown = (totalLines: number, nextLineLength: number): void => {
        if (this.line < totalLines - 1) {
            this.line += 1;
            this.column = Math.min(this.column, nextLineLength);
        }
	};

	moveLeft = (lineLength: number): void => {
		if (this.column > 0) {
			this.column -= 1;
		} else if (this.line > 0) {
			this.line -= 1;
			this.column = lineLength;
		}
	};

	moveRight = (lineLength: number, totalLines: number): void => {
		if (this.column < lineLength) {
			this.column += 1;
		} else if (this.line < totalLines - 1) {
            this.line += 1;
            this.column = 0;
        }
	};
}
