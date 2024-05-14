<script lang="ts">
import type { Snippet } from "svelte";
import HeaderFooter from "../HeaderFooter/HeaderFooter.svelte";
import Pane from "../Pane/Pane.svelte";

let {
	headerItems,
	body,
	sidebarWidth = $bindable(),
}: {
	headerItems: Snippet<[boolean]>;
	body: Snippet;
	sidebarWidth: number;
} = $props();
</script>
    
    <Pane bind:sidebarWidth={sidebarWidth} resizable style={`min-width: 165px; width: 165px; max-width: 70%; height: calc(100% - 19px); overflow: hidden; border-right: 1px solid var(--meteor-border);`}>
        <HeaderFooter header children={headerItems} style={"width: 100%;"} />
        {@render body()}
    </Pane>