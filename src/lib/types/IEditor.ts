import type { Cursor } from "../models/Cursor.svelte";
import type { PieceTable } from "../models/PieceTable.svelte";

export interface IEditor {
    content: PieceTable;
    cursors: Cursor[];
    lineBreakIndices: number[];
    id: string;
    setContent(text: string): void;
    addLine(cursorIndex: number): void;
    add(text: string, cursorIndex: number): void;
    backspace(cursorIndex: number): void;
    moveRight(cursorIndex: number): void;
    moveLeft(cursorIndex: number): void;
    moveUp(cursorIndex: number): void;
    moveDown(cursorIndex: number): void;
    addCursor(line: number, column: number): void;
    removeCursor(cursorIndex: number): void;
    calculateGlobalIndex(line: number, column: number): number;
    calculateLineBreaks(): number[];
    getLineContent(line: number): string;
    getLineLength(line: number): number;
}