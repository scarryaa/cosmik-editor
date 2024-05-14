<script lang="ts">
    import type { Editor } from "../../models/Editor.svelte";
    import { activeTabId } from "../../reactives/tabs.svelte";
    
    const {
        name,
        id,
        editor,
        onTabClick,
        onTabClose,
    }: {
        name: string;
        id: string;
        editor: Editor | null;
        content: string;
        onTabClick: (id: string) => void;
        onTabClose: (id: string) => void;
    } = $props();
    let isHovered = $state(false);
    
    </script>
    
    <div role="button" tabindex="0" class="tab" 
        class:active={$activeTabId === id} 
            onmouseleave={() => { isHovered = false }} 
            onmouseenter={() => { isHovered = true }} 
            onkeypress={() => activeTabId.set(id)} 
            onclick={(event: MouseEvent) => {
                if (event.button === 1) {
                    onTabClose(id);
                } else {
                    onTabClick(id);
        }}}>
        <span class="tab-name">{name}</span>
        {#if !isHovered}
            <div role="img" class="modified-indicator-wrapper">
                <div class="modified-indicator"></div>
            </div>
        {:else if (isHovered)}
            <button class="no-button-style" 
                onmouseenter={() => { isHovered = true }} 
                onclick={(event: MouseEvent) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onTabClose(id)}}>x</button>
        {/if}
    </div>
    
    <style lang="scss">
        .tab {
            display: flex;
            height: 34px;
            padding: 8px;
            position: relative;
            font-size: 12px;
            align-items: center;
            justify-content: space-between;
            background-color: lightgray;
            border-right: 1px solid #ffffff;
            flex-direction: row;
            flex-wrap: nowrap;
            flex-grow: 1;
            max-width: max-content;
            cursor: pointer;
            z-index: 221;
    
            .tab-name {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                min-width: 0;
                margin-top: 5px;
                padding-right: 20px;
                font-family: "Droid Sans", sans-serif;
            }
    
            &.active {
                background-color: #ffffff;
            }
    
            .modified-indicator-wrapper {
                position: absolute;
                right: 5px;
                width: 20px;
                height: 20px;
                z-index: 0;
                margin-left: 8px;
                align-items: center;
                justify-content: center;
                display: flex;
                background-color: transparent;
    
                .modified-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #666666;
                }
            }
    
            button {
                position: absolute;
                z-index: 9;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 8px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                border-radius: 4px;
                width: 20px;
                height: 20px;
                right: 5px;
    
                &:hover {
                    background-color: rgb(136, 136, 135);
                }
            }
        }
    </style>