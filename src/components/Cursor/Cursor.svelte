<script lang="ts">
import { onMount } from "svelte";
export let left = 0;
export let top = 0;
import { cursor } from "../../stores/elements";
import "./Cursor.scss";

let cursorElement: HTMLDivElement;

onMount(() => {
	cursor.set(cursorElement);
});
</script>

<div bind:this={cursorElement} class="cursor" style="left: {left}px; top: {top}px;"></div>