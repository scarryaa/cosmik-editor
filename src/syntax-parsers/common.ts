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
	| "gitignore";

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
	switch (extension) {
		case "ts": {
			return codeToHtml(content, {
				lang: "typescript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "html":
			return codeToHtml(content, {
				lang: "html",
				theme: "github-light",
				structure: "inline",
			});
		case "css":
			return codeToHtml(content, {
				lang: "css",
				theme: "github-light",
				structure: "inline",
			});
		case "scss":
			return codeToHtml(content, {
				lang: "scss",
				theme: "github-light",
				structure: "inline",
			});
		case "json":
			return codeToHtml(content, {
				lang: "json",
				theme: "github-light",
				structure: "inline",
			});
		case "svelte": {
			return codeToHtml(content, {
				lang: "svelte",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "js": {
			return codeToHtml(content, {
				lang: "javascript",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "nix": {
			return codeToHtml(content, {
				lang: "nix",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "yaml": {
			return codeToHtml(content, {
				lang: "yaml",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "md": {
			return codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		}
		case "toml":
			return codeToHtml(content, {
				lang: "markdown",
				theme: "github-light",
				structure: "inline",
			});
		default:
			return codeToHtml(content, {
				lang: "plaintext",
				theme: "github-light",
				structure: "inline",
			});
	}
};
