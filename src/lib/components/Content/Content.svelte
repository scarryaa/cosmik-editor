<script lang="ts">
import type { Snippet } from "svelte";

const { children, style }: { children: Snippet; style?: string } = $props();
</script>

<div class="content" {style}>
    {@render children()}
</div>

<style lang="scss">
    .content {
        font-size: 13px;
    }
</style>