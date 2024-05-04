import { escapeHtml } from "./common";

export const highlightJson = (json: string): string => {
	let escapedJson = escapeHtml(json);
	let placeholdersMap = new Map();
	let placeholderIndex = 0;

	escapedJson = escapedJson.replace(/\"(.*?)(?=\")\":/g, (match) => {
		const placeholder = `@@PLACEHOLDER_${placeholderIndex++}@@`;
		placeholdersMap.set(placeholder, `<span class="json-key">${match}</span>`);
		return placeholder;
	});

	escapedJson = escapedJson.replace(/\"(.*?)\"/g, (match) => {
		const placeholder = `@@PLACEHOLDER_${placeholderIndex++}@@`;
		placeholdersMap.set(
			placeholder,
			`<span class="json-string">${match}</span>`,
		);
		return placeholder;
	});

	escapedJson = escapedJson.replace(
		/\b\d+\.?\d*\b/g,
		`<span class="json-number">$&</span>`,
	);
	escapedJson = escapedJson.replace(
		/\b(false|true|null)\b/g,
		`<span class="json-boolean">$&</span>`,
	);

	placeholdersMap.forEach((value, key) => {
		escapedJson = escapedJson.replace(key, value);
	});

	return escapedJson;
};
