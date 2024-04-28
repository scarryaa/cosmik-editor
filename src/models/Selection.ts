import type { CursorPosition } from "./Cursor";

export type SelectionProps = { line: number; character: number };

export class Selection {
	private start: SelectionProps;
	private end: SelectionProps;
	private hasSelection: boolean;

	constructor() {
		this.start = { line: 0, character: 0 };
		this.end = { line: 0, character: 0 };
		this.hasSelection = false;
	}

	private normalize() {
		// Ensure the start is always before the end
		if (
			this.start.line > this.end.line ||
			(this.start.line === this.end.line &&
				this.start.character > this.end.character)
		) {
			const temp = this.start;
			this.start = this.end;
			this.end = temp;
		}
	}

    deleteSelection(lines: Array<{ number: number; content: string }>): {
        lines: Array<{ number: number; content: string }>;
        newPosition: CursorPosition;
    } {
        const adjustedStart = this.start.line - 1 === -1 ? 0 : this.start.line - 1;
    
        if (this.start.line !== this.end.line) {

            // Handle multi-line selection
            lines[this.start.line - 1].content =
                lines[adjustedStart].content.substring(0, this.start.character) +
                lines[this.end.line - 1].content.substring(this.end.character);
            lines.splice(this.start.line, this.end.line - this.start.line);
    
            const newPosition = {
                lines: lines,
                newPosition: {
                    cursorBasis: this.start.character,
                    cursorCharacter: this.start.character,
                    cursorLine: this.start.line,
                },
            }
    
            this.clear();
    
            return newPosition;
        }
    
        // Handle single-line selection
        lines[this.start.line - 1].content =
            lines[adjustedStart].content.substring(0, this.start.character) +
            lines[adjustedStart].content.substring(this.end.character);
    
        const newPosition = {
            lines: lines,
            newPosition: {
                cursorBasis: this.start.character,
                cursorCharacter: this.start.character,
                cursorLine: this.start.line,
            },
        }
    
        this.clear();
    
        return newPosition;
    }

	setStart(line: number, character: number) {
		this.start = { line, character };
		this.hasSelection = false;
	}

	setEnd(line: number, character: number) {
		this.end = { line, character };
		this.hasSelection = true;
		this.normalize();
	}

	clear() {
		this.start = { ...this.start, line: 0, character: 0 };
		this.end = { ...this.end, line: 0, character: 0 };
		this.hasSelection = false;
	}

	isEmpty(): boolean {
		return (
			!this.hasSelection ||
			(this.start.line === this.end.line &&
				this.start.character === this.end.character)
		);
	}

	getSelectionRange() {
		if (!this.hasSelection) {
			return null;
		}

		return {
			start: this.start,
			end: this.end,
		};
	}
}
