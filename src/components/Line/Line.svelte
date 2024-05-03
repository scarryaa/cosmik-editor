<script lang="ts">
import { sidebarClosedWidth } from "../../const/const";
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
let selectionTop = "0px";
let selectionRight = "0px";
let selectionBottom = "0px";
let selectionLeft = "0px";

$: isSelected =
	selectionStart <= selectionEnd ||
	selectionStart <= lineContent.length ||
	selectionEnd >= 0;

$: if (isSelected) {
	selectionTop = `${
		5 + (lineNumber - 1) * 19 - (wrapperScroll ?? 0) + tabsHeight
	}px`;
	selectionLeft = `${wrapperLeft + measureTextWidth("a") * selectionStart}px`;
	selectionRight = `${
		-6 +
		wrapperWidth -
		sidebarClosedWidth -
		measureTextWidth("a") * selectionEnd -
		wrapperLeft +
		+80 +
		($editor.getTotalLines() === lineNumber ? 110 : 105)
	}px`;
	selectionBottom = `${
		wrapperHeight -
		(lineNumber - 1) * 19 -
		4 +
		(wrapperScroll ?? 0) +
		34 -
		tabsHeight
	}px`;
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
</script>

<div class="line" bind:this={lineElement} data-line-number={lineNumber} class:selected={isSelected} style="--selection-top: {selectionTop}; --selection-right: {selectionRight}; --selection-bottom: {selectionBottom}; --selection-left: {selectionLeft}">
  {#if lineContent === ""}
  <span class={cursorPosition.line + 1 !== lineNumber ? "empty-line-placeholder" : ""}><br></span>
  {:else }
  {@html highlightedContent}
  {/if}
</div>