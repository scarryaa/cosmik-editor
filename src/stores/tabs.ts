import { get, writable } from "svelte/store";
import { focusEditor } from "../components/AstroEditor/AstroEditor";
import type { Tab } from "../components/TabWrapper/Tabs/types";
import type { Editor } from "../models/Editor";
import type { ContentStore } from "./content";
import {
	getEditorInstanceById,
	showEditor,
	updateCurrentEditor,
} from "./editor";
import {
	registerTabScrollStore,
	tabsScrollStores,
	unregisterTabScrollStore,
} from "./scroll";

// Track each tab by pane id
export const tabs = writable<Map<string, Tab>>(new Map());
export const activeTabId = writable<string | null>(null);
export const lastActiveTabs = writable<string[]>([]);

export const moveTabToPane = (tabId: string, newPaneId: string) => {
	console.log("moving tab");
	tabs.update((currentTabs) => {
		const currentTab = currentTabs.get(tabId);
		if (currentTab) {
			currentTab.paneId = newPaneId;
		}
		return currentTabs;
	});
};

export const openTab = (newTab: Tab) => {
	tabs.update((currentTabs) => {
		const exists = currentTabs.get(newTab.id);

		if (!exists) {
			currentTabs.set(newTab.id, newTab);
		}
		return currentTabs;
	});

	registerTabScrollStore(newTab.id);

	activeTabId.set(newTab.id);
};

export const updateCurrentTabScrollPosition = (
	$tabs: Map<string, Tab>,
	$activeTabId: string,
): void => {
	const tabStore = get(tabsScrollStores)[$activeTabId];
	if (tabStore) {
		const currentTab = $tabs.get($activeTabId);
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
	$tabs: Map<string, Tab>,
) => {
	lastActiveTabs.update((tabs) => tabs.filter((tabId) => tabId !== id));
	tabs.update((currentTabs) => {
		currentTabs.delete(id);
		return currentTabs;
	});

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
	$tabs: Map<string, Tab>,
) => {
	activeTabId.set(id);

	if (id == null) {
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

		const tab = $tabs.get(id);
		if (!tab) return;

		const editorInstance = getEditorInstanceById(tab.editorInstanceId);
		const activeContent = $contentStore.contents.get(id);

		if (editorInstance) {
			editorInstance.setContent(activeContent ?? "");
			editorInstance
				.getCursor()
				.setPosition(
					editorInstance.getTotalLines(),
					editorInstance.getContent(),
					tab.cursorPosition.character,
					tab.cursorPosition.line,
					tab.cursorPosition.characterBasis,
				);
			editorInstance.setRedoStack(tab.redoStack);
			editorInstance.setUndoStack(tab.undoStack);
		}
	}

	// focusEditor()
};

export const handleClick = (
	event: MouseEvent,
	tabId: string,
	$contentStore: ContentStore,
	$tabs: Map<string, Tab>,
	$editor: Editor,
	$activeTabId: string,
) => {
	// Middle click closes the tab
	if (event.button === 1) {
		closeTab(tabId, $contentStore, $tabs);
	} else {
		const currentTab = $tabs.get($activeTabId);
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
