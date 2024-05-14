<script lang="ts">
import type { IEditor } from "../../types/IEditor";

const { editor }: { editor: IEditor } = $props();
</script>

<div class="line-numbers">
    {#each editor.getText().split('\n') as line, index}
        <div class="line-number" style="top: ">{index + 1}</div>
    {/each}
</div>

<style lang="scss">
    :root {
        --line-numbers-width: 60px;
    }

    .line-numbers {
        flex-shrink: 0;
        width: var(--line-numbers-width);
        font-size: 14px;
        text-align: right;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        z-index: 205;
        min-height: 100vh;
        background-color: white;
        padding-top: 5px;
        transform: translate3d(0px, 0px, 0px);

        &.shift-right {
            width: calc(var(--line-numbers-width) + 10px);
        }

        &.shift-right2x {
            width: calc(var(--line-numbers-width) + 20px);
        }

        scrollbar,
        ::-webkit-scrollbar {
            display: none;
        }

        > * {
            min-height: 19px;
        }

        .line-number {
            text-align: center;
            background-color: white;
            width: 100%;
            z-index: 999;
            height: 19px;
        }
    }
</style>