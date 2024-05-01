<script lang="ts">
import type { CursorPosition } from "../../models/Cursor";
import { highlightSyntax } from "../../util/syntax";
import { measureTextWidth } from "../../util/text";
import "./Line.scss";

export let lineContent: string;
export let lineNumber: number;
export let selectionStart: number;
export let selectionEnd: number;
export let wrapperWidth: number;
export let wrapperHeight: number;
export let cursorPosition: CursorPosition;

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

$: selectedContent = lineContent.substring(selectionStart, selectionEnd);

$: if (isSelected) {
	selectionTop = `${5 + (lineNumber - 1) * 19}px`;
	selectionLeft = `${65 + measureTextWidth("a") * selectionStart}px`;
	selectionRight = `${
		-6 + wrapperWidth - measureTextWidth("a") * selectionEnd
	}px`;
	selectionBottom = `${wrapperHeight - (lineNumber - 1) * 19 - 4}px`;
	registerLineRef(lineNumber, lineElement);
}

const applyHighlighting = (text: string) => {
	return highlightSyntax(text);
};

$: highlightedContent = applyHighlighting(lineContent);
</script>

<div class="line" bind:this={lineElement} data-line-number={lineNumber} class:selected={isSelected} style="--selection-top: {selectionTop}; --selection-right: {selectionRight}; --selection-bottom: {selectionBottom}; --selection-left: {selectionLeft}">
  {#if lineContent === ""}
  <span class={cursorPosition.line + 1 !== lineNumber ? "empty-line-placeholder" : ""}><br></span>
  {:else }
  {@html highlightedContent}
  {/if}
</div>