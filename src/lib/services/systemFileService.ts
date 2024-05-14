import { invoke } from "@tauri-apps/api/core";
import { get } from "svelte/store";
import { Editor } from "../models/Editor.svelte";
import { app } from "../reactives/app.svelte";
import { lastActiveTabs, openTab } from "../reactives/tabs.svelte";
import type { ITab } from "../types/ITab";
import { generateGUID } from "../util/util";

export const systemFileService = {
	async openFile(path: string, name: string) {
		const originalContents = (await invoke("get_file_contents", {
			path,
		})) as string;

		// Create or reuse an editor instance
		let editorInstance = app.editors.get(app.currentEditorId ?? "");
		if (!editorInstance) {
			const editorId = generateGUID();
			editorInstance = new Editor("", editorId);
		}

		// Update the editor's content
        editorInstance.setContent(originalContents);

        // Update the editor's cursors

		// Set the active editor
        app.currentEditorId = editorInstance.id;

		// Create a new tab object
		const newTab: ITab = {
			id: path,
			name,
			isActive: true,
			tooltip: path,
			contentModified: false,
			isHovered: false,
			cursorPosition: { column: 0, line: 0 },
			scrollPosition: { left: 0, top: 0 },
			content: originalContents,
			editor: editorInstance,
		};

		// Update the list of last active tabs
		lastActiveTabs.update((tabs) => {
			const index = tabs.indexOf(path);
			if (index !== -1) tabs.splice(index, 1);
			tabs.push(path);
			return tabs;
		});

		// Open the new tab
		openTab(newTab);
	},
};