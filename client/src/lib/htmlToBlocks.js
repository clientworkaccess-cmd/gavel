export default function htmlToBlocks(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const blocks = [];

    doc.body.childNodes.forEach((node) => {
        if (node.nodeType !== 1) return;

        if (node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3") {
            blocks.push({
                type: "header",
                data: {
                    text: node.innerHTML,
                    level: Number(node.tagName.replace("H", "")),
                },
            });
        }

        if (node.tagName === "P") {
            blocks.push({
                type: "paragraph",
                data: { text: node.innerHTML },
            });
        }

        if (node.tagName === "UL") {
            const items = [...node.querySelectorAll("li")].map((li) => li.innerHTML);
            blocks.push({
                type: "list",
                data: { style: "unordered", items },
            });
        }

        if (node.tagName === "OL") {
            const items = [...node.querySelectorAll("li")].map((li) => li.innerHTML);
            blocks.push({
                type: "list",
                data: { style: "ordered", items },
            });
        }
    });

    return { blocks };
}
