<script lang="ts">
import { onMount, tick } from "svelte";
import type { Editor } from "../../models/Editor";
import { contentStore } from "../../stores/content";
import { cursorHorizPos, cursorVertPos } from "../../stores/editor";
import { cursor } from "../../stores/elements";
import { sideBarOpen } from "../../stores/sidebar";
import { measureTextWidth } from "../../util/text";
import { generateCursorPositonChangeEvent } from "../../util/util";
import {
	calculateCursorHorizontalPosition,
	calculateCursorVerticalPosition,
} from "./Cursor";
import "./Cursor.scss";

let { editorInstance }: { editorInstance: Editor } = $props();
let cursorElement: HTMLDivElement;

const cursorVerticalPosition = $derived.by(() => {
	const verticalPosition = calculateCursorVerticalPosition(editorInstance);
	return verticalPosition;
});

const cursorHorizontalPosition = $derived.by(() => {
	const horizontalPosition = calculateCursorHorizontalPosition(editorInstance);
	return horizontalPosition;
});

$effect(() => {
	cursorVertPos.set(cursorVerticalPosition);
});

$effect(() => {
	cursorHorizPos.set(cursorHorizontalPosition + measureTextWidth("a"));
});

onMount(() => {
	cursor.set(cursorElement);

	contentStore.subscribe((value) => {
		if (value.contents) {
			generateCursorPositonChangeEvent(
				cursorElement,
				editorInstance.getCursor().getDirection(),
			);
		}
	});

	sideBarOpen.subscribe(async () => {
		await tick();
		calculateCursorHorizontalPosition(editorInstance);
	});
});
</script>

<div bind:this={cursorElement} class="cursor" style="left: {$cursorHorizPos}px; top: {$cursorVertPos}px;"></div>