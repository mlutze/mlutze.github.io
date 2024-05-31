function runTests() {
    test("empty counter always 0", () => {
        let c = new Counter();
        assert(c.get("a") === 0);
        assert(c.get("b") === 0);
    });

}