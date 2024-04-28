import { font } from "../const/const";

export const measureText = (content: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;

    context.font = font;
    const metrics = context.measureText(content);
    return metrics.width;
};