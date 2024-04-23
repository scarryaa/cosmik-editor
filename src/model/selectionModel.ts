import { EventEmitter } from "../event-emitter/eventEmitter";

export enum SelectionEvents {
	selectionChanged = "selectionChanged",
}

export enum SelectionDirection {
    leftToRight = "leftToRight",
    rightToLeft = "rightToLeft",
}

export type SelectionChangeOptions = {
    direction: SelectionDirection,
    amount: number;
}

/**
 * A class for managing selection as it relates to a text editor.
 */
export class Selection extends EventEmitter {
	public content: string;
	public startLine: number;
	public endLine: number;
	public startIndex: number;
	public endIndex: number;
    public direction: SelectionDirection;

	constructor(
		content = "",
		startLine = 0,
		endLine = 0,
		startIndex = 0,
		endIndex = 0,
        direction = SelectionDirection.leftToRight
	) {
        super();
		this.content = content;
		this.startLine = startLine;
		this.endLine = endLine;
		this.startIndex = startIndex;
		this.endIndex = endIndex;
        this.direction = direction;
	}

    public expandSelection = (options: SelectionChangeOptions) => {
        if (options.direction === SelectionDirection.leftToRight) {
            this.endIndex += options.amount;
        } else {
            this.startIndex -= options.amount;
        }

        this.emit(SelectionEvents.selectionChanged, this);
        return this;
    }

    public contractSelection = (options: SelectionChangeOptions) => {
        if (options.direction === SelectionDirection.leftToRight) {
            this.endIndex -= options.amount;
        } else {
            this.startIndex += options.amount;
        }

        this.emit(SelectionEvents.selectionChanged, this);
        return this;
    }

    public clearSelection = () => {
        this.content = "";
        this.startLine = 0;
        this.endLine = 0;
        this.startIndex = 0;
        this.endIndex = 0;

        this.emit(SelectionEvents.selectionChanged, this);
    }

    public isEmpty = () => {
        return this.startIndex === this.endIndex;
    }

    public setSelection = (newSelection: Selection) => {
        this.content = newSelection.content;
        this.startLine = newSelection.startLine;
        this.endLine = newSelection.endLine;
        this.startIndex = newSelection.startIndex;
        this.endIndex = newSelection.endIndex;
        this.direction = newSelection.direction;

        this.emit(SelectionEvents.selectionChanged, this);
    }

    static empty = (): Selection => {
        return new Selection();
	}
}
