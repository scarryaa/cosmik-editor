<script lang="ts">
const {
	icon,
	iconSet = "fa-regular",
	callback,
	selected = false,
	style,
}: {
	icon: string;
	iconSet?: string;
	callback?: () => void;
	selected?: boolean;
	style?: string;
} = $props();
</script>

<button class="action-bar-item no-button-style no-user-select" onmousedown={callback}>
    <i class={`icon ${iconSet} ${icon}`} style={"font-size: 16px;" + style}></i>
    {#if selected}
        <div class="active-item-indicator"></div>
    {/if}
</button>

<style lang="scss">
    :root {
        --action-bar-item-hover-color: #000;
        --action-bar-item-color: #464646;
    }

    .action-bar-item {
        justify-content: center;
        cursor: pointer;
        position: relative;

        .active-item-indicator {
            &::before {
                content: "";
                position: absolute;
                bottom: -8px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #509abd;
                transition: all 0.1s ease-in-out;
            }
        }

        &:hover .icon {
            color: var(--action-bar-item-hover-color);
        }

        .icon {
            color: var(--action-bar-item-color);
            padding: 0px 8px;
            user-select: none;
            -webkit-user-select: none;
            transition: all 0.1s ease-in-out;
        }
    }
</style>
