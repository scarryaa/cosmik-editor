<script lang="ts">
import { onMount } from "svelte";
import { scrollAction } from "../../actions/scrollAction";
import { sidebarClosedWidth, sidebarOpenWidth } from "../../const/const";
import { editor } from "../../stores/editor";
import {
	astroWrapper,
	astroWrapperInner,
	editorWrapperOuter,
	lineNumbers,
} from "../../stores/elements";
import { startLine, totalLines } from "../../stores/lines";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, tabs } from "../../stores/tabs";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
import SidebarInner from "../Sidebar/Inner/SidebarInner.svelte";
import Sidebar from "../Sidebar/Sidebar.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";
import TabWrapper from "../TabWrapper/TabWrapper.svelte";
import "./AstroWrapper.scss";

let wrapper: HTMLDivElement;
let wrapperInner: HTMLDivElement;
let wrapperOuter: HTMLDivElement;
let _astroWrapperInner: HTMLDivElement;

onMount(() => {
	astroWrapper.set(wrapper);
	astroWrapperInner.set(wrapperInner);
	editorWrapperOuter.set(wrapperOuter);

	sideBarOpen.subscribe((isOpen) => {
		_astroWrapperInner.style.width = `calc(100% - ${
			isOpen ? sidebarClosedWidth + sidebarOpenWidth : sidebarClosedWidth
		}px)`;
	});

	const unsubscribe = activeTabId.subscribe(($activeTabId) => {
		const tab = $tabs.find((tab) => tab.id === $activeTabId);
		if (tab && wrapperInner) {
			wrapperInner.scrollLeft = tab.scrollPosition.left;
			wrapperInner.scrollTop = tab.scrollPosition.top;
		}
	});

	return () => {
		unsubscribe();
	};
});
</script>

<div id="astro-wrapper" bind:this={wrapper}>
    <Sidebar />
    <SidebarInner />
    <div id="astro-wrapper-inner" bind:this={_astroWrapperInner}>
        <TabWrapper />
        <!-- {#if $showEditor} -->
            <div id="editor-wrapper-outer" bind:this={wrapperOuter}>
                <LineNumbers lineCount={$editor.getTotalLines()}/>
                <div id="editor-wrapper-inner" use:scrollAction={{ $lineNumbers: $lineNumbers, wrapperInner: wrapperInner, $startLine: () => $startLine, lineCount: $totalLines }} bind:this={wrapperInner}>
                    <AstroEditor />
                </div> 
            </div>
        <!-- {/if} -->
    </div>
    <StatusPane char={$editor.getCursor().getPosition().character + 1} lineNumber={$editor.getCursor().getPosition().line + 1} selection={$editor.getSelection()} selectionLength={$editor.getSelection().calculateTotalCharactersSelected()}/>
</div>