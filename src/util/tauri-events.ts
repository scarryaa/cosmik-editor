import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { writeFile } from "@tauri-apps/plugin-fs";
import { tick } from "svelte";
import type { Writable } from "svelte/store";
import { scrollToCurrentLine } from "../components/AstroEditor/AstroEditorScrolling";
import type { Tab } from "../components/TabWrapper/Tabs/types";
import type { Editor } from "../models/Editor";
import {
	type ContentStore,
	type WritableContentStore,
	contentStore,
} from "../stores/content";
import { getCurrentEditor, updateCurrentEditor } from "../stores/editor";
import { folder } from "../stores/folder";
import { openTab } from "../stores/tabs";
import { unlisteners } from "./listeners";
import { pasteInternal } from "./util";

export const selectAll = () => {
	listen("select-all", () => {
		updateCurrentEditor((model) => {
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

	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$contentStore: WritableContentStore,
	$activeTabId: () => string,
) => {
	listen("undo", () => {
		updateCurrentEditor((model) => {
			model.undo();
			return model;
		});

		const currentEditor = getCurrentEditor();
		$contentStore.updateContent(
			$activeTabId(),
			currentEditor?.getContentString() ?? "",
		);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

export const redo = (
	$cursor: HTMLDivElement,

	$astroEditor: HTMLDivElement,
	currentLineElement: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$contentStore: WritableContentStore,
	$activeTabId: () => string,
) => {
	listen("redo", () => {
		updateCurrentEditor((model) => {
			model.redo();
			return model;
		});

		const currentEditor = getCurrentEditor();
		$contentStore.updateContent(
			$activeTabId(),
			currentEditor?.getContentString() ?? "",
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

	$astroEditor: HTMLDivElement,
	$activeTabId: () => string,
) => {
	listen("cut", async () => {
		let cutText: string;
		const currentEditor = getCurrentEditor();
		cutText = (await currentEditor?.copy()) ?? "";

		updateCurrentEditor((model) => {
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
		contentStore.updateContent(
			$activeTabId(),
			currentEditor?.getContentString() ?? "",
		);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

export const paste = (
	$cursor: HTMLDivElement,
	$astroWrapperInner: () => HTMLDivElement,

	$activeTabId: () => string,
	$astroEditor: HTMLDivElement,
	$currentLineElement: () => HTMLDivElement,
) =>
	listen("paste", async () => {
		const currentEditor = getCurrentEditor();
		await pasteInternal($cursor, $astroWrapperInner(), $astroEditor);

		await tick();
		requestAnimationFrame(() => {
			contentStore.updateContent(
				$activeTabId(),
				currentEditor?.getContentString() ?? "",
			);
			scrollToCurrentLine(
				$currentLineElement,
				$astroWrapperInner,
				"down",
				(currentEditor?.getCursorLine() ?? 0) + 1,
			);
		});
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
): Promise<void> => {
	listen("save-file", async () => {
		const encoder = new TextEncoder();
		const currentEditor = getCurrentEditor();
		await writeFile($activeTabId(), encoder.encode(content()));

		contentStore.resetModifiedFlag($activeTabId());
		contentStore.updateOriginalContent(
			$activeTabId(),
			currentEditor?.getContentString() ?? "",
		);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

export const newFile = (
	lastActiveTabs: Writable<string[]>,
	$contentStore: ContentStore,
	$tabs: () => Map<string, Tab>,
	$activeTabId: () => string,
	$astroWrapperInner: () => HTMLDivElement,
	$astroEditor: HTMLDivElement,
	showEditor: Writable<boolean>,
): void => {
	listen("new-file", async () => {
		let counter = 1;
		let fullPath = `untitled-${counter}`;
		let exists = $tabs().has(fullPath);
		while (exists) {
			counter++;
			fullPath = `untitled-${counter}`;
			exists = $tabs().has(fullPath);
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
			paneId: null,
			editorInstanceId: "",
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

		updateCurrentEditor((model) => {
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

		const currentTab = $tabs().get($activeTabId());
		if (currentTab) {
			// Update cursor position
			const currentEditor = getCurrentEditor();
			currentTab.cursorPosition = currentEditor?.getCursor().getPosition() ?? {
				character: 0,
				characterBasis: 0,
				line: 0,
			};
			// Save the current scroll position
			currentTab.scrollPosition = {
				left: $astroWrapperInner().scrollLeft,
				top: $astroWrapperInner().scrollTop,
			};
		}

		showEditor.set(true);

		openTab(newTab);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};

export const openFile = (
	lastActiveTabs: Writable<string[]>,
	$contentStore: ContentStore,

	$tabs: Map<string, Tab>,
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
			paneId: null,
			editorInstanceId: "",
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

		updateCurrentEditor((model) => {
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

		const currentTab = $tabs.get($activeTabId());
		if (currentTab) {
			// Update cursor position
			const currentEditor = getCurrentEditor();
			currentTab.cursorPosition = currentEditor?.getCursor().getPosition() ?? {
				character: 0,
				characterBasis: 0,
				line: 0,
			};
			// Save the current scroll position
			currentTab.scrollPosition = {
				left: $astroWrapperInner.scrollLeft,
				top: $astroWrapperInner.scrollTop,
			};
		}

		showEditor.set(true);

		openTab(newTab);
	}).then((unlisten) => {
		unlisteners.push(unlisten);
	});
};
