// TODO add tests

class Counter {
    #map = new Map();

    get(key) {
        if (this.#map.has(key)) {
            this.#map.get(key)
        } else {
            0
        }
    }

     // TODO add
}