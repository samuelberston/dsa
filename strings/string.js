/**
 *      String algorithm problems
 * 1. Zig Zag Pattern
 */


/**
 *      Zig Zag String Pattern
 * Given a string and a number of rows n, return the new string character order based on
 * sorting that string i a zig zag pattern with given number of rows.
 * For example:
 * string = "PHILOMENDRALOVE", rows = 4
 * 
 * P     E    O
 * H   M N  L V
 * I O   D A  E
 * L     R
 * 
 * returns: "PEOHMNLVIODAELR"
 * 
 */
const zigZag = (string, n) => {
    // edge cases: 
    // Step 1: Create an empty matrix of size n. The columns don't matter, since we will read in row order
    const zigzag = Array.from({ length: n }).map(() => []);

    // Step 2: iterate the string, tracing the matrix in zig zag patttern
    let goingDown = true;
    let row = 0; // starting row
    for (let i = 0; i < string.length; i++) {
        // fill in zigzag at row
        zigzag[row].push(string[i]);

        // check to switch directions
        if (row == n - 1) { // hit bottom row, go up
            goingDown = false;
        }
        if (row == 0) { // hit top row, descend
            goingDown = true;
        }

        // go up or down rows
        if (goingDown) {
            row++;
        } else {
            row--;
        }
    }

    // Step 3: return result string in row order
    return zigzag.flat().join("");
}

// Zig Zag driver code
console.log("\n1. Zig Zag Pattern");
const string = "philomendralove";
const n = 4;
console.log(zigZag(string, n));

/**
 *      Permutation in String
 * 
 *      Approach: use maps to represent char frequency. Use sliding window approach to traverse substring 2
 */
var checkInclusion = function(s1, s2) {
    // edge cases: 
    // if s1 is longer than s2, return false
    if (s1.length > s2.length) { return false; }
    // if s1 is one character, return s2.indexOf(s1) !== -1
    if (s1.length == 1) { return s2.indexOf(s1) !== -1; }

    // Step 1: create char frequency map generation function, apply to s1
    const getCharFreq = (string) => {
        const map = {}
        for (const char of string) {
            if (!map[char]) {
                map[char] = 1;
            } else {
                map[char]++;
            }
        }
        return map;
    };
    const map1 = getCharFreq(s1);

    // Step 2: create check permutation function, comparing two maps
    const checkPermutation = (map1, map2) => {
        for (const char of Object.keys(map1)) {
            if (map1[char] != map2[char]) { // check chars have the same frequency
                return false;
            }
        }
        return true; // all char frequencies match
    };

    // Step 3: traverse s2 using a two-pointer sliding window
    let p1 = 0;
    let p2 = s1.length - 1;

    let p2substring = s2.slice(p1, p2 + 1); // get p2 starting substring
    let map2 = getCharFreq(p2substring); // create map of char freq of starting p2

    while (p2 < s2.length && p2 - p1 == s1.length - 1) {
        // check map equality
        if (checkPermutation(map1, map2)) {
            return true;
        }

        // move sliding window
        p1++;
        p2++;

        // update map
        // add next char
        if (!map2[s2[p2]]) {
            map2[s2[p2]] = 1;
        } else {
            map2[s2[p2]]++;
        }


        // remove last first char
        if (map2[s2[p1 - 1]] == 1) {
            map2[s2[p1 - 1]] = null; // remove char
        } else {
            map2[s2[p1 - 1]] = map2[s2[p1 - 1]] - 1; // decrement char frequency
        }
    }


    return false; // exhausted search space and did not find permutation
};

// Permutation in String driver code
const string1 = "abb";
const string2 = "uajbabi";
console.log("\n2. Permutations in String");
console.log(checkInclusion(string1, string2));
console.log(checkInclusion(string1, "abcbacb"));



/**
 *      Minimum Penalty for a Shop
 */