<script lang="ts">
    import { fileCreationEvent, folderCreationEvent, folderRenameEvent } from "../../reactives/events.svelte";
    import { fileStore, folderCache, nestingLevelSelections, openFolders, selectedFiles } from "../../reactives/file.svelte";
    import { fileService } from "../../services/fileService";
    import { tauriService } from "../../services/tauriService";
    import type { IFile } from "../../types/IFile";
    import type { IFolder } from "../../types/IFolder";
    import File from "../File/File.svelte";
    import VerticalScrollbar from "../VerticalScrollbar/VerticalScrollbar.svelte";


const folderHeight = 22;
let {
	content,
	isRoot,
	name,
	path,
	indent,
	parentHeight,
	isOpen = false,
	scrollPosition = $bindable(),
	hideGuidelines,
}: IFolder & {
	indent: number;
	parentHeight: number;
	isOpen?: boolean;
	scrollPosition?: number;
	hideGuidelines: boolean;
} = $props();

let height = $state(0);
let contentHeight = $state(0);
let contentLength = $state(0);
let folderContent: HTMLDivElement | null = $state(null);
let _content: Array<IFolder | IFile> | null = $state(content);
const isSelected = $derived(selectedFiles.has(path));
let inputValue = $state("");
let inInputField = $state(false);
const guideCount = $state(Math.max(0, Math.floor(indent) / 8));
const guides = $derived(Array.from({ length: guideCount }, (_, i) => i));
const nestingLevel = $derived(indent / 8);
const isNestingLevelSelected = $derived(
	nestingLevelSelections.has(nestingLevel) &&
		nestingLevelSelections.get(nestingLevel),
);

$effect(() => {
	if ($folderCreationEvent && $folderCreationEvent === path) {
		openFolders.add(path);
	}
});

$effect(() => {
	if ($fileCreationEvent && $fileCreationEvent === path) {
		openFolders.add(path);
	}
});

const focusOnInit = (element: HTMLElement) => {
	requestAnimationFrame(() => {
		element.focus();
	});
};

const handleKeydown = async (event: KeyboardEvent) => {
	event.stopPropagation();
	const inputEvent = event.target as HTMLInputElement;

	switch (event.key) {
		case "Escape":
			await fileService.removeFolderInUI(path);
			folderRenameEvent.set(null);
			inInputField = false;
			inputValue = "";
			break;
		case "Enter":
			if (inputEvent.value.trim() === "") {
				await fileService.removeFolderInUI(path);
			} else {
				await fileService.renameFileOrFolder(path, inputValue);
				selectedFiles.clear();
				selectedFiles.add(path);
				nestingLevelSelections.clear();
				nestingLevelSelections.set(nestingLevel, true);
			}
			folderRenameEvent.set(null);
			inInputField = false;
			inputValue = "";
			break;
	}
};

const handleInput = (event: Event) => {
	inInputField = true;
	event.stopPropagation();

	const inputEvent = event.target as HTMLInputElement;
	inputValue = inputEvent.value;
};

const handleBlur = async (event: FocusEvent) => {
	event.stopPropagation();
	const inputEvent = event.target as HTMLInputElement;

	if (inputEvent.value.trim() === "") {
		await fileService.removeFolderInUI(path);
		folderRenameEvent.set(null);
		inputValue = "";
	} else {
		await fileService.renameFileOrFolder(path, inputValue);
		folderRenameEvent.set(null);
		selectedFiles.clear();
		selectedFiles.add(path);
		nestingLevelSelections.clear();
		nestingLevelSelections.set(nestingLevel, true);
		inputValue = "";
	}

	inInputField = false;
};

const toggleFolder = async () => {
	isOpen = !isOpen;

	if (isOpen) {
		openFolders.add(path);
	} else {
		openFolders.delete(path);
	}

	if (!isRoot && isOpen) {
		if (!_content?.length) {
			// Check if the folder's content is cached
			const cachedContent = folderCache.get(path);

			if (cachedContent?.length) {
				_content = cachedContent;
			} else {
				// Fetch new content only if it's not in the cache
				const files = await tauriService.listFilesInDir(`${path}/`);
				_content = fileService.sortFiles(
					files.map((file) => fileService.mapTauriFileResponseToItem(file)),
				);

				const targetFolder = fileService.findFolderFromPath(
					path,
					fileStore[0] as IFolder,
				);

				if (targetFolder) {
					targetFolder.content = _content;
				}

				// Update the cache with the newly fetched content
				folderCache.set(path, _content);
			}
		}
	}
};

const toggleFolderAndSelect = async () => {
	toggleFolder();
	fileService.toggleSelectItem(path, false, nestingLevel);
};

const handleFolderKeydown = (event: KeyboardEvent) => {
	event.preventDefault();

	if (inInputField) return;

	switch (event.key) {
		case "Enter":
			// @TODO move focus to editor
			toggleFolderAndSelect();
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
			fileService.removeFolderInUI(path);
			break;
	}
};

const handleFolderKeyUp = (event: KeyboardEvent) => {
	// @TODO figure out how to prevent space from triggering button (and therefore selection)
	event.preventDefault();
};

const handleFolderClick = (event: MouseEvent, path: string) => {
	if (event.ctrlKey) {
		// Select multiple folders
		fileService.toggleSelectItem(path, false, nestingLevel);
	} else {
		// Clear the selection and toggle the folder
		fileService.clearSelection();
		toggleFolderAndSelect();
	}
};

$effect(() => {
	if (isRoot) {
		height =
			(parentHeight ?? 0) - (folderContent?.getBoundingClientRect()?.top ?? 0);
	}

	// @TODO find a better way to do this
	_content = folderCache.get(path) || content;
	contentLength = content?.length ?? 0;
});

$effect(() => {
	if (isRoot) {
		isOpen = openFolders.has(path);
	}
});
</script>

<div class="folder-container" data-nesting-level={nestingLevel}>
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
	<button
		class="folder no-button-style"
		class:root={isRoot}
		class:selected={isSelected}
		style={`padding-left: ${indent}px; background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${scrollPosition && scrollPosition > 0 ? 1 : 0}) 300%);`}
		onclick={(event: MouseEvent) => handleFolderClick(event, path)}
		onkeydown={handleFolderKeydown}
		onkeyup={handleFolderKeyUp}
	>
		<i
			class="fa-solid folder-chevron"
			class:fa-chevron-right={!isOpen}
			class:fa-chevron-down={isOpen}
		></i>
		<span class="folder-name">{name}</span>
		{#if $folderRenameEvent !== null && $folderRenameEvent === path}
			<!-- @TODO tauri is stealing the Ctrl A, Ctrl V, etc. events -->
			<input
				use:focusOnInit
				type="text"
				class="folder-rename-input"
				value={inputValue}
				onkeydown={handleKeydown}
				oninput={handleInput}
				onblur={handleBlur}
			/>
		{/if}
	</button>
</div>

<div
    class="folder-content"
    bind:this={folderContent}
	bind:clientHeight={contentHeight}
    style={isRoot ? `height: ${height}px;` : ""}
    id={isRoot ? "rootFolder" : ""}
    onscroll={(event) => isRoot ? scrollPosition = (event.target as HTMLElement).scrollTop : 0}
>
    {#if isRoot && folderContent}<VerticalScrollbar width={10} elementRef={folderContent!} viewportHeight={contentHeight} style={`top: ${116}px;`} />{/if}
    {#if isOpen && _content}
        {#each _content as file, index}
            {#if file.type === "file"}
                <File hideGuidelines={hideGuidelines}
                    isLastFile={isRoot && contentLength - 1 === index}
                    {...file}
                    type="file"
                    indent={indent + 8}
                />
            {:else if file.type === "folder"}
                <svelte:self isOpen={openFolders.has(file.path)} {...file} type="folder" indent={indent + 8} />
            {/if}
        {/each}
    {/if}
</div>

<style lang="scss">
    .folder-content {
        overflow: hidden;
        overflow-y: scroll;
    }
</style>
