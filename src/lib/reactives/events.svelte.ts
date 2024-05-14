import { writable } from "svelte/store";

export const fileCreationEvent = writable<string | null>(null);
export const fileRenameEvent = writable<string | null>(null);
export const folderCreationEvent = writable<string | null>(null);
export const folderRenameEvent = writable<string | null>(null);