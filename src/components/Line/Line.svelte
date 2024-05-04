<script lang="ts">
import { onMount } from "svelte";
import SelectionHighlight from "../../SelectionHighlight/SelectionHighlight.svelte";
import {
	lineNumberPadding,
	lineNumberPaddingLg,
	lineNumberWidth,
	sidebarClosedWidth,
} from "../../const/const";
import type { CursorPosition } from "../../models/Cursor";
import { editor } from "../../stores/editor";
import { activeTabId, tabs } from "../../stores/tabs";
import {
	type ParseType,
	parseBasedOnExtension,
} from "../../syntax-parsers/common";
import { measureTextWidth } from "../../util/text";
import "./Line.scss";

export let lineContent: string;
export let lineNumber: number;
export let selectionStart: number;
export let selectionEnd: number;
export let wrapperWidth: number;
export let wrapperHeight: number;
export let cursorPosition: CursorPosition;
export let wrapperScroll: number;
export let wrapperLeft: number;
export let tabsHeight: number;

export let registerLineRef: (
	lineNumber: number,
	element: HTMLDivElement,
) => void;

let lineElement: HTMLDivElement;

$: isSelected =
	selectionStart <= selectionEnd ||
	selectionStart <= lineContent.length ||
	selectionEnd >= 0;

$: if (isSelected) {
	registerLineRef(lineNumber, lineElement);
}

$: selectedText = lineContent.substring(selectionStart, selectionEnd);

const applyHighlighting = (extension: ParseType, text: string) => {
	return parseBasedOnExtension(extension, text);
};

$: highlightedContent = applyHighlighting(
	($tabs
		.find((tab) => tab.id === $activeTabId)
		?.id.split("/")
		.at(-1)
		?.split(".")
		.at(-1) as ParseType) ?? ".ts",
	lineContent,
);
</script>

<div class="line" bind:this={lineElement} data-line-number={lineNumber}>
	{#if lineContent === ""}
		<span class={cursorPosition.line + 1 !== lineNumber ? "empty-line-placeholder" : ""}><br></span>
	{:else}
		{#if selectedText}
			<SelectionHighlight selectedText={selectedText} offsetLeft={selectionStart * measureTextWidth("a")}/>
		{/if}
		{@html highlightedContent}
	{/if}
</div>