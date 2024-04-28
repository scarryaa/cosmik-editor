<script lang="ts">
import { onMount, tick } from "svelte";
import { derived } from "svelte/store";
import { lineHeight } from "../../const/const";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import { app, astroEditor, astroWrapper } from "../../stores/elements";
import { scrollPosition } from "../../stores/scroll";
import { calculateCursorVerticalPosition } from "../Cursor/Cursor";
import Cursor from "../Cursor/Cursor.svelte";
import Line from "../Line/Line.svelte";
import { focusEditor, handleKeyDown, handleMouseDown } from "./AstroEditor";
import "./AstroEditor.scss";

let input: HTMLTextAreaElement;
let presentation: HTMLDivElement;
let linesMap = new Map();

const handleLineRef = (lineNumber: number, element: HTMLElement) => {
	linesMap.set(lineNumber, element);
};

tick().then(() => {
	// Have to add it here
	$app.addEventListener("scroll", (event) => {
		scrollPosition.set($app.scrollTop);
	});
});

const cursorPosition = derived([cursorVertPos, scrollPosition], async () => {
	if ($app) {
		await tick();
		return calculateCursorVerticalPosition($editor, $app);
	}

	return lineHeight;
});

cursorPosition.subscribe(async ($cursorPosition) => {
	cursorVertPos.set(await $cursorPosition);
});

onMount(() => {
	focusEditor(input);

	astroEditor.set(presentation);
});
</script>
    
<div bind:this={presentation} class="astro-presentation" role="presentation" on:mousedown={(event: MouseEvent) => { handleMouseDown(event, input) }}>
    {#each $editor.getContentString().split('\n') as line, index}
        <Line lineContent={line} lineNumber={index + 1} registerLineRef={handleLineRef} />
    {/each}
</div>
<textarea bind:this={input} on:keydown={(event: KeyboardEvent) => { handleKeyDown(event, editor, $editor, $astroWrapper, $app, $astroEditor) }} class="astro-input"></textarea>
<Cursor left={$cursorHorizPos} top={$cursorVertPos}/>