import Parser from "tree-sitter";
import typescript from "tree-sitter-typescript";

const parser = new Parser();
parser.setLanguage(typescript.typescript);

export default parser;
