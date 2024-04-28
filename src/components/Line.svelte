<script lang="ts">
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

// Determine the parts of the line to highlight
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
		unselectedStart = content.substring(0, startChar);
		selectedPart = content.substring(startChar, endChar);
		unselectedEnd = content.substring(endChar);
	} else {
		unselectedStart = content;
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
    <div>{@html unselectedStart}</div>
    {#if selectedPart}
      <span class="selected-text">{@html selectedPart}</span>
    {/if}
    <div>{@html unselectedEnd}</div>
  </div>