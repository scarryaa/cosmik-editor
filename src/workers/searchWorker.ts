let documents = [];

self.onmessage = (e) => {
    const { type, payload } = e.data;
    switch (type) {
        case "INDEX":
            documents = payload;
            break;
        case "SEARCH":
            const term = payload.trim().toLowerCase();
            const results = searchDocuments(term);
            results.sort((a, b) => b.score - a.score);
            self.postMessage(results);
            break;
    }
};

function searchDocuments(term) {
    const results = [];

    documents.forEach(doc => {
        const content = doc.content.toLowerCase();
        const path = doc.path;
        const matches = [];
        let index = content.indexOf(term);

        while (index !== -1) {
            const start = Math.max(0, index - 30);
            const end = Math.min(content.length, index + term.length + 30);
            const context = doc.content.substring(start, end);
            matches.push({ index, context });
            index = content.indexOf(term, index + 1);
        }

        if (matches.length > 0) {
            results.push({
                ref: path,
                score: matches.length,
                matchData: { term, matches }
            });
        }
    });

    return results;
}
