<script lang="ts">
import { lineHeight } from "../../const/const";
import type { CursorPosition } from "../../models/Cursor";
import type { Editor } from "../../models/Editor";
import { linesMap } from "../../stores/elements";
import { activeTabId, tabs } from "../../stores/tabs";
import {
	type ParseType,
	escapeHtml,
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
export let editorInstance: Editor;

export let registerLineRef: (
	lineNumber: number,
	element: HTMLDivElement,
) => void;

let highlightedContent = "";
let lineElement: HTMLDivElement;

$: if (!$linesMap.get(lineNumber)) {
	registerLineRef(lineNumber, lineElement);
}

const applyHighlighting = async (extension: ParseType, text: string) => {
	return await parseBasedOnExtension(extension, text);
};

$: {
	const activeTab = $tabs.get($activeTabId ?? "");
	const extension = activeTab?.id
		.split("/")
		.at(-1)
		?.split(".")
		.at(-1) as ParseType;

	if (activeTab && lineContent) {
		applyHighlighting(extension, lineContent)
			.then((result) => {
				highlightedContent = result;
			})
			.catch((error) => {
				console.error("Error applying highlighting:", error);
				highlightedContent = escapeHtml(lineContent);
			});
	}
}

$: selectedText = editorInstance
	.getContent()
	[lineNumber - 1]?.getContent()
	.substring(selectionStart, selectionEnd);
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