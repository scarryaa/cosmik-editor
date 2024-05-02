<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { onMount } from "svelte";
    import { folder } from "../../../../../stores/folder";
import type { FileItemType } from "../types";
import "./FileItem.scss";

export let fileName: string;
export let isFolder: boolean;
export let indent: number;
export let fullPath: string;
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

$: fileClass = "file-icon fa-regular fa-file";
$: folderClass =
	isOpen && isFolder
		? "folder-chevron fa-regular fa-chevron-down"
		: "folder-chevron fa-regular fa-chevron-right";

onMount(() => {
	isOpen = expandedFolders.has(fullPath);
	
	if (isOpen && isFolder) {
		loadFolderContents().then((contents) => {
			folderContents = contents;
		});
	}

	folder.subscribe(async () => {
		isOpen = false;
	})
});
</script>

{#if fullPath}
    <button style="padding-left: {indent}px" class="file-item no-button-style" on:click={toggleOpen}>
        {#if isFolder}
            <i class={folderClass}></i>
        {:else}
            <i class={fileClass}></i>
        {/if}
        <span class="file-name">{fileName}</span>
    </button>
{/if}

{#if isOpen && isFolder && fullPath}
    <div class="folder-contents">
        {#each folderContents as content (content.name)}
            <svelte:self fileName={content.name} isFolder={content.is_folder} indent={indent + 8} fullPath={`${fullPath}/${content.name}`} expandedFolders={expandedFolders} />
        {/each}
    </div>
{/if}