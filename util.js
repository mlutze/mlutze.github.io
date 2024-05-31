// TODO add tests

class Counter {
    #map = new Map();

    get(key) {
        if (this.#map.has(key)) {
            return this.#map.get(key);
        } else {
            return 0;
        }
    }

    add(key) {
        let current;
        if (this.#map.has(key)) {
            current = this.#map.get(key);
        } else {
            current = 0;
        }
        this.#map.set(key, current + 1);
    }
}