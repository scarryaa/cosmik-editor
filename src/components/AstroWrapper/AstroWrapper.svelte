<script lang="ts">
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { scrollAction } from "../../actions/scrollAction";
import { scrollToCursorAction } from "../../actions/scrollToCursorAction";
import { Editor } from "../../models/Editor";
import { contentStore } from "../../stores/content";
import { addEditor, editors, focusedEditorId, setFocusedEditorId, showEditor } from "../../stores/editor";
import {
	astroEditor,
	astroWrapper,
	astroWrapperInner,
	editorWidth,
	editorWrapperOuter,
	lineNumbers,
	linesMap,
} from "../../stores/elements";
import { startLine, totalLines } from "../../stores/lines";
    import { focusedPaneId, panes, setFocusedPaneId } from "../../stores/pane";
import {
	scrollHorizontalPosition,
	scrollVerticalPosition,
} from "../../stores/scroll";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, lastActiveTabs, tabs } from "../../stores/tabs";
import { newFile, openFile, saveFile } from "../../util/tauri-events";
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
    import Pane from "../Pane/Pane.svelte";
import SidebarInner from "../Sidebar/Inner/SidebarInner.svelte";
import Sidebar from "../Sidebar/Sidebar.svelte";
    import StatusPane from "../StatusPane/StatusPane.svelte";
import TabWrapper from "../TabWrapper/TabWrapper.svelte";
import "./AstroWrapper.scss";
import { ondragend, ondragover } from "./dragEvents";

let wrapper: HTMLDivElement;
let wrapperInner: HTMLDivElement | undefined = $state();
let wrapperOuter: HTMLDivElement | undefined = $state();
let dragOverLeft: boolean = $state(false);
let dragOverRight: boolean = $state(false);
let _astroWrapperInner: HTMLDivElement | undefined;

const currentEditor = $derived($editors.find(editor => editor.id === $focusedEditorId));
const wrapperRect = writable({ width: 0, left: 0 });
const dragZones = $derived(
	$wrapperRect
		? {
				left: {
					x: $wrapperRect.left + 50 + ($sideBarOpen ? 100 : 0),
					width: $wrapperRect.width / 2 + ($sideBarOpen ? 100 : 0),
				},
				right: {
					x:
						$wrapperRect.left +
						50 +
						($sideBarOpen ? 200 : 0) +
						$wrapperRect.width / 2,
					width: $wrapperRect.width / 2,
				},
			}
		: { left: { x: 0, width: 0 }, right: { x: 0, width: 0 } },
);

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

	const unsubscribe = activeTabId.subscribe(($activeTabId) => {
		const tab = $tabs.get($activeTabId ?? "");
		if (tab && wrapperInner) {
			wrapperInner.scrollLeft = tab.scrollPosition.left;
			wrapperInner.scrollTop = tab.scrollPosition.top;
		}
	});

	const resizeObserver = new ResizeObserver((entries) => {
		for (let entry of entries) {
			const { width, left } = entry.contentRect;
			wrapperRect.set({ width, left });
		}
	});

	const newEditorInstance = new Editor();
	addEditor(newEditorInstance);
	setFocusedEditorId(newEditorInstance.getId());
	setFocusedPaneId(newEditorInstance.getPaneId());
	
	const newEditorInstance2 = new Editor();
	addEditor(newEditorInstance2);

	if (_astroWrapperInner) {
		resizeObserver.observe(_astroWrapperInner);
	}

	openFile(
		lastActiveTabs,
		$contentStore,
		$tabs,
		() => $activeTabId ?? "",
		$astroWrapperInner,
		$astroEditor,
		showEditor,
		$focusedEditorId ?? "",
		$focusedPaneId ?? "",
	);
	saveFile(
		() => $activeTabId ?? "",
		() => $contentStore.contents.get($activeTabId ?? "") ?? "",
	);
	newFile(
		lastActiveTabs,
		$contentStore,
		() => $tabs,
		() => $activeTabId ?? "",
		() => $astroWrapperInner,
		$astroEditor,
		showEditor,
		{ get $focusedPaneId() { return $focusedPaneId ?? "" } },
		{ get $focusedEditorId() { return $focusedEditorId ?? "" }},
	);

	return () => {
		unsubscribe();
		if (_astroWrapperInner) {
			resizeObserver.unobserve(_astroWrapperInner);
		}
	};
});
</script>

<div id="astro-wrapper" bind:this={wrapper} style={`--sidebar-inner-width: ${$sideBarOpen ? 200 : 0}px`}>
    <Sidebar />
    <SidebarInner />
    <div id="astro-wrapper-inner" role="presentation" class:left-split={dragOverLeft} class:right-split={dragOverRight} bind:this={_astroWrapperInner} ondragover={(event) => { const res = ondragover(event, dragZones, _astroWrapperInner); dragOverLeft = res.dragOverLeft; dragOverRight = res.dragOverRight; }} ondragend={(event) => { const res = ondragend(event, _astroWrapperInner); dragOverLeft = res.dragOverLeft; dragOverRight = res.dragOverRight}}>
		<div class="editor-container">
			{#each $editors as { id, instance }, index}
			<div class="editor-wrapper-outer" style={index !== 0 ? "border-left: 1px solid #9c9c9c" : ""} bind:this={wrapperOuter}>
					<TabWrapper paneId={instance.getPaneId()} />
					<Pane paneId={instance.getPaneId()}>
						<LineNumbers lineCount={instance.getTotalLines()}/>
						<div class="editor-wrapper-inner" use:scrollToCursorAction={{ $editor: instance, $scrollHorizontalPosition: () => $scrollHorizontalPosition, $editorWidth, $astroWrapperInner: () => $astroWrapperInner, $currentLineElement: () => $linesMap.get(instance.getCursorLine() + 1)! }} use:scrollAction={{ $lineNumbers: $lineNumbers, wrapperInner: wrapperInner, $startLine: () => $startLine, lineCount: $totalLines }} bind:this={wrapperInner} onscroll={() => { scrollHorizontalPosition.set(wrapperInner?.scrollLeft ?? 0); scrollVerticalPosition.set(wrapperInner?.scrollTop ?? 0)} }>
							<AstroEditor editorNumber={index} editorInstance={instance} />
						</div> 
					</Pane>
				</div>
			{/each}
		</div>
    </div>
    <StatusPane />
</div>