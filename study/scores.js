/**
 * Shared functions for scoring submissions
 * and manipulating and displaying results.
 */

/**
 * @typedef {Object} Result
 * @property {number} correct
 * @property {number} total
 * 
 * @typedef {Object} RecordRow
 * @property {string} letter
 * @property {number} correct
 * @property {number} portion
 * @property {number} lowerBound
 * @property {number} upperBound
 * 
 * @typedef {Object} ResultTable
 * @property {number} correct
 * @property {number} portion
 * @property {number} lowerBound
 * @property {number} upperBound
 * @property {Array<RecordRow>} records
 */

/**
 * 
 * @param {Map<string, Result>} result 
 * @returns {ResultTable}
 */
function buildResultTable(result) {
    let totalTotal = 0;
    let totalCorrect = 0;
    let records = [];
    for (let [letter, rec] of result) {
        totalTotal += rec.total;
        totalCorrect += rec.correct;
        records.push({
            "letter": letter,
            "correct" : rec.correct,
            "total": rec.total,
            "portion": rec.correct / rec.total,
            "lowerBound": Stats.lowerBound(rec.correct, rec.total),
            "upperBound": Stats.upperBound(rec.correct, rec.total)
        })
    }
    records.sort((r1, r2) => r1.lowerBound - r2.lowerBound)
    return {
        "correct" : totalCorrect,
        "total": totalTotal,
        "portion": totalCorrect / totalTotal,
        "lowerBound": Stats.lowerBound(totalCorrect, totalTotal),
        "upperBound": Stats.upperBound(totalCorrect, totalTotal),
        "records": records
    };
}

/**
 * 
 * @param {string} expected 
 * @param {string} actual 
 * @param {string} alphabet 
 * @returns {Map<string, Record>}
 */
function calculateResults(expected, actual, alphabet) {
    let base = expected;
    let changed = actual;

    // use the diff algorithm to create a diff
    let diffs = (new diff_match_patch).diff_main(base, changed);

    // set the counters to 0 for the whole alphabet
    // TODO should not have to do this
    let correct = new Counter();
    let incorrect = new Counter();
    for (let i = 0; i < alphabet.length; i++) {
        correct.addN(alphabet.charAt(i), 0);
        incorrect.addN(alphabet.charAt(i), 0);
    }
   
    // use the diff to calculate correct and incorrect letters
    // we ignore space characters
    for (let diff of diffs) {
        let isCorrect = (diff[0] === 0);
        let letters = diff[1];
        for (let i = 0; i < letters.length; i++) {
            let letter = letters.charAt(i);
            if (letter !== " ") {
                if (isCorrect) {
                    correct.add(letter);
                } else {
                    incorrect.add(letter);
                }
            }
        }
    }

    // build a result map from the the correct/incorrect count
    let result = new Map();
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet.charAt(i);
        let info = {
            "correct": correct.get(letter),
            "total": correct.get(letter) + incorrect.get(letter)
        };
        result.set(letter, info)
    }

    return result;
}