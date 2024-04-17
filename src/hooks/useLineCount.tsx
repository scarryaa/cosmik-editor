import { useCallback, useState } from "react";

export function useLineCount() {
    const [lineCount, setLineCount] = useState(0);
    
	const calculateLineCount = useCallback((htmlContent: string) => {
		// Count lines based on <br> and block elements that naturally break lines
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlContent;
		let lineCount = 0;

		const countLines = (node: HTMLElement) => {
			for (let i = 0; i < node.childNodes.length; i++) {
				const child = node.childNodes[i];

				if (child.nodeType === Node.ELEMENT_NODE) {
					const childElement = child as HTMLElement;
					if (childElement.tagName === "BR") {
						lineCount++;
					} else if (
						window.getComputedStyle(childElement).display === "block"
					) {
						lineCount++; // Count block elements as new lines
						countLines(childElement); // Recursively count inside block elements
					}
					// Count text nodes as new lines, but only if it is the last child of the element
				} else if (
					child.nodeType === Node.TEXT_NODE &&
					i === node.childNodes.length - 1
				) {
					lineCount++;
				}
			}
		};

		countLines(tempDiv);

		// Ensure at least one line is counted if content exists
		setLineCount(Math.max(lineCount, tempDiv.childNodes.length ? 1 : 0));
        return lineCount;
	}, []);

    return { calculateLineCount, lineCount, setLineCount };
}