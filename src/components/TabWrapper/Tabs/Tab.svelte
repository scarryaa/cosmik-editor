<script lang="ts">
import { onMount } from "svelte";
import { contentStore } from "../../../stores/content";
import { editor, showEditor } from "../../../stores/editor";
import { activeTabId, lastActiveTabs, tabs } from "../../../stores/tabs";
import "./Tab.scss";

const closeTab = (id: string) => {
	lastActiveTabs.update((tabs) => tabs.filter((tabId) => tabId !== id));
	tabs.update((currentTabs) => currentTabs.filter((tab) => tab.id !== id));

	lastActiveTabs.update((tabs) => {
		if (tabs.length > 0) {
			setActiveTab(tabs[tabs.length - 1]);
		} else {
			setActiveTab(null);
		}
		return tabs;
	});
};

const setActiveTab = (id: string | null) => {
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

		const activeContent = $contentStore.get(id);
		editor.update((model) => {
			model.setContent(activeContent ?? "");
			return model;
		});
	}
};

const handleClick = (event: MouseEvent, tabId: string) => {
	console.log(event.button);
	// Middle click closes the tab
	if (event.button === 1) {
		closeTab(tabId);
	} else {
		setActiveTab(tabId);
	}
};
</script>
  
{#each $tabs as tab (tab.id)}
  <div role="button" tabindex="0" class="tab" class:active={$activeTabId === tab.id} on:keypress={() => setActiveTab(tab.id)} on:click={(event: MouseEvent) => handleClick(event, tab.id)}>
    <span class="tab-name">{tab.name}</span>
    <button class="no-button-style" on:click|stopPropagation={() => closeTab(tab.id)}>×</button>
  </div>
{/each}