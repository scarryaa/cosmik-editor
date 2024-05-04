<script lang="ts">
import {
    lineHeight,
} from "../../const/const";
import type { CursorPosition } from "../../models/Cursor";
    import { editor } from "../../stores/editor";
import { activeTabId, tabs } from "../../stores/tabs";
import {
	type ParseType,
	parseBasedOnExtension,
} from "../../syntax-parsers/common";
import { measureTextWidth } from "../../util/text";
import SelectionHighlight from "../SelectionHighlight/SelectionHighlight.svelte";
import "./Line.scss";

export let lineContent: string;
export let lineNumber: number;
export let selectionStart: number;
export let selectionEnd: number;
export let cursorPosition: CursorPosition;

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

$: selectedText = $editor.getContent()[lineNumber - 1]?.getContent().substring(selectionStart, selectionEnd);
</script>

<div class="line" bind:this={lineElement} data-line-number={lineNumber} style={`top: ${(lineNumber - 1) * lineHeight}px`}>
	{#if lineContent === ""}
	<span class={cursorPosition.line + 1 !== lineNumber ? "empty-line-placeholder" : ""}><br></span>
	{:else}
		{#if selectedText}
			<SelectionHighlight selectedText={selectedText} offsetLeft={selectionStart * measureTextWidth("a")}/>
		{/if}
		{@html highlightedContent}
	{/if}
</div>