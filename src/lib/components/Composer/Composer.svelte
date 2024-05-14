<script lang="ts">
import { app } from "../../reactives/app.svelte";
import {
	fileCreationEvent,
	folderCreationEvent,
} from "../../reactives/events.svelte";
import {
	lastSelectedFilePath,
	openFolders,
	rootPath,
} from "../../reactives/file.svelte";
import { fileService } from "../../services/fileService";
import ActionBar from "../ActionBar/ActionBar.svelte";
import ActionBarItem from "../ActionBarItem/ActionBarItem.svelte";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import AstroPresenter from "../AstroPresenter/AstroPresenter.svelte";
import Explorer from "../LeftSidebar/Explorer/Explorer.svelte";
import ExplorerContent from "../LeftSidebar/Explorer/ExplorerContent.svelte";
import Extensions from "../LeftSidebar/Extensions/Extensions.svelte";
import RunAndDebug from "../LeftSidebar/RunAndDebug/RunAndDebug.svelte";
import Search from "../LeftSidebar/Search/Search.svelte";
import SourceControl from "../LeftSidebar/SourceControl/SourceControl.svelte";
import Sidebar from "../Sidebar/Sidebar.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";

let shouldFocus = $state(false);
let sidebarWidth = $state(0);
let selectedPane = $state("explorer");
let editorContentElement = $state<HTMLDivElement | null>(null);

const currentEditor = $derived.by(() => {
    const editor = app.getCurrentEditor();

    if (editor) {
        return editor;
    }
});
const isMultiCursor = $derived.by(() => {
	const editor = app.getCurrentEditor();

	if (editor) {
		return editor.cursors.length > 1;
	}

    return false;
});
const cursorCount = $derived.by(() => {
	const editor = app.getCurrentEditor();

	if (editor) {
		return editor.cursors.length;
	}

    return 0;
});

const handleClick = () => {
	shouldFocus = true;
	setTimeout(() => {
		shouldFocus = false;
	});
};

const handleCreateNewFile = () => {
	fileCreationEvent.set($lastSelectedFilePath ?? rootPath());
};

const handleCreateNewFolder = () => {
	folderCreationEvent.set($lastSelectedFilePath ?? rootPath());
};
</script>

{#snippet explorerHeaderButtons()}
    <!-- @TODO move these to header button -->
    <!-- @TODO add tooltips -->
    <ActionBar data={explorerHeaderButtons} height={20} style={"position: relative; z-index: 99; margin-left: 4px; margin-bottom: 4px;"}>
        <ActionBarItem style={"padding-inline: 0px; margin-inline: 3px; !important"} icon={"fa-file-circle-plus"} callback={() => handleCreateNewFile()} />
        <ActionBarItem style={"padding-inline: 0px; margin-inline: 3px;"} icon={"fa-folder-plus"} callback={() => handleCreateNewFolder()} />
        <ActionBarItem style={"padding-inline: 0px; margin-inline: 3px;"} icon={"fa-refresh"} callback={() => fileService.refreshAllFiles()} />
        <ActionBarItem style={"padding-inline: 0px; margin-inline: 3px;"} iconSet={"fa-solid"} icon={"fa-square-minus"} callback={() => { openFolders.clear(); openFolders.add(rootPath()); }} />
    </ActionBar>
{/snippet}

<!-- @TODO reorder functionality -->
<!-- @TODO add tooltips -->
{#snippet headerItems(hasOverflow)}
    <ActionBar lineHeight={27} data={headerItems} height={34}>
        <ActionBarItem selected={selectedPane === "explorer"} callback={() => selectedPane = "explorer"} icon={"fa-file"}/>
        <ActionBarItem selected={selectedPane === "search"} callback={() => selectedPane = "search"} icon={"fa-search"}/>
        <ActionBarItem selected={selectedPane === "source-control"} callback={() => selectedPane = "source-control"} icon={"fa-code-branch"}/>
        <ActionBarItem selected={selectedPane === "run-and-debug"} callback={() => selectedPane = "run-and-debug"} icon={"fa-play"}/>
        {#if hasOverflow}
            <!-- @TODO more menu -->
            <ActionBarItem selected={selectedPane === "extensions"} callback={() => selectedPane = "extensions"} icon={"fa-ellipsis"}/>
        {/if}
    </ActionBar>
{/snippet}

{#snippet sidebarBody()}
    <div class="no-user-select" style={"height: 100%; overflow: hidden;"}>
        {#if selectedPane === "explorer"}
            <Explorer>
                <ExplorerContent actions={explorerHeaderButtons} />
            </Explorer>
        {:else if selectedPane === "search"}
            <Search />
        {:else if selectedPane === "source-control"}
            <SourceControl />
        {:else if selectedPane === "run-and-debug"}
            <RunAndDebug />
        {:else if selectedPane === "extensions"}
            <Extensions />
        {/if}
    </div>
{/snippet}

<div class="meteor-composite">
    <Sidebar {headerItems} bind:sidebarWidth={sidebarWidth} body={sidebarBody} />
    {#if currentEditor}
        <AstroEditor {shouldFocus} editor={currentEditor} />
        <AstroPresenter {editorContentElement} {handleClick} editor={currentEditor} />
        <StatusPane {cursorCount} {isMultiCursor} currentCharacter={currentEditor.cursors[0].column} currentLine={currentEditor.cursors[0].line} selectionLength={0}/>
    {/if}
</div>

<style lang="scss">
    .meteor-composite {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
