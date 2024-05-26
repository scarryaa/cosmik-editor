import lunr from "lunr";

let index;

self.onmessage = (e) => {
    const { type, payload } = e.data;
    switch (type) {
        case "INDEX":
            index = lunr(function () {
                this.field("content");
                this.ref("path");
                payload.forEach((doc) => {
                    this.add(doc);
                });
            });
            break;
        case "SEARCH":
            if (index) {
                const results = index.search(payload);
                self.postMessage(results);
            }
            break;
    }
};
