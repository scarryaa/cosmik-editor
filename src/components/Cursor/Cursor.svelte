<script lang="ts">
import { onMount } from "svelte";
import { cursor } from "../../stores/elements";
import "./Cursor.scss";

export let left = 0;
export let top = 0;

let cursorElement: HTMLDivElement;

onMount(() => {
	cursor.set(cursorElement);
});
</script>

<div bind:this={cursorElement} class="cursor" style="left: {left}px; top: {top}px;"></div>