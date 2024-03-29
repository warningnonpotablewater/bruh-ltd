// Yes, this filename and location are confusing, but it has to be this way.
// Trust me.

import {Ring as Bruh} from "../0000-ring/libwebring/main.js";

async function main() {
    const hint = getHint();

    const ring = await Bruh.fetch(
        "https://bruh.ltd/0000-ring/data/ring.json",
        hint
    );

    ring.install();
}

function getHint() {
    const hintElement = document.querySelector("[data-bruh-hint]");

    if (hintElement) {
        return hintElement.getAttribute("data-bruh-hint");
    }
}

main();

// Stuff for compatibility with libwebring 1.0.

export class Ring {
    constructor() {}
    async fetch() {}
    install() {}
}
