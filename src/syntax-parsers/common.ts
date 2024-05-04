import { getHighlighter } from "shiki";

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
	| "toml" | "txt" | "gitignore";

export const highlighter = async () => await getHighlighter({
	themes: ["github-light"],
	langs: [
		"typescript",
		"html",
		"css",
		"scss",
		"json",
		"nix",
		"svelte",
		"javascript",
		"yaml",
		"markdown",
		"toml",
		"plaintext"
	],
});

export const escapeHtml = (unsafe: string): string => {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
};

export const parseBasedOnExtension = async (
	extension: ParseType,
	content: string,
) => {
	const _highlighter = await highlighter();
	switch (extension) {
		case "ts": {
			return _highlighter.codeToHtml(content, {
				lang: "typescript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "html":
			return _highlighter.codeToHtml(content, {
				lang: "html",
				theme: "github-light",
				structure: "inline",
			});
		case "css":
			return _highlighter.codeToHtml(content, {
				lang: "css",
				theme: "github-light",
				structure: "inline",
			});
		case "scss":
			return _highlighter.codeToHtml(content, {
				lang: "scss",
				theme: "github-light",
				structure: "inline",
			});
		case "json":
			return _highlighter.codeToHtml(content, {
				lang: "json",
				theme: "github-light",
				structure: "inline",
			});
		case "svelte": {
			return _highlighter.codeToHtml(content, {
				lang: "svelte",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "js": {
			return _highlighter.codeToHtml(content, {
				lang: "javascript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "nix": {
			return _highlighter.codeToHtml(content, {
				lang: "nix",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "yaml": {
			return _highlighter.codeToHtml(content, {
				lang: "yaml",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "md": {
			return _highlighter.codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "toml":
			return _highlighter.codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		default:
			return _highlighter.codeToHtml(content, {
				lang: "plaintext",
				theme: "github-light",
				structure: "inline",
			});
	}
};
