<script lang="ts">
import { onMount, tick } from "svelte";
import type { Writable } from "svelte/store";
import type { Tab } from "../TabWrapper/Tabs/types";
import "./ScrollbarThin.scss";

export let tabs: Writable<Tab[]>;
export let activeTabId: Writable<string | null>;
let scrollableContent: HTMLDivElement;
let scrollbarThumb: HTMLDivElement;
let scrollbarThin: HTMLDivElement;
let isDragging = false;
let startDragX = 0;
let startScrollLeft = 0;
let overflowing = false;

onMount(() => {
	const recalculateWidth = (): void => {
		const visibleRatio =
			scrollableContent?.clientWidth / scrollableContent?.scrollWidth;
		const isOverflowing =
			scrollableContent.scrollWidth > scrollableContent.clientWidth;

		// Show or hide the scrollbar based on content overflow
		overflowing = isOverflowing;

		if (!isOverflowing) return; // Stop further execution if not overflowing

		const thumbWidth = visibleRatio * scrollbarThin.clientWidth;
		scrollbarThumb.style.width = `${Math.max(thumbWidth, 0)}px`;

		const maxScrollLeft =
			scrollableContent.scrollWidth - scrollableContent.clientWidth;
		const scrollRatio = scrollableContent.scrollLeft / maxScrollLeft;
		const maxThumbPosition =
			scrollbarThin.clientWidth - scrollbarThumb.clientWidth;
		const newThumbPosition = scrollRatio * maxThumbPosition;

		scrollbarThumb.style.left = `${Math.max(0, newThumbPosition)}px`;
	};

	const handleWheel = (event: WheelEvent): void => {
		event.preventDefault();

		const newPosition = scrollableContent.scrollLeft + event.deltaY;
		scrollableContent.scrollLeft = newPosition;

		recalculateWidth();
	};

	const startDrag = (event: MouseEvent): void => {
		isDragging = true;
		startDragX = event.clientX;
		startScrollLeft = scrollableContent.scrollLeft;
		scrollbarThin.classList.remove("fade-out");
		event.preventDefault();
	};

	const doDrag = (event: MouseEvent): void => {
		if (!isDragging) return;
		const dx = event.clientX - startDragX;
		// Convert dx movement into a scroll delta
		const scrollWidth =
			scrollableContent.scrollWidth - scrollableContent.clientWidth;
		const thumbWidth = scrollbarThumb.offsetWidth;
		const dragRatio = dx / (scrollbarThin.clientWidth - thumbWidth);
		const scrollDelta = dragRatio * scrollWidth;

		scrollableContent.scrollLeft = startScrollLeft + scrollDelta;

		// Recalculate the scroll ratio based on the new scroll position
		const maxScrollLeft =
			scrollableContent.scrollWidth - scrollableContent.clientWidth;
		const scrollRatio = scrollableContent.scrollLeft / maxScrollLeft;

		const maxThumbPosition = scrollbarThin.clientWidth - thumbWidth;
		const newThumbPosition = scrollRatio * maxThumbPosition;

		scrollbarThumb.style.left = `${Math.max(
			0,
			Math.min(newThumbPosition, maxThumbPosition),
		)}px`;
	};

	const stopDrag = (event: MouseEvent): void => {
		isDragging = false;
		if (
			!scrollableContent?.contains(event.relatedTarget as Node) &&
			!scrollbarThin?.contains(event.relatedTarget as Node)
		) {
			scrollbarThin?.classList.add("fade-out");
		}
	};

	const handleMouseEnter = (): void => {
		scrollbarThin.classList.remove("fade-out");
	};

	const handleMouseLeave = (event: MouseEvent): void => {
		if (
			!scrollableContent.contains(event.relatedTarget as Node) &&
			!scrollbarThin.contains(event.relatedTarget as Node) &&
			!isDragging
		) {
			scrollbarThin.classList.add("fade-out");
		}
	};

	const scrollToActiveTab = async () => {
		await tick();
		const activeTab = document.querySelector(".tab.active");
		recalculateWidth();

		if (activeTab) {
			const tabRect = activeTab.getBoundingClientRect();
			const containerRect = scrollableContent.getBoundingClientRect();
			const scrollLeft = scrollableContent.scrollLeft;
			const tabLeftRelativeToContainer =
				tabRect.left - containerRect.left + scrollLeft;
			const tabRightRelativeToContainer =
				tabLeftRelativeToContainer + tabRect.width;
			const containerVisibleWidth = scrollableContent.clientWidth;

			let leftPosition = scrollLeft;
			// If the tab is to the left of the viewport
			if (tabLeftRelativeToContainer < scrollLeft) {
				leftPosition = tabLeftRelativeToContainer;
			}
			// If the tab is to the right of the viewport
			else if (
				tabRightRelativeToContainer >
				scrollLeft + containerVisibleWidth
			) {
				leftPosition = tabRightRelativeToContainer - containerVisibleWidth;
			}

			setTimeout(() => {
				scrollableContent.scrollTo({
					left: leftPosition,
					behavior: "auto",
				});
			}, 0);
			recalculateWidth();

			scrollbarThin.classList.remove("fade-out");

			setTimeout(() => {
				const maxThumbPosition =
					scrollbarThin.clientWidth - scrollbarThumb.clientWidth;
				const maxScrollLeft =
					scrollableContent.scrollWidth - scrollableContent.clientWidth;
				const scrollRatio = scrollableContent.scrollLeft / maxScrollLeft;
				const newThumbPosition = scrollRatio * maxThumbPosition;

				scrollbarThumb.style.left = `${Math.max(0, newThumbPosition)}px`;
			}, 0);
		}
	};

	activeTabId?.subscribe(async (value) => {
		scrollToActiveTab();
	});

	scrollbarThumb.addEventListener("mousedown", startDrag);
	document.addEventListener("mousemove", doDrag);
	document.addEventListener("mouseup", stopDrag);
	scrollableContent.addEventListener("wheel", handleWheel);
	scrollableContent.addEventListener("mouseenter", handleMouseEnter);
	scrollableContent.addEventListener("mouseleave", handleMouseLeave);
	scrollbarThumb.addEventListener("wheel", handleWheel);
	scrollbarThin.addEventListener("mouseenter", handleMouseEnter);
	scrollbarThin.addEventListener("mouseleave", handleMouseLeave);

	return () => {
		scrollbarThumb.removeEventListener("mousedown", startDrag);
		document.removeEventListener("mousemove", doDrag);
		document.removeEventListener("mouseup", stopDrag);
		scrollableContent.removeEventListener("wheel", handleWheel);
		scrollableContent.removeEventListener("mouseenter", handleMouseEnter);
		scrollableContent.removeEventListener("mouseleave", handleMouseLeave);
		scrollbarThumb.addEventListener("wheel", handleWheel);
		scrollbarThin.removeEventListener("mouseenter", handleMouseEnter);
		scrollbarThin.removeEventListener("mouseleave", handleMouseLeave);
	};
});
</script>

<div bind:this={scrollableContent} class="scrollable-content">
    <slot></slot>
</div>

<div class="scrollbar-thin" bind:this={scrollbarThin} class:opacity-0={!overflowing}>
    <div bind:this={scrollbarThumb} class="thumb"></div>
</div>