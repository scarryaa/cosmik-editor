import { useCallback, useState } from "react";

export function useLineCount() {
	const [lineCount, setLineCount] = useState(0);

	// Counts lines based on <div> elements
	const calculateLineCount = useCallback((htmlContent: string) => {
		// Count lines based on <div> and block elements that naturally break lines
		let lineCount = 0;

		const countLines = (content: string) => {
			const lines = content.split("<div>");
			for (const line of lines) {
				if (line.trim().length > 0) {
                    lineCount++;
                }
			}
		};

		countLines(htmlContent);

		// Ensure at least one line is counted
		if (lineCount === 0) {
			lineCount = 1;
		}

		return lineCount;
	}, []);

	return { calculateLineCount, lineCount, setLineCount };
}
