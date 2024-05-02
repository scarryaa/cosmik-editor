<script lang="ts">
import { onDestroy, onMount, tick } from "svelte";
import { derived } from "svelte/store";
import { lineHeight } from "../../const/const";
import { contentStore } from "../../stores/content";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import {
	app,
	astroEditor,
	astroWrapper,
	astroWrapperInner,
	cursor,
	tabs,
} from "../../stores/elements";
import {
	scrollHorizontalPosition,
	scrollVerticalPosition,
} from "../../stores/scroll";
import { lastMousePosition, selecting } from "../../stores/selection";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId } from "../../stores/tabs";
import { copy, cut, paste, selectAll } from "../../util/tauri-events";
import {
	calculateCursorHorizontalPosition,
	calculateCursorVerticalPosition,
} from "../Cursor/Cursor";
import Cursor from "../Cursor/Cursor.svelte";
import Line from "../Line/Line.svelte";
import {
	focusEditor,
	handleKeyDown,
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
	updateCursorHorizontalPosition,
} from "./AstroEditor";
import "./AstroEditor.scss";

export let editorWidth: number;
export let editorScroll: number;
export let editorHeight: number;

let input: HTMLTextAreaElement;
let presentation: HTMLDivElement;
let linesMap = new Map<number, HTMLDivElement>();
let wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
let tabsHeight: number;

const handleLineRef = (lineNumber: number, element: HTMLDivElement) => {
	linesMap.set(lineNumber, element);
};

$: _activeTabId = $activeTabId;

tick().then(() => {
	// Have to add it here
	$astroWrapperInner.addEventListener("scroll", (event) => {
		scrollVerticalPosition.set($astroWrapperInner.scrollTop);
		scrollHorizontalPosition.set($astroWrapperInner.scrollLeft);
	});
});

const cursorVerticalPosition = derived(
	[cursorVertPos, scrollVerticalPosition],
	async () => {
		if ($astroWrapper) {
			await tick();
			const verticalPosition = calculateCursorVerticalPosition(
				tabsHeight,
				$editor,
				$scrollVerticalPosition,
			);
			return verticalPosition;
		}

		return lineHeight;
	},
);

const cursorHorizontalPosition = derived(
	[cursorHorizPos, scrollHorizontalPosition],
	async () => {
		if ($astroWrapper) {
			await tick();
			const horizontalPosition = calculateCursorHorizontalPosition(
				$editor,
				linesMap.get(1)?.offsetLeft ?? 0,
				$scrollHorizontalPosition,
			);
			return horizontalPosition;
		}

		return 0;
	},
);

cursorVerticalPosition.subscribe(async ($cursorVerticalPosition) => {
	const top = await $cursorVerticalPosition;
	cursorVertPos.set(top);
});

cursorHorizontalPosition.subscribe(async ($cursorHorizontalPosition) => {
	const left = await $cursorHorizontalPosition;
	cursorHorizPos.set(left);
});

$: tabsHeight = $astroWrapperInner?.getBoundingClientRect().top;

onMount(async () => {
	focusEditor(input);

	astroEditor.set(presentation);
	document.addEventListener("mousemove", (event: MouseEvent) =>
		handleMouseMove(event, $editor, $selecting, $lastMousePosition),
	);

	// biome-ignore lint/style/noNonNullAssertion: Will exist at this point
	const currentLine = linesMap.get($editor.getCursorLine() + 1)!;
	// Event listeners
	selectAll(editor);
	await copy($editor);
	await cut(
		$cursor,
		currentLine,
		$astroWrapperInner,
		editor,
		$editor,
		$astroEditor,
		() => $activeTabId ?? "",
	);
	await paste(
		$cursor,
		$astroWrapperInner,
		editor,
		$editor,
		() => $activeTabId ?? "",
		$astroEditor,
	);

	sideBarOpen.subscribe(async () => {
		await tick();
		wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
		updateCursorHorizontalPosition($editor, $astroEditor);
	});
});

onDestroy(() => {
	// biome-ignore lint/style/noNonNullAssertion: Will exist at this point
	const currentLine = linesMap.get($editor.getCursorLine() + 1)!;

	selectAll(editor);
	copy($editor);
	cut(
		$cursor,
		currentLine,
		$astroWrapperInner,
		editor,
		$editor,
		$astroEditor,
		() => $activeTabId ?? "",
	);
	paste(
		$cursor,
		$astroWrapperInner,
		editor,
		$editor,
		() => $activeTabId ?? "",
		$astroEditor,
	);
});
</script>
    
<div bind:this={presentation} class="astro-presentation" role="presentation" on:mousedown={(event: MouseEvent) => { handleMouseDown(event, input, $editor, $astroEditor) }} on:mouseup={handleMouseUp}>
    {#each $editor.getContentString().split('\n') as line, index}
        <Line cursorPosition={$editor.getCursor().getPosition()} wrapperLeft={wrapperLeft} wrapperScroll={editorScroll} wrapperWidth={editorWidth} wrapperHeight={editorHeight} tabsHeight={tabsHeight} selectionStart={$editor.getContent()[index].getSelectionStart()} selectionEnd={$editor.getContent()[index].getSelectionEnd()} lineContent={line} lineNumber={index + 1} registerLineRef={handleLineRef} />
    {/each}
</div>
<textarea bind:this={input} on:keydown={(event: KeyboardEvent) => { handleKeyDown(event, editor, () => $editor, () => $astroWrapper, $app, () => $astroEditor, () => linesMap.get($editor.getCursorLine() + 1)!, () => $astroWrapperInner, $activeTabId ?? "", $contentStore, () => $cursor)}} class="astro-input"></textarea>
<Cursor left={$cursorHorizPos} top={$cursorVertPos}/>