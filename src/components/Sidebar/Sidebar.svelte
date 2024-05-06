<script lang="ts">
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
import { onMount } from "svelte";
import { sideBarOpen } from "../../stores/sidebar";
import { openFolder } from "../../util/tauri-events";
import "./Sidebar.scss";

const toggleSidebar = (): void => {
	sideBarOpen.set(!$sideBarOpen);
};

onMount(() => {
	openFolder();
});
</script>
  
<div class="sidebar">
    <button class="flat-button sidebar-button" on:click={toggleSidebar}><FontAwesomeIcon icon={faCopy} transform={{ size: 20 }} /></button>
</div>