<script lang="ts">
import { onMount } from "svelte";
import { lineNumbers } from "../../stores/elements";
import "./LineNumbers.scss";

export let lineCount: number;
let _lineNumbers: HTMLDivElement;

onMount(() => {
	lineNumbers.set(_lineNumbers);
});
</script>
  
<div class="line-numbers" bind:this={_lineNumbers}>
    {#each Array(lineCount).fill(0) as _, index}
        <div>{index + 1}</div>
    {/each}
</div>