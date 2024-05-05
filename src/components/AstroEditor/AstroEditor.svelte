<script lang="ts">
import { onDestroy, onMount, tick } from "svelte";
import { derived } from "svelte/store";
import { lineHeight } from "../../const/const";
import { contentStore } from "../../stores/content";
import { cursorHorizPos, cursorVertPos, editor } from "../../stores/editor";
import {
	app,
	astroEditor,
	astroWrapper,
	astroWrapperInner,
	cursor,
} from "../../stores/elements";
    import { totalLines } from "../../stores/lines";
import {
	scrollHorizontalPosition,
	scrollVerticalPosition,
} from "../../stores/scroll";
import { sideBarOpen } from "../../stores/sidebar";
import { activeTabId, tabs } from "../../stores/tabs";
import { unlisteners } from "../../util/listeners";
import {
	copy,
	cut,
	paste,
	redo,
	selectAll,
	undo,
} from "../../util/tauri-events";
import { measureTextWidth } from "../../util/text";
import {
	calculateCursorHorizontalPosition,
	calculateCursorVerticalPosition,
} from "../Cursor/Cursor";
import Cursor from "../Cursor/Cursor.svelte";
import Line from "../Line/Line.svelte";
import {
	focusEditor,
	handleKeyDown,
	handleMouseDown,
	handleMouseUp,
	updateCursorHorizontalPosition,
} from "./AstroEditor";
import "./AstroEditor.scss";
import { getNumberOfLinesOnScreen } from "./AstroEditorScrolling";

let input: HTMLTextAreaElement;
let presentation: HTMLDivElement;
let linesMap = new Map<number, HTMLDivElement>();
let wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
let maxWidth = 0;

const calculateLongestLine = (): void => {
	let longestLine = 0;
	for (const line of $editor.getContent()) {
		const lineWidth = line.getContent().length;
		if (lineWidth > longestLine) {
			longestLine = lineWidth;
		}
	}

	maxWidth = measureTextWidth("a") * longestLine + 50;
};

const handleLineRef = (lineNumber: number, element: HTMLDivElement) => {
	linesMap.set(lineNumber, element);
};

const cursorVerticalPosition = derived(
	[cursorVertPos, scrollVerticalPosition],
	async () => {
		if ($astroWrapper) {
			await tick();
			const verticalPosition = calculateCursorVerticalPosition(
				$editor,
				$scrollVerticalPosition,
			);
			return verticalPosition;
		}

		return lineHeight;
	},
);

const cursorHorizontalPosition = derived(
	[cursorHorizPos, scrollHorizontalPosition],
	async () => {
		if ($astroWrapper) {
			await tick();
			const horizontalPosition = calculateCursorHorizontalPosition(
				$editor,
				linesMap.get(1)?.offsetLeft ?? 0,
				$scrollHorizontalPosition,
			);
			return horizontalPosition;
		}

		return 0;
	},
);

const visibleLines = derived(
	[scrollVerticalPosition, editor],
	([$scrollPosition, $editor]) => {
		const linesOnScreen = getNumberOfLinesOnScreen();
		let visibleStartIndex = Math.max(
			0,
			Math.floor($scrollPosition / lineHeight) - 1,
		);
		let visibleEndIndex = visibleStartIndex + linesOnScreen;

		visibleEndIndex = Math.min(visibleEndIndex + 1, $editor.getTotalLines());
		return { start: visibleStartIndex, end: visibleEndIndex };
	},
);

const updatePresentationHeight = (): void => {
	presentation.style.height = `${$editor.getTotalLines() * lineHeight}px`;
};

const setUpSubscriptions = (): void => {
	sideBarOpen.subscribe(async () => {
		await tick();
		wrapperLeft = $astroWrapperInner?.getBoundingClientRect().left;
		updateCursorHorizontalPosition($editor, $astroEditor);
	});

	cursorVertPos.subscribe(async () => {
		await tick();
	});

	contentStore.subscribe(() => {
		calculateLongestLine();
	});

	activeTabId.subscribe(async () => {
		await tick();
		requestAnimationFrame(() => {
			updatePresentationHeight();
		});

		calculateLongestLine();

		const activeTab = $tabs.find((tab) => tab.id === $activeTabId);
		requestAnimationFrame(async () => {
			await tick();
			input.style.top = `${activeTab?.scrollPosition.top ?? 0}px`;
			input.style.left = `${activeTab?.scrollPosition.left ?? 0}px`;
			focusEditor(input);
			$astroWrapperInner.scrollLeft = activeTab?.scrollPosition.left ?? 0;
			$astroWrapperInner.scrollTop = activeTab?.scrollPosition.top ?? 0;
		});
	});

	cursorVerticalPosition.subscribe(async ($cursorVerticalPosition) => {
		const top = await $cursorVerticalPosition;
		cursorVertPos.set(top);
	});

	cursorHorizontalPosition.subscribe(async ($cursorHorizontalPosition) => {
		const left = await $cursorHorizontalPosition;
		cursorHorizPos.set(left + measureTextWidth("a"));
	});
};

const addTauriListeners = (currentLine: HTMLDivElement): void => {
	// Event listeners
	selectAll(editor);
	copy($editor);
	cut(
		$cursor,
		currentLine,
		$astroWrapperInner,
		editor,
		$editor,
		$astroEditor,
		() => $activeTabId ?? "",
	);
	paste(
		$cursor,
		$astroWrapperInner,
		editor,
		$editor,
		() => $activeTabId ?? "",
		$astroEditor,
	);
	undo(
		$cursor,
		editor,
		$editor,
		$astroEditor,
		currentLine,
		$astroWrapperInner,
		contentStore,
		() => $activeTabId ?? "",
	);
	redo(
		$cursor,
		editor,
		$editor,
		$astroEditor,
		currentLine,
		$astroWrapperInner,
		contentStore,
		() => $activeTabId ?? "",
	);
};

onMount(async () => {
	focusEditor(input);
	astroEditor.set(presentation);

	setUpSubscriptions();

	// biome-ignore lint/style/noNonNullAssertion: Will be defined here
	const currentLine = linesMap.get($editor.getCursorLine() + 1)!;
	addTauriListeners(currentLine);
});

onDestroy(() => {
	for (const unlisten of unlisteners) {
		unlisten();
	}
});
</script>
    
<div bind:this={presentation} class="astro-presentation" role="presentation" on:mousedown={(event: MouseEvent) => { handleMouseDown(event, input, $editor, $astroEditor) }} on:mouseup={handleMouseUp} style={`padding-right: ${maxWidth}px`}>
    {#each $editor.getContentString().split('\n').slice($visibleLines.start, $visibleLines.end) as line, index (index + $visibleLines.start)}
        <Line cursorPosition={$editor.getCursor().getPosition()} selectionStart={$editor.getContent()[index + $visibleLines.start].getSelectionStart()} selectionEnd={$editor.getContent()[index + $visibleLines.start].getSelectionEnd()} lineContent={line} lineNumber={index + 1 + $visibleLines.start} registerLineRef={handleLineRef} />
    {/each}
	<textarea bind:this={input} on:keydown={(event: KeyboardEvent) => { handleKeyDown(event, editor, () => $editor, () => $astroWrapper, $app, () => $astroEditor, () => linesMap.get($editor.getCursorLine() + 1)!, () => $astroWrapperInner, $activeTabId ?? "", $contentStore, () => $cursor, totalLines)}} class="astro-input"></textarea>
</div>
<Cursor left={(65 + ($editor.getTotalLines() > 1000 ? 10 : 0)) + $cursorHorizPos} top={$cursorVertPos}/>