<script lang="ts">
    import { fileRenameEvent } from "../../reactives/events.svelte";
    import { nestingLevelSelections, selectedFiles } from "../../reactives/file.svelte";
    import { fileService } from "../../services/fileService";
    import { systemFileService } from "../../services/systemFileService";
import "../../styles/FileFolder.scss";
    import type { IFile } from "../../types/IFile";

let {
	name,
	path,
	content,
	indent,
	isLastFile,
	hideGuidelines,
}: IFile & { indent: number; isLastFile?: boolean; hideGuidelines: boolean } =
	$props();
let inputValue = $state("");
const guideCount = $state(Math.max(0, Math.floor(indent) / 8));
const guides = $derived(Array.from({ length: guideCount }, (_, i) => i));
const nestingLevel = $derived(indent / 8);
const isSelected = $derived(selectedFiles.has(path));
const isNestingLevelSelected = $derived(
	nestingLevelSelections.has(nestingLevel) &&
		nestingLevelSelections.get(nestingLevel),
);
const focusOnInit = (element: HTMLElement) => {
	requestAnimationFrame(() => {
		element.focus();
	});
};

const handleKeydown = async (event: KeyboardEvent) => {
	const inputEvent = event.target as HTMLInputElement;

	switch (event.key) {
		case "Escape":
			await fileService.removeFileInUI(path, " ");
			fileRenameEvent.set(null);
			break;
		case "Enter":
			if (inputEvent.value === "") {
				await fileService.removeFileInUI(path, " ");
			} else {
				await fileService.renameFileOrFolder(path, inputValue);
				selectedFiles.clear();
				nestingLevelSelections.clear();
				nestingLevelSelections.set(nestingLevel, true);
				selectedFiles.add(path);
			}
			fileRenameEvent.set(null);
			break;
	}
};

const handleFileKeydown = (event: KeyboardEvent) => {
	switch (event.key) {
		case "Enter":
			// @TODO move focus to editor
			fileService.toggleSelectItem(path, true, nestingLevel);
			break;
		case "Escape":
			fileService.clearSelection();
			break;
		case " ":
			// Handled by the browser
			break;
		case "ArrowDown":
			// @TODO move focus
			break;
		case "ArrowUp":
			// @TODO move focus
			break;
		case "ArrowLeft":
			// @TODO move focus
			break;
		case "ArrowRight":
			// @TODO move focus
			break;
		case "Delete":
			fileService.removeFileInUI(path, name);
			break;
	}
};

const handleInput = (event: Event) => {
	const inputEvent = event.target as HTMLInputElement;
	inputValue = inputEvent.value;
};

const handleBlur = async (event: FocusEvent) => {
	const inputEvent = event.target as HTMLInputElement;
	if (inputEvent.value === "") {
		await fileService.removeFileInUI(path, " ");
		fileRenameEvent.set(null);
	} else {
		await fileService.renameFileOrFolder(path, inputValue);
		fileRenameEvent.set(null);
		selectedFiles.clear();
		selectedFiles.add(path);

		nestingLevelSelections.clear();
		nestingLevelSelections.set(nestingLevel - 10, true);
	}
};

const handleFileClick = (event: MouseEvent) => {
	if (event.ctrlKey) {
		// Select multiple folders
		fileService.toggleSelectItem(path, true, nestingLevel);
	} else {
		// Clear the selection and toggle the file selection
		fileService.clearSelection();
		fileService.toggleSelectItem(path, true, nestingLevel);
	}

	systemFileService.openFile(path, path.split("/").pop() ?? "");
};
</script>

<div class="file-container">
	<!-- @TODO fix guidelines being broken across children -->
	{#if guideCount > 0}
		<div class="indent" style={`left: ${8}px;`}>
			{#each guides as _, index}
				{#if index !== guideCount - 1}
					<div class="guide" class:hidden={hideGuidelines} class:active={isNestingLevelSelected && index === guideCount - 2}></div>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- 	{#if guideCount > 0}
	<div class="indent" style={`left: ${8}px;`}>
	  {#each guides as guide, index}
		{#if guide.children.length > 0}
		  {#each guide.children as child, childIndex}
			<div class="guide" class:hidden={hideGuidelines} class:active={isNestingLevelSelected && childIndex === guideCount - 2}>
			  {#each child.children as grandchild, grandChildIndex}
			  {#if grandChildIndex < grandchild.children.length - 1}
				<div class="guide" class:hidden={hideGuidelines} class:active={isNestingLevelSelected && grandChildIndex === childCount - 2}></div>
			  {/if}
			{/each}
		  </div>
		{/each}
	  {:else}
		<div class="guide" class:hidden={hideGuidelines} class:active={isNestingLevelSelected && index === guideCount - 2}></div>
	  {/if}
	{/each}
  </div>
{/if} -->
	<button
		class="file no-button-style"
		class:selected={isSelected}
		style={`width: 100%; padding-left: ${indent}px; margin-bottom: ${isLastFile ? 19 : 0}px;`}
		onclick={(event) => handleFileClick(event)}
		onkeydown={handleFileKeydown}
	>
		<i class="fa-regular fa-file file-icon"></i>
		<span class="file-name">{name}</span>
		{#if $fileRenameEvent !== null && $fileRenameEvent === path}
			<!-- @TODO tauri is stealing the Ctrl A, Ctrl V, etc. events -->
			<input
				use:focusOnInit
				type="text"
				class="file-rename-input"
				value={inputValue}
				onkeydown={handleKeydown}
				oninput={handleInput}
				onblur={handleBlur}
			/>
		{/if}
	</button>
</div>	

<style lang="scss"></style>
