<script lang="ts">
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
import { onDestroy, onMount } from "svelte";
import { contentStore } from "../../stores/content";
import { editor, showEditor } from "../../stores/editor";
import { astroEditor, astroWrapperInner } from "../../stores/elements";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, lastActiveTabs, tabs } from "../../stores/tabs";
import { openFile, openFolder, saveFile } from "../../util/tauri-events";
import "./Sidebar.scss";

let _saveFile: any;
let _openFile: any;
const toggleSidebar = (): void => {
	sideBarOpen.set(!$sideBarOpen);
};

onMount(() => {
	openFolder();
	// @TODO move somewhere else?
	_openFile = openFile(
		lastActiveTabs,
		$contentStore,
		$editor,
		editor,
		$tabs,
		() => $activeTabId ?? "",
		$astroWrapperInner,
		$astroEditor,
		showEditor,
	);
	_saveFile = saveFile(
		() => $activeTabId ?? "",
		() => $contentStore.contents.get($activeTabId ?? "") ?? "",
		$editor,
	);
});

onDestroy(() => {
	openFolder();
	_saveFile();
	_openFile();
});
</script>
  
<div class="sidebar">
    <button class="flat-button sidebar-button" on:click={toggleSidebar}><FontAwesomeIcon icon={faCopy} transform={{ size: 20 }} /></button>
</div>