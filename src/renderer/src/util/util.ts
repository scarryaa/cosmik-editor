export const getNumberOfLinesOnScreen = (lineHeight: number): number => {
	return Math.floor(window.innerHeight / lineHeight);
};

export const debounce = <T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): T => {
	let timeout: ReturnType<typeof setTimeout>;
	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	} as T;
};

export const debounceImmediate = <T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): T => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<T>) {
		const callNow = !timeout;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
		}, wait);
		if (callNow) func.apply(this, args);
	} as T;
};

export const throttle = (func, wait) => {
	let timeout: any;
	return function (...args) {
		if (!timeout) {
			func.apply(this, args);
			timeout = setTimeout(() => (timeout = null), wait);
		}
	};
};
