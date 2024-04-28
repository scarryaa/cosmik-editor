<script lang="ts">
import { onMount } from "svelte";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import Cursor from "../Cursor/Cursor.svelte";
import { focusEditor, handleKeyDown, handleMouseDown } from "./AstroEditor";
import "./AstroEditor.scss";

let input: HTMLTextAreaElement;
let presentation: HTMLDivElement;

onMount(() => {
	focusEditor(input);
});
</script>
    
<div bind:this={presentation} class="astro-presentation" role="presentation" on:mousedown={(event: MouseEvent) => { handleMouseDown(event, input) }}>{$editor.getContentString()}</div>
<textarea bind:this={input} on:keydown={(event: KeyboardEvent) => { handleKeyDown(event, editor, $editor) }} class="astro-input"></textarea>
<Cursor left={$cursorHorizPos} top={$cursorVertPos}/>