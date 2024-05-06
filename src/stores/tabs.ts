import { get, writable } from "svelte/store";
import type { Tab } from "../components/TabWrapper/Tabs/types";
import type { Editor } from "../models/Editor";
import type { ContentStore } from "./content";
import { showEditor, updateCurrentEditor } from "./editor";
import {
	registerTabScrollStore,
	tabsScrollStores,
	unregisterTabScrollStore,
} from "./scroll";

export const tabs = writable<Tab[]>([]);
export const activeTabId = writable<string | null>(null);
export const lastActiveTabs = writable<string[]>([]);

export const moveTabToPane = (tabId: string, newPaneId: string) => {
	console.log("moving tab");
	tabs.update(($tabs) => {
		const tab = $tabs.find((t) => t.id === tabId);
		if (tab) {
			tab.paneId = newPaneId;
			// Optionally, remove the tab from its original pane and add it to the new pane
		}
		return $tabs;
	});
};

export const openTab = (newTab: Tab) => {
	tabs.update((currentTabs) => {
		const exists = currentTabs.some((tab) => tab.id === newTab.id);

		if (!exists) {
			return [...currentTabs, newTab];
		}
		return currentTabs;
	});

	registerTabScrollStore(newTab.id);

	activeTabId.set(newTab.id);
};

export const updateCurrentTabScrollPosition = (
	$tabs: Tab[],
	$activeTabId: string,
): void => {
	const tabStore = get(tabsScrollStores)[$activeTabId];
	if (tabStore) {
		const currentTab = $tabs.find((tab) => tab.id === $activeTabId);
		if (!currentTab) return;

		const horizontalScroll = get(tabStore.scrollHorizontalPosition) as number;
		const verticalScroll = get(tabStore.scrollVerticalPosition) as number;
		currentTab.scrollPosition = {
			left: horizontalScroll,
			top: verticalScroll,
		};
	}
};

export const closeTab = (
	id: string,
	$contentStore: ContentStore,
	$tabs: Tab[],
) => {
	lastActiveTabs.update((tabs) => tabs.filter((tabId) => tabId !== id));
	tabs.update((currentTabs) => currentTabs.filter((tab) => tab.id !== id));

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

export const setActiveTab = async (
	id: string | null,
	$contentStore: ContentStore,
	$tabs: Tab[],
) => {
	activeTabId.set(id);

	if (id == null) {
		updateCurrentEditor((editor) => {
			editor.setContent("");
			return editor;
		});
		showEditor.set(false);
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

		const activeContent = $contentStore.contents.get(id);
		updateCurrentEditor((editor) => {
			editor.setContent(activeContent ?? "");
			editor
				.getCursor()
				.setPosition(
					editor.getTotalLines(),
					editor.getContent(),
					tab.cursorPosition.character,
					tab.cursorPosition.line,
					tab.cursorPosition.characterBasis,
				);
			editor.setRedoStack(tab.redoStack);
			editor.setUndoStack(tab.undoStack);

			return editor;
		});
	}
};

export const handleClick = (
	event: MouseEvent,
	tabId: string,
	$contentStore: ContentStore,
	$tabs: Tab[],
	$editor: Editor,
	$activeTabId: string,
) => {
	// Middle click closes the tab
	if (event.button === 1) {
		closeTab(tabId, $contentStore, $tabs);
	} else {
		const currentTab = $tabs.find((tab) => tab.id === $activeTabId);
		if (!currentTab) return;

		// Update cursor position
		currentTab.cursorPosition = $editor.getCursor().getPosition();
		// Save the current scroll position
		updateCurrentTabScrollPosition($tabs, $activeTabId ?? "");
		// Update undo and redo stacks
		currentTab.undoStack = $editor.getUndoStack();
		currentTab.redoStack = $editor.getRedoStack();
		setActiveTab(tabId, $contentStore, $tabs);
	}
};
