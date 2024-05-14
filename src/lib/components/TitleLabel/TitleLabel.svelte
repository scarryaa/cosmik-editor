<script lang="ts">
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<div class="title-label">
    {@render children()}
</div>

<style lang="scss">
    .title-label {
        line-height: 35px;
        overflow: hidden;
        padding-left: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;

        :global(> h2) {
            font-size: 11px;
            text-transform: uppercase;
            margin: 0;
            font-weight: 400;
            white-space: nowrap;
        }
    }
</style>