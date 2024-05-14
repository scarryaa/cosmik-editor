<script lang="ts">
    const {
        currentLine,
        currentCharacter,
        selectionLength,
    }: { currentLine: number; currentCharacter: number; selectionLength: number } = $props();
    </script>
    
    <div class="status-pane no-user-select">
        <span>Ln {currentLine}, Col {currentCharacter}</span>
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