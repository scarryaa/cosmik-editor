export const generateGUID = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
};

export function throttle(func, limit) {
	let lastFunc;
	let lastRan;
	return function () {
		
		const args = arguments;
		if (!lastRan) {
			func.apply(this, args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(
				() => {
					if (Date.now() - lastRan >= limit) {
						func.apply(this, args);
						lastRan = Date.now();
					}
				},
				limit - (Date.now() - lastRan),
			);
		}
	};
}
