export const ondragover = (
	event: DragEvent,
	dragZones: {
		left: {
			x: number;
			width: number;
		};
		right: {
			x: number;
			width: number;
		};
	},
	_astroWrapperInner: HTMLDivElement | undefined,
): { dragOverLeft: boolean; dragOverRight: boolean } => {
	event.preventDefault();
	if (
		event.clientX >= dragZones.left.x &&
		event.clientX <= dragZones.left.x + dragZones.left.width
	) {
		return { dragOverLeft: true, dragOverRight: false };
	}

	if (
		event.clientX >= dragZones.right.x &&
		event.clientX <= dragZones.right.x + dragZones.right.width
	) {
		return { dragOverLeft: false, dragOverRight: true };
	}

	return { dragOverLeft: false, dragOverRight: false };
};

export const ondragend = (
	event: DragEvent,
	_astroWrapperInner: HTMLDivElement | undefined,
): { dragOverLeft: boolean; dragOverRight: boolean } => {
	event.preventDefault();
	return { dragOverLeft: false, dragOverRight: false };
};
