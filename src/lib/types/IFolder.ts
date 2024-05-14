import type { IFile } from "./IFile";

export interface IFolder {
	type: "folder";
	name: string;
	path: string;
	content: Array<IFile | IFolder>;
	isRoot: boolean;
}