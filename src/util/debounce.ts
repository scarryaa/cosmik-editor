// Debounce function
export const debounce = (func: any, wait: number) => {
	let timeout: number;
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};
