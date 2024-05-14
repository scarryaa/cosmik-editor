<script lang="ts">
import type { Snippet } from "svelte";

const { children, style }: { children: Snippet; style?: string } = $props();
</script>

<div class="content scrollable-content" {style}>
    {@render children()}
</div>

<style lang="scss">
    .content {
        font-size: 13px;
    }

    .scrollable-content {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100%;
    }
</style>