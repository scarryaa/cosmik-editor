<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { onMount } from "svelte";
import { contentStore } from "../../../../../stores/content";
import { editor, showEditor } from "../../../../../stores/editor";
import { astroEditor, astroWrapperInner } from "../../../../../stores/elements";
import { folder } from "../../../../../stores/folder";
import {
	activeTabId,
	lastActiveTabs,
	openTab,
	tabs,
    updateCurrentTabScrollPosition,
} from "../../../../../stores/tabs";
import {
	updateCursorHorizontalPosition,
	updateCursorVerticalPosition,
} from "../../../../AstroEditor/AstroEditor";
import type { Tab } from "../../../../TabWrapper/Tabs/types";
import type { FileItemType } from "../types";
import "./FileItem.scss";

export let fileName: string;
export let isFolder: boolean;
export let indent: number;
export let fullPath: string;
export let isRoot = false;
export let expandedFolders = new Set();

let isOpen = false;
let folderContents: FileItemType[];

const loadFolderContents = async (): Promise<FileItemType[]> => {
	let contents: FileItemType[] = await invoke("list_files_in_dir", {
		path: fullPath,
	});
	return contents.sort((a, b) => {
		if (a.is_folder && !b.is_folder) {
			return -1;
		}

		if (!a.is_folder && b.is_folder) {
			return 1;
		}
		return a.name.localeCompare(b.name);
	});
};

const loadFileContents = async (): Promise<string> => {
	const content = await invoke("get_file_contents", {
		path: fullPath,
	});

	return content as string;
};

const toggleOpen = async (): Promise<void> => {
	isOpen = !isOpen;

	if (isOpen) {
		expandedFolders.add(fullPath);

		if (isFolder) {
			folderContents = await loadFolderContents();
		}
	} else {
		expandedFolders.delete(fullPath);
	}
};

const handleFileClick = async () => {
	// If tab is already open, do nothing
	if ($activeTabId === fullPath) return;

	const newTab: Tab = {
		id: fullPath,
		name: fileName,
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
	let originalContents: string;
	originalContents = await loadFileContents();

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

	const currentTab = $tabs.find((tab) => tab.id === $activeTabId);
	if (currentTab) {
		// Update cursor position
		currentTab.cursorPosition = $editor.getCursor().getPosition();
		// Save the current scroll position
		updateCurrentTabScrollPosition($tabs, $activeTabId ?? "");
	}

	updateCursorVerticalPosition(false);
	updateCursorHorizontalPosition($editor, $astroEditor);

	showEditor.set(true);

	openTab(newTab);
};

$: fileClass = "file-icon fa-regular fa-file";
$: folderClass =
	isOpen && isFolder
		? "folder-chevron fa-regular fa-chevron-down"
		: "folder-chevron fa-regular fa-chevron-right";
$: fileModified = $contentStore.contentModified.get(fullPath);
$: folderModified = folderContents?.some((content) =>
	$contentStore.contentModified.get(`${fullPath}/${content.name}`),
);

onMount(() => {
	isOpen = expandedFolders.has(fullPath);

	if (isOpen && isFolder) {
		loadFolderContents().then((contents) => {
			folderContents = contents;
		});
	}

	folder.subscribe(async () => {
		isOpen = false;
	});
});
</script>

{#if fullPath}
    <button style="padding-left: {indent}px" class="file-item no-button-style" on:click={() => isFolder ? toggleOpen() : handleFileClick()} class:isRoot={isRoot} class:modified={fileModified} class:folder={isFolder} class:folder-modified={folderModified}>
        {#if isFolder}
            <i class={folderClass}></i>
        {:else}
            <i class={fileClass}></i>
        {/if}
        <span class="file-name">{fileName}</span>
		<span class="file-flag"></span>
    </button>
{/if}

{#if isOpen && isFolder && fullPath}
    <div class="folder-contents">
        {#each folderContents as content (content.name)}
            <svelte:self fileName={content.name} isFolder={content.is_folder} indent={indent + 8} fullPath={`${fullPath}/${content.name}`} expandedFolders={expandedFolders} />
        {/each}
    </div>
{/if}