<script lang="ts" generics="T">
import type { Snippet } from "svelte";

const {
	data,
	children,
	width,
	lineHeight,
	height,
	style,
}: {
	data: T;
	children: Snippet<[T]>;
	width?: number;
	lineHeight?: number;
	height?: number;
	style?: string;
} = $props();
</script>

<div class="meteor-action-bar no-user-select" style={`width: ${width}px; height: ${height}px; line-height: ${lineHeight}px; ${style}`}>
    {@render children(data)}
</div>

<style lang="scss">
    .meteor-action-bar {
        display: flex;
        align-items: center;
    }
</style>