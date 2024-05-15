type Piece = {
	buffer: "original" | "add";
	start: number;
	length: number;
};

export class PieceTable {
	originalBuffer: string;
	addBuffer: string;
	table: Piece[];
	cachedLength: number | null = null;

	constructor(text: string) {
		this.originalBuffer = text;
		this.addBuffer = "";
		this.table = [{ buffer: "original", start: 0, length: text.length }];
		this.cachedLength = text.length;
	}

	extractText(startIndex: number, endIndex: number): string {
		let result = "";
		let currentPos = 0; // Track the position in the full text

		for (const piece of this.table) {
			const buffer =
				piece.buffer === "original" ? this.originalBuffer : this.addBuffer;
			const pieceStart = currentPos;
			const pieceEnd = currentPos + piece.length;

			// Check if this piece overlaps with the desired range
			if (pieceEnd > startIndex && pieceStart < endIndex) {
				// Calculate the part of the piece that is within the desired range
				const start = Math.max(startIndex, pieceStart);
				const end = Math.min(endIndex, pieceEnd);
				result += buffer.substring(
					piece.start + (start - pieceStart),
					piece.start + (end - pieceStart),
				);
			}

			currentPos += piece.length; // Move the current position forward

			// Early exit if we've passed the end of the desired range
			if (currentPos >= endIndex) break;
		}

		return result;
	}

	updateCachedLength() {
		let length = 0;
		for (const piece of this.table) {
			length += piece.length;
		}
		this.cachedLength = length;
	}

	insert(text: string, index: number) {
		// Add text to the add buffer
		this.addBuffer += text;
		const newPiece: Piece = {
			buffer: "add",
			start: this.addBuffer.length - text.length,
			length: text.length,
		};

		// Find the correct position in the piece table to insert the new piece
		let offset = 0;
		for (let i = 0; i < this.table.length; i++) {
			const piece = this.table[i];
			const pieceEnd = offset + piece.length;

			if (index <= pieceEnd) {
				const remainderLength = pieceEnd - index;
				piece.length -= remainderLength;
				this.table.splice(i + 1, 0, newPiece, {
					buffer: piece.buffer,
					start: piece.start + piece.length,
					length: remainderLength,
				});
				break;
			}
			offset += piece.length;
		}

		this.updateCachedLength();
	}

	length() {
		if (this.cachedLength !== null) {
			return this.cachedLength;
		}

		this.updateCachedLength();
		return this.cachedLength;
	}

	restoreText(newText: string): void {
		// Clear current table and buffers, resetting to the new text
		this.originalBuffer = newText;
		this.addBuffer = "";
		this.table = [{ buffer: "original", start: 0, length: newText.length }];
		this.updateCachedLength();
	}

	delete(startIndex: number, length: number) {
		let offset = 0;
		let index = 0;
		let newLength = length;

		while (index < this.table.length && newLength > 0) {
			const piece = this.table[index];
			const pieceEnd = offset + piece.length;

			if (pieceEnd > startIndex) {
				const deleteFrom = Math.max(startIndex - offset, 0);
				const deleteTo = Math.min(pieceEnd, startIndex + newLength) - offset;

				if (deleteFrom === 0 && deleteTo === piece.length) {
					// Delete the whole piece
					this.table.splice(index, 1);
					index--; // Adjust index to stay at the current position after splice
				} else if (deleteFrom === 0) {
					// Adjust start and length of the current piece
					piece.start += deleteTo;
					piece.length -= deleteTo;
				} else if (deleteTo === piece.length) {
					// Adjust the length of the piece
					piece.length = deleteFrom;
				} else {
					// Split the piece into two, removing the middle part
					const newPiece = {
						buffer: piece.buffer,
						start: piece.start + deleteTo,
						length: piece.length - deleteTo,
					};
					piece.length = deleteFrom;
					this.table.splice(index + 1, 0, newPiece);
				}
				newLength -= deleteTo - deleteFrom;
			}
			offset += piece.length;
			index++;
		}

		this.updateCachedLength();
	}

	getText(): string {
		let text = "";
		for (const piece of this.table) {
			const buffer =
				piece.buffer === "original" ? this.originalBuffer : this.addBuffer;
			text += buffer.substring(piece.start, piece.start + piece.length);
		}
		return text;
	}
}
