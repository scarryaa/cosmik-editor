import { Editor } from "@renderer/models/Editor";
import EditorStore from "@renderer/stores/editors";
import TabStore, { TabState } from "@renderer/stores/tabs";
import { createSignal } from "solid-js";
import { fireEvent, render, screen } from "solid-testing-library";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EditorCore from "./EditorCore";
import "@testing-library/jest-dom";

describe("EditorCore", () => {
	let editor: Editor;
	let ensureCursorVisible = vi.fn();

	beforeEach(() => {
		// Initialize the Editor
		editor = new Editor("Initial content", "editor1");
		EditorStore.addEditor(editor);
		EditorStore.setActiveEditor("editor1");

		// Mock window.api methods
		window.api = {
			copy: vi.fn(),
			paste: vi.fn().mockResolvedValue("Pasted content"),
		};
	});

	const setup = () => {
		const [editorAccessor] = createSignal(editor);
		render(() => (
			<EditorCore
				editor={editorAccessor}
				language="javascript"
				ensureCursorVisible={ensureCursorVisible}
			/>
		));
	};

	it("should render the textarea", () => {
		setup();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("should insert 'a' character on 'a' key press without Ctrl", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "a" });

		expect(editor.getText()).toBe("aInitial content");
	});

	it("should select all on 'Ctrl + a' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "a", ctrlKey: true });

		expect(editor.getSelection(0)?.isEmpty()).toBe(false);
	});

	it("should copy on 'Ctrl + c' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "c", ctrlKey: true });

		expect(window.api.copy).toHaveBeenCalledWith("Initial content");
	});

	it("should paste on 'Ctrl + v' key press", async () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.keyDown(textarea, { key: "v", ctrlKey: true });

		expect(editor.getText()).toBe("Initial contentPasted content");
	});

	it("should cut on 'Ctrl + x' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "x", ctrlKey: true });

		expect(window.api.copy).toHaveBeenCalledWith("Initial content");
		expect(editor.getText()).toBe("");
	});

	it("should open a new tab on 'Ctrl + n' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "n", ctrlKey: true });

		expect(TabStore.tabs.length).toBe(1);
		expect(TabStore.tabs[0].name).toBe("Untitled-1");
	});

	it("should close the current tab on 'Ctrl + w' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "w", ctrlKey: true });

		expect(TabStore.tabs.length).toBe(0); // All tabs should be closed
	});

	it("should prevent default action and not insert 's' on 'Ctrl + s' key press", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "s", ctrlKey: true });

		expect(editor.getText()).toBe("Initial content");
	});

	it("should call ensureCursorVisible on specific key presses", () => {
		setup();
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(textarea, { key: "ArrowDown" });

		expect(ensureCursorVisible).toHaveBeenCalled();
	});
});
