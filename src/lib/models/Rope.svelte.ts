import { RopeNode } from "./RopeNode.svelte";

export class Rope {
	private root: RopeNode;
	private maxTextLength = 100;

	constructor(text: string) {
		this.root = new RopeNode(text);
	}

	private buildNewTree = (s: Array<string>): RopeNode | null => {
		if (s.length === 0) {
			return null;
		}
		const middleIndex = Math.floor(s.length / 2);
		const middleNode = new RopeNode(s[middleIndex]);

		// Recursively build the left and right subtrees
		if (middleIndex > 0) {
			middleNode.left = this.buildNewTree(s.slice(0, middleIndex));
		}
		if (middleIndex < s.length - 1) {
			middleNode.right = this.buildNewTree(s.slice(middleIndex + 1));
		}

		return middleNode;
	};

	private getLength(node: RopeNode | null): number {
		if (!node) return 0;
		// Leaf node
		if (node.text !== null) return node.text.length;
		return this.getLength(node.left) + this.getLength(node.right);
	}

	private rebalance = (node: RopeNode): void => {
		const leaves = new Array<string>();

		// Collect all leaves
		const collectLeaves = (n: RopeNode | null) => {
			if (!n) return;
			if (n.left) collectLeaves(n.left);
			if (n.right) collectLeaves(n.right);
			if (n.text !== null) leaves.push(n.text);
		};

		collectLeaves(node);

		const newTree = this.buildNewTree(leaves);
		if (newTree) this.root = newTree;
	};

	private toStringInternal = (node: RopeNode | null): string => {
		if (node === null) {
			return "";
		}
		if (node.text !== null) {
			return node.text;
		}
		// Recursively traverse the left and right children
		return this.toStringInternal(node.left) + this.toStringInternal(node.right);
	};

	private splitNode = (
		node: RopeNode,
		index: number,
		insertLength: number,
	): void => {
		// Determine the split point, which could be based on the index and insert length
		const splitPoint = index + Math.floor(insertLength / 2);

		// Create two new nodes from the split
		const leftText = node.text?.substring(0, splitPoint);
		const rightText = node.text?.substring(splitPoint);

		const leftNode = new RopeNode(leftText);
		const rightNode = new RopeNode(rightText);

		// Adjust the current node to act as a parent for the two new nodes
		node.text = null;
		node.left = leftNode;
		node.right = rightNode;
		node.weight = leftText?.length ?? 0;
	};

	private insertText = (node: RopeNode, index: number, text: string): void => {
		// Insert the text into the node's text at the specified index
		const newText =
			node.text?.substring(0, index) + text + node.text?.substring(index);
		node.text = newText;

		// Check if the node's text length exceeds the maximum allowed length
		if (newText.length > this.maxTextLength) {
			// Split the node into two or more nodes
			this.splitNode(node, index, text.length);
		}
	};

	private insertInternal = (
		node: RopeNode,
		index: number,
		text: string,
	): void => {
		let newIndex = index;

		if (node.weight > newIndex) {
			// Move left
			const child = node.left;
			if (child) {
				this.insertInternal(child, newIndex, text);
			} else if (node.text) {
				this.insertText(node, newIndex, text);
				// After inserting, check if the node needs to be split
				if (node.text?.length > this.maxTextLength) {
					this.splitNode(node, newIndex, text.length);
				}
			}
		} else {
			// Move right and subtract from index
			newIndex -= node.weight;
			const child = node.right;
			if (child) {
				this.insertInternal(child, newIndex, text);
			} else if (node.text) {
				this.insertText(node, newIndex, text);
				// After inserting, check if the node needs to be split
				if (node.text?.length > this.maxTextLength) {
					this.splitNode(node, newIndex, text.length);
				}
			}
		}
	};

	private replaceInternal = (
		node: RopeNode,
		textToReplace: string,
		value: string,
	): void => {
		// Search for the text
		if (node.left) {
			this.replaceInternal(node.left, textToReplace, value);
		}

		if (node.right) {
			this.replaceInternal(node.right, textToReplace, value);
		}

		// Do the replacement
		if (node.text?.includes(textToReplace)) {
			node.text = node.text.replace(textToReplace, value);
		}

		// Update weight
		if (node.text) {
			node.weight = node.text.length;
		} else {
			node.weight = (node.left?.weight ?? 0) + (node.right?.weight ?? 0);
		}
	};

	public concat(other: Rope): void {
		const newRoot = new RopeNode();
		newRoot.left = this.root;
		newRoot.right = other.root;
		newRoot.weight =
			this.root.weight + (this.root.left ? this.getLength(this.root.left) : 0);
		this.root = newRoot;
		this.rebalance(this.root);
	}

	public delete = (index: number, length: number): void => {
		this.deleteInternal(this.root, index, length);
	};

	private deleteInternal = (
		node: RopeNode,
		index: number,
		length: number,
	): boolean => {
		let newLength = length;
		let newIndex = index;

		if (newLength <= 0 || node === null) {
			return false;
		}

		const nodeTextLength = node.text?.length ?? 0;

		if (node.weight > newIndex) {
			// Deletion starts in the left subtree
			if (node.left) {
				const deleted = this.deleteInternal(node.left, newIndex, newLength);
				if (deleted) newLength -= node.left.text?.length ?? 0;
			}
		} else {
			// Adjust index for right subtree
			newIndex -= node.weight;
		}

		if (newIndex < nodeTextLength && node.text !== null) {
			// Node contains part of the text to delete
			const deleteEnd = Math.min(newIndex + newLength, nodeTextLength);
			const newText =
				node.text.substring(0, newIndex) + node.text.substring(deleteEnd);
			node.text = newText;
			node.weight = newText.length;
			newLength -= deleteEnd - newIndex;
		}

		if (newLength > 0 && node.right) {
			// Continue deletion in the right subtree
			this.deleteInternal(node.right, newIndex - nodeTextLength, newLength);
		}

		this.rebalance(node);

		return true;
	};

	public indexToPosition(index: number): { line: number; column: number } {
		let line = 0;
		let column = 0;
		let currentIndex = 0;

		const traverse = (node: RopeNode | null): boolean => {
			if (!node || currentIndex > index) {
				return false;
			}

			if (node.text !== null) {
				for (
					let i = 0;
					i < node.text.length && currentIndex <= index;
					i++, currentIndex++
				) {
					if (node.text[i] === "\n") {
						line++;
						column = 0;
					} else {
						column++;
					}
					if (currentIndex === index) {
						return true;
					}
				}
			} else {
				if (traverse(node.left)) return true;
				if (traverse(node.right)) return true;
			}
			return false;
		};

		traverse(this.root);

		return { line, column };
	}

	public positionToIndex(line: number, column: number): number {
		let currentLine = 0;
		let currentColumn = 0;
		let index = 0;

		const traverse = (node: RopeNode | null): boolean => {
			if (!node) {
				return false;
			}

			if (node.text !== null) {
				for (let i = 0; i < node.text.length; i++, index++) {
					if (node.text[i] === "\n") {
						if (currentLine === line && currentColumn === column) {
							return true;
						}
						currentLine++;
						currentColumn = 0;
					} else {
						currentColumn++;
					}
					if (currentLine === line && currentColumn === column) {
						return true;
					}
				}
			} else {
				if (traverse(node.left)) return true;
				if (traverse(node.right)) return true;
			}
			return false;
		};

		if (!traverse(this.root)) {
			// If the position is beyond the text, return the last index
			return index;
		}

		return index;
	}

	public length(): number {
		return this.getLength(this.root);
	}

	public toString = (): string => {
		return this.toStringInternal(this.root);
	};

	public insert = (index: number, text: string): void => {
		this.insertInternal(this.root, index, text);
	};

	public substring = (startIndex: number, endIndex?: number): string => {
		// This could be more efficient by traversing the tree and only
		// accumulating the relevant nodes?
		return this.toString().substring(startIndex, endIndex);
	};

	public replace = (textToReplace: string, value: string): void => {
		this.replaceInternal(this.root, textToReplace, value);
	};

	public getLines(): string[] {
		const fullText = this.toString();
		return fullText.split("\n");
	}
}
