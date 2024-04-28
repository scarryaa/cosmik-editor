import { font } from "../const/const";

const textWidthCache = new Map<string, number>();

export const measureTextWidth = (content: string): number => {
    // Check if the content's width is already cached
    if (textWidthCache.has(content)) {
        // biome-ignore lint/style/noNonNullAssertion: We already check above
        return textWidthCache.get(content)!;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;

    context.font = font;
    const metrics = context.measureText(content);
    const width = metrics.width;

    textWidthCache.set(content, width);

    return width;
};