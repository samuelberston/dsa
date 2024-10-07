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
console.log(checkInclusion(string1, string2)); // true
console.log(checkInclusion(string1, "abcbacb")); // false

/**
 *      Minimum Penalty for a Shop
 */

/**
 *      Maximum number of vowels for substring of given length
 * Given a string and a given length k, calculate the max number of vowels for substring of length k 
 */
const maxVowels = (s, k) => {
    // Step 1: get initial vowel count
    const vowels = {
        "a": true,
        "e": true,
        "i": true,
        "o": true,
        "u": true
    };
    let currCount = 0;

    for (let i = 0; i < k; i++) {
        if (vowels[s[i]]) {
            currCount++;
        }
    }

    // Step 2: use two pointers to traverse s with a window of length k. Check for new/lost vowels and track vowel count
    let p1 = 0;
    let p2 = k - 1;
    let maxCount = currCount;
    while (p2 < s.length) { // within bounds of input string
        // update pointers and check if gaining/losing a vowel
        p1++;
        p2++;
        if (vowels[s[p1 - 1]]) { // lost a vowel
            currCount--;
        }
        if (vowels[s[p2]]) { // gained a vowel
            currCount++;
        }
        // check for max count
        if (currCount > maxCount) {
            maxCount = currCount;
        }
    }
    
    // Step 3: return max vowel count
    return maxCount;
};

// Max Vowels in substring of given length - driver code
console.log("\n3. Max Vowels in Substring of Length K");
console.log(maxVowels("babadoobee", 5)); // 4
console.log(maxVowels("babadoobee", 4)); // 3
console.log(maxVowels("babadoobee", 2)); // 2

/**
 *      Longest Substring Without Repeating Characters
 */
const longestSubstring = (s) => {
    // edge case: string has zero or one character
    if (s.length == 0 || s.length == 1) {
        return s.length;
    }
    let max = 1;
    let substr = s[0];

    for (let i = 1; i < s.length; i++) {
        // check is substring contains duplicates
        if (!substr.includes(s[i])) {
            // concatenate the new char to the subtr
            substr = substr.concat(s[i])
            max = Math.max(max, substr.length)
        } else if (substr.length > 1) {
            substr = substr.slice(substr.indexOf(s[i]) + 1)
            substr = substr.concat(s[i])
        }
    }
    return max;
};   

// Longest substring without repeating characters - driver code
console.log("\n4. Longest Substring Without Repeating Characters");
console.log(longestSubstring("abcdaeba")); // 5
console.log(longestSubstring("abcdtghyu")); // 9
