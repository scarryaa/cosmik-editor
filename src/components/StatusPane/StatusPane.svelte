<script lang="ts">
import { currentEditor } from "../../stores/currentEditor";
import "./StatusPane.scss";

const lineNumber = $derived($currentEditor?.getCursorLine());
const char = $derived($currentEditor?.getCursor().getPosition().character);
const selection = $derived($currentEditor?.getSelection());
const selectionLength = $derived(
	$currentEditor?.getSelection().calculateTotalCharactersSelected(),
);
</script>
  
<div class="status-pane">
    Ln {lineNumber}, Col {char} 
    {#if selection?.getSelectionStart() !== selection?.getSelectionEnd() && selectionLength !== -1 && selectionLength !== 0}
        ({selectionLength === -1 ? Math.abs(selectionLength + 1) : Math.abs(selectionLength ?? 0)} selected)
    {/if}
</div>