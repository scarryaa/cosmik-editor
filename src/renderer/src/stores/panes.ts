import Explorer from "@renderer/components/LeftSidebar/Explorer/Explorer";
import Search from "@renderer/components/LeftSidebar/Search/Search";
import { VsFiles, VsSearch } from "solid-icons/vs";
import { createSignal } from "solid-js";

export const [panes, setPanes] = createSignal([
	{
		name: "Files",
		component: Explorer,
		childStyle: { minHeight: "50px", height: "42vh", overflow: "hidden" },
		style: {
			width: "165px",
			"min-width": "165px",
			"margin-block": "2px",
			"border-radius": "4px",
			display: "flex",
			overflow: "hidden",
			"flex-direction": "column",
			"background-color": "var(--meteor-pane-background)",
		},
		icon: VsFiles,
		column: 0,
		id: 0,
		collapsed: false,
		height: "900",
		contentOverflow: "hidden",
		previousHeight: "900",
	},
	{
		name: "Search",
		component: Search,
		childStyle: { minHeight: "50px", height: "42vh" },
		style: {
			width: "165px",
			"min-width": "165px",
			"margin-block": "2px",
			"border-radius": "4px",
			display: "flex",
			"flex-direction": "column",
			"background-color": "var(--meteor-pane-background)",
		},
		icon: VsSearch,
		column: 0,
		id: 1,
		collapsed: false,
		height: "900",
		previousHeight: "900",
	},
]);

export const paneIsOpen = (openPane: any) =>
	panes().some((pane) => pane.name === openPane.name);

export const addPane = (newPane: any) => {
	if (!paneIsOpen(newPane)) {
		setPanes([...panes(), newPane]);
	}
};

export const removePane = (paneName: string) =>
	setPanes(panes().filter((pane) => pane.name !== paneName));

export const togglePane = (pane: any) => {
	paneIsOpen(pane) ? removePane(pane.name) : addPane(pane);
};