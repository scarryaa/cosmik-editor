<script lang="ts">
import { onMount } from "svelte";
import { editor } from "../../stores/editor";
import {
	astroWrapper,
	astroWrapperInner,
	lineNumbers,
} from "../../stores/elements";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";
import "./AstroWrapper.scss";

let editorScroll: number;
let wrapper: HTMLDivElement;
let wrapperInner: HTMLDivElement;

onMount(() => {
	astroWrapper.set(wrapper);
	astroWrapperInner.set(wrapperInner);
});
</script>

<div id="astro-wrapper" bind:this={wrapper}>
    <LineNumbers lineCount={$editor.getTotalLines()} />
    <div id="wrapper-inner" bind:this={wrapperInner} on:scroll={() => { $lineNumbers.scrollTop = wrapperInner.scrollTop; editorScroll = wrapperInner.scrollTop; } }>
        <AstroEditor editorScroll={editorScroll} editorHeight={wrapperInner?.clientHeight} editorWidth={wrapperInner?.clientWidth} />
    </div> 
    <StatusPane char={$editor.getCursor().getPosition().character + 1} lineNumber={$editor.getCursor().getPosition().line + 1} selection={$editor.getSelection()} selectionLength={$editor.getSelection().calculateTotalCharactersSelected()}/>
</div>