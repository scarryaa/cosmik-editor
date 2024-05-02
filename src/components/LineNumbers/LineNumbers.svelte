<script lang="ts">
import { onMount } from "svelte";
import { lineNumbers } from "../../stores/elements";
import "./LineNumbers.scss";

export let lineCount: number;
let _lineNumbers: HTMLDivElement;

$: if (lineCount > 1000) {
    _lineNumbers.style.paddingLeft = "10px";    
} else if (_lineNumbers) {
    _lineNumbers.style.paddingLeft = "5px";   
}

onMount(() => {
	lineNumbers.set(_lineNumbers);
});
</script>
  
<div class="line-numbers" bind:this={_lineNumbers}>
    {#each Array(lineCount).fill(0) as _, index}
        <div>{index + 1}</div>
    {/each}
</div>