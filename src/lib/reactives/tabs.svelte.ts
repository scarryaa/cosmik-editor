import { get, writable } from "svelte/store";
import type { ITab } from "../types/ITab";
import { app } from "./app.svelte";

export const activeTabId = writable<string>("");
export const tabs = writable<ITab[]>([]);
export const lastActiveTabs = writable<string[]>([]);

function findTabById(tabId: string): ITab | undefined {
    return get(tabs).find(tab => tab.id === tabId);
}

const setEditor = (tab: ITab) => {
    app.setEditorFromTab(tab);
};

export const openTab = (tab: ITab) => {
    const existingTab = findTabById(tab.id);
    if (existingTab) {
        setActiveTab(tab.id);
    } else {
        tabs.update(tabs => [...tabs, tab]);
        setActiveTab(tab.id);
    }
};

export const closeTab = (id: string) => {
    tabs.update(tabs => tabs.filter(tab => tab.id !== id));
    lastActiveTabs.update(lastTabs => lastTabs.filter(tabId => tabId !== id));

	switchToLastActiveTab(id);
};

export const setActiveTab = (id: string) => {
    activeTabId.set(id);
    lastActiveTabs.update(lastTabs => lastTabs.filter(tabId => tabId !== id).concat(id));
    const activeTab = findTabById(id);
    if (activeTab) setEditor(activeTab);
};

export const switchToLastActiveTab = (removedTabId: string): string => {
    if (removedTabId === get(activeTabId)) {
        const newActiveTabId = get(lastActiveTabs).pop() || "";
        setActiveTab(newActiveTabId);

		return newActiveTabId;
    }

	return "";
};

export const createNewTab = (path: string): ITab => ({
    id: path,
    name: "Untitled",
    icon: "",
    isActive: true,
    tooltip: "",
    contentModified: false,
    isHovered: false,
    cursorPosition: { column: 0, line: 0 },
    scrollPosition: { left: 0, top: 0 },
    content: "",
    editor: null,
});