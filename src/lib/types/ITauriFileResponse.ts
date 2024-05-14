
export interface ITauriFileResponse {
	is_folder: boolean;
	name: string;
	children: Array<ITauriFileResponse> | null;
	path: string;
}
