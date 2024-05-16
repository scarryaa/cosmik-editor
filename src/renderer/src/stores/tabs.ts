import { PieceTable } from "@renderer/models/PieceTable";
import type { Tab } from "@renderer/models/Tab";
import { createStore } from "solid-js/store";
import EditorStore from "./editors";
import PieceTableStore from "./piece-tables";

export enum TabState {
	Modified = 0,
	Untracked = 1,
	Deleted = 2,
}

const [state, setState] = createStore({
	tabs: [] as Tab[],
	activeTabId: null as string | null,
	lastActiveTabs: [] as string[],
});

const TabStore = {
	get tabs() {
		return state.tabs;
	},
	get activeTab() {
		return state.tabs.find((tab) => tab.id === state.activeTabId) || null;
	},
	get lastActiveTab() {
		const lastActiveTabId =
			state.lastActiveTabs[state.lastActiveTabs.length - 1];
		return state.tabs.find((tab) => tab.id === lastActiveTabId) || null;
	},

	getTabState(tabId: string): TabState | undefined {
		const tab = state.tabs.find((t) => t.id === tabId);
		return tab ? tab.state : undefined;
	},

	openTab(tab: Omit<Tab, "active" | "modified" | "saved" | "content">) {
		setState("tabs", (tabs) => {
			const tabExists = tabs.some((t) => t.id === tab.id);

			if (!tabExists) {
				return [
					...tabs.map((t) => ({ ...t, active: false })),
					{ ...tab, active: true, modified: false, saved: true, content: "" },
				];
			}

			// Add the tab to active tabs
			setState("lastActiveTabs", (lastActiveTabs) => [
				...lastActiveTabs,
				tab.id,
			]);

			// If the tab already exists, activate it and deactivate others
			return tabs.map((t) => ({
				...t,
				active: t.id === tab.id,
			}));
		});
		this.setActiveTab(tab.id);
	},

	closeTab(tabId: string) {
		setState("tabs", (tabs) => tabs.filter((tab) => tab.id !== tabId));

		if (state.activeTabId === tabId) {
			setState("lastActiveTabs", (lastActiveTabs) =>
				lastActiveTabs.filter((id) => id !== tabId),
			);

			const lastActiveTabId =
				state.lastActiveTabs[state.lastActiveTabs.length - 1] || null;
			this.setActiveTab(lastActiveTabId);

			// Close the relevant piece table
			PieceTableStore.removePieceTable(tabId);
		}
	},

	activateTab(tabId: string) {
		setState("tabs", (tabs) =>
			tabs.map((tab) => ({
				...tab,
				active: tab.id === tabId,
			})),
		);
		this.setActiveTab(tabId);
	},

	async setActiveTab(tabId: string | null) {
		if (state.activeTabId !== tabId) {
			setState("activeTabId", tabId);
			if (tabId) {
				setState("lastActiveTabs", (lastActiveTabs) => {
					const newLastActiveTabs = [...lastActiveTabs, tabId].filter(
						(id, index, self) => self.indexOf(id) === index,
					);
					return newLastActiveTabs;
				});

				const editor = EditorStore.getActiveEditor();
				if (editor) {
					// Check for a piece table
					if (!PieceTableStore.getPieceTable(tabId)) {
						// Create a new piece table
                        PieceTableStore.addPieceTable(tabId, new PieceTable(editor.text()));
                        editor.setPieceTable(PieceTableStore.getPieceTable(tabId)!);
                    } else {
						editor.setPieceTable(PieceTableStore.getPieceTable(tabId)!);
					}
				}
			}
		}
	},

	getTabContent(tabId: string) {
		const tab = state.tabs.find((t) => t.id === tabId);
		return tab ? tab.content : "";
	},

	updateTab(tabId: string, updates: Partial<Omit<Tab, "id">>) {
		setState("tabs", (tabs) =>
			tabs.map((tab) => (tab.id === tabId ? { ...tab, ...updates } : tab)),
		);
	},

	setTabState(tabId: string, state: TabState) {
		this.updateTab(tabId, { state });
	},

	setTabSaved(tabId: string, saved: boolean) {
		this.updateTab(tabId, { saved });
	},
};

export default TabStore;
