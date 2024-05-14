import { get } from "svelte/store";
import { app } from "../reactives/app.svelte";
import {
	activeTabId,
	closeTab as closeTabStore,
	setActiveTab as setActiveTabStore,
	switchToLastActiveTab as switchToLastActiveTabStore,
    tabs,
} from "../reactives/tabs.svelte";

export const tabService = {
	findTab(id: string) {
		return get(tabs).find((tab) => tab.id === id);
	},

	closeTab(id: string) {
		closeTabStore(id);

		// Find and set the new active tab
		const newActiveTabId = get(activeTabId);
		const activeTab = this.findTab(newActiveTabId);
		if (activeTab) {
			app.setEditorFromTab(activeTab);
		}
	},

	switchToLastActiveTab(id: string) {
		switchToLastActiveTabStore(id);
	},

	setActiveTab(id: string) {
		setActiveTabStore(id);
	},
};
