import { escapeHtml } from "./common";

export const highlightCss = (css: string): string => {
    let escapedCss = escapeHtml(css);
    let placeholdersMap = new Map();
    let placeholderIndex = 0;

    const commentPattern = /\/\*[\s\S]*?\*\//g;
    const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    const selectorPattern = /([^{]+)\{/g;

    for ( const pattern of [commentPattern, stringPattern]) {
        escapedCss = escapedCss.replace(pattern, (match) => {
            const placeholder = `@@PLACEHOLDER_${placeholderIndex++}@@`;
            placeholdersMap.set(placeholder, match);
            return placeholder;
        });
    }

    escapedCss = escapedCss.replace(selectorPattern, (match, selector) => {
        return `<span class="css-selector">${selector}</span>{`;
    });

    escapedCss = escapedCss.replace(/([\w-]+)\s*:/g, '<span class="css-property">$1</span>:');
    escapedCss = escapedCss.replace(/:\s*([^;]+);/g, ': <span class="css-value">$1</span>;');

    placeholdersMap.forEach((value, key) => {
        escapedCss = escapedCss.replace(key, () => value);
    });

    return escapedCss;
}