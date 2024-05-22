async function getLanguageModule(extension: string) {
    switch (extension) {
      case "ts":
        return (await import("tree-sitter-typescript")).typescript;
      case "tsx":
        return (await import("tree-sitter-typescript")).tsx;
      case "js":
          return (await import("tree-sitter-javascript")).language;
      case "jsx":
        return (await import("tree-sitter-javascript")).language;
      default:
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }