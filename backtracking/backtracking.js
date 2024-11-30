/**
 * 
 *      Backtracking
 * 
 *      1. Letter Combinations of a Phone Number
 *      2. Generate Combinations
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
            combo = "";
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


/**
 * 
 *      Generate combinitation of k integers in range n 
 *      
 *      Example:
 *      n = 5, k = 3
 *      Output: [[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]]
 * 
 *     
 */
const combinations = (n, k) => {
    // edge cases
    if (k > n) return [];
    if (k === 1) return new Array.from({ length: n}, (_, i) => [i + 1]);

    const combos = [];

    // recursively create combos
    const inner = (start = 1, currCombo = []) => {
        // base case
        if (currCombo.length === k) {
            combos.push([...currCombo]);
            return;
        }

        // recursive cases
        for (let i = start; i <= n; i++) { // digits of n
            currCombo.push(i); // add i to currCombo
            inner(i + 1, currCombo); // recurse on next digit
            currCombo.pop(); // backtrack by removing last digit
        }
    }
    inner(1, []);

    return combos;
}

console.log("\n2. Generate Combinations");
process.stdout.write("TEST CASE 1: ");
const res2a = combinations(5, 3);
if (JSON.stringify(res2a) === JSON.stringify([
    [ 1, 2, 3 ], [ 1, 2, 4 ],
    [ 1, 2, 5 ], [ 1, 3, 4 ],
    [ 1, 3, 5 ], [ 1, 4, 5 ],
    [ 2, 3, 4 ], [ 2, 3, 5 ],
    [ 2, 4, 5 ], [ 3, 4, 5 ]
  ])) { 
    console.log("PASSED");
  } else {
    console.log("FAILED");
  }