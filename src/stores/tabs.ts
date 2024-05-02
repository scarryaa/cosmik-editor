import { writable } from "svelte/store";
import type { Tab } from "../components/TabWrapper/Tabs/types";

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

	activeTabId.set(newTab.id);
};
