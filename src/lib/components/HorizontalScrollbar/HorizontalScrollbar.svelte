<script lang="ts">
import { scrollHorizontalWidth } from "../../reactives/scroll.svelte";

const {
	viewportWidth,
	elementRef,
	height,
	style,
}: {
	viewportWidth: number;
	elementRef: HTMLElement;
	height: number;
	style: string;
} = $props();
let thumbWidth = $state(0);
let thumbLeft = $state(0);
let lastScrollLeft = 0;

$effect(() => {
	if ($scrollHorizontalWidth) {
		thumbWidth = Math.max(
			(viewportWidth / elementRef?.scrollWidth) * viewportWidth,
			20,
		);
	}

	// @TODO fix pop in on scroll
});

const updateThumbPosition = () => {
	const currentScrollLeft = elementRef?.scrollLeft;
	const isHorizontalScroll = currentScrollLeft !== lastScrollLeft;

	if (isHorizontalScroll) {
		const scrollableWidth = elementRef?.scrollWidth - viewportWidth;
		const thumbMaxLeft = viewportWidth - thumbWidth;

		thumbLeft = Math.max(
			0,
			(currentScrollLeft / scrollableWidth) * thumbMaxLeft,
		);
		thumbLeft = Math.min(thumbLeft, thumbMaxLeft);
	}

	lastScrollLeft = currentScrollLeft;
};

$effect(() => {
	elementRef?.addEventListener("scroll", updateThumbPosition);

	return () => {
		elementRef.removeEventListener("scroll", updateThumbPosition);
	};
});

let startX = 0;
let startScrollLeft = 0;

const handleMouseDown = (e: MouseEvent) => {
	startX = e.clientX;
	startScrollLeft = elementRef.scrollLeft;
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp, { once: true });
};

const handleMouseMove = (e: MouseEvent) => {
	const deltaX = e.clientX - startX;
	const maxScrollDistance = elementRef.scrollWidth - viewportWidth;
	const maxThumbMovement = viewportWidth - thumbWidth;
	const scale = maxScrollDistance / maxThumbMovement;

	const scaledDeltaX = deltaX * scale;
	const newScrollPosition = Math.max(
		0,
		Math.min(startScrollLeft + scaledDeltaX, maxScrollDistance),
	);
	elementRef.scrollLeft = newScrollPosition;
};

const handleMouseUp = (e: MouseEvent) => {
	document.removeEventListener("mousemove", handleMouseMove);
};
</script>

<div class="scrollbar">
	<div
		role="scrollbar"
		aria-controls={elementRef?.id}
		aria-valuemin="0"
		aria-valuemax={elementRef?.scrollHeight}
		aria-valuenow={elementRef?.scrollTop}
		aria-orientation="horizontal"
		aria-disabled="false"
		aria-valuetext="{elementRef?.scrollTop} of {elementRef?.scrollHeight}"
		tabindex="0"
		class="thumb"
		style={`width: ${thumbWidth}px; height: ${height}px; left: ${Math.trunc(thumbLeft)}px; ` +
			style}
		onmousedown={handleMouseDown}
	></div>
</div>

<style lang="scss">
	.scrollbar {
		overflow: hidden;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;

		.thumb {
			opacity: 0.5;
			bottom: 0;
			position: absolute;
			background-color: #8b8b8b;
			cursor: default;
			z-index: 999;

			&:hover {
				background-color: #b6b6b6;
			}

			&:active {
				background-color: #c7c7c7;
			}
		}
	}
</style>
