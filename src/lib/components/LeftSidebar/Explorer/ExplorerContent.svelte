<script lang="ts">
import type { Snippet } from "svelte";
    import { fileCreationEvent, fileRenameEvent, folderCreationEvent, folderRenameEvent } from "../../../reactives/events.svelte";
    import { fileStore } from "../../../reactives/file.svelte";
    import { fileService } from "../../../services/fileService";
import File from "../../File/File.svelte";
import Folder from "../../Folder/Folder.svelte";

const { actions }: { actions: Snippet } = $props();
let height = $state(0);
let scrollPosition = $state(0);
let fileCreationValue = "";
let folderCreationValue = "";

$effect(() => {
	if ($fileCreationEvent && fileCreationValue !== $fileCreationEvent) {
		fileCreationValue = $fileCreationEvent;
		fileService
			.createNewFileInUI($fileCreationEvent, " ")
			.then(() => {
				fileRenameEvent.set(`${$fileCreationEvent}/ `);
				fileCreationEvent.set(null);
				fileCreationValue = "";
			})
			.catch((error) => {
				console.error(error);
				fileCreationEvent.set(null);
			});
	}
});

$effect(() => {
	if ($folderCreationEvent && folderCreationValue !== $folderCreationEvent) {
		folderCreationValue = $folderCreationEvent;
		fileService
			.createNewFolderInUI($folderCreationEvent, " ")
			.then(() => {
				folderRenameEvent.set(`${$folderCreationEvent}/ `);
				folderCreationEvent.set(null);
				folderCreationValue = "";
			})
			.catch((error) => {
				console.error(error);
				folderCreationEvent.set(null);
			});
	}
});

$effect(() => {
	fileStore.sort((a, b) => {
		if (a.type === "folder" && b.type === "file") {
			return -1;
		}
		if (a.type === "file" && b.type === "folder") {
			return 1;
		}
		return 0;
	});
});
</script>

<div class="explorer-content" bind:clientHeight={height}>
    {#if fileStore[0] && fileStore[0].type === "folder" && fileStore[0].isRoot}
        {@render actions()}
    {/if}
    {#each fileStore as fileOrFolder, index}
        {#if fileOrFolder.type === "folder"}
            <Folder hideGuidelines={true} bind:scrollPosition parentHeight={height} {...fileOrFolder} indent={8 * index} />
        {:else if fileOrFolder.type === "file"}
            <File hideGuidelines={true} {...fileOrFolder} indent={8 * index} />
        {/if}
    {/each}
</div>

<style lang="scss">
    .explorer-content {
        button {
            z-index: 10;
        }

        overflow: hidden;
        height: 100%;
    }
</style>