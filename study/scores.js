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