function runTests() {
    test("empty counter always 0", () => {
        let c = new Counter();
        assert(c.get("a") === 0);
    });

    test("adding one sets to 1", () => {
        let c = new Counter();
        c.add("a");
        assert(c.get("a") === 1);
    })

    test("adding one does not change others", () => {
        let c = new Counter();
        c.add("a");
        assert(c.get("b") === 0);
    })

    test("adding three times sets to 3", () => {
        let c = new Counter();
        c.add("a");
        c.add("a");
        c.add("a");
        assert(c.get("a") === 3);
    })

    test("adding 3 sets to 3", () => {
        let c = new Counter();
        c.addN("a", 3);
        assert(c.get("a") === 3);
    })

    test("getOrElse present", () => {
        let m = new Map();
        m.set("a", 123);
        assert(MapOps.getOrElse(m, "a", 456) === 123);
    })

    test("getOrElse absert", () => {
        let m = new Map();
        m.set("a", 123);
        assert(MapOps.getOrElse(m, "b", 456) === 456);
    })
}