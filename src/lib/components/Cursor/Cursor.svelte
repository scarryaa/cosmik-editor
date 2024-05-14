<script lang="ts">
import { lineHeight } from "../../const/const";
import {
	cursorHorizontalOffset,
	cursorVerticalOffset,
} from "../../const/cursor";
    import type { Cursor } from "../../models/Cursor.svelte";
import type { Editor } from "../../models/Editor.svelte";

const { cursor }: { cursor: Cursor } = $props();

let cursorElement: HTMLDivElement | null = $state(null);

const left = $derived(8 * cursor.column + cursorHorizontalOffset);
const top = $derived(cursor.line * lineHeight + cursorVerticalOffset);
</script>

<div
    class="cursor"
    bind:this={cursorElement}
    style={`left: ${left}px; top: ${top}px;`}
></div>

<style lang="scss">
    .cursor {
        position: absolute;
        width: 1px;
        height: 19px;
        z-index: 99;
        background-color: black;
        pointer-events: none;
    }
</style>
