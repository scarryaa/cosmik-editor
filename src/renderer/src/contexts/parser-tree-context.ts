import { type Accessor, createContext, useContext } from "solid-js";
import type Parser from "tree-sitter";

export const ParserTreeContext = createContext<Accessor<Parser.SyntaxNode>>();

export const useParserTree = () => {
	const context = useContext(ParserTreeContext);
	if (context === undefined) {
		throw new Error(
			"useParserTree must be used within a ParserTreeContext.Provider",
		);
	}
	return context;
};
