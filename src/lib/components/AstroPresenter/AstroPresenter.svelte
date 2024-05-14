<script lang="ts">
import type { Editor } from "../../models/Editor.svelte";
    import Cursor from "../Cursor/Cursor.svelte";
import EditorLine from "../EditorLine/EditorLine.svelte";
    import LineNumbers from "../LineNumbers/LineNumbers.svelte";

const { editor, handleClick }: { editor: Editor; handleClick: () => void } =
	$props();

</script>

<div class="astro-presenter" role="presentation" onclick={handleClick}>
    <div class="overflow-guard">
        <div class="inner-container">
            <div role="code" class="editor-content">
                <LineNumbers {editor} />
                {#each editor.content.getText().split('\n') as line, index }
                    <EditorLine content={line} number={index} />
                {/each}
                {#each editor.cursors as cursor}
                    <Cursor {cursor} />
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .astro-presenter {
        width: 100%;
        z-index: 200;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        white-space: pre;
        outline: none;
        min-height: calc(100% - 19px);
        max-height: calc(100% - 19px);
        caret-color: transparent;
        font-family: "Droid Sans Mono", "monospace", monospace;
        font-weight: normal;
        font-size: 14px;
        overflow-y: auto;
        font-feature-settings:
            "liga" 0,
            "calt" 0;
        font-variation-settings: normal;
        line-height: 19px;
        letter-spacing: 0px;
        cursor: text;
        position: relative;
    }

    .overflow-guard {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;

        .inner-container {
            padding-top: 5px;
            max-width: calc(100% + var(--minimap-width));
            left: 0;
            right: 0;
            bottom: var(--status-pane-height);
            overflow-y: hidden;
            overflow-x: hidden;
            min-height: 100%;
            max-height: 100%;
            top: var(--tabs-wrapper-outer-height);
        }

        .editor-content {
            max-width: calc(100% - var(--minimap-width));
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            overflow-y: auto;
            overflow-x: auto;
            max-height: 100%;
        }
    }

    .minimap-gradient {
        position: absolute;
        right: var(--minimap-width);
        top: 0;
        bottom: 0;
        width: 30px;
        height: 100%;
        min-height: calc(100% - 19px);
        transition: opacity 0.3s ease;
        opacity: 0;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 80%,
            rgba(0, 0, 0, 0.7) 100%
        );

        &.show-gradient {
            opacity: 1;
        }
    }

    .line-number-spacer {
        height: 38px;
    }
</style>
