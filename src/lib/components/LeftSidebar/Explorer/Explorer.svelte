<script lang="ts">
import type { Snippet } from "svelte";
import ScrollableContent from "../../ScrollableContent/ScrollableContent.svelte";
import TitleLabel from "../../TitleLabel/TitleLabel.svelte";

const { children }: { children: Snippet<[number]> } = $props();
let height = $state(0);
</script>

<div class="explorer-pane no-user-select" bind:clientHeight={height}>
    <TitleLabel>
        <h2>Explorer</h2>
    </TitleLabel>
    <ScrollableContent>
        {@render children(height)}
    </ScrollableContent>
</div>

<style lang="scss">
    .explorer-pane {
        height: 100%;
        overflow: hidden;
        padding-bottom: 12px;
        max-height: 100%;
    }
</style>