<script lang="ts">
import { onMount, tick } from "svelte";
import { lineHeight } from "../../const/const";
import { astroWrapperInner, lineNumbers } from "../../stores/elements";
import { activeTabId } from "../../stores/tabs";
import { getNumberOfLinesOnScreen } from "../AstroEditor/AstroEditorScrolling";
import "./LineNumbers.scss";

export let lineCount: number;
let _lineNumbers: HTMLDivElement;
const linesOnScreen = getNumberOfLinesOnScreen();
let startLine = 0;
let endLine = lineCount;

$: if (lineCount > 1000) {
	_lineNumbers.style.paddingLeft = "10px";
} else if (_lineNumbers) {
	_lineNumbers.style.paddingLeft = "5px";
}

$: if (_lineNumbers) _lineNumbers.style.height = `${lineCount * lineHeight}px`;
$: if (_lineNumbers && lineCount > 1000) _lineNumbers.style.paddingLeft = "15px";

const updateVisibleLines = () => {
	const containerScrollTop = $astroWrapperInner?.scrollTop;
	const linesOnScreen = getNumberOfLinesOnScreen() + 1;

	if (containerScrollTop) {
		startLine = Math.floor(containerScrollTop / lineHeight);
		endLine = Math.min(lineCount, startLine + linesOnScreen);
	}
};

const handleScroll = () => {
	updateVisibleLines();
};

tick().then(() => {
	$astroWrapperInner?.addEventListener("scroll", handleScroll);
});

onMount(() => {
	lineNumbers.set(_lineNumbers);

	updateVisibleLines();

	activeTabId.subscribe(() => {
        requestAnimationFrame(() => {
            updateVisibleLines();
        })
	});

	return () => {
		$astroWrapperInner?.removeEventListener("scroll", handleScroll);
	};
});
</script>
  
<div class="line-numbers" bind:this={_lineNumbers}>
    <!-- Hack to fix lines 0 - X (viewport size) not showing on rapid scrolls -->
    {#each Array.from({ length: Math.min(lineCount, endLine - startLine) }, (_, i) => i + startLine) as lineNumber}
        {#if lineNumber >= linesOnScreen}
            <div class="line-number" style={`top: ${(lineNumber) * lineHeight}px`}>{lineNumber + 1}</div>
        {/if}
    {/each}
    {#each Array.from({ length: Math.min(linesOnScreen, lineCount) }, (_, i) => i) as lineNumber}
        <div class="line-number" style={`top: ${(lineNumber) * lineHeight}px`}>{lineNumber + 1}</div>
    {/each}
</div>