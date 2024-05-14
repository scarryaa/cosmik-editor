<script lang="ts">
import type { Editor } from "../../models/Editor.svelte"

const { editor, shouldFocus }: { editor: Editor; shouldFocus: boolean } =
	$props();

let textareaElement: HTMLTextAreaElement | null = $state(null);

const handleInput = (event: KeyboardEvent) => {
	if (event.key.length === 1) {
		editor.add(event.key, 0);
	} else if (event.key === "Backspace") {
		editor.backspace(0);
	} else if (event.key === "Delete") {
	} else if (event.key === "Enter") {
		editor.addLine(0);
	} else if (event.key === "ArrowUp") {
        editor.moveUp(0);
    } else if (event.key === "ArrowDown") {
        editor.moveDown(0);
    } else if (event.key === "ArrowLeft") {
        editor.moveLeft(0);
    } else if (event.key === "ArrowRight") {
        editor.moveRight(0);
    } else if (event.key === "Tab") {
        // editor.tab();
    }
};

$effect(() => {
	if (shouldFocus && textareaElement) {
		textareaElement.focus();
	}
});
</script>

<textarea
    bind:this={textareaElement}
    onkeydown={handleInput}
    class="editor-textarea"
></textarea>

<style lang="scss">
    :root {
        --font-size: 14px;
        --font-family: "Droid Sans Mono", "monospace", monospace;
    }

    .editor-textarea {
        tab-size: 33.7188px;
        appearance: none;
        font-family: var(--font-family);
        font-weight: normal;
        font-size: var(--font-size);
        font-feature-settings:
            "liga" 0,
            "calt" 0;
        font-variation-settings: normal;
        line-height: 19px;
        letter-spacing: 0px;
        top: 0px;
        left: 0px;
        width: 1px;
        height: 1px;
        background-color: transparent;
        border: none;
        color: transparent;
        margin: 0;
        min-height: 0;
        min-width: 0;
        outline: none !important;
        overflow: hidden;
        padding: 0;
        position: absolute;
        resize: none;
        z-index: -10;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
</style>
