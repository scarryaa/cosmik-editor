<script lang="ts">
import { tick } from "svelte";
import { contentStore } from "../../../stores/content";
import { editor, showEditor } from "../../../stores/editor";
import { astroEditor, astroWrapperInner } from "../../../stores/elements";
import { activeTabId, lastActiveTabs, tabs } from "../../../stores/tabs";
import {
	updateCursorHorizontalPosition,
	updateCursorVerticalPosition,
} from "../../AstroEditor/AstroEditor";
import "./Tab.scss";

const closeTab = (id: string) => {
	lastActiveTabs.update((tabs) => tabs.filter((tabId) => tabId !== id));
	tabs.update((currentTabs) => currentTabs.filter((tab) => tab.id !== id));

	if (
		$contentStore.originalContents.get(id) === $contentStore.contents.get(id)
	) {
		$contentStore.contentModified.set(id, false);
	}

	lastActiveTabs.update((tabs) => {
		if (tabs.length > 0) {
			setActiveTab(tabs[tabs.length - 1]);
		} else {
			setActiveTab(null);
		}
		return tabs;
	});
};

const setActiveTab = async (id: string | null) => {
	let scrollDirection = "down";
	const currentTab = $tabs.find((tab) => tab.id === $activeTabId);

	activeTabId.set(id);

	if (id == null) {
		editor.update((model) => {
			model.setContent("");
			showEditor.set(false);
			return model;
		});
	} else {
		lastActiveTabs.update((tabs) => {
			const index = tabs.indexOf(id);
			if (index !== -1) {
				tabs.splice(index, 1);
			}
			tabs.push(id);
			return tabs;
		});

		const tab = $tabs.find((tab) => tab.id === id);
		if (!tab) return;
		if (currentTab) {
			scrollDirection =
				tab.cursorPosition.line > currentTab.cursorPosition.line
					? "down"
					: "up";
		}

		const activeContent = $contentStore.contents.get(id);
		editor.update((model) => {
			model.setContent(activeContent ?? "");
			model
				.getCursor()
				.setPosition(
					model.getTotalLines(),
					model.getContent(),
					tab.cursorPosition.character,
					tab.cursorPosition.line,
					tab.cursorPosition.characterBasis,
				);
			model.setRedoStack(tab.redoStack);
			model.setUndoStack(tab.undoStack);

			return model;
		});

		await tick();

		requestAnimationFrame(() => {
			updateCursorHorizontalPosition($editor, $astroEditor);
			updateCursorVerticalPosition(scrollDirection === "down");
		});
	}
};

const handleClick = (event: MouseEvent, tabId: string) => {
	// Middle click closes the tab
	if (event.button === 1) {
		closeTab(tabId);
	} else {
		const currentTab = $tabs.find((tab) => tab.id === $activeTabId);
		if (!currentTab) return;

		// Update cursor position
		currentTab.cursorPosition = $editor.getCursor().getPosition();
		// Save the current scroll position
		currentTab.scrollPosition = {
			left: $astroWrapperInner.scrollLeft,
			top: $astroWrapperInner.scrollTop,
		};
		// Update undo and redo stacks
		currentTab.undoStack = $editor.getUndoStack();
		currentTab.redoStack = $editor.getRedoStack();
		setActiveTab(tabId);
	}
};
</script>
  
{#each $tabs as tab (tab.id)}
  <div role="button" tabindex="0" class="tab" class:active={$activeTabId === tab.id} on:mouseleave|stopPropagation|preventDefault={() => { tab.isHovered = false }} on:mouseenter|stopPropagation|preventDefault={() => { tab.isHovered = true }} on:keypress={() => setActiveTab(tab.id)} on:click={(event: MouseEvent) => handleClick(event, tab.id)}>
    <span class="tab-name">{tab.name}</span>
	{#if $contentStore.contentModified.get(tab.id) && !tab.isHovered}
		<div role="img" class="modified-indicator-wrapper">
			<div class="modified-indicator"></div>
		</div>
	{:else if (tab.isHovered)}
		<button class="no-button-style" on:mouseenter|stopPropagation|preventDefault={() => { tab.isHovered = true }} on:click|stopPropagation|preventDefault={() => closeTab(tab.id)}>×</button>
	{/if}
  </div>
{/each}