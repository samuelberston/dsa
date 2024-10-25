/**
 * 
 *      Backtracking
 * 
 *      1. Letter Combinations of a Phone Number
 */

/**
 *      1. Letter Combinations of a Phone Number
 * 
 * @param {number} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
    if (!digits.length) { return []; }
    // Step 1: Create numbers to letters map
    const map = new Map();
    map.set(2, ["a", "b", "c"]);
    map.set(3, ["d", "e", "f"]);
    map.set(4, ["g", "h", "i"]);
    map.set(5, ["j", "k", "l"]);
    map.set(6, ["m", "n", "o", "p"]);
    map.set(7, ["p", "q", "r", "s"]);
    map.set(8, ["t", "u", "v"]);
    map.set(9, ["w", "x", "y", "z"]);

    // Step 2: recursively build each possible solution
    const combos = [];
    let p = 0; // first digit
    digits = digits.split("");

    const inner = (digits, p, combo, combos) => {
        // base case
        if (p > digits.length - 1) {
            combos.push(combo);
            combo = ""; // ?
            return;
        }
        // recursive case
        for (const char of map.get(parseInt(digits[p]))) {
            inner(digits, p + 1, combo + char, combos);
        }
    }
    inner(digits, 0, "", combos);

    return combos;
};

console.log("\n1. Letter Combinations of a Phone Number");

process.stdout.write("TEST CASE 1: ");
const digits1 = "23"; // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
const combos1 = letterCombinations(digits1);
if (JSON.stringify(combos1) === JSON.stringify(["ad","ae","af","bd","be","bf","cd","ce","cf"])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

process.stdout.write("TEST CASE 2: ");
const digits2 = "587"; 
const combos2 = letterCombinations(digits2);
if (JSON.stringify(combos2) === JSON.stringify([
    'jtp', 'jtq', 'jtr', 'jts', 'jup',
    'juq', 'jur', 'jus', 'jvp', 'jvq',
    'jvr', 'jvs', 'ktp', 'ktq', 'ktr',
    'kts', 'kup', 'kuq', 'kur', 'kus',
    'kvp', 'kvq', 'kvr', 'kvs', 'ltp',
    'ltq', 'ltr', 'lts', 'lup', 'luq',
    'lur', 'lus', 'lvp', 'lvq', 'lvr',
    'lvs'
  ])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}
