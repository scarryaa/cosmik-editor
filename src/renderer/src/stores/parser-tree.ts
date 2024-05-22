import { createSignal } from "solid-js";
import type { SyntaxNode } from "web-tree-sitter";

const [parserTree, setParserTree] = createSignal<SyntaxNode>({} as SyntaxNode);

export { parserTree, setParserTree };
