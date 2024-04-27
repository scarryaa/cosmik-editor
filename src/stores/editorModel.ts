import { writable } from "svelte/store";
import { Editor } from "../models/Editor";

export const editorModel = writable(new Editor(""));