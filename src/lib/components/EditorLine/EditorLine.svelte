<script lang="ts">
    import { lineHeight } from "../../const/const";

    const { number, content }: { number: number; content: string } = $props();
</script>

<div
    class="line"
    data-line-number={number}
    style={`top: ${number * lineHeight}px;`}
>
    {#if content === ""}
        <div class="empty-line-placeholder"><br /></div>
    {:else}
        {@html content}
    {/if}
</div>

<style lang="scss">
    .line {
        color: black;
        position: absolute;
        transform: translate3d(5px, 5px, 0px);
        width: 100%;
    }

    .empty-line-placeholder {
        width: 10px;
    }

    .empty-selection-placeholder {
        display: inline-block;
        position: absolute;
        height: 19px;
        background-color: var(--selection-color);
        left: 0px;
    }
</style>
