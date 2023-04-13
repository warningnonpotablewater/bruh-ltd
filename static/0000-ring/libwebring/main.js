/** Ring member in relation to its neighbors. */
export class Site {
    /** @internal */
    constructor(
    /** Data of the member. */
    data) {
        this.data = data;
    }
    /**
     * Installs the URL of the member on an anchor element.
     *
     * @param element - Anchor element to be modified.
     */
    install(element) {
        if (!element.innerHTML) {
            element.innerText = this.data.name ?? this.data.url;
        }
        element.href = this.data.url;
    }
}
/** Circular chain of websites. */
export class Ring {
    /**
     * Random member of the ring. Guaranteed to not be the same as the current.
     */
    get random() {
        while (true) {
            const index = Math.floor(Math.random() * this._sites.length);
            const site = this._sites[index];
            if (site != this.current) {
                return site;
            }
        }
    }
    /** @internal */
    constructor(root, hint) {
        this._sites = [];
        if (!Array.isArray(root)) {
            throw new TypeError("Root element of a webring must be an array");
        }
        if (root.length < 2) {
            throw new TypeError("Webring must contain at least 2 sites");
        }
        const sites = root.map(data => new Site(data));
        this._chainReal(sites);
        this._chainEffective(sites);
        this._sites = sites;
        const lastIndex = this._sites.length - 1;
        this.first = this._sites[0];
        this.last = this._sites[lastIndex];
        const current = this._sites.find(site => site.data.url == hint);
        if (!current) {
            throw new TypeError("Current website isn't present in the webring");
        }
        this.current = current;
    }
    _chainReal(sites) {
        for (let i = 0; i < sites.length; i++) {
            const lastIndex = sites.length - 1;
            const isFirst = i == 0;
            const isLast = i == lastIndex;
            const previousIndex = isFirst ? lastIndex : i - 1;
            const nextIndex = isLast ? 0 : i + 1;
            const site = sites[i];
            const realPrevious = sites[previousIndex];
            const realNext = sites[nextIndex];
            site.realPrevious = realPrevious;
            site.realNext = realNext;
        }
    }
    _chainEffective(sites) {
        const sameDirection = (direction) => sites.every(site => site.data.direction == direction);
        const notTraversable = sameDirection("forward") ||
            sameDirection("backward");
        if (notTraversable) {
            throw new TypeError("Webring can't be traversed in one of the directions");
        }
        for (const site of sites) {
            let previous = site;
            let next = site;
            do {
                previous = previous.realPrevious;
            } while (previous.data.direction == "forward");
            do {
                next = next.realNext;
            } while (next.data.direction == "backward");
            site.previous = previous;
            site.next = next;
        }
    }
    /**
     * Creates a ring from a remote JSON file.
     *
     * @param url - URL of the JSON file.
     * @param hint - URL of the page, on which the library is used.
     *
     * @returns A ring object.
     * @throws TypeError
     * If the ring is malformed.
     */
    static async fetch(url, hint) {
        const response = await fetch(url);
        const json = await response.json();
        const guessedHint = hint ?? location.href;
        return new Ring(json, guessedHint);
    }
    /**
     * Does {@link Site#install} for the links with the following DOM IDs:
     *
     * - lwr-first
     * - lwr-current
     * - lwr-last
     * - lwr-random
     * - lwr-prev
     * - lwr-next
     */
    install() {
        const links = {
            "first": this.first,
            "current": this.current,
            "last": this.last,
            "random": this.random,
            "prev": this.current.previous,
            "next": this.current.next
        };
        for (const link of Object.entries(links)) {
            this._installLink(...link);
        }
    }
    _installLink(id, site) {
        const element = document.querySelector(`a#lwr-${id}`);
        if (element) {
            site.install(element);
        }
    }
    /** Iterates over actual members of the ring. */
    *[Symbol.iterator]() {
        for (const site of this._sites) {
            yield site;
        }
    }
}
