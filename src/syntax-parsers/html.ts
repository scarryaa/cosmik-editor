import { escapeHtml } from "./common";

export const highlightHtmlSyntax = (html: string): string => {
	let escapedHtml = escapeHtml(html);
	let placeholdersMap = new Map();
	let placeholderIndex = 0;

	// Patterns for HTML comments, tags, and attributes
	const patterns = [
		{ regex: /(<!--.*?-->)/gs, type: "comment" }, // HTML comments
		{ regex: /(&lt;\/?\w+.*?&gt;|doctype)/g, type: "tag" }, // HTML tags
		{ regex: /html/g, type: "html" },
		{ regex: /(&lt;|&gt;|!|\/)/g, type: "special" },
	];

	// Replace matched patterns with placeholders
	for (const pattern of patterns) {
		escapedHtml = escapedHtml.replace(pattern.regex, (match) => {
			const placeholder = `@@${pattern.type.toUpperCase()}_${placeholderIndex++}@@`;
			placeholdersMap.set(placeholder, match);
			return placeholder;
		});
	}

	// Highlight attributes within tags
	placeholdersMap.forEach((value, key) => {
		let newValue = value;
		if (key.startsWith("@@TAG")) {
			newValue = newValue.replace(
				/(\w+)(=".*?"|='.*?')/g,
				'<span class="html-attribute">$1</span><span class="html-value">$2</span>',
			);
			placeholdersMap.set(key, newValue);
		}
	});

	placeholdersMap.forEach((value, key) => {
		escapedHtml = escapedHtml.replace(key, () => {
			if (key.startsWith("@@HTML")) {
				return `<span class="html-literal">${value}</span>`;
			}

			if (key.startsWith("@@TAG")) {
				return `<span class="html-tag">${value}</span>`;
			}

			if (key.startsWith("@@SPECIAL")) {
				return `<span class="html-special">${value}</span>`;
			}

			return value; // Fallback, should not happen
		});
	});

	// Reinsert the highlighted HTML back into the escapedHtml
	placeholdersMap.forEach((value, key) => {
		escapedHtml = escapedHtml.replace(key, () => {
			if (key.startsWith("@@COMMENT")) {
				return `<span class="html-comment">${value}</span>`;
			}

			if (key.startsWith("@@TAG")) {
				return `<span class="html-tag">${value}</span>`;
			}
			return value; // Fallback, should not happen
		});
	});

	return escapedHtml;
};
