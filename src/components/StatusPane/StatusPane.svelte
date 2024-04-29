<script lang="ts">
import type { Selection } from "../../models/Selection";
import { editor } from "../../stores/editor";
import "./StatusPane.scss";

export let lineNumber: number;
export let char: number;
export let selection: Selection;
export let selectionLength: number;
</script>
  
<div class="status-pane">
    Ln {lineNumber}, Col {char} 
    {#if selection.getSelectionStart() !== selection.getSelectionEnd()}
        ({selectionLength} selected)
    {/if}
</div>