const textWidthCache = new Map<string, number>();

export const textService = {
	measureTextWidth(content: string, font: string, fontSize: number): number {
		// Check if the content's width is already cached
		if (textWidthCache.has(content)) {
			return textWidthCache.get(content)!;
		}

		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		if (!context) return 0;

		context.font = `${fontSize}px ${font}`;
		const metrics = context.measureText(content);
		const width = metrics.width;

		textWidthCache.set(content, width);

		return width;
	},

	isFontMonospace(font: string, fontSize: number): boolean {
		return (
			this.measureTextWidth("a", font, fontSize) ===
			this.measureTextWidth("b", font, fontSize)
		);
	},
};
