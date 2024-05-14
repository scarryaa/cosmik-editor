<script lang="ts">
    const {
        currentLine,
        currentCharacter,
        selectionLength,
        isMultiCursor,
        cursorCount,
    }: { currentLine: number; currentCharacter: number; selectionLength: number; isMultiCursor: boolean; cursorCount: number } = $props();
    </script>
    
    <div class="status-pane no-user-select">
        {#if isMultiCursor}
            <span>({cursorCount} selections)</span>
        {:else}
            <span>Ln {currentLine + 1}, Col {currentCharacter + 1}</span>
        {/if}
        {#if selectionLength > 0}
            <span>({selectionLength} selected)</span>
        {/if}
    </div>
    
    <style lang="scss">
        :root {
            --status-pane-height: 19px;
        }
        .status-pane {
            height: var(--status-pane-height);
            background-color: #d4d4d4;
            line-height: 19px;
            padding: 0 5px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            font-size: 12px;
            border-top: 1px solid #fff;
            width: 100%;
        }
    </style>