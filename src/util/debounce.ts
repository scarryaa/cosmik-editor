export const debounce = <T extends any[]>(
	func: (...args: T) => void,
	wait: number,
) => {
	let timeout: ReturnType<typeof setTimeout>;
	return function executedFunction(...args: T) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};
