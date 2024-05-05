import { get, writable } from "svelte/store";
import type { Tab } from "../components/TabWrapper/Tabs/types";
import { registerTabScrollStore, tabsScrollStores } from "./scroll";

export const tabs = writable<Tab[]>([]);
export const activeTabId = writable<string | null>(null);
export const lastActiveTabs = writable<string[]>([]);

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
