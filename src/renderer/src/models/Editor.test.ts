import { describe, expect, it } from "vitest";
import { Editor } from "./Editor";
import { Selection } from "./Selection";

describe("Editor", () => {
	it("initializes correctly with text and ID", () => {
		const text = "Initial content";
		const id = "editor1";
		const editor = new Editor(text, id);

		expect(editor.getText()).toBe(text);
		expect(editor.id).toBe(id);
		expect(editor.lineBreakIndices).toEqual([0]);
		expect(editor.cursors.length).toBe(1);
		expect(editor.selections.length).toBe(1);
	});

	it("correctly calculates line breaks", () => {
		const text = "Line 1\nLine 2\r\nLine 3\n";
		const editor = new Editor(text, "editor2");
		editor.lineBreakIndices = editor.calculateLineBreaks();
		expect(editor.lineBreakIndices).toEqual([6, 14, 21, 22]);
	});

	it("inserts text and updates state", () => {
		const editor = new Editor("Hello", "editor3");
		editor.cursorAt(0).character = 5;
		editor.insert(" world!", 0);

		expect(editor.getText()).toBe("Hello world!");
		expect(editor.lineBreakIndices).toEqual([12]); // No new lines
		expect(editor.cursors[0].character).toBe(12); // Cursor at end of the text
	});

	it("deletes text and updates state", () => {
		const editor = new Editor("Hello world!", "editor4");
		editor.cursorAt(0).character = 12;
		editor.delete(0);

		expect(editor.getText()).toBe("Hello world");
		expect(editor.lineBreakIndices).toEqual([11]);
		expect(editor.cursors[0].character).toBe(11);
	});

	it("handles line breaks and cursor movement", () => {
		const editor = new Editor("Hello\nWorld", "editor5");
		editor.cursorAt(0).character = 5;
		editor.addLine(0);
		editor.cursorAt(0).character = 3;
		editor.cursorAt(0).line = 1;

		expect(editor.getText()).toBe("Hello\n\nWorld");
		expect(editor.lineBreakIndices).toEqual([5, 6, 12]);
		expect(editor.cursors[0].character).toBe(3);
		expect(editor.cursors[0].line).toBe(1);
	});

	// it("calculates the correct global index", () => {
	// 	const text = "Hello\nWorld\nThis is a test";
	// 	const editor = new Editor(text, "editor6");

	// 	const globalIndex1 = editor.calculateGlobalIndex(0, 4); // 4th char on line 0
	// 	expect(globalIndex1).toBe(4);

	// 	const globalIndex2 = editor.calculateGlobalIndex(1, 2); // 3rd char on line 1
	// 	expect(globalIndex2).toBe(8);

	// 	const globalIndex3 = editor.calculateGlobalIndex(2, 8); // 9th char on line 2
	// 	expect(globalIndex3).toBe(19);
	// });

	it("manages selections correctly", () => {
		const editor = new Editor("Hello world!", "editor7");
		const selection = new Selection(0, 5, 0, 0); // Select "Hello"
		editor.addSelection(selection);

		expect(editor.selections.length).toBe(2); // Initial empty + new
		expect(editor.selections[1]).toBe(selection);

		editor.deleteSelection(1); // Delete "Hello"

		expect(editor.getText()).toBe(" world!");
		expect(editor.selections[0].isEmpty()).toBe(true); // Selection should be reset
	});

	it("handles tab conversion correctly", () => {
		const text = "Hello\tWorld";
		const editor = new Editor(text, "editor8");
		const convertedText = editor.convertTabsToSpaces(text);

		expect(convertedText).toBe("Hello    World");
	});

	it("inserts tab characters correctly", () => {
		const editor = new Editor("Hello", "editor9");
		editor.tab(0); // Insert a tab at the beginning

		expect(editor.getText()).toBe("    Hello");
	});

	// it("handles cursor movement correctly", () => {
	// 	const text = "Hello\nWorld";
	// 	const editor = new Editor(text, "editor10");
	// 	editor.moveTo(5, 0, 0); // Move to end of first line
	// 	expect(editor.cursors[0].line).toBe(0);
	// 	expect(editor.cursors[0].character).toBe(5);

	// 	editor.moveRight(0); // Move cursor to the next line
	// 	expect(editor.cursors[0].line).toBe(1);
	// 	expect(editor.cursors[0].character).toBe(0);

	// 	editor.moveDown(0); // Try to move down at the last line
	// 	expect(editor.cursors[0].line).toBe(1); // Should stay at the last line
	// 	expect(editor.cursors[0].character).toBe(0);

	// 	editor.moveUp(0); // Move cursor back to the first line
	// 	expect(editor.cursors[0].line).toBe(0);
	// 	expect(editor.cursors[0].character).toBe(5);
	// });

	// it("manages multiple cursors", () => {
	// 	const editor = new Editor("Hello\nWorld", "editor11");
	// 	const cursor2 = new Cursor(0, 0);

	// 	editor.addCursor(cursor2);
	// 	expect(editor.cursors.length).toBe(2);

	// 	editor.moveTo(1, 2, 1);
	// 	expect(editor.cursors[1].line).toBe(1);
	// 	expect(editor.cursors[1].character).toBe(2);

	// 	editor.removeCursor(1);
	// 	expect(editor.cursors.length).toBe(1);
	// });

	it("copies selected text correctly", () => {
		const editor = new Editor("Hello\nWorld", "editor12");
		const selection = new Selection(0, 0, 0, 5); // Select "Hello"
		editor.addSelection(selection);

		const copiedText = editor.copy();
		expect(copiedText).toBe("Hello");
	});

	it("cuts selected text correctly", () => {
		const editor = new Editor("Hello\nWorld", "editor13");
		const selection = new Selection(0, 0, 0, 5); // Select "Hello"
		editor.addSelection(selection);

		const cutText = editor.cut();
		expect(cutText).toBe("Hello");
		expect(editor.getText()).toBe("\nWorld");
	});

	// it("pastes text correctly", () => {
	// 	const editor = new Editor("Hello\nWorld", "editor14");
	// 	editor.moveTo(0, 5, 0); // Move to end of first line

	// 	editor.paste(" there");
	// 	expect(editor.getText()).toBe("Hello there\nWorld");
	// });

	it("selects all text correctly", () => {
		const editor = new Editor("Hello\nWorld", "editor15");
		editor.selectAll();

		const selection = editor.getSelection(0);
		expect(selection?.startIndex).toBe(0);
		expect(selection?.endIndex).toBe(editor.length());
	});

	it("deletes correctly with selection", () => {
		const editor = new Editor("Hello\nWorld", "editor16");
		const selection = new Selection(0, 0, 0, 5); // Select "Hello"
		editor.addSelection(selection);

		editor.delete(0);
		expect(editor.getText()).toBe("\nWorld");
		expect(editor.cursors[0].line).toBe(0);
		expect(editor.cursors[0].character).toBe(0);
	});

	it("handles undo correctly", () => {});

	it("handles redo correctly", () => {});
});
