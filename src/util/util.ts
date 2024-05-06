import { readText } from "@tauri-apps/plugin-clipboard-manager";
import { tick } from "svelte";
import type { Writable } from "svelte/store";
import { CursorDirection } from "../models/Cursor";
import type { Editor } from "../models/Editor";
import { getCurrentEditor, updateCurrentEditor } from "../stores/editor";

export const pasteInternal = async (
	$cursor: HTMLDivElement,
	$astroWrapperInner: HTMLDivElement,
	$astroEditor: HTMLDivElement,
): Promise<void> => {
	const textToPaste = await readText();
	const currentEditor = getCurrentEditor();

	updateCurrentEditor((model) => {
		currentEditor?.paste(textToPaste);
		return model;
	});

	await tick();
	const newLine = document.querySelector(
		`[data-line-number="${
			currentEditor?.getCursor().getPosition().line ?? 0 - 1
		}"]`,
	) as HTMLDivElement;

	generateCursorPositonChangeEvent(
		$cursor,
		currentEditor?.getCursor().getDirection() ?? CursorDirection.Left,
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

export const generateCursorPositonChangeEvent = (
	node: HTMLElement,
	direction: CursorDirection,
): void => {
	const cursorPositionChangeEvent = new CustomEvent("cursorPositionChange", {
		bubbles: true,
		detail: { direction },
	});
	node.dispatchEvent(cursorPositionChangeEvent);
};
