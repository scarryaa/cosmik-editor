import { createStore } from "solid-js/store";
import TabStore from "./tabs";

const [state, setState] = createStore({
  tabContents: {} as { [key: string]: string },
});

const EditorStore = {
  getTabContent(tabId: string) {
    return state.tabContents[tabId] || "";
  },

  updateTabContent(tabId: string, content: string) {
    setState("tabContents", {
      ...state.tabContents,
      [tabId]: content,
    });
    TabStore.updateTab(tabId, { content, state: TabStore.getTabState(tabId) });
  },

  saveTab(tabId: string) {
    TabStore.setTabSaved(tabId, true);
  },
};

export default EditorStore;
