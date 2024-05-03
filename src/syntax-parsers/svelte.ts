import { escapeHtml } from "./common";

export const highlightSvelte = (input: string): string => {
	let escapedInput = escapeHtml(input);
	let placeholdersMap = new Map();
	let placeholderIndex = 0;

	// Patterns for Svelte specific syntax
	const patterns = [
		{ regex: /({\s*#\w+\s*.*?})/gs, type: "svelte-directive" }, // Svelte directives like {#if}, {#each}, etc.
		{ regex: /({\s*\/\w+\s*})/gs, type: "svelte-closing-directive" }, // Svelte closing directives like {/if}, {/each}, etc.
		{ regex: /({[^}]+})/gs, type: "svelte-expression" }, // Svelte expressions
	];

	// Replace matched patterns with placeholders
	for (const pattern of patterns) {
		escapedInput = escapedInput.replace(pattern.regex, (match) => {
			const placeholder = `@@${pattern.type.toUpperCase()}_${placeholderIndex++}@@`;
			placeholdersMap.set(placeholder, match);
			return placeholder;
		});
	}

    const keywordsPattern = /\b(function|const|let|if|else)\b/g;
	const otherKeywords = /\b(export|return|from|import)\b/g;
	const constPattern = /\bconst\s+(\w+)/g;

    escapedInput = escapedInput.replace(
        constPattern,
        "const <span class='variable-keyword'>$1</span>",
    );

	escapedInput = escapedInput.replace(
		keywordsPattern,
		'<span class="keyword">$1</span>',
	);

	escapedInput = escapedInput.replace(
		otherKeywords,
		'<span class="second-keyword">$1</span>',
	);

	// Reinsert the highlighted Svelte syntax back into the escapedInput
	placeholdersMap.forEach((value, key) => {
		escapedInput = escapedInput.replace(key, () => {
			if (key.startsWith("@@SVELTE-DIRECTIVE")) {
				return `<span class="svelte-directive">${value}</span>`;
			}

			if (key.startsWith("@@SVELTE-CLOSING-DIRECTIVE")) {
				return `<span class="svelte-closing-directive">${value}</span>`;
			}

			if (key.startsWith("@@SVELTE-EXPRESSION")) {
				return `<span class="svelte-expression">${value}</span>`;
			}
			return value; // Fallback, should not happen
		});
	});

	return escapedInput;
};
