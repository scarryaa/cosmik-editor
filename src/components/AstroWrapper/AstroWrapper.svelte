<script lang="ts">
import { onMount } from "svelte";
    import { sidebarClosedWidth, sidebarOpenWidth } from "../../const/const";
import { editor, showEditor } from "../../stores/editor";
import {
	astroWrapper,
	astroWrapperInner,
	editorWrapperOuter,
	lineNumbers,
} from "../../stores/elements";
    import { sideBarOpen } from "../../stores/sidebar";
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
let wrapperOuter: HTMLDivElement;

onMount(() => {
	astroWrapper.set(wrapper);
	astroWrapperInner.set(wrapperInner);
    editorWrapperOuter.set(wrapperOuter);

    sideBarOpen.subscribe(isOpen => {
        wrapperOuter.style.width = `calc(100% - ${isOpen ? sidebarOpenWidth + sidebarClosedWidth : sidebarClosedWidth }px)`
    })
});
</script>

<div id="astro-wrapper" bind:this={wrapper}>
    <Sidebar />
    <SidebarInner />
    <div id="astro-wrapper-inner">
        <TabWrapper />
        <!-- @TODO {#if $showEditor} -->
            <div id="editor-wrapper-outer" bind:this={wrapperOuter}>
                <LineNumbers lineCount={$editor.getTotalLines()} />
                <div id="editor-wrapper-inner" bind:this={wrapperInner} on:scroll={() => { $lineNumbers.scrollTop = wrapperInner.scrollTop; editorScroll = wrapperInner.scrollTop; } }>
                    <AstroEditor editorScroll={editorScroll} editorHeight={wrapperInner?.clientHeight} editorWidth={wrapperInner?.clientWidth} />
                </div> 
            </div>
        <!-- {/if} -->
    </div>
    <StatusPane char={$editor.getCursor().getPosition().character + 1} lineNumber={$editor.getCursor().getPosition().line + 1} selection={$editor.getSelection()} selectionLength={$editor.getSelection().calculateTotalCharactersSelected()}/>
</div>