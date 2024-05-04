import { escapeHtml } from "./common";

export const highlightTypescript = (line: string): string => {
	let escapedLine = escapeHtml(line);
	let placeholdersMap = new Map();
	let placeholderIndex = 0;

	const patterns = [
		{ regex: /(\/\/.*)/g, type: "comment" },
		{ regex: /(".*?"|'.*?'|`.*?`)/g, type: "string" },
	];

	for (const pattern of patterns) {
		escapedLine = escapedLine.replace(pattern.regex, (match) => {
			let placeholder = `@@${pattern.type.toUpperCase()}_${placeholderIndex++}@@`;
			placeholdersMap.set(placeholder, match);
			return placeholder;
		});
	}

	const keywordsPattern = /\b(function|const|let|if|else)\b/g;
	const otherKeywords = /\b(export|return|from|import)\b/g;
	const constPattern = /\bconst\s+(\w+)/g;

	escapedLine = escapedLine.replace(
		constPattern,
		"const <span class='variable-keyword'>$1</span>",
	);

	escapedLine = escapedLine.replace(
		keywordsPattern,
		'<span class="keyword">$1</span>',
	);

	escapedLine = escapedLine.replace(
		otherKeywords,
		'<span class="second-keyword">$1</span>',
	);

	placeholdersMap.forEach((value, key) => {
		escapedLine = escapedLine.replace(key, () => {
			if (key.startsWith("@@COMMENT")) {
				return `<span class="comment">${value}</span>`;
			}

			return `<span class="string">${value}</span>`;
		});
	});

	return escapedLine;
};