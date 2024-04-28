<script lang="ts">
import DOMPurify from "dompurify";
import type { SelectionProps } from "../models/Selection";

export let content = "";
export let lineNumber: number | null = null;
export let selectionStart: SelectionProps | null = null;
export let selectionEnd: SelectionProps | null = null;

const isLineSelected = (
	line: number | null,
	start: SelectionProps | null,
	end: SelectionProps | null,
): boolean => {
	if (!line || !start || !end) return false;
	return line >= start.line && line <= end.line;
};

let selectedPart = "";
let unselectedStart = "";
let unselectedEnd = "";

$: if (lineNumber !== null) {
	if (
		selectionStart &&
		selectionEnd &&
		isLineSelected(lineNumber, selectionStart, selectionEnd)
	) {
		const startChar =
			lineNumber === selectionStart.line ? selectionStart.character : 0;
		const endChar =
			lineNumber === selectionEnd.line
				? selectionEnd.character
				: content.length;
		unselectedStart = DOMPurify.sanitize(content.substring(0, startChar));
		selectedPart = DOMPurify.sanitize(content.substring(startChar, endChar));
		unselectedEnd = DOMPurify.sanitize(content.substring(endChar));
	} else {
		unselectedStart = DOMPurify.sanitize(content);
		selectedPart = "";
		unselectedEnd = "";
	}
}
</script>
  
<style>
.line {
    display: flex;
}

.selected-text {
    background-color: rgba(137, 185, 224, 0.5);
}
</style>
  
  <div class="line" data-line-number="{lineNumber}">
    <div>{unselectedStart}</div>
    {#if selectedPart}
      <span class="selected-text">{selectedPart}</span>
    {/if}
    <div>{unselectedEnd}</div>
  </div>