<script lang="ts">
import type { Editor } from "../../../models/Editor";
import { contentStore } from "../../../stores/content";
import { dragContext } from "../../../stores/dragContext";
    import { getCurrentEditor } from "../../../stores/editor";
import { unregisterTabScrollStore } from "../../../stores/scroll";
import {
	activeTabId,
	lastActiveTabs,
	setActiveTab,
	tabs,
	updateCurrentTabScrollPosition,
} from "../../../stores/tabs";
import "./Tab.scss";

const onDragStart = (event: DragEvent, tabId: string): void => {
	const tab = $tabs.get(tabId);
	if (tab) {
		event.dataTransfer?.setData("text/plain", tab.id);
		dragContext.set({ draggingTab: tab, originPaneId: tab.paneId });
		if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
	}
};

const onDragEnd = (event: DragEvent): void => {
	dragContext.set({ draggingTab: null, originPaneId: null });
};

const closeTab = (id: string) => {
	lastActiveTabs.update((tabs) => tabs.filter((tabId) => tabId !== id));
	tabs.update((currentTabs) => { currentTabs.delete(id); return currentTabs; });

	if (
		$contentStore.originalContents.get(id) === $contentStore.contents.get(id)
	) {
		$contentStore.contentModified.set(id, false);
	}

	lastActiveTabs.update((tabs) => {
		if (tabs.length > 0) {
			setActiveTab(tabs[tabs.length - 1], $contentStore, $tabs);
		} else {
			setActiveTab(null, $contentStore, $tabs);
		}
		return tabs;
	});

	unregisterTabScrollStore(id);
};

const handleClick = (event: MouseEvent, tabId: string) => {
	// Middle click closes the tab
	if (event.button === 1) {
		closeTab(tabId);
	} else {
		const currentTab = $tabs.get($activeTabId ?? "");
		if (!currentTab) return;

		const editorInstance = getCurrentEditor();
		if (!editorInstance) return;
		
		// Update cursor position
		currentTab.cursorPosition = editorInstance.getCursor().getPosition();
		// Save the current scroll position
		updateCurrentTabScrollPosition($tabs, $activeTabId ?? "");
		// Update undo and redo stacks
		currentTab.undoStack = editorInstance.getUndoStack();
		currentTab.redoStack = editorInstance.getRedoStack();
		setActiveTab(tabId, $contentStore, $tabs);
	}
};
</script>
  
{#each Array.from($tabs.values()) as tab (tab.id)}
  <div role="button" tabindex="0" class="tab" draggable="true"
		on:dragstart={(event) => onDragStart(event, tab.id)} on:dragend={onDragEnd} 
		class:active={$activeTabId === tab.id} 
		on:mouseleave|stopPropagation|preventDefault={() => { tab.isHovered = false }} 
		on:mouseenter|stopPropagation|preventDefault={() => { tab.isHovered = true }} 
		on:keypress={() => setActiveTab(tab.id, $contentStore, $tabs)} 
		on:click={(event: MouseEvent) => handleClick(event, tab.id)}>
    <span class="tab-name">{tab.name}</span>
    {#if $contentStore.contentModified.get(tab.id) && !tab.isHovered}
      <div role="img" class="modified-indicator-wrapper">
        <div class="modified-indicator"></div>
      </div>
    {:else if (tab.isHovered)}
      <button class="no-button-style" 
	  		on:mouseenter|stopPropagation|preventDefault={() => { tab.isHovered = true }} 
			on:click|stopPropagation|preventDefault={() => closeTab(tab.id)}>×</button>
    {/if}
  </div>
{/each}