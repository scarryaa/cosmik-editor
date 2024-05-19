import Explorer from "@renderer/components/LeftSidebar/Explorer/Explorer";
import Search from "@renderer/components/LeftSidebar/Search/Search";
import { VsFiles, VsSearch } from "solid-icons/vs";
import { createSignal } from "solid-js";

export const [panes, setPanes] = createSignal([
    {
        name: "Explorer",
        component: Explorer,
        childStyle: { minHeight: "50px" },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column" as any["flex-direction"],
            "background-color": "var(--meteor-pane-background)",
        } as any,
        icon: VsFiles,
        column: 0,
        id: 0,
        collapsed: false,
        height: "150",
        previousHeight: "150",
    },
    {
        name: "Search",
        component: Search,
        childStyle: { minHeight: "50px" } as any,
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column" as any["flex-direction"],
            "background-color": "var(--meteor-pane-background)",
        } as any,
        icon: VsSearch,
        column: 1,
        id: 1,
        collapsed: false,
        height: "150",
        previousHeight: "150",
    }
]);
