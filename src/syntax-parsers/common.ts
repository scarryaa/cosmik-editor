import { highlightCss } from "./css";
import { highlightHtmlSyntax } from "./html";
import { highlightJson } from "./json";
import { highlightSvelte } from "./svelte";
import { highlightTypescript } from "./typescript";

export type ParseType = "ts" | "html" | "css" | "scss" | "json" | "svelte";

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
		case "ts":
			return highlightTypescript(content);
		case "html":
			return highlightHtmlSyntax(content);
		case "css":
			return highlightCss(content);
		case "scss":
			return highlightCss(content);
		case "json":
			return highlightJson(content);
		case "svelte": {
			return highlightSvelte(content);
		}
		default:
			return escapeHtml(content);
	}
};