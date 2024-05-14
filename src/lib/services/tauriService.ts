import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { readText, writeText } from "@tauri-apps/plugin-clipboard-manager";
import { writeFile } from "@tauri-apps/plugin-fs";
import { type Writable, get } from "svelte/store";
import type { Editor } from "../models/Editor.svelte";
import { activeTabId } from "../reactives/tabs.svelte";
import type { ITab } from "../types/ITab";
import type { ITauriFileResponse } from "../types/ITauriFileResponse";
import { fileService } from "./fileService";
import { systemFileService } from "./systemFileService";

export const tauriService = {
	async setUpListeners(
		editor: Editor,
		$tabs: ITab[],
		$activeTabId: string,
		$astroWrapperInner: HTMLDivElement,
	): Promise<void> {
		listen("copy", async () => {
			// const textToCopy = await editor.copy();
			// await writeText(textToCopy);
		});

		listen("cut", async () => {
			// const textToCopy = await editor.cut();
			// await writeText(textToCopy);
		});

		listen("paste", async () => {
			// const textToPaste = await readText();
			// editor.paste(textToPaste);

			// // @TODO improve performance of pasting very large text
			// // @TODO prevent flashing when pasting
			// requestAnimationFrame(() => {
			// 	// @TODO clean this up
			// 	generateCursorPositonChangeEvent(
			// 		document.querySelector(".cursor")!,
			// 		CursorDirection.Right,
			// 	);
			// 	generateCursorPositonChangeEvent(
			// 		document.querySelector(".cursor")!,
			// 		CursorDirection.Down,
			// 	);
			// 	scrollService.scrollIntoView(
			// 		document.querySelector(".cursor")!,
			// 		document.querySelector(".overflow-guard")! as HTMLElement,
			// 		-20,
			// 	);
			// });
		});

		listen("select-all", async () => {
			// editor.selectAll();
			// generateCursorPositonChangeEvent(
			// 	document.querySelector(".cursor")!,
			// 	CursorDirection.Right,
			// );
		});

		listen("open-folder", async (event: unknown) => {
			const rootPath = (event as { payload: string }).payload;
			this.getRootFolder(rootPath);
		});

		listen("open-file", async (event: unknown) => {
			const { path: fullPath, name } = (
				event as { payload: { path: string; name: string } }
			).payload;

			systemFileService.openFile(fullPath, name);
			this.expandScope(fullPath);
		});

		listen("save-file", async () => {
			const encoder = new TextEncoder();
			// await writeFile(
			// 	get(activeTabId),
			// 	encoder.encode(get(activeEditor)?.getContent()),
			// );
		});
	},

	async getRootFolder(rootPath: string): Promise<void> {
		const contents: Array<ITauriFileResponse> = await invoke(
			"list_files_in_dir",
			{
				path: rootPath,
			},
		);

		const rootFolder: ITauriFileResponse = {
			is_folder: true,
			name: rootPath.split("/").pop() || "Root",
			children: contents,
			path: rootPath,
		};

		fileService.setRootFolder(rootFolder, rootPath);
		await invoke("expand_scope", {
			folderPath: rootPath,
		});
	},

	async listFilesInDir(path: string): Promise<ITauriFileResponse[]> {
		return await invoke("list_files_in_dir", { path });
	},

	async createNewFile(path: string) {
		return await invoke("create_new_file", { path });
	},

	async deleteFile(path: string) {
		return await invoke("delete_file", { path });
	},

	async createNewFolder(path: string) {
		return await invoke("create_new_folder", { path });
	},

	async deleteFolder(path: string) {
		return await invoke("delete_folder", { path });
	},

	async renameFile(path: string, newName: string) {
		return await invoke("rename_file", { path, newName });
	},

	async renameFolder(oldPath: string, newPath: string) {
		return await invoke("rename_folder", { oldPath, newPath });
	},

	async copyFile(oldPath: string, newPath: string) {
		return await invoke("copy_file", { oldPath, newPath });
	},

	async copyFolder(oldPath: string, newPath: string) {
		return await invoke("copy_folder", { oldPath, newPath });
	},

	async moveFile(oldPath: string, newPath: string) {
		return await invoke("move_file", { oldPath, newPath });
	},

	async moveFolder(oldPath: string, newPath: string) {
		return await invoke("move_folder", { oldPath, newPath });
	},

	async expandScope(path: string) {
		return await invoke("expand_scope", { folderPath: path });
	},
};