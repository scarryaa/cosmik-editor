import Explorer from "@renderer/components/LeftSidebar/Explorer/Explorer";
import Extensions from "@renderer/components/LeftSidebar/Extensions/Extensions";
import RunAndDebug from "@renderer/components/LeftSidebar/RunAndDebug/RunAndDebug";
import Search from "@renderer/components/LeftSidebar/Search/Search";
import SourceControl from "@renderer/components/LeftSidebar/SourceControl/SourceControl";
import {
	VsDebug,
	VsExtensions,
	VsFiles,
	VsSearch,
	VsSourceControl,
} from "solid-icons/vs";

export const filePane = {
	name: "Files",
	component: Explorer,
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
	icon: VsFiles,
	column: 0,
	id: 0,
	collapsed: false,
	height: "900",
	contentOverflow: "hidden",
	previousHeight: "900",
};

export const searchPane = {
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
};

export const sourceControlPane = {
	name: "Source Control",
	component: SourceControl,
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
	icon: VsSourceControl,
	column: 0,
	id: 2,
	collapsed: false,
	height: "900",
	previousHeight: "900",
};

export const runAndDebugPane = {
	name: "Run and Debug",
	component: RunAndDebug,
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
	icon: VsDebug,
	column: 0,
	id: 3,
	collapsed: false,
	height: "900",
	previousHeight: "900",
};

export const extensionsPane = {
	name: "Extensions",
	component: Extensions,
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
	icon: VsExtensions,
	column: 0,
	id: 4,
	collapsed: false,
	height: "900",
	previousHeight: "900",
};
