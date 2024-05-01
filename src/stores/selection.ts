import { writable } from "svelte/store";

export const selecting = writable<boolean>(false);
export const lastMousePosition = writable<{ left: number; top: number }>();
