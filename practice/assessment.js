// Input: nums = [1, 5, 3, 4, 2], target = 2
// Output: [0, 2]  // nums[2] - nums[0] = 3 - 1 = 2
// (any valid pair is fine)

// Input: nums = [2, 7, 11, 15], target = 4
// Output: [0, 2]  // nums[2] - nums[0] = 11 - 2 = 9... 

// Approach: First sort the array. Then use two pointers at each end to move the 
// array based on whether the difference is too large or small
const findPairsWithTargetDifference = (pairs, target) => {
    // first, sort the array
    const sorted = pairs.sort((a, b) => {return a - b});
    console.log('sorted pairs: ', pairs);
    // initialize pointers at either end
    let p1 = Math.floor(pairs.length / 2);
    let p2 = Math.floor(pairs.length / 2) + 1;
    console.log('p1: ', p1, 'p2: ', p2);
    // begin iterating the pointers
    while (p1 > 0 && p2 < sorted.length) {
        let diff = sorted[p2] - sorted[p1];
        if (diff == target) {
            return [pairs.indexOf(sorted[p1]), pairs.indexOf(sorted[p2])];
        } else if (diff > target) {
            p2--;
        } else {
            p1++;
        }
    }
    // no pairs found
    return 'No pairs found equal to the target';
}

// Test case 1: 
const pairs1 = [1, 8, 3, 11, 2];
const target1 = 5;
console.log("TEST CASE 1: ");
console.log(JSON.stringify(findPairsWithTargetDifference(pairs1, target1)));


/// Group anagrams
// Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

// Input: strs = [""]
// Output: [[""]]

// Input: strs = ["a"]
// Output: [["a"]]
//
// Approach: sort the anagrams and then create a hashmap key for each one
const groupAnagrams = (strs) => {
    const groups = new Map();
    for (let i = 0; i < strs.length; i++) {
        let sorted = strs[i].split("").sort().join("");
        groups[sorted] ? groups[sorted] = [...groups[sorted], strs[i]] : groups[sorted] = [strs[i]];
    }
    // console.log(groups);
    return Object.values(groups);
};
// Group Anagrams test
console.log("Group Anagrams test");
const strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
const test = (condition) => condition ? 'PASSED' : 'FAILURE';
console.log("TEST CASE 1: ", test(JSON.stringify(groupAnagrams(strs1)) == JSON.stringify([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]])));
// output [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

// Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without repeating characters.
// Input: s = "abcabcbb"Output: 3  // "abc"Input: s = "bbbbb"Output: 1  // "b"Input: s = "pwwkew"Output: 3  // "wke"Input: s = ""
// approach: sliding window, move pointers and check for repeat characters, track indices in a map
const longestSubstring = (str) => {
    let map = {}; 
    let p1 = 0;
    let max = 1;
    for (let i = 0; i < str.length; i++) {
        // add char to index map
        let char = str[i];
        // check duplicate and adjust
        if (map[char] !== undefined && map[char] >= p1) {
            p1 = map[char] + 1;
        }
        // update map
        map[char] = i;
        // check max length
        max = Math.max(max, i - p1 + 1);
    }
    return max;
};

// Test cases:
// Input: s = "abcabcbb"Output: 3  // "abc"Input: s = "bbbbb"Output: 1  // "b"Input: s = "pwwkew"Output: 3  // "wke"Input: s = ""
const s = "abcabcbb"
console.log(longestSubstring(s));
console.log(longestSubstring(s) == 3);