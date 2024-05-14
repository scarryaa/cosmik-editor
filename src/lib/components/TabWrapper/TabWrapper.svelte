<script lang="ts">
    import { app } from "../../reactives/app.svelte";
    import { activeTabId, tabs } from "../../reactives/tabs.svelte";
    import { tabService } from "../../services/tabService";
    import Tab from "../Tab/Tab.svelte";
    import TabScrollbar from "../TabScrollbar/TabScrollbar.svelte";
    
    let tabsWrapper: HTMLDivElement | null = $state(null);
    
    const handleClose = (id: string) => {
        tabService.closeTab(id);
    };
    
    const handleClick = (id: string) => {
        const tab = tabService.findTab(id);
        tabService.setActiveTab(id);
    
        if (tab) {
            app.setEditorFromTab(tab);
        }
    };
    </script>
    
    <div class="tabs-wrapper-outer" bind:this={tabsWrapper}>
        <TabScrollbar activeTabId={activeTabId}>
            {#each $tabs as tab}
                <Tab onTabClick={handleClick} onTabClose={handleClose} 
                    id={tab.id} editor={tab.editor} name={tab.name} 
                    content={tab.content} />
            {/each}
        </TabScrollbar>
    </div>
    
    <style lang="scss">
        :root {
            --tabs-wrapper-outer-height: 34px;
            --tabs-wrapper-background-color: #9c9c9c;
        }
    
        .tabs-wrapper-outer {
            height: var(--tabs-wrapper-outer-height);
            background-color: var(--tabs-wrapper-background-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            z-index: 999;
        }
    </style>