import { panes } from "@renderer/stores/panes";
import TabStore from "@renderer/stores/tabs";
import {
	type Component,
	For,
	createSignal,
	onMount,
	onCleanup,
} from "solid-js";
import Tab from "../Tab/Tab";
import styles from "./TabsWrapper.module.scss";
import tabStyles from "./TabScrollbar.module.scss";

interface TabScrollbarProps {
	thumbPosition: number;
	onScroll: (e: WheelEvent) => void;
}

const TabScrollbar: Component<TabScrollbarProps> = (
	props: TabScrollbarProps,
) => {
	let scrollbarRef: HTMLDivElement;

	onMount(() => {
		if (scrollbarRef) {
			scrollbarRef.addEventListener("wheel", props.onScroll);
		}
	});

	return (
		<div class={tabStyles["tab-scrollbar"]} ref={scrollbarRef!}>
			<div class={tabStyles["tab-scrollbar-track"]} />
			<div
				class={tabStyles["tab-scrollbar-thumb"]}
				style={{ left: `${props.thumbPosition}%` }}
			/>
		</div>
	);
};

interface TabScrollbarProps {
	thumbPosition: number;
	onScroll: (e: WheelEvent) => void;
}

const TabsWrapper: Component = () => {
	let tabsContainerRef: HTMLDivElement;
	const [scrollPosition, setScrollPosition] = createSignal(0);
	const [isOverflowing, setIsOverflowing] = createSignal(false);

	const updateScrollPosition = () => {
		if (tabsContainerRef) {
			const maxScrollLeft =
				tabsContainerRef.scrollWidth - tabsContainerRef.clientWidth;
			setScrollPosition((tabsContainerRef.scrollLeft / maxScrollLeft) * 100);
			setIsOverflowing(
				tabsContainerRef.scrollWidth > tabsContainerRef.clientWidth,
			);
		}
	};

	const scrollHandler = (event: WheelEvent) => {
		if (tabsContainerRef) {
			tabsContainerRef.scrollLeft += event.deltaY;
			updateScrollPosition();
			event.stopPropagation();
		}
	};

	onMount(() => {
		if (tabsContainerRef) {
			tabsContainerRef.addEventListener("scroll", updateScrollPosition);
			updateScrollPosition();
		}
	});

	onCleanup(() => {
		if (tabsContainerRef) {
			tabsContainerRef.removeEventListener("scroll", updateScrollPosition);
		}
	});

	const handleTabClose = (id: string, event: MouseEvent) => {
		event.stopPropagation();
		TabStore.closeTab(id);
	};

	const handleTabClick = (id: string, event: MouseEvent) => {
		event.stopPropagation();
		TabStore.activateTab(id);
	};

	return (
		<div
			class={styles["tabs-wrapper"]}
			style={{ "margin-left": panes().length === 0 ? "4px" : "2px" }}
		>
			<div class={styles["tabs-container"]} ref={tabsContainerRef!}>
				<For each={TabStore.tabs}>
					{(tab) => (
						<Tab
							id={tab.id}
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
			{isOverflowing() && (
				<TabScrollbar
					thumbPosition={scrollPosition()}
					onScroll={scrollHandler}
				/>
			)}
		</div>
	);
};

export default TabsWrapper;
