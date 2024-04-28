<script lang="ts">
import { onMount } from "svelte";
import { editor } from "../../stores/editor";
import { astroWrapper } from "../../stores/elements";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
import "./AstroWrapper.scss";

let wrapper: HTMLDivElement;

onMount(() => {
	astroWrapper.set(wrapper);
});
</script>

<div id="astro-wrapper" bind:this={wrapper}>
    <LineNumbers lineCount={$editor.getTotalLines()} />
    <AstroEditor />
</div>