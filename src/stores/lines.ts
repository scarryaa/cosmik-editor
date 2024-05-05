import { writable } from "svelte/store";

export const startLine = writable<number>(1);
export const endLine = writable<number>(1);
export const totalLines = writable<number>(1);
