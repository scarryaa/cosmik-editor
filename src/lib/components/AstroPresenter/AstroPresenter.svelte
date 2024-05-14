<script lang="ts">
import type { Editor } from "../../models/Editor.svelte";
import {
	scrollHorizontalPosition,
	scrollHorizontalWidth,
	scrollVerticalHeight,
	scrollVerticalPosition,
} from "../../reactives/scroll.svelte";
import Cursor from "../Cursor/Cursor.svelte";
import EditorLine from "../EditorLine/EditorLine.svelte";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar.svelte";
import LineNumbers from "../LineNumbers/LineNumbers.svelte";
import TabWrapper from "../TabWrapper/TabWrapper.svelte";
import VerticalScrollbar from "../VerticalScrollbar/VerticalScrollbar.svelte";

let {
	editor,
	handleClick,
	innerContainerElement = $bindable(),
	editorContentElement = $bindable(),
}: {
	editor: Editor;
	handleClick: () => void;
	innerContainerElement: HTMLDivElement | null;
	editorContentElement: HTMLDivElement | null;
} = $props();

let editorContentHeight = $state(0);
let editorContentWidth = $state(0);
let innerContainerElementHeight = $state(0);
</script>

<div class="astro-presenter" role="presentation" onclick={handleClick}>
    <TabWrapper />
    <div class="overflow-guard">
        <div class="inner-container" bind:this={innerContainerElement} bind:clientHeight={innerContainerElementHeight}>
            <VerticalScrollbar width={12} elementRef={editorContentElement!} viewportHeight={editorContentHeight} />
            <HorizontalScrollbar style={`bottom: 0px;`} height={12} elementRef={editorContentElement!} viewportWidth={editorContentWidth} />
            <LineNumbers scrollVerticalPosition={$scrollVerticalPosition} {editor} />
            <div role="code" class="editor-content" bind:clientWidth={editorContentWidth} bind:clientHeight={editorContentHeight} bind:this={editorContentElement}
            onscroll={(event) => { scrollVerticalPosition.set((event.target as HTMLElement).scrollTop); scrollHorizontalPosition.set((event.target as HTMLElement).scrollLeft)
                scrollHorizontalWidth.set((event.target as HTMLElement).scrollWidth); scrollVerticalHeight.set((event.target as HTMLElement).scrollHeight); }}
                style={`max-height: calc(${innerContainerElementHeight}px - var(--status-bar-height) * 1.8625);`}>
                <div class="editor-content-inner">
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
            margin-top: var(--tabs-wrapper-outer-height);
            max-width: calc(100% + var(--minimap-width));
            left: 0;
            right: 0;
            bottom: var(--status-pane-height);
            overflow-y: hidden;
            overflow-x: hidden;
            min-height: 100%;
            max-height: var(--tabs-wrapper-outer-height);
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

            .editor-content-inner {
                position: absolute;
            }
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
