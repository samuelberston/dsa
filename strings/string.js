/**
 *      String algorithm problems
 * 1. Zig Zag Pattern
 * 2. Permutation in String
 * 3. Maximum Vowels in Substring
 * 4. Longest Substring without Repeating Characters
 * 5. String to Integer (atoi)
 * 6. Group Anagrams
 * 7. Merge Strings Alternately
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
    // edge cases
    if (s1.length > s2.length) return false;
    if (s1.length === 1) return s2.includes(s1);

    // Create frequency arrays (using arrays instead of objects for simpler comparison)
    const freq1 = new Array(26).fill(0);
    const freq2 = new Array(26).fill(0);
    
    // Fill initial window
    for (let i = 0; i < s1.length; i++) {
        freq1[s1[i].charCodeAt(0) - 97]++;
        freq2[s2[i].charCodeAt(0) - 97]++;
    }

    // Slide window through s2
    for (let i = 0; i < s2.length - s1.length; i++) {
        if (freq1.toString() === freq2.toString()) return true;
        
        // Move window by updating frequencies
        freq2[s2[i].charCodeAt(0) - 97]--;
        freq2[s2[i + s1.length].charCodeAt(0) - 97]++;
    }

    return freq1.toString() === freq2.toString();
};

// Permutation in String driver code
const string1 = "abb";
const string2 = "uajbabi";
console.log("\n2. Permutations in String");
console.log(checkInclusion(string1, string2)); // true
console.log(checkInclusion(string1, "abcbacb")); // false

/**
 *      Maximum number of vowels for substring of given length
 * Given a string and a given length k, calculate the max number of vowels for substring of length k 
 */
const maxVowels = (s, k) => {
    // Step 1: get initial vowel count
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    let maxCount = 0;

    // Count vowels in first k characters
    for (let i = 0; i < s.length; i++) {
        if (i >= k) {
            // remove leftmost character from window
            if (vowels.has(s[i - k])) count--;
        }

        // Add current character
        if (vowels.has(s[i])) count++;

        if (i >= k - 1) maxCount = Math.max(maxCount, count);
    }

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

/**
 *      5. String to Integer (atoi)
 */
var myAtoi = function(s) {
    // remove white space
    let s1 = s.replaceAll(" ", "");

    // check negative
    let sign = 1; // default positive
    if (s1[0] == "-") {
        sign = -1;
        s1 = s1.slice(1);
    } else if (s1[0] == '+') {
        s1.slice(1);
    }

    // process remaining string
    let res = 0;
    for (let i = 0; i < s1.length; i++) {
        if (isNaN(parseInt(s1[i]))) { // check for NaN
            return sign * res; // return current value and end processing
        }
        // check overflow/underflow conditions
        if (res > Math.floor(Number.MAX_SAFE_INTEGER / 10)) {
            return sign == 1 ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
        }
        // add digit to result
        res *= 10;
        res += parseInt(s1[i]); 
    }

    return sign * res;
};

// atio driver code
console.log("\n4. Atoi");
console.log(myAtoi("   -402foo")); // -402
console.log(myAtoi("42")); // 42
console.log(myAtoi("weeping42")); // 0

/**
 *     6. Group Anagrams

  Brute force: thrice nested loop, for each string, check if other strings are equal by iterating through each char 
  TC: O(n * n * m)

  Optimized: Use the sorted string as a key in a hashmap to group anagrams.
  TC: O(n * m log m)

 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const anagrams = {};
    for (const str of strs) {
        const sorted = str.split("").sort().join("");
        anagrams[sorted] = anagrams[sorted] ? [...anagrams[sorted], str] : [str];
    }
    return Object.values(anagrams);
}

// Group Anagrams driver code
console.log("\n5. Group Anagrams");

process.stdout.write("TEST CASE 1: ");
const grams1 = ["eat","tea","tan","ate","nat","bat"];
const result1 = groupAnagrams(grams1);
if (JSON.stringify(result1) === JSON.stringify([["eat","tea","ate"],["tan","nat"],["bat"]])) {
    console.log("SUCCESS");
} else {
    console.error("FAILURE");
}

process.stdout.write("TEST CASE 2: ");
const grams2 = [""];
const result2 = groupAnagrams(grams2);
if (JSON.stringify(result2) === JSON.stringify([['']])) {
    console.log("SUCCESS");
} else {
 
    console.error("FAILURE");
}

process.stdout.write("TEST CASE 3: ");
const grams3 = ["a"];
const result3 = groupAnagrams(grams3);
if (JSON.stringify(result3) === JSON.stringify([["a"]])) {
    console.log("SUCCESS");
} else {
    console.error("FAILURE");
}

// 7. merge strings alternately
const mergeAlt = (word1, word2) => {
    let m = word1.length;
    let n = word2.length;
    let res = "";
    let i = 0;
    let j = 0;
    
    while (i < m || j < n) {
        if (i < m) {
            res += word1[i];
            i++;
        }
        if (j < n) {
            res += word2[j];
            j++;
        }
    }
    return res;
};

console.log("Merge Strings Alternately");
let str1 = "abcde";
let str2 = "fghijklm";
const mergedAlt = mergeAlt(str1, str2);

console.log("Merge Strings Alternately");
if (mergedAlt === "afbgchdiejklm") {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

/**
 * To do:
 * - regular expression matching
 * - edit distance
 * - string compression
 * - minimum penalty for a shop
 */
