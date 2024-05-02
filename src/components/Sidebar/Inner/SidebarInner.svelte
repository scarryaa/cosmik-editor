<script lang="ts">
import { sideBarOpen } from "../../../stores/sidebar";
import FilesPane from "./FilesPane/FilesPane.svelte";
import "./SidebarInner.scss";
</script>

<div class="sidebar-inner" class:open={$sideBarOpen}>
    <FilesPane />
</div>