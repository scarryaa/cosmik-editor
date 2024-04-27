    <script lang="ts">
        import { onMount, tick } from 'svelte';
        import { editorModel } from '../stores/editorModel';
        
        export let content = "";

        let editorElement: HTMLDivElement;
        const textWidthCache = new Map<string, number>();

        const placeCursorAtPosition = (lineNumber: number, charIndex = 0) => {
            const targetLineElement = editorElement.querySelector(`[data-line-number="${lineNumber}"]`);
            if (targetLineElement) {
                // Attempt to find a text node within the target line element
                let targetNode = Array.from(targetLineElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                let adjustedCharIndex = charIndex;
                const range = document.createRange();
                const selection = window.getSelection();

                tick().then(() => {
                    if (targetNode) {
                        // If a text node is found, adjust the char index to not exceed the node's length
                        adjustedCharIndex = Math.min(adjustedCharIndex, targetNode.textContent?.length ?? 0);
                        range.setStart(targetNode, adjustedCharIndex);
                    } else {
                        // If no text node is found, default to the start of the target line element
                        range.setStart(targetLineElement, 0);
                    }
                    range.collapse(true); // Collapse the range to the start, making it a single point
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                });
            }
        }

        const resetEditorContent = () => {
            if (editorElement.innerHTML.trim() === "") {
                editorModel.update(model => {
                    model.resetContent();
                    return model;
                })
                
                placeCursorInDiv(editorElement.firstChild as HTMLDivElement);
            }
        }

        const placeCursorInDiv = (divElement: HTMLDivElement) => {
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(divElement, 0);

            // Collapse the range to the start, making it a single point
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            let lineNumber = 0;
            let charIndex = 0;

            if (target.dataset.lineNumber) {
                // If the click is directly on a line
                lineNumber = Number(target.dataset.lineNumber);
                charIndex = calculateCharIndex(event, target);
                console.log("yep");
            } else {
                // If the click is not directly on a line, find the closest parent with a line number
                const lineElement = target.closest('[data-line-number]');
                if (lineElement) {
                    lineNumber = Number((lineElement as HTMLElement).dataset.lineNumber);
                    charIndex = calculateCharIndex(event, lineElement as HTMLElement);
                }
            }

            if (lineNumber > 0) {
                editorModel.update(model => {
                    model.cursor.moveCursor({ cursorBasis: charIndex, cursorCharacter: charIndex, cursorLine: lineNumber });
                    return model;
                })
                placeCursorAtPosition(lineNumber, charIndex);
            }
        };

        const measureTextWidth = (text: string, font: string): number => {
            const cacheKey = `${font}-${text}`;
            if (textWidthCache.has(cacheKey)) {
                // biome-ignore lint/style/noNonNullAssertion: We check if it has the key
                return textWidthCache.get(cacheKey)!;
            }

            // Create a temporary span element
            const element = document.createElement("span");
            element.textContent = text;
            element.style.font = font;
            element.style.whiteSpace = "pre";
            element.style.visibility = "hidden";
            document.body.appendChild(element);
            const width = element.offsetWidth;
            document.body.removeChild(element);

            // Cache the measured width
            textWidthCache.set(cacheKey, width);
            return width;
        };

        const calculateCharIndex = (event: MouseEvent, lineElement: HTMLElement): number => {
            const clickX = event.clientX;
            const lineStartX = lineElement.getBoundingClientRect().left;
            const clickPositionRelativeToLine = clickX - lineStartX;

            const lineText = lineElement.textContent || "";
            const fontStyling = window.getComputedStyle(lineElement).font;

            let closestCharIndex = 0;
            let smallestDifference = Number.POSITIVE_INFINITY;

            for (let i = 0; i <= lineText.length; i++) {
                const textUpToChar = lineText.slice(0, i);
                const measuredWidth = measureTextWidth(textUpToChar, fontStyling);

                const difference = Math.abs(clickPositionRelativeToLine - measuredWidth);
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    closestCharIndex = i;
                } else {
                    break;
                }
            }

            return closestCharIndex;
        };
        
        const handleArrowKey = (event: KeyboardEvent) => {
            event.preventDefault();

            switch (event.key) {
                case "ArrowLeft": {
                    const cursorPosition = $editorModel.cursor.position;
                    const previousLineExists = $editorModel.lineExists($editorModel.cursor.position.cursorLine - 1);

                    if (previousLineExists) {
                        // Subtract 2: one for the 0-based indexing, another to get the last line
                        $editorModel.cursor.moveCursorLeft($editorModel.lines[cursorPosition.cursorLine - 2].content.length);
                    } else {
                        $editorModel.cursor.moveCursorLeft();
                    }
                    break;
                }
                case "ArrowRight": {
                    const cursorPosition = $editorModel.cursor.position;
                    const currentLineLength = $editorModel.lines[cursorPosition.cursorLine - 1].content.length;

                    $editorModel.cursor.moveCursorRight(currentLineLength, $editorModel.lines.length);
                    break;
                }
                case "ArrowDown": {
                    const cursorPosition = $editorModel.cursor.position;
                    const nextLineLength = $editorModel.lines[cursorPosition.cursorLine]?.content?.length;

                    $editorModel.cursor.moveCursorDown(nextLineLength, $editorModel.lines.length);
                    break;
                }
                case "ArrowUp": {
                    const cursorPosition = $editorModel.cursor.position;
                    const previousLineLength = $editorModel.lines[cursorPosition.cursorLine - 2]?.content?.length;

                    $editorModel.cursor.moveCursorUp(previousLineLength)
                    break;
                }
                default:
                    return;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                editorModel.update(model => {
                    model.addLine(model.lines.length);
                    return model;
                });

                // Wait for the DOM to update
                tick().then(() => {
                    const lastElement = editorElement.lastChild;
                    if (lastElement) placeCursorInDiv(lastElement as HTMLDivElement);
                });
            } else if (event.key === "Backspace") {
                event.preventDefault();

                if (editorElement.children.length === 1 && editorElement.textContent?.trim() === "") {
                    resetEditorContent();
                } else {
                    editorModel.update(model => {
                        model.deleteCharacter($editorModel.cursor.position.cursorLine, $editorModel.cursor.position.cursorCharacter);
                        return model;
                    });
                }
            } else if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)) {
                handleArrowKey(event);
                placeCursorAtPosition($editorModel.cursor.position.cursorLine, $editorModel.cursor.position.cursorCharacter);
            } else if (event.key.length === 1) {
                event.preventDefault();
                editorModel.update(model => {
                    model.insertCharacter(event.key, $editorModel.cursor.position.cursorLine, $editorModel.cursor.position.cursorCharacter);
                    return model;
                });

                // Wait for the DOM to update after the model has been updated
                placeCursorAtPosition($editorModel.cursor.position.cursorLine, $editorModel.cursor.position.cursorCharacter + 1);
            }

            content = $editorModel.toHTML();
        };

        $: if (editorElement && $editorModel.cursor.position) {
            tick().then(() => {
                placeCursorAtPosition($editorModel.cursor.position.cursorLine, $editorModel.cursor.position.cursorCharacter);
            });
        }

        onMount(() => {
            resetEditorContent();
        });
    </script>

    <style lang="scss">
        .editor {
            padding-top: 5px;
            padding-left: 5px;
            flex-grow: 1;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: pre;
            outline: none;
            min-height: fit-content;
            padding-bottom: 93vh;

            :global([data-line-number]) {
                min-height: 20px;
                white-space: pre;
            }
        }
  </style>
  
  <div 
        class="editor" 
        contenteditable="true" 
        bind:this={editorElement} 
        bind:innerHTML={content} 
        on:keydown={handleKeyDown} 
        on:mousedown={handleMouseDown}
        tabindex="0" 
        role="textbox" 
        aria-multiline="true">
    </div>