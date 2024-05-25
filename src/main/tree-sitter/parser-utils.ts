import Parser from "tree-sitter";

const languageModules = {
	sh: () => import("tree-sitter-bash"),
	c: () => import("tree-sitter-c"),
	cpp: () => import("tree-sitter-cpp"),
	cxx: () => import("tree-sitter-cpp"),
	cc: () => import("tree-sitter-cpp"),
	h: () => import("tree-sitter-cpp"),
	hpp: () => import("tree-sitter-cpp"),
	cs: () => import("tree-sitter-c-sharp"),
	lisp: () => import("tree-sitter-commonlisp"),
	lsp: () => import("tree-sitter-commonlisp"),
	cu: () => import("tree-sitter-cuda"),
	glsl: () => import("tree-sitter-glsl"),
	vert: () => import("tree-sitter-glsl"),
	frag: () => import("tree-sitter-glsl"),
	go: () => import("tree-sitter-go"),
	hs: () => import("tree-sitter-haskell"),
	html: () => import("tree-sitter-html"),
	htm: () => import("tree-sitter-html"),
	java: () => import("tree-sitter-java"),
	js: () => import("tree-sitter-javascript"),
	jsx: () => import("tree-sitter-javascript"),
	json: () => import("tree-sitter-json"),
	ml: () => import("tree-sitter-ocaml"),
	mli: () => import("tree-sitter-ocaml"),
	odin: () => import("tree-sitter-odin"),
	php: () => import("tree-sitter-php"),
	py: () => import("tree-sitter-python"),
	pyc: () => import("tree-sitter-python"),
	pyd: () => import("tree-sitter-python"),
	pyo: () => import("tree-sitter-python"),
	pyw: () => import("tree-sitter-python"),
	re: () => import("tree-sitter-regex"),
	rb: () => import("tree-sitter-ruby"),
	rs: () => import("tree-sitter-rust"),
	scss: () => import("tree-sitter-scss"),
	css: () => import("tree-sitter-css"),
};

const parser = new Parser();

async function setLanguageByExtension(filePath: string): Promise<string> {
	const extension = filePath.split(".").pop()?.toLowerCase() ?? "";

	const typescriptModule = await import("tree-sitter-typescript");
	if (extension === "ts") {
		parser.setLanguage(typescriptModule.default.typescript);
		return extension;
	}

	if (extension === "tsx") {
		parser.setLanguage(typescriptModule.default.tsx);
		return extension;
	}

	if (languageModules[extension]) {
		const module = await languageModules[extension]();
		parser.setLanguage(module.default);
		return extension;
	}

	// If no extension or unsupported, treat as plaintext
	parser.reset();
	return "plaintext";
}

async function setLanguageManually(language: string) {
	const normalizedLanguage = language.toLowerCase();

	if (normalizedLanguage === "typescript") {
		const module = (await import("tree-sitter-typescript")).default.typescript;
		parser.setLanguage(module);
	} else if (normalizedLanguage === "tsx") {
		const module = (await import("tree-sitter-typescript")).default.tsx;
		parser.setLanguage(module);
	} else if (languageModules[normalizedLanguage]) {
		const module = await languageModules[normalizedLanguage]();
		parser.setLanguage(module.default);
	} else {
		console.warn(`Unsupported language: ${language}`);
		parser.reset();
	}
}

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
