export const getNumberOfLinesOnScreen = (lineHeight: number): number => {
	return Math.floor(window.innerHeight / lineHeight);
};
