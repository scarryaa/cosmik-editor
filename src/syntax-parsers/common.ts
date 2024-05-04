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

export const highlighter = await getHighlighter({
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

export const parseBasedOnExtension = (
	extension: ParseType,
	content: string,
) => {
	switch (extension) {
		case "ts": {
			return highlighter.codeToHtml(content, {
				lang: "typescript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "html":
			return highlighter.codeToHtml(content, {
				lang: "html",
				theme: "github-light",
				structure: "inline",
			});
		case "css":
			return highlighter.codeToHtml(content, {
				lang: "css",
				theme: "github-light",
				structure: "inline",
			});
		case "scss":
			return highlighter.codeToHtml(content, {
				lang: "scss",
				theme: "github-light",
				structure: "inline",
			});
		case "json":
			return highlighter.codeToHtml(content, {
				lang: "json",
				theme: "github-light",
				structure: "inline",
			});
		case "svelte": {
			return highlighter.codeToHtml(content, {
				lang: "svelte",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "js": {
			return highlighter.codeToHtml(content, {
				lang: "javascript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "nix": {
			return highlighter.codeToHtml(content, {
				lang: "nix",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "yaml": {
			return highlighter.codeToHtml(content, {
				lang: "yaml",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "md": {
			return highlighter.codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "toml":
			return highlighter.codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		default:
			return highlighter.codeToHtml(content, {
				lang: "plaintext",
				theme: "github-light",
				structure: "inline",
			});
	}
};
