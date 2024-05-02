import { writable } from "svelte/store";
import {
	cursorHorizOffset,
	cursorVertOffset,
} from "../components/AstroEditor/AstroEditor";
import { Editor } from "../models/Editor";

export const editor = writable<Editor>(new Editor());
export const cursorVertPos = writable(cursorVertOffset);
export const cursorHorizPos = writable(cursorHorizOffset);
export const showEditor = writable<boolean>(false);
