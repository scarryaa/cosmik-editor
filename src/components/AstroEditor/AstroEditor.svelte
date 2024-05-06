<script lang="ts">
import { onMount, tick } from "svelte";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { contentStore } from "../../stores/content";
import {
	app,
	astroEditor,
	astroWrapper,
	astroWrapperInner,
	cursor,
	linesMap,
} from "../../stores/elements";
import { totalLines } from "../../stores/lines";
import { scrollVerticalPosition } from "../../stores/scroll";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, tabs } from "../../stores/tabs";
import { unlisteners } from "../../util/listeners";
import {
	copy,
	cut,
	paste,
	redo,
	selectAll,
	undo,
} from "../../util/tauri-events";
import { measureTextWidth } from "../../util/text";
import Cursor from "../Cursor/Cursor.svelte";
import Line from "../Line/Line.svelte";
import {
	focusEditor,
	handleKeyDown,
	handleMouseDown,
	handleMouseUp,
} from "./AstroEditor";
import "./AstroEditor.scss";
import { getNumberOfLinesOnScreen } from "./AstroEditorScrolling";

let { editorInstance }: { editorInstance: Editor } = $props();

let _input: HTMLTextAreaElement;
let presentation: HTMLDivElement;

let currentLineNumber = 1;
let wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
let maxWidth = $state(0);

const calculateLongestLine = (): void => {
	let longestLine = 0;
	for (const line of editorInstance.getContent()) {
		const lineWidth = line.getContent().length;
		if (lineWidth > longestLine) {
			longestLine = lineWidth;
		}
	}

	maxWidth = measureTextWidth("a") * longestLine + 50;
};

const handleLineRef = (lineNumber: number, element: HTMLDivElement) => {
	linesMap.update((map) => map.set(lineNumber, element));
};

const visibleLines = $derived.by(() => {
	const linesOnScreen = getNumberOfLinesOnScreen();
	let visibleStartIndex = Math.max(
		0,
		Math.floor($scrollVerticalPosition / lineHeight) - 1,
	);
	let visibleEndIndex = visibleStartIndex + linesOnScreen;

	visibleEndIndex = Math.min(
		visibleEndIndex + 1,
		editorInstance.getTotalLines(),
	);
	return { start: visibleStartIndex, end: visibleEndIndex };
});

const activeTab = $derived.by(() =>
	$tabs.find((tab) => tab.id === $activeTabId),
);

$effect(() => {
	if (activeTab && _input) {
		calculateLongestLine();
		focusEditor(_input as HTMLTextAreaElement);
	}
});

const setUpSubscriptions = (): void => {
	sideBarOpen.subscribe(async () => {
		await tick();
		wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
	});

	contentStore.subscribe(() => {
		calculateLongestLine();
	});
};

const addTauriListeners = (currentLine: HTMLDivElement): void => {
	// Event listeners
	selectAll();
	copy(editorInstance);
	cut(
		$cursor,
		currentLine,
		$astroWrapperInner,
		$astroEditor,
		() => $activeTabId ?? "",
	);
	paste(
		$cursor,
		() => $astroWrapperInner,
		() => $activeTabId ?? "",
		$astroEditor,
		// biome-ignore lint/style/noNonNullAssertion: It will be created
		() => $linesMap.get(editorInstance.getCursorLine() + 1)!,
	);
	undo(
		$cursor,
		$astroEditor,
		currentLine,
		$astroWrapperInner,
		contentStore,
		() => $activeTabId ?? "",
	);
	redo(
		$cursor,
		$astroEditor,
		currentLine,
		$astroWrapperInner,
		contentStore,
		() => $activeTabId ?? "",
	);
};

$effect(() => {
	currentLineNumber = editorInstance.getCursorLine();
});

onMount(() => {
	astroEditor.set(presentation);
	focusEditor(_input as HTMLTextAreaElement);

	// biome-ignore lint/style/noNonNullAssertion: Will be defined here
	const currentLine = $linesMap.get(currentLineNumber + 1)!;
	addTauriListeners(currentLine);
	setUpSubscriptions();

	return () => {
		for (const unlisten of unlisteners) {
			unlisten();
		}
	};
});
</script>

<div bind:this={presentation} class="astro-presentation" role="presentation" style={`height: ${editorInstance.getTotalLines() * lineHeight}px; padding-right: ${maxWidth}px`} onmousedown={(event: MouseEvent) => { handleMouseDown(event, _input as HTMLTextAreaElement, editorInstance, $astroEditor) }} onmouseup={handleMouseUp}>
    {#each editorInstance.getContentString().split('\n').slice(visibleLines.start, visibleLines.end) as line, index (index + visibleLines.start)}
        <Line {editorInstance} cursorPosition={editorInstance.getCursor().getPosition()} selectionStart={editorInstance.getContent()[index + visibleLines.start].getSelectionStart()} selectionEnd={editorInstance.getContent()[index + visibleLines.start].getSelectionEnd()} lineContent={line} lineNumber={index + 1 + visibleLines.start} registerLineRef={handleLineRef} />
    {/each}
	<textarea style={`top: ${activeTab?.scrollPosition.top ?? 0}px; left: ${activeTab?.scrollPosition.left ?? 0}px`} bind:this={_input} onkeydown={(event: KeyboardEvent) => { handleKeyDown(event, () => editorInstance, () => $astroWrapper, $app, () => $astroEditor, () => $linesMap.get(editorInstance.getCursorLine() + 1)!, () => $astroWrapperInner, $activeTabId ?? "", $contentStore, () => $cursor, totalLines, $tabs)}} class="astro-input"></textarea>
	<Cursor {editorInstance} />
</div>