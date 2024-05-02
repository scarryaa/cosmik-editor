<script lang="ts">
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
import { sideBarOpen } from "../../stores/sidebar";
import "./Sidebar.scss";

const toggleSidebar = (): void => {
	sideBarOpen.set(!$sideBarOpen);
};
</script>
  
<div class="sidebar">
    <button class="flat-button sidebar-button" on:click={toggleSidebar}><FontAwesomeIcon icon={faCopy} transform={{ size: 20 }} /></button>
</div>