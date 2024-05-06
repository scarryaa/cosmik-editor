<script lang="ts">
import { onMount } from "svelte";
import { sidebarClosedWidth, sidebarOpenWidth } from "../../const/const";
import { tabs as tabsElement } from "../../stores/elements";
import { focusedPaneId } from "../../stores/pane";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, tabs } from "../../stores/tabs";
// biome-ignore lint/style/useImportType: Incorrect by biome
import ScrollbarThin from "../ScrollbarThin/ScrollbarThin.svelte";
import "./TabWrapper.scss";
import Tab from "./Tabs/Tab.svelte";


export let paneId: string;
let tabsWrapper: HTMLDivElement;
let scrollbarThin: ScrollbarThin;
let left = 50;
let scrolling = false;

let reactiveProps = {
	tabs,
	activeTabId,
};

const calculateTabsWidth = (): number => {
	if (!tabsWrapper || tabsWrapper.children.length === 0) return 0;

	let totalWidth = 0;
	const tabs = tabsWrapper.querySelectorAll(".tab");
	for (const tab of tabs) {
		totalWidth += (tab as HTMLElement).offsetWidth;
	}

	return totalWidth;
};

const scrollToActiveTab = (
	previousScrollLeft: number,
	wasAtEnd: boolean,
): void => {
	setTimeout(() => {
		if (wasAtEnd) {
			tabsWrapper.scrollLeft =
				tabsWrapper.scrollWidth - tabsWrapper.clientWidth;
		} else {
			// Scroll to the active tab
			const activeTab = tabsWrapper?.querySelector?.(".active");
			if (activeTab) {
				const tabLeft = (activeTab as HTMLElement).offsetLeft;
				const tabRight = tabLeft + (activeTab as HTMLElement).offsetWidth;
				const scrollRight = tabsWrapper.scrollLeft + tabsWrapper.clientWidth;

				if (tabLeft < tabsWrapper.scrollLeft || tabRight > scrollRight) {
					tabsWrapper.scrollLeft =
						tabLeft -
						(tabsWrapper.clientWidth -
							(activeTab as HTMLElement).offsetWidth / 2);
				}
			} else if (tabsWrapper) {
				tabsWrapper.scrollLeft = previousScrollLeft;
			}
		}
	}, 0);
};

$: {
	const isOpen = $sideBarOpen;
	const tabsCount = $tabs.size;

	setTimeout(() => {
		const isOverflowing =
			calculateTabsWidth() >
			tabsWrapper?.clientWidth - ($sideBarOpen ? 250 : 50);
		if (isOpen && tabsCount) {
			left = isOverflowing
				? window.innerWidth - sidebarOpenWidth - sidebarClosedWidth
				: window.innerWidth - sidebarClosedWidth;
		} else {
			left = isOverflowing
				? window.innerWidth - sidebarClosedWidth
				: window.innerWidth;
		}
	}, 0);
}

onMount(() => {
	tabsElement.set(tabsWrapper);

	tabs.subscribe((tabs) => {
		const previousScrollLeft = tabsWrapper?.scrollLeft;
		const wasAtEnd =
			previousScrollLeft >= tabsWrapper?.scrollWidth - tabsWrapper?.clientWidth;

		if (!scrolling) {
			scrollToActiveTab(previousScrollLeft, wasAtEnd);
		}
	});

	sideBarOpen.subscribe(() => {
		setTimeout(() => {
			const previousScrollLeft = tabsWrapper?.scrollLeft;
			const wasAtEnd =
				previousScrollLeft >=
				tabsWrapper?.scrollWidth - tabsWrapper?.clientWidth;

			if (!scrolling) {
				scrollToActiveTab(previousScrollLeft, wasAtEnd);
			}
		}, 0);
	});
});
</script>
    
<div class="tabs-wrapper-outer" bind:this={tabsWrapper}>
    <ScrollbarThin bind:this={scrollbarThin} {...reactiveProps}>
		{#each Array.from($tabs.values()) as tab (tab.id)}
			{#if tab.paneId === paneId}
				<Tab tab={{...tab, paneId: $focusedPaneId }}/>
			{/if}
		{/each}
    </ScrollbarThin>
</div>