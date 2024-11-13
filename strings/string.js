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
    // edge cases: 
    // if s1 is longer than s2, return false
    if (s1.length > s2.length) { return false; }
    // if s1 is one character, return s2.indexOf(s1) !== -1
    if (s1.length == 1) { return s2.indexOf(s1) !== -1; }

    // Step 1: create char frequency map generation function, apply to s1
    const getCharFreq = (string) => {
        const map = {};
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
    const checkPermutation = (map1, map2) => 
        Object.entries(map1).every(([char, freq]) => map2[char] === freq);

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

  Optimized: Hash map optimization: convert each string to hashmap character frequency representation to identify equality in O(1) time. Use a hashmap with the stringified object representation as the key to store anagram groups. Iterate through the strs array once.
  TC: O (n * m) 

 * @param {string[]} strs
 * @return {string[][]}
 */
  var groupAnagrams = function(strs) {
    // Step 1: get anagrams by sorting string chars
    const anagrams = {};
    for (const str of strs) {
        const sorted = str.split("").sort().join("");
        if (anagrams[sorted]) {
            anagrams[sorted].push(str);
        } else {
            anagrams[sorted] = [str];
        }
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
