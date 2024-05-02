<script lang="ts">
import { onMount } from "svelte";
import { editor, showEditor } from "../../stores/editor";
import {
	astroWrapper,
	astroWrapperInner,
	lineNumbers,
} from "../../stores/elements";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
import SidebarInner from "../Sidebar/Inner/SidebarInner.svelte";
import Sidebar from "../Sidebar/Sidebar.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";
import TabWrapper from "../TabWrapper/TabWrapper.svelte";
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
    <Sidebar />
    <SidebarInner />
    <div id="astro-wrapper-inner">
        <TabWrapper />
        <!-- @TODO {#if $showEditor} -->
            <div id="editor-wrapper-outer">
                <LineNumbers lineCount={$editor.getTotalLines()} />
                <div id="editor-wrapper-inner" bind:this={wrapperInner} on:scroll={() => { $lineNumbers.scrollTop = wrapperInner.scrollTop; editorScroll = wrapperInner.scrollTop; } }>
                    <AstroEditor editorScroll={editorScroll} editorHeight={wrapperInner?.clientHeight} editorWidth={wrapperInner?.clientWidth} />
                </div> 
            </div>
        <!-- {/if} -->
    </div>
    <StatusPane char={$editor.getCursor().getPosition().character + 1} lineNumber={$editor.getCursor().getPosition().line + 1} selection={$editor.getSelection()} selectionLength={$editor.getSelection().calculateTotalCharactersSelected()}/>
</div>