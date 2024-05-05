<script lang="ts">
import { onMount, tick } from "svelte";
import { contentStore } from "../../stores/content";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import { cursor } from "../../stores/elements";
import { sideBarOpen } from "../../stores/sidebar";
import { measureTextWidth } from "../../util/text";
import { generateCursorPositonChangeEvent } from "../../util/util";
import {
	calculateCursorHorizontalPosition,
	calculateCursorVerticalPosition,
} from "./Cursor";
import "./Cursor.scss";

let cursorElement: HTMLDivElement;

const cursorVerticalPosition = $derived.by(() => {
	const verticalPosition = calculateCursorVerticalPosition($editor);
	return verticalPosition;
});

const cursorHorizontalPosition = $derived.by(() => {
	const horizontalPosition = calculateCursorHorizontalPosition($editor);
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
				$editor.getCursor().getDirection(),
			);
		}
	});

	sideBarOpen.subscribe(async () => {
		await tick();
		calculateCursorHorizontalPosition($editor);
	});
});
</script>

<div bind:this={cursorElement} class="cursor" style="left: {$cursorHorizPos}px; top: {$cursorVertPos}px;"></div>