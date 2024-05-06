import { writable } from "svelte/store";
import type { Tab } from "../components/TabWrapper/Tabs/types";

export const dragContext = writable<{
	draggingTab: Tab | null;
	originPaneId: string | null;
}>({
	draggingTab: null,
	originPaneId: null,
});
