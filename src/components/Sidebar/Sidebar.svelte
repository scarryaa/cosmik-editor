<script lang="ts">
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
import { onDestroy, onMount } from "svelte";
import { contentStore } from "../../stores/content";
import { editor } from "../../stores/editor";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, tabs } from "../../stores/tabs";
import { openFolder, saveFile } from "../../util/tauri-events";
import "./Sidebar.scss";

let _saveFile: any;
const toggleSidebar = (): void => {
	sideBarOpen.set(!$sideBarOpen);
};

onMount(() => {
	openFolder();
	// @TODO move somewhere else?
	_saveFile = saveFile(
		() => $activeTabId ?? "",
		() => $contentStore.contents.get($activeTabId ?? "") ?? "",
		$editor,
	);
});

onDestroy(() => {
	openFolder();
	_saveFile();
});
</script>
  
<div class="sidebar">
    <button class="flat-button sidebar-button" on:click={toggleSidebar}><FontAwesomeIcon icon={faCopy} transform={{ size: 20 }} /></button>
</div>