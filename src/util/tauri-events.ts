import { listen } from "@tauri-apps/api/event";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { writeFile } from "@tauri-apps/plugin-fs";
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
import {
	type ContentStore,
	type WritableContentStore,
	contentStore,
} from "../stores/content";
import { folder } from "../stores/folder";
import { pasteInternal } from "./util";

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

export const undo = (
	$cursor: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$contentStore: WritableContentStore,
	$activeTabId: () => string,
) => {
	listen("undo", () => {
		editor.update((model) => {
			model.undo();
			return model;
		});

		$contentStore.updateContent($activeTabId(), $editor.getContentString());

		updateCursorVerticalPosition(true);
		updateCursorHorizontalPosition($editor, $astroEditor);
		scrollToCurrentLine(
			() => currentLineElement,
			() => $astroWrapperInner,
			"down",
		);
		scrollToCursor(
			$cursor,
			() => $editor,
			() => $astroWrapperInner,
		);
	});
};

export const redo = (
	$cursor: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$contentStore: WritableContentStore,
	$activeTabId: () => string,
) => {
	listen("redo", () => {
		editor.update((model) => {
			model.redo();
			return model;
		});

		$contentStore.updateContent($activeTabId(), $editor.getContentString());

		updateCursorVerticalPosition(true);
		updateCursorHorizontalPosition($editor, $astroEditor);
		scrollToCurrentLine(
			() => currentLineElement,
			() => $astroWrapperInner,
			"down",
		);
		scrollToCursor(
			$cursor,
			() => $editor,
			() => $astroWrapperInner,
		);
	});
};

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
	$activeTabId: () => string,
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
		scrollToCurrentLine(
			() => currentLineElement,
			() => $astroWrapperInner,
			"down",
		);
		scrollToCursor(
			$cursor,
			() => $editor,
			() => $astroWrapperInner,
		);
		contentStore.updateContent($activeTabId(), $editor.getContentString());
	});
};

export const paste = (
	$cursor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$activeTabId: () => string,
	$astroEditor: HTMLDivElement,
) =>
	listen("paste", async () => {
		await pasteInternal(
			$cursor,
			$astroWrapperInner,
			editor,
			$editor,
			$astroEditor,
		);

		await tick();
		setTimeout(() => {
			contentStore.updateContent($activeTabId(), $editor.getContentString());
		}, 0);
	});

export const openFolder = () => {
	listen("open-folder", async (event: unknown) => {
		folder.set((event as any).payload);
	});
};

export const saveFile = async (
	$activeTabId: () => string,
	content: () => string,
	$editor: Editor,
): Promise<void> => {
	listen("save-file", async () => {
		const encoder = new TextEncoder();
		await writeFile($activeTabId(), encoder.encode(content()));

		contentStore.resetModifiedFlag($activeTabId());
		contentStore.updateOriginalContent(
			$activeTabId(),
			$editor.getContentString(),
		);
	});
};
