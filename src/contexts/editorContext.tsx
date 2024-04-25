import {
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
} from "react";
import {
	type CursorPosition,
	useCursorManagement,
} from "../hooks/useCursorManagement";
import { useEditorContentManagement } from "../hooks/useEditorContentManagement";
import { useEditorEvents } from "../hooks/useEditorEvents";
import { useMouseEvents } from "../hooks/useMouseEvents";
import {
	type ScrollDirection,
	useScrollManagement,
} from "../hooks/useScrollManagement";
import { useSelectionManagement } from "../hooks/useSelectionManagement";
import { EditorModel } from "../model/editorModel";
import type { Selection } from "../model/selectionModel";

interface EditorContextType {
	lines: string[];
	lineCount: number;
	insertCharacter: (model: EditorModel, character: string) => void;
	deleteCharacter: (model: EditorModel, isDeleteKey?: boolean) => void;
	updateEditorContent: (newContent: string) => void;
	cursorPosition: CursorPosition;
	moveCursorDown: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorUp: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorLeft: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	moveCursorRight: (
		model: EditorModel,
		cursorPosition: CursorPosition,
		content: HTMLDivElement,
	) => void;
	updateCursor: (
		model: EditorModel,
		opts: { line: number; char: number },
	) => void;
	scrollToCursorIfNeeded: (direction: ScrollDirection) => void;
	handleEnterScroll: () => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	editorRef: React.RefObject<HTMLDivElement>;
	editorModelRef: React.RefObject<EditorModel>;
	handleMouseDownWrapper: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => void;
	debouncedMouseMove: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => void;
	handleMouseUp: (event: MouseEvent) => void;
	selection: Selection;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
	const context = useContext(EditorContext);
	if (context === undefined) {
		throw new Error("useEditor must be used within an EditorProvider");
	}
	return context;
};

export const EditorProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const editorModelRef = useRef<EditorModel | null>(
		new EditorModel({ initialContent: "" }),
	);
	const LINE_HEIGHT = 20;
	const SCROLL_OFFSET = LINE_HEIGHT * 3;

	const {
		lines,
		lineCount,
		insertCharacter,
		deleteCharacter,
		updateEditorContent,
	} = useEditorContentManagement();

	const {
		cursorPosition,
		moveCursorDown,
		moveCursorUp,
		moveCursorLeft,
		moveCursorRight,
		updateCursor,
	} = useCursorManagement(editorRef, { char: 0, line: 0 });

	const { scrollToCursorIfNeeded, handleEnterScroll } = useScrollManagement(
		editorRef,
		editorModelRef,
		LINE_HEIGHT,
		SCROLL_OFFSET,
	);

	const {
		clearSelection,
		getDOMSelection,
		setIsSelecting,
		isSelectingRef,
		selection,
		selectionSourceRef
	} = useSelectionManagement(editorModelRef, editorRef);

	const { handleMouseDownWrapper, debouncedMouseMove, handleMouseUp } =
		useMouseEvents(
			editorModelRef,
			editorRef,
			isSelectingRef,
			setIsSelecting,
			getDOMSelection,
			updateCursor,
			selectionSourceRef
		);

	const { handleKeyDown } = useEditorEvents(
		editorRef,
		editorModelRef,
		updateEditorContent,
		updateCursor,
		scrollToCursorIfNeeded,
		handleEnterScroll,
		moveCursorDown,
		moveCursorUp,
		moveCursorLeft,
		moveCursorRight,
		insertCharacter,
		deleteCharacter,
		selectionSourceRef
	);

	return (
		<EditorContext.Provider
			value={{
				lines,
				lineCount,
				insertCharacter,
				deleteCharacter,
				updateEditorContent,
				cursorPosition,
				moveCursorDown,
				moveCursorUp,
				moveCursorLeft,
				moveCursorRight,
				updateCursor,
				scrollToCursorIfNeeded,
				handleEnterScroll,
				handleKeyDown,
				editorRef,
				editorModelRef,
				handleMouseDownWrapper,
				debouncedMouseMove,
				handleMouseUp,
				selection,
			}}
		>
			{children}
		</EditorContext.Provider>
	);
};
