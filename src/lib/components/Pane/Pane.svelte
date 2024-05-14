<script lang="ts">
    import { type Snippet, onMount } from "svelte";
    
    let {
        children,
        style,
        resizable = false,
        sidebarWidth = $bindable(),
    }: {
        children: Snippet;
        style?: string;
        resizable?: boolean;
        sidebarWidth: number;
    } = $props();
    
    let collapsed = $state<boolean>(false);
    let dragging = $state<boolean>(false);
    
    let paneElement: HTMLElement;
    let startX: number;
    let startWidth: number;
    
    const mouseMoveHandler = (event: MouseEvent) => {
        const newWidth = startWidth + event.clientX - startX;
        dragging = true;
    
        if (event.clientX < 50) {
            collapsed = true;
        } else {
            collapsed = false;
        }
    
        paneElement.style.width = `${newWidth}px`;
    };
    
    const mouseUpHandler = () => {
        dragging = false;
        document.documentElement.removeEventListener("mousemove", mouseMoveHandler);
        document.documentElement.removeEventListener("mouseup", mouseUpHandler);
    };
    
    const initResize = (event: Event) => {
        startX = (event as MouseEvent).clientX;
        startWidth = paneElement.offsetWidth;
        document.documentElement.addEventListener("mousemove", mouseMoveHandler);
        document.documentElement.addEventListener("mouseup", mouseUpHandler);
    };
    </script>

<div bind:this={paneElement} class="pane no-user-select" bind:clientWidth={sidebarWidth} {style} class:collapsed>
    <div class="resize-handle" role="none" class:display-none={!resizable} class:dragging onmousedown={resizable ? initResize : () => {}}></div>
    {@render children()}
</div>

<style lang="scss">
    :root {
        --pane-background-color: #e4e4e4;
    }

    .pane {
        position: relative;
        overflow: hidden;
        background-color: var(--pane-background-color);

        &.collapsed {
            min-width: 0 !important;
            width: 0 !important;
            max-width: 0 !important;
        }
    }

    .resize-handle {
        position: absolute;
        top: 0;
        right: 0;
        width: 3px;
        height: 100%;
        cursor: ew-resize;
        transition: background-color 0.5s;

        &.dragging, &:hover {
            background-color: #464646;
            width: 4px;
            cursor: ew-resize;
        }
    }
</style>