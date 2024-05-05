<script lang="ts">
import { onMount } from "svelte";
import { scrollAction } from "../../actions/scrollAction";
import { scrollToCursorAction } from "../../actions/scrollToCursorAction";
import { sidebarClosedWidth, sidebarOpenWidth } from "../../const/const";
import { editor, showEditor } from "../../stores/editor";
import {
	astroWrapper,
	astroWrapperInner,
	editorWidth,
	editorWrapperOuter,
	lineNumbers,
    linesMap,
} from "../../stores/elements";
import { startLine, totalLines } from "../../stores/lines";
import {
	scrollHorizontalPosition,
	scrollVerticalPosition,
} from "../../stores/scroll";
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
let wrapperInner: HTMLDivElement | undefined = $state();
let wrapperOuter: HTMLDivElement | undefined = $state();
let _astroWrapperInner: HTMLDivElement | undefined;
let wrapperInnerStyle = $state("");

$effect(() => {
	if ($showEditor) {
		if (wrapperInner) astroWrapperInner.set(wrapperInner);
		if (wrapperOuter) editorWrapperOuter.set(wrapperOuter);
	}
});

$effect(() => {
	if ($showEditor && $editorWidth !== $astroWrapperInner?.clientWidth) {
		editorWidth.set($astroWrapperInner?.getBoundingClientRect().width ?? 0);
	}
});

onMount(() => {
	astroWrapper.set(wrapper);

	sideBarOpen.subscribe((isOpen) => {
		wrapperInnerStyle = `width: calc(100% - ${
			isOpen ? sidebarClosedWidth + sidebarOpenWidth : sidebarClosedWidth
		}px);`;
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
    <div id="astro-wrapper-inner" bind:this={_astroWrapperInner} style={wrapperInnerStyle}>
        <TabWrapper />
        {#if $showEditor}
            <div id="editor-wrapper-outer" bind:this={wrapperOuter}>
                <LineNumbers lineCount={$editor.getTotalLines()}/>
                <div id="editor-wrapper-inner" use:scrollToCursorAction={{ $editor, $scrollHorizontalPosition: () => $scrollHorizontalPosition, $editorWidth, $astroWrapperInner: () => $astroWrapperInner, $currentLineElement: () => $linesMap.get($editor.getCursorLine() + 1)! }} use:scrollAction={{ $lineNumbers: $lineNumbers, wrapperInner: wrapperInner, $startLine: () => $startLine, lineCount: $totalLines }} bind:this={wrapperInner} onscroll={() => { scrollHorizontalPosition.set(wrapperInner?.scrollLeft ?? 0); scrollVerticalPosition.set(wrapperInner?.scrollTop ?? 0)} }>
                    <AstroEditor />
                </div> 
            </div>
        {/if}
    </div>
    <StatusPane char={$editor.getCursor().getPosition().character + 1} lineNumber={$editor.getCursor().getPosition().line + 1} selection={$editor.getSelection()} selectionLength={$editor.getSelection().calculateTotalCharactersSelected()}/>
</div>