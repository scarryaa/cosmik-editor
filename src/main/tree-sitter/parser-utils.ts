import Parser from "tree-sitter";
import bash from "tree-sitter-bash";
import c from "tree-sitter-c";
import csharp from "tree-sitter-c-sharp";
import commonlisp from "tree-sitter-commonlisp";
import cpp from "tree-sitter-cpp";
import cuda from "tree-sitter-cuda";
import glsl from "tree-sitter-glsl";
import go from "tree-sitter-go";
import haskell from "tree-sitter-haskell";
import html from "tree-sitter-html";
import java from "tree-sitter-java";
import javascript from "tree-sitter-javascript";
import json from "tree-sitter-json";
import ocaml from "tree-sitter-ocaml";
import odin from "tree-sitter-odin";
import php from "tree-sitter-php";
import python from "tree-sitter-python";
import regex from "tree-sitter-regex";
import ruby from "tree-sitter-ruby";
import rust from "tree-sitter-rust";
import typescript from "tree-sitter-typescript";

const parser = new Parser();

function setLanguageByExtension(filePath: string) {
	const extension = filePath.split(".").pop()?.toLowerCase();

	switch (extension) {
		case "sh":
			parser.setLanguage(bash);
			return "bash";
		case "c":
			parser.setLanguage(c);
			return "c";
		case "cpp":
		case "cxx":
		case "cc":
		case "h":
		case "hpp":
			parser.setLanguage(cpp);
			return "cpp";
		case "cs":
			parser.setLanguage(csharp);
			return "csharp";
		case "lisp":
		case "lsp":
			parser.setLanguage(commonlisp);
			return "commonlisp";
		case "cu":
			parser.setLanguage(cuda);
			return "cuda";
		case "glsl":
		case "vert":
		case "frag":
			parser.setLanguage(glsl);
			return "glsl";
		case "go":
			parser.setLanguage(go);
			return "go";
		case "hs":
			parser.setLanguage(haskell);
			return "haskell";
		case "html":
		case "htm":
			parser.setLanguage(html);
			return "html";
		case "java":
			parser.setLanguage(java);
			return "java";
		case "js":
		case "jsx":
			parser.setLanguage(javascript);
			return "javascript";
		case "json":
			parser.setLanguage(json);
			return "json";
		case "ml":
		case "mli":
			parser.setLanguage(ocaml);
			return "ocaml";
		case "odin":
			parser.setLanguage(odin);
			return "odin";
		case "php":
			parser.setLanguage(php);
			return "php";
		case "py":
		case "pyc":
		case "pyd":
		case "pyo":
		case "pyw":
			parser.setLanguage(python);
			return "python";
		case "re":
			parser.setLanguage(regex);
			return "regex";
		case "rb":
			parser.setLanguage(ruby);
			return "ruby";
		case "rs":
			parser.setLanguage(rust);
			return "rust";
		case "ts":
		case "tsx":
			parser.setLanguage(typescript.typescript);
			return "typescript";
		default:
			if (parser.getLanguage() === null) return;
      
			console.warn(`Unsupported file extension: ${extension}`);
			parser.setLanguage(null);
			return "plaintext";
	}
}

const setLanguageManually = (language: string) => {
	switch (language) {
		case "Bash":
			parser.setLanguage(bash);
			break;
		case "C":
			parser.setLanguage(c);
			break;
		case "CPP":
			parser.setLanguage(cpp);
			break;
		case "CSharp":
			parser.setLanguage(csharp);
			break;
		case "CommonLisp":
			parser.setLanguage(commonlisp);
			break;
		case "CUDA":
			parser.setLanguage(cuda);
			break;
		case "GLSL":
			parser.setLanguage(glsl);
			break;
		case "Go":
			parser.setLanguage(go);
			break;
		case "Haskell":
			parser.setLanguage(haskell);
			break;
		case "HTML":
			parser.setLanguage(html);
			break;
		case "Java":
			parser.setLanguage(java);
			break;
		case "JavaScript":
			parser.setLanguage(javascript);
			break;
		case "JSON":
			parser.setLanguage(json);
			break;
		case "OCaml":
			parser.setLanguage(ocaml);
			break;
		case "Odin":
			parser.setLanguage(odin);
			break;
		case "PHP":
			parser.setLanguage(php);
			break;
		case "Python":
			parser.setLanguage(python);
			break;
		case "Regex":
			parser.setLanguage(regex);
			break;
		case "Ruby":
			parser.setLanguage(ruby);
			break;
		case "Rust":
			parser.setLanguage(rust);
			break;
		case "TypeScript":
			parser.setLanguage(typescript.typescript);
			break;
		case "Plaintext":
			if (parser.getLanguage() === null) break;
			parser.setLanguage(null);
			break;
		default:
			if (parser.getLanguage() === null) break;
			console.warn(`Unsupported language: ${language}`);
			parser.setLanguage(null);
			break;
	}
};


function serializeNode(node: any) {
	return {
		type: node.type,
		startIndex: node.startIndex,
		endIndex: node.endIndex,
		isNamed: node.isNamed,
		children: node.children.map(serializeNode),
		text: node.text ? node.text.toString() : null,
	};
}

export { parser, setLanguageByExtension, serializeNode, setLanguageManually };
