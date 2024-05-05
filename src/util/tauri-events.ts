import { invoke } from "@tauri-apps/api/core";
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
import type { Tab } from "../components/TabWrapper/Tabs/types";
import type { Editor } from "../models/Editor";
import {
	type ContentStore,
	type WritableContentStore,
	contentStore,
} from "../stores/content";
import { folder } from "../stores/folder";
import { openTab, tabs } from "../stores/tabs";
import { unlisteners } from "./listeners";
import { pasteInternal } from "./util";

export const selectAll = (editor: Writable<Editor>) => {
	listen("select-all", () => {
		editor.update((model) => {
			const totalLines = model.getTotalLines();
			const content = model.getContent();
			const lineLength = content[totalLines - 1].getContent().length;

			model.getSelection().selectAll(lineLength, totalLines, content);
			return model;
		});
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

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
	}).then((unlisten) => {
		unlisteners.push(unlisten);
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
	}).then((unlisten) => {
		unlisteners.push(unlisten);
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
	}).then((unlisten) => {
		unlisteners.push(unlisten);
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
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});

export const openFolder = () => {
	listen("open-folder", async (event: unknown) => {
		folder.set((event as { payload: string }).payload);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
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
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

export const newFile = (
	lastActiveTabs: Writable<string[]>,
	$contentStore: ContentStore,
	$editor: Editor,
	editor: Writable<Editor>,
	$tabs: () => Tab[],
	$activeTabId: () => string,
	$astroWrapperInner: () => HTMLDivElement,
	$astroEditor: HTMLDivElement,
	showEditor: Writable<boolean>,
): void => {
	listen("new-file", async () => {
		let counter = 1;
		let fullPath = `untitled-${counter}`;
		while ($tabs().some(tab => tab.id === fullPath)) {
			counter++;
			fullPath = `untitled-${counter}`;
		}

		const newTab: Tab = {
			id: fullPath,
			name: `Untitled-${counter}`,
			isActive: true,
			tooltip: fullPath,
			contentModified: false,
			isHovered: false,
			cursorPosition: { character: 0, characterBasis: 0, line: 0 },
			scrollPosition: { left: 0, top: 0 },
			redoStack: [],
			undoStack: [],
		};

		lastActiveTabs.update((tabs) => {
			const index = tabs.indexOf(newTab.id);
			if (index !== -1) {
				tabs.splice(index, 1);
			}
			tabs.push(newTab.id);
			return tabs;
		});

		let contents = "";

		const originalContents = "";
		if ($contentStore.contents.get(newTab.id)) {
			contents = $contentStore.contents.get(newTab.id) ?? "";
		} else {
			contents = originalContents;
		}

		$contentStore.originalContents.set(newTab.id, originalContents);
		$contentStore.contents.set(newTab.id, contents);

		editor.update((model) => {
			model.setContent($contentStore.contents.get(newTab.id) ?? "");
			model
				.getCursor()
				.setPosition(
					model.getTotalLines(),
					model.getContent(),
					newTab.cursorPosition.character,
					newTab.cursorPosition.line,
					newTab.cursorPosition.characterBasis,
				);
			model.setRedoStack(newTab.redoStack);
			model.setUndoStack(newTab.undoStack);
			return model;
		});

		const currentTab = $tabs().find((tab) => tab.id === $activeTabId());
		if (currentTab) {
			// Update cursor position
			currentTab.cursorPosition = $editor.getCursor().getPosition();
			// Save the current scroll position
			currentTab.scrollPosition = {
				left: $astroWrapperInner().scrollLeft,
				top: $astroWrapperInner().scrollTop,
			};
		}

		updateCursorVerticalPosition(false);
		updateCursorHorizontalPosition($editor, $astroEditor);

		showEditor.set(true);

		openTab(newTab);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
}

export const openFile = (
	lastActiveTabs: Writable<string[]>,
	$contentStore: ContentStore,
	$editor: Editor,
	editor: Writable<Editor>,
	$tabs: Tab[],
	$activeTabId: () => string,
	$astroWrapperInner: HTMLDivElement,
	$astroEditor: HTMLDivElement,
	showEditor: Writable<boolean>,
) => {
	listen("open-file", async (event: unknown) => {
		const _event = event as { payload: { path: string; name: string } };
		const fullPath = _event.payload.path;
		const newTab: Tab = {
			id: fullPath,
			name: _event.payload.name,
			isActive: true,
			tooltip: fullPath,
			contentModified: false,
			isHovered: false,
			cursorPosition: { character: 0, characterBasis: 0, line: 0 },
			scrollPosition: { left: 0, top: 0 },
			redoStack: [],
			undoStack: [],
		};

		lastActiveTabs.update((tabs) => {
			const index = tabs.indexOf(newTab.id);
			if (index !== -1) {
				tabs.splice(index, 1);
			}
			tabs.push(newTab.id);
			return tabs;
		});

		let contents = "";

		const originalContents = (await invoke("get_file_contents", {
			path: fullPath,
		})) as string;
		if ($contentStore.contents.get(newTab.id)) {
			contents = $contentStore.contents.get(newTab.id) ?? "";
		} else {
			contents = originalContents;
		}

		$contentStore.originalContents.set(newTab.id, originalContents);
		$contentStore.contents.set(newTab.id, contents);

		editor.update((model) => {
			model.setContent($contentStore.contents.get(newTab.id) ?? "");
			model
				.getCursor()
				.setPosition(
					model.getTotalLines(),
					model.getContent(),
					newTab.cursorPosition.character,
					newTab.cursorPosition.line,
					newTab.cursorPosition.characterBasis,
				);
			model.setRedoStack(newTab.redoStack);
			model.setUndoStack(newTab.undoStack);
			return model;
		});

		const currentTab = $tabs.find((tab) => tab.id === $activeTabId());
		if (currentTab) {
			// Update cursor position
			currentTab.cursorPosition = $editor.getCursor().getPosition();
			// Save the current scroll position
			currentTab.scrollPosition = {
				left: $astroWrapperInner.scrollLeft,
				top: $astroWrapperInner.scrollTop,
			};
		}

		updateCursorVerticalPosition(false);
		updateCursorHorizontalPosition($editor, $astroEditor);

		showEditor.set(true);

		openTab(newTab);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};
