<script lang="ts">
import type { Selection } from "../../models/Selection";
import "./StatusPane.scss";

export let lineNumber: number;
export let char: number;
export let selection: Selection;
</script>
  
<div class="status-pane">
    Ln {lineNumber}, Col {char} 
    {#if selection.getSelectionStart() !== selection.getSelectionEnd()}
        ({selection.getContent().length} selected)
    {/if}
</div>