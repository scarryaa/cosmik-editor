import { readText } from "@tauri-apps/plugin-clipboard-manager";
import { tick } from "svelte";
import type { Writable } from "svelte/store";
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

export const generateHash = async (content: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(content);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};
