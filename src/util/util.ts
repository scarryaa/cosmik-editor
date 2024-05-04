import { readText } from "@tauri-apps/plugin-clipboard-manager";
import { tick } from "svelte";
import type { Writable } from "svelte/store";
import {
	updateCursorHorizontalPosition,
	updateCursorVerticalPosition,
} from "../components/AstroEditor/AstroEditor";
import {
	scrollToCurrentLine,
	scrollToCursor,
} from "../components/AstroEditor/AstroEditorScrolling";
import type { Editor } from "../models/Editor";

export const pasteInternal = async (
	$cursor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	editor: Writable<Editor>,
	$editor: Editor,
	$astroEditor: HTMLDivElement,
): Promise<void> => {
	const textToPaste = await readText();

	editor.update((model) => {
		$editor.paste(textToPaste);
		return model;
	});

	await tick();
	const newLine = document.querySelector(
		`[data-line-number="${$editor.getCursor().getPosition().line - 1}"]`,
	) as HTMLDivElement;
	updateCursorHorizontalPosition($editor, $astroEditor);
	updateCursorVerticalPosition(true);
	scrollToCursor(
		$cursor,
		() => $editor,
		() => $astroWrapperInner,
	);
	scrollToCurrentLine(
		() => newLine,
		() => $astroWrapperInner,
		"down",
	);
};
