import { createSignal } from "solid-js";

export enum Languages {
	Ada = "Ada",
	Agda = "Agda",
	Apex = "Apex",
	ApexCode = "ApexCode",
	AWSEventRule = "AWSEventRule",
	Bash = "Bash",
	Beancount = "Beancount",
	CapnProto = "CapnProto",
	C = "C",
	CPP = "C++",
	CSharp = "CSharp",
	CEL = "CEL",
	Clojure = "Clojure",
	CMake = "CMake",
	COBOL = "COBOL",
	CommonLisp = "CommonLisp",
	CSS = "CSS",
	CUDA = "CUDA",
	Dart = "Dart",
	D = "D",
	Dockerfile = "Dockerfile",
	DOT = "DOT",
	Elixir = "Elixir",
	Elm = "Elm",
	EmacsLisp = "EmacsLisp",
	Eno = "Eno",
	ERBEJS = "ERBEJS",
	Erlang = "Erlang",
	Fennel = "Fennel",
	Fish = "Fish",
	Formula = "Formula",
	Fortran = "Fortran",
	gitattributes = "gitattributes",
	gitignore = "gitignore",
	Gleam = "Gleam",
	GLSL = "GLSL",
	Go = "Go",
	GoMod = "GoMod",
	GoWork = "GoWork",
	GraphQL = "GraphQL",
	Hack = "Hack",
	Haskell = "Haskell",
	HCL = "HCL",
	HTML = "HTML",
	ISPC = "ISPC",
	Java = "Java",
	JavaScript = "JavaScript",
	jq = "jq",
	JSON = "JSON",
	JSON5 = "JSON5",
	Julia = "Julia",
	Just = "Just",
	Kotlin = "Kotlin",
	LALRPOP = "LALRPOP",
	LaTeX = "LaTeX",
	Lean = "Lean",
	LLVM = "LLVM",
	LLVMMachineIR = "LLVMMachineIR",
	LLVMMLIR = "LLVMMLIR",
	LLVMTableGen = "LLVMTableGen",
	Lua = "Lua",
	Magik = "Magik",
	Make = "Make",
	Markdown = "Markdown",
	Meson = "Meson",
	Motorola68000Assembly = "Motorola68000Assembly",
	NGINX = "NGINX",
	Nim = "Nim",
	Nix = "Nix",
	Noir = "Noir",
	ObjectiveC = "ObjectiveC",
	OCaml = "OCaml",
	Odin = "Odin",
	Ohm = "Ohm",
	Org = "Org",
	P4 = "P4",
	Pascal = "Pascal",
	Perl = "Perl",
	PerlPOD = "PerlPOD",
	PHP = "PHP",
	Plaintext = "Plaintext",
	PortableGameNotation = "PortableGameNotation",
	PowerShell = "PowerShell",
	ProtocolBuffers = "ProtocolBuffers",
	Python = "Python",
	QML = "QML",
	QuakeC = "QuakeC",
	Racket = "Racket",
	Rasi = "Rasi",
	re2c = "re2c",
	Regex = "Regex",
	Rego = "Rego",
	reStructuredText = "reStructuredText",
	R = "R",
	Robot = "Robot",
	Ruby = "Ruby",
	Rust = "Rust",
	Scala = "Scala",
	Scheme = "Scheme",
	SCSS = "SCSS",
	SExpressions = "SExpressions",
	Smali = "Smali",
	SourcePawn = "SourcePawn",
	SPARQL = "SPARQL",
	SQLBigQuery = "SQLBigQuery",
	SQLGeneral = "SQLGeneral",
	SQLPostgreSQL = "SQLPostgreSQL",
	SQLSQLite = "SQLSQLite",
	SSH = "SSH",
	Supercollider = "Supercollider",
	Svelte = "Svelte",
	Swift = "Swift",
	SystemRDL = "SystemRDL",
	Tact = "Tact",
	Thrift = "Thrift",
	TODOComments = "TODOComments",
	TOML = "TOML",
	TreeSitterQuery = "TreeSitterQuery",
	Turtle = "Turtle",
	Twig = "Twig",
	TypeScript = "TypeScript",
	TypeScriptTSX = "TypeScriptTSX",
	Ungrammar = "Ungrammar",
	USD = "USD",
	Verilog = "Verilog",
	VHDL = "VHDL",
	Vue = "Vue",
	Wasm = "Wasm",
	WDL = "WDL",
	WGSL = "WGSL",
	YAML = "YAML",
	YANG = "YANG",
	Yuck = "Yuck",
	Zig = "Zig",
}

export const [selectedLanguage, setSelectedLanguage] = createSignal(
	Languages.Plaintext,
);
