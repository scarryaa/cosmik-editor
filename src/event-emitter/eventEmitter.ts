export class EventEmitter {
	private events: { [key: string]: ((...args: any[]) => void)[] } = {};

	on<T = any>(event: string, listener: (...args: T[]) => void) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener as (...args: any[]) => void);
	}

	off<T = any>(event: string, listener: (...args: T[]) => void) {
		if (!this.events[event]) return;
		this.events[event] = this.events[event].filter((l) => l !== listener);
	}

	emit<T = any>(event: string, ...args: T[]) {
		if (!this.events[event]) return;

		for (const listener of this.events[event]) {
			(listener as (...args: T[]) => void)(...args);
		}
	}
}
