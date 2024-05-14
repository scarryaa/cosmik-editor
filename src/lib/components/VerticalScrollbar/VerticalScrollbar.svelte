<script lang="ts">
    import { scrollVerticalHeight } from "../../reactives/scroll.svelte";


const {
	viewportHeight,
	elementRef,
	width,
	style
}: { viewportHeight: number; elementRef: HTMLElement; width: number; style?: string } =
	$props();
let thumbHeight = $state(0);
let thumbTop = $state(0);

$effect(() => {
	if ($scrollVerticalHeight) {
		thumbHeight = Math.max(
			(viewportHeight / elementRef?.scrollHeight) * viewportHeight,
			20,
		);
	}

	// @TODO fix pop in on scroll
	// @TODO fix sizing for explorer pane
});

const updateThumbPosition = () => {
	const scrollableHeight = elementRef?.scrollHeight - viewportHeight;
	const thumbMaxTop = viewportHeight - thumbHeight;

	thumbTop = Math.max(
		0,
		(elementRef?.scrollTop / scrollableHeight) * thumbMaxTop,
	);
	thumbTop = Math.min(thumbTop, thumbMaxTop);
};

$effect(() => {
	elementRef?.addEventListener("scroll", updateThumbPosition);

	return () => {
		elementRef.removeEventListener("scroll", updateThumbPosition);
	};
});

let scrollbarContainer: HTMLElement | null = $state(null);
let startY = 0;
let startScrollTop = 0;

const handleMouseDown = (e: MouseEvent) => {
	startY = e.clientY;
	startScrollTop = elementRef.scrollTop;
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp, { once: true });
};

const handleMouseMove = (e: MouseEvent) => {
	const deltaY = e.clientY - startY;
	const maxScrollDistance = elementRef.scrollHeight - viewportHeight;
	const maxThumbMovement = viewportHeight - thumbHeight;
	const scale = maxScrollDistance / maxThumbMovement;

	const scaledDeltaY = deltaY * scale;
	const newScrollPosition = Math.max(
		0,
		Math.min(startScrollTop + scaledDeltaY, maxScrollDistance),
	);
	elementRef.scrollTop = newScrollPosition;
};

const handleMouseUp = (e: MouseEvent) => {
	document.removeEventListener("mousemove", handleMouseMove);
};
</script>

<div class="scrollbar" bind:this={scrollbarContainer} {style}>
	<div
		class="thumb"
		role="scrollbar"
		aria-controls={elementRef?.id}
		aria-valuemin="0"
		aria-valuemax={elementRef?.scrollHeight}
		aria-valuenow={elementRef?.scrollTop}
		aria-orientation="vertical"
		aria-disabled="false"
		aria-valuetext="{elementRef?.scrollTop} of {elementRef?.scrollHeight}"
		tabindex="0"
		style={`height: ${thumbHeight}px; width: ${width}px; top: ${Math.trunc(thumbTop)}px;`}
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
			right: 0;
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
