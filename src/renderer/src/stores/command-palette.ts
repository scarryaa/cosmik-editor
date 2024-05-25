import {
	extensionsPane,
	filePane,
	runAndDebugPane,
	searchPane,
	sourceControlPane,
} from "@renderer/util/panes";
import { newFile, saveCurrentFile } from "@renderer/util/util";
import { createSignal } from "solid-js";
import { Languages, setSelectedLanguage } from "./language-selections";
import { togglePane } from "./panes";

const languageHelper = (language: Languages) => {
	setSelectedLanguage(language);
	window.api.manualSetLanguageRequest(language);
};

export const languageCommands = [
	{ id: 1, label: "Bash", action: () => languageHelper(Languages.Bash) },
	{ id: 2, label: "C", action: () => languageHelper(Languages.C) },
	{ id: 3, label: "C++", action: () => languageHelper(Languages.CPP) },
	{ id: 4, label: "C#", action: () => languageHelper(Languages.CSharp) },
	{
		id: 5,
		label: "Common Lisp",
		action: () => languageHelper(Languages.CommonLisp),
	},
	{ id: 21, label: "CSS", action: () => languageHelper(Languages.CSS) },
	{ id: 6, label: "CUDA", action: () => languageHelper(Languages.CUDA) },
	{ id: 7, label: "GLSL", action: () => languageHelper(Languages.GLSL) },
	{ id: 8, label: "Go", action: () => languageHelper(Languages.Go) },
	{ id: 9, label: "Haskell", action: () => languageHelper(Languages.Haskell) },
	{ id: 10, label: "HTML", action: () => languageHelper(Languages.HTML) },
	{ id: 11, label: "Java", action: () => languageHelper(Languages.Java) },
	{
		id: 12,
		label: "JavaScript",
		action: () => languageHelper(Languages.JavaScript),
	},
	{ id: 13, label: "JSON", action: () => languageHelper(Languages.JSON) },
	{ id: 14, label: "OCaml", action: () => languageHelper(Languages.OCaml) },
	{ id: 15, label: "Odin", action: () => languageHelper(Languages.Odin) },
	{ id: 16, label: "PHP", action: () => languageHelper(Languages.PHP) },
	{
		id: 16,
		label: "Plaintext",
		action: () => languageHelper(Languages.Plaintext),
	},
	{ id: 17, label: "Python", action: () => languageHelper(Languages.Python) },
	{ id: 18, label: "Regex", action: () => languageHelper(Languages.Regex) },
	{ id: 19, label: "Ruby", action: () => languageHelper(Languages.Ruby) },
	{ id: 20, label: "Rust", action: () => languageHelper(Languages.Rust) },
	{ id: 21, label: "SCSS", action: () => languageHelper(Languages.SCSS) },
	{
		id: 22,
		label: "TypeScript",
		action: () => languageHelper(Languages.TypeScript),
	},
	{
		id: 23,
		label: "TypeScript TSX",
		action: () => languageHelper(Languages.TypeScriptTSX),
	},
];

export const commands = [
	{
		id: 1,
		label: "File: Open File",
		action: () => window.api.sendOpenFileRequest(),
	},
	{ id: 2, label: "File: Save File", action: () => saveCurrentFile() },
	{ id: 3, label: "File: New File", action: () => newFile() },
	{
		id: 4,
		label: "View: Show Files",
		action: () => togglePane(filePane),
		prefix: true,
	},
	{
		id: 5,
		label: "View: Show Search",
		action: () => togglePane(searchPane),
		prefix: true,
	},
	{
		id: 6,
		label: "View: Show Source Control",
		action: () => togglePane(sourceControlPane),
		prefix: true,
	},
	{
		id: 7,
		label: "View: Show Run And Debug",
		action: () => togglePane(runAndDebugPane),
		prefix: true,
	},
	{
		id: 8,
		label: "View: Show Extensions",
		action: () => togglePane(extensionsPane),
		prefix: true,
	},
];

export const [initWithPrefix, setInitWithPrefix] = createSignal(false);
export const [isOpen, setIsOpen] = createSignal(false);
export const [contents, setContents] = createSignal(commands);

export const setContentToLanguages = () => {
	setInitWithPrefix(false);
	setContents(languageCommands);
};

export const setContentToDefaultCommands = () => {
	setContents(commands);
};
