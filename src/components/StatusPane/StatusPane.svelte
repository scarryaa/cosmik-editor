<script lang="ts">
import type { Selection } from "../../models/Selection";
import "./StatusPane.scss";

export let lineNumber: number;
export let char: number;
export let selection: Selection;
export let selectionLength: number;
</script>
  
<div class="status-pane">
    Ln {lineNumber}, Col {char} 
    {#if selection.getSelectionStart() !== selection.getSelectionEnd() && selectionLength !== -1 && selectionLength !== 0}
        ({selectionLength === -1 ? Math.abs(selectionLength + 1) : Math.abs(selectionLength)} selected)
    {/if}
</div>