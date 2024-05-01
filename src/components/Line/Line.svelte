<script lang="ts">
import type { CursorPosition } from "../../models/Cursor";
import type { SelectionProps } from "../../models/Selection";
import "./Line.scss";

export let lineContent: string;
export let lineNumber: number;
export let selectionStart: SelectionProps;
export let selectionEnd: SelectionProps;
export let cursorPosition: CursorPosition;
export let totalNumberOfLines: number;

export let registerLineRef: (
	lineNumber: number,
	element: HTMLDivElement,
) => void;

let lineElement: HTMLDivElement;

let selectedText = "";
let beforeSelection = "";
let afterSelection = "";

$: isSelected =
	(lineNumber - 1 === selectionStart.line &&
		lineNumber - 1 === selectionEnd.line &&
		selectionStart.character <= selectionEnd.character) ||
	(lineNumber - 1 === selectionStart.line &&
		selectionStart.character <= lineContent.length) ||
	(lineNumber - 1 > selectionStart.line &&
		lineNumber - 1 < selectionEnd.line) ||
	(lineNumber - 1 === selectionEnd.line && selectionEnd.character >= 0);

$: {
	let isLastLine = lineNumber === totalNumberOfLines;

	if (
		lineNumber - 1 === selectionStart.line &&
		lineNumber - 1 === selectionEnd.line
	) {
		beforeSelection = lineContent.substring(0, selectionStart.character);
		selectedText = lineContent.substring(
			selectionStart.character,
			selectionEnd.character,
		);
		afterSelection = lineContent.substring(selectionEnd.character);
		if (!isLastLine) {
			afterSelection += " ";
		}
	} else if (lineNumber - 1 === selectionStart.line) {
		beforeSelection = lineContent.substring(0, selectionStart.character);
		selectedText = lineContent.substring(selectionStart.character);
		afterSelection = "";
		if (!isLastLine) {
			selectedText += " ";
		}
	} else if (
		lineNumber - 1 > selectionStart.line &&
		lineNumber - 1 < selectionEnd.line
	) {
		beforeSelection = "";
		selectedText = `${lineContent} `;
		afterSelection = "";
	} else if (lineNumber - 1 === selectionEnd.line) {
		beforeSelection = "";
		selectedText = lineContent.substring(0, selectionEnd.character);
		afterSelection = lineContent.substring(selectionEnd.character);
		if (!isLastLine) {
			afterSelection += " ";
		}
	} else {
		beforeSelection = lineContent;
		selectedText = "";
		afterSelection = "";
	}
}

$: if (lineElement) {
	registerLineRef(lineNumber, lineElement);
}
</script>

<div class="line" bind:this={lineElement} data-line-number={lineNumber}>
  {#if selectedText === "" && beforeSelection === "" && afterSelection === ""}
    {#if isSelected}
      <span class={cursorPosition.line + 1 !== lineNumber ? "selected empty-line-placeholder" : "selected"}><br></span>
    {:else}
      <br>
    {/if}
  {:else}
    <span>{beforeSelection}</span>
    {#if selectedText}
        <span class="selected">{selectedText}</span>
    {/if}
    <span>{afterSelection}</span>
  {/if}
</div>
