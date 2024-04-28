import { writable } from "svelte/store";

export const mouseDown = writable<boolean>(false);