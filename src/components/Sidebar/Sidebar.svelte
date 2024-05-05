<script lang="ts">
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
import { onDestroy, onMount } from "svelte";
import { contentStore } from "../../stores/content";
import { editor, showEditor } from "../../stores/editor";
import { astroEditor, astroWrapperInner } from "../../stores/elements";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, lastActiveTabs, tabs } from "../../stores/tabs";
import { unlisteners } from "../../util/listeners";
import {
	newFile,
	openFile,
	openFolder,
	saveFile,
} from "../../util/tauri-events";
import "./Sidebar.scss";

const toggleSidebar = (): void => {
	sideBarOpen.set(!$sideBarOpen);
};

onMount(() => {
	openFolder();
	// @TODO move somewhere else?
	openFile(
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
	saveFile(
		() => $activeTabId ?? "",
		() => $contentStore.contents.get($activeTabId ?? "") ?? "",
		$editor,
	);
	newFile(
		lastActiveTabs,
		$contentStore,
		$editor,
		editor,
		() => $tabs,
		() => $activeTabId ?? "",
		() => $astroWrapperInner,
		$astroEditor,
		showEditor,
	);
});
</script>
  
<div class="sidebar">
    <button class="flat-button sidebar-button" on:click={toggleSidebar}><FontAwesomeIcon icon={faCopy} transform={{ size: 20 }} /></button>
</div>