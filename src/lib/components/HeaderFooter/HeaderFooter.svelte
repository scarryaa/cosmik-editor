<script lang="ts">
    import type { Snippet } from "svelte";
    
    const hasOverflow = $state(true);
    const {
        children,
        header,
        footer,
        width,
        style,
    }: {
        children: Snippet<[boolean]>;
        header?: boolean;
        footer?: boolean;
        width?: number;
        style?: string;
    } = $props();
    </script>
    
    <div class="header-or-footer no-user-select" class:header class:footer style={`width: ${width}px; ${style}`}>
        {@render children(hasOverflow)}
    </div>
    
    <style lang="scss">
        :root {
            --meteor-sidebarActivityBarTop-background-color: #e4e4e4;
            --meteor-border: #ffffff;
        }
    
        .header-or-footer {
            display: flex;
            padding-inline: 4px;
            background-color: var(--meteor-sidebarActivityBarTop-background-color);
    
            &.header, &.footer {
                border-right: 1px solid var(--meteor-border);
            }
    
            &.header {
                border-bottom: 1px solid var(--meteor-border);
            }
    
            &.footer {
                border-top: 1px solid var(--meteor-border);
            }
        }
    </style>