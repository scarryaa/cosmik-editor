import TabStore from "@renderer/stores/tabs";
import { type Component, For } from "solid-js";
import Tab from "../Tab/Tab";
import styles from "./TabsWrapper.module.scss";

const TabsWrapper: Component = () => {
    const handleTabClose = (id: string, event: MouseEvent) => {
        event.stopPropagation();
        TabStore.closeTab(id);
    };

    const handleTabClick = (id: string, event: MouseEvent) => {
        event.stopPropagation();
        TabStore.activateTab(id);
    };

	return (
		<div class={styles["tabs-wrapper"]}>
            <For each={TabStore.tabs}>
                {(tab) => (
                    <Tab
                        name={tab.name}
                        active={TabStore.activeTab?.id === tab.id}
                        state={tab.state}
                        saved={tab.saved}
                        oncloseclick={(e) => handleTabClose(tab.id, e)}
                        onclick={(e) => handleTabClick(tab.id, e)}
                    />
                )}
            </For>
		</div>
	);
};

export default TabsWrapper;
