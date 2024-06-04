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
        this.addN(key, 1)
    }

    addN(key, n) {
        let current;
        if (this.#map.has(key)) {
            current = this.#map.get(key);
        } else {
            current = 0;
        }
        this.#map.set(key, current + n);
    }

    // @deprecated
    getMap() {
        return this.#map
    }
}

class Stats {

    // Returns a 95% confidence interval for the true success rate.
    // Uses the Agresti-Coull method
    static getBounds(successes, total) {
        let n_s = successes;
        let n = total;
        let z_a = 1.96;
        let n_bar = n + z_a * z_a;
        let p_bar = (1 / n_bar) * (n_s + (z_a * z_a) / 2)
        let range = z_a * Math.sqrt((p_bar * (1 - p_bar)) / n_bar);
        return {
            lower: p_bar - range,
            upper: p_bar + range
        };
    }

    // Returns the "confidence level" for the given success rate.
    static confidence(successes, total) {
        let lowerBound = null;
        if (total === 0) {
            lowerBound = 0;
        } else {
            lowerBound = Math.max(this.getBounds(successes, total).lower, 0);
        }
        return lowerBound;
    }
}