import { listen } from "@tauri-apps/api/event";
import { readText, writeText } from "@tauri-apps/plugin-clipboard-manager";
import { tick } from "svelte";
import type { Writable } from "svelte/store";
import {
	updateCursorHorizontalPosition,
	updateCursorVerticalPosition,
} from "../components/AstroEditor/AstroEditor";
import {
	scrollToCurrentLine,
	scrollToCursor,
} from "../components/AstroEditor/AstroEditorScrolling";
import type { Editor } from "../models/Editor";

export const selectAll = (editor: Writable<Editor>) =>
	listen("select-all", () => {
		editor.update((model) => {
			const totalLines = model.getTotalLines();
			const content = model.getContent();
			const lineLength = content[totalLines - 1].getContent().length;

			model.getSelection().selectAll(lineLength, totalLines, content);
			return model;
		});
	});

export const copy = ($editor: Editor) =>
	listen("copy", async () => {
		const textToCopy = await $editor.copy();
		await writeText(textToCopy);
	});

export const cut = (
	$cursor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) => {
	listen("cut", async () => {
		let cutText: string;
		cutText = await $editor.copy();

		editor.update((model) => {
			if (model.getSelection().isSelection()) {
				model
					.getSelection()
					.deleteSelection(model.getContent(), model.getCursor());
				model.getSelection().clearSelection();
			} else {
				model.clearCurrentLine();
			}

			return model;
		});

		await writeText(cutText);

		await tick();
		updateCursorVerticalPosition(true);
		updateCursorHorizontalPosition($editor, $astroEditor);
		scrollToCurrentLine(currentLineElement, $astroWrapperInner, "down");
		scrollToCursor($cursor, $editor, $astroWrapperInner);
	});
};

export const paste = (
	$cursor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
) =>
	listen("paste", async () => {
		const textToPaste = await readText();
        
		editor.update((model) => {
            $editor.paste(textToPaste);
			return model;
		});
        
		await tick();
        const newLine = document.querySelector(`[data-line-number="${$editor.getCursor().getPosition().line - 1}"]`) as HTMLDivElement;
        console.log(newLine);
		updateCursorHorizontalPosition($editor, $astroEditor);
		updateCursorVerticalPosition(true);
		scrollToCursor($cursor, $editor, $astroWrapperInner);
        console.log(newLine);
		scrollToCurrentLine(newLine, $astroWrapperInner, "down");
	});
