import { createSignal } from "solid-js";
import type { SyntaxNode } from "tree-sitter";
import type Parser from "tree-sitter";

const [parserTree, setParserTree] = createSignal<SyntaxNode>({} as SyntaxNode);

export { parserTree, setParserTree };
