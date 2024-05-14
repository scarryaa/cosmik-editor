import { Set } from "svelte/reactivity";
import { Map } from "svelte/reactivity";
import { writable } from "svelte/store";
import type { IFile } from "../types/IFile";
import type { IFolder } from "../types/IFolder";

export const fileStore = $state<Array<IFolder | IFile>>([]);
export const rootFileName = () => {
	const fileName = $derived<string>(fileStore[0].name);
	return fileName;
};
export const rootPath = () => {
	const path = $derived<string>(fileStore[0].path);
	return path;
};
export const openFolders = $state(new Set<string>());
export const folderCache = $state(
	new Map<string, (IFolder | IFile)[] | null>(),
);
export const selectedFiles = $state(new Set<string>());
export const nestingLevelSelections = $state(new Map<number, boolean>());
export const lastSelectedFilePath = writable<string | null>(null);