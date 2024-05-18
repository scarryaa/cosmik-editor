import { codeToHtml } from "shiki";

export type ParseType =
	| "ts"
	| "html"
	| "css"
	| "scss"
	| "json"
	| "svelte"
	| "js"
	| "nix"
	| "yaml"
	| "md"
	| "toml"
	| "txt"
	| "gitignore"
	| "tsx"
	| "bash"
	| "yml";

const langMap: Record<ParseType, string> = {
	ts: "typescript",
	tsx: "tsx",
	html: "html",
	css: "css",
	scss: "scss",
	json: "json",
	svelte: "svelte",
	js: "javascript",
	nix: "nix",
	yaml: "yaml",
	md: "markdown",
	toml: "toml",
	txt: "plaintext",
	gitignore: "plaintext",
	bash: "bash",
	yml: "yml",
};

export const parseBasedOnExtension = async (
	extension: ParseType,
	content: string,
): Promise<string> => {
	const lang = langMap[extension] || "plaintext";

	return codeToHtml(content, {
		lang,
		theme: "github-light",
		structure: "inline",
	});
};
