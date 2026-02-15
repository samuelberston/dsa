// Majority Element
// Given an array nums of size n, return the element that appears more than n / 2 times. You can assume the majority element always exists.
// Input: nums = [3, 2, 3]
// Output: 3

// Input: nums = [2, 2, 1, 1, 1, 2, 2]
// Output: 2

// Approach: track freq of each item in a hashmap, return if freq greater than n / 2
const majEle = (nums) => {
    const map = {};
    for (const num of nums) {
        // increment frequency map
        map[num] ? map[num]++ : map[num] = 1;
        // return num if it exceeds n / 2 freq
        if (map[num] > (nums.length / 2)) return num;
    }
};
// Maj Ele test
console.log("Majority element");
const nums1 = [2, 2, 1, 1, 1, 2, 2];
console.log("TEST CASE 1: ", majEle(nums1) == 2 ? 'PASSED' : 'FAILED');
const nums2 = [3, 2, 3];
console.log("TEST CASE 2: ", majEle(nums2) == 3 ? 'PASSED' : 'FAILED');

// First Unique Character in a String
// Given a string s, find the first non-repeating character and return its index. If it doesn't exist, return -1.
// Input: s = "leetcode"
// Output: 0  // 'l' only appears once, and it's first

// Input: s = "loveleetcode"
// Output: 2  // 'v' is the first char that appears only once

// Input: s = "aabb"
// Output: -1

// approach: Return the first char that is unique and whose index is the only one following it's current position
const firstUnique = (str) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        // check unique 
        if (!map[char] && str.indexOf(char, i + 1) === -1) return i;
        // add to map
        map[char] = true;
    }
    // no unique found
    return -1;
};
// First Unique Char
console.log("\nFirst Unique Character in a String");
const str1 = 'leetcode';
console.log("TEST CASE 1: ", firstUnique(str1) == 0 ? 'PASSED' : 'FAILED');
const str2 = 'loveleetcode';
console.log("TEST CASE 1: ", firstUnique(str2) == 2 ? 'PASSED' : 'FAILED');

// Merge Two Sorted Arrays
// Given two sorted arrays nums1 and nums2, return a single sorted array by merging them.

// Input: nums1 = [1, 3, 5], nums2 = [2, 4, 6]
// Output: [1, 2, 3, 4, 5, 6]

// Input: nums1 = [1, 2], nums2 = [3, 4, 5]
// Output: [1, 2, 3, 4, 5]

// Input: nums1 = [], nums2 = [1]
// Output: [1]

// Approach: use to pointers to build a new array, tracking the smaller num
const mergeTwo = (arr1, arr2) => {
    const res = [];
    let p1 = 0;
    let p2 = 0;
    // exhaust search space
    while (p1 <= arr1.length || p2 < arr2.length) {
        // edge cases: exhausted one array
        if (p1 == arr1.length) {
            res.push(...arr2.slice(p2));
            return res;
        }
        if (p2 == arr2.length) {
            res.push(...arr1.slice(p1));
            return res;
        }
        // check for smaller num, add to res, increment p
        if (arr1[p1] < arr2[p2]) {
            res.push(arr1[p1]);
            p1++;
        } else {
            res.push(arr2[p2]);
            p2++;
        }
    }
    return res;
};
console.log("\nMerge Two Sorted Arrays");
const nums3 = [1, 3, 5];
const nums4 = [2, 4, 6];
// Output: [1, 2, 3, 4, 5, 6]
console.log("TEST CASE 1: ", JSON.stringify(mergeTwo(nums3, nums4)) == JSON.stringify([1, 2, 3, 4, 5, 6]) ? 'PASSED' : 'FAILED');
const nums5 = [1, 2];
const nums6 = [3, 4, 5];
// Output: [1, 2, 3, 4, 5]
console.log("TEST CASE 2: ", JSON.stringify(mergeTwo(nums5, nums6)) == JSON.stringify([1, 2, 3, 4, 5]) ? 'PASSED' : 'FAILED');

// Reverse a String (in-place, array of chars)
// Given an array of characters (e.g. ['h','e','l','l','o']), reverse it in-place. No extra array.
// Input: s = ["h","e","l","l","o"]Output: ["o","l","l","e","h"]Input: s = ["H","a","n","n","a","h"]Output: ["h","a","n","n","a","H"]
// Pattern: Two pointers, opposite ends. Swap and move inward until they meet.
const reverseStr = (strArr) => {
    let p1 = 0; 
    let p2 = strArr.length - 1;
    // exhaust search space
    while (p1 < p2) {
        let tmp = strArr[p1];
        strArr[p1] = strArr[p2];
        strArr[p2] = tmp;
        p1++;
        p2--;
    }
    return strArr;
};
console.log("\nReverse String in-place");
const strArr1 = ["h","e","l","l","o"];
console.log("TEST CASE 1: ", JSON.stringify(reverseStr(strArr1)) == JSON.stringify(["o","l","l","e","h"]) ? 'PASSED' : 'FAILED');
const strArr2 = ["H","a","n","n","a","h"];
console.log("TEST CASE 2: ", JSON.stringify(reverseStr(strArr2)) == JSON.stringify(["h","a","n","n","a","H"]) ? 'PASSED' : 'FAILED');

// Intersection of Two Arrays
// Given two integer arrays nums1 and nums2, return an array of all values that appear in both arrays. Each value in the result must be unique (no duplicates).
// Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2]Output: [2]Input: nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]Output: [4, 9]  (or [9, 4] — order doesn't matter)

// Approach: create map of first array, iterate through second array, create new array from unique nums and mark repeats false
const intersection = (nums1, nums2) => {
    // Step 1: construct nums1 map
    const map = {};
    for (const num of nums1) {
        map[num] = true;
    }
    // Step 2: create intserction, no dupes
    const res = [];
    for (let i = 0; i < nums2.length; i++) {
        let num2 = nums2[i];
        if (map[num2]) res.push(num2);
        map[num2] = false;
    }

    return res;
};
console.log("\nIntersection of Two Arrays");
const n1 = [4, 9, 5];
const n2 = [9, 4, 9, 8, 4];
console.log("TEST CASE 1: ", JSON.stringify(intersection(n1, n2)) == JSON.stringify([9,4]) ? 'PASSED' : 'FAILED');

// Subarray Sum Equals K
// Count subarrays whose sum equals k. One pass: map stores how many times each prefix sum was seen.
// If prefixSum - k was seen before, that many subarrays ending here sum to k.
const subSumK = (nums, k) => {
    const map = { 0: 1 };  // prefix sum 0 = "before we start" (so subarray from 0 to here can sum to k)
    let prefixSum = 0;
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        count += map[prefixSum - k] || 0;
        map[prefixSum] = (map[prefixSum] || 0) + 1;
    }
    return count;
};
console.log("Subarray Sum Equals K");
console.log(subSumK([1, 1, 1], 2));       // 2
console.log(subSumK([1, 2, 3], 3));        // 2
console.log(subSumK([1, -1, 0], 0));       // 3

// Top K Frequent Elements
// Given an integer array nums and an integer k, return the k most frequent elements. The answer can be in any order.
// Input: nums = [1,1,1,2,2,3], k = 2 Output: [1,2]   (1 appears 3 times, 2 appears 2 times, 3 appears 1 time — so top 2 are 1 and 2)Input: nums = [1], k = 1Output: [1]
// Constraints:
// 1 <= nums.length, and k is at most the number of distinct elements. The answer is always unique (no tie-breaking required).

// approach: create a frequency map, then sort the values by frequency, return the first k elements
const topK = (nums, k) => {
    // Step 1: build freq map
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = (map[nums[i]] || 0) + 1;
    };
    // Step 2: sort entries by frequency (desc), return the elements (keys)
    const entries = Object.entries(map); // [ [num, count], ... ]
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, k).map((e) => Number(e[0]));
};
console.log("Top K Frequent Elements");
console.log("TEST CASE 1: ", JSON.stringify(topK([1,1,1,2,2,3], 2)) == JSON.stringify([1, 2]) ? 'PASSED' : 'FAILED');



// Ransome Note
// Given two strings ransomNote and magazine, return true if ransomNote can be built by using characters from magazine (each character in magazine can be used at most once), and false otherwise.
// Input: ransomNote = "a", magazine = "b"
// Output: false

// Input: ransomNote = "aa", magazine = "ab"
// Output: false

// Input: ransomNote = "aa", magazine = "aab"
// Output: true
// Input: ransomNote = "a", magazine = "b"Output: falseInput: ransomNote = "aa", magazine = "ab"Output: falseInput: ransomNote = "aa", magazine = "aab"Output: true

// Approach: We're basically checking if ransomeNote is contained in magazine - it's a char req comaprison, which calls for a freq map, then a second iteration through the magazine to validate, then check map
const ransomeNote = (r, m) => {
    // Step 1: Build freq map
    const map = {};
    for (let i = 0; i < r.length; i++) {
        let char = r[i];
        map[char] = (map[char] || 0) + 1;
    }
    // Step 2: Iterate magazine and update map
    for (let i = 0; i < m.length; i++) {
        let char = m[i];
        if (map[char] && map[char] > 0) {
            map[char]--;
        }
    }
    // Finally, validate that all values = 0;
    return Object.values(map).every(n => n == 0);
};
console.log("\nRansom Note");
console.log("TEST 1 (aa, aab):", ransomeNote("aa", "aab") === true ? "PASSED" : "FAILED");
console.log("TEST 2 (aa, ab):", ransomeNote("aa", "ab") === false ? "PASSED" : "FAILED");
console.log("TEST 3 (a, b):", ransomeNote("a", "b") === false ? "PASSED" : "FAILED");

// Remove Duplicates from Sorted Array
// Given a sorted integer array nums, remove the duplicates in-place so that each value appears at most once. Return the number of unique elements (the first k elements of nums should hold the unique values in order).
// Input: nums = [1, 1, 2]Output: 2, and nums = [1, 2, _]  (first 2 elements are 1 and 2; rest don't matter)Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]Output: 5, and nums = [0, 1, 2, 3, 4, ...]
// Pattern: Two pointers, same direction. One index scans the array, one index is the “write” position for the next unique value.
const removeDups = (arr) => {
    let p1 = 1;
    for (let i = 1; i < arr.length; i++) {
        // check curr unique
        if (arr[i] > arr[p1 - 1]) {
            // write it to p1
            arr[p1] = arr[i];
            p1++;
        }    
    }
    return p1;
}
console.log("Remove Duplicates");
console.log(removeDups([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

// Sort Colors (Dutch National Flag)
// Given an array nums with only 0, 1, and 2, sort it in-place in a single pass.
// Don’t use the language’s sort; don’t count 0s/1s/2s and overwrite.
// Input: nums = [2, 0, 2, 1, 1, 0]
// Output: [0, 0, 1, 1, 2, 2]

// Input: nums = [2, 1, 0]
// Output: [0, 1, 2]
// Input: nums = [2, 0, 2, 1, 1, 0]Output: [0, 0, 1, 1, 2, 2]Input: nums = [2, 1, 0]Output: [0, 1, 2]

// Approach: lo = next slot for 0, hi = next slot for 2. 1s stay in the middle.
// Swap (don't overwrite!) so we don't lose values. When we swap a 2 to the end, don't advance i —
// the value we pulled from hi might be 0 or 2 and must be processed again.
const sortColors = (nums) => {
    let lo = 0;
    let hi = nums.length - 1;
    let i = 0;
    while (i <= hi) {
        if (nums[i] === 0) {
            [nums[i], nums[lo]] = [nums[lo], nums[i]];
            lo++;
            i++;
        } else if (nums[i] === 2) {
            [nums[i], nums[hi]] = [nums[hi], nums[i]];
            hi--;
            // don't i++ — we need to process what came from hi
        } else {
            // 1: leave it, just move on
            i++;
        }
    }
};

// Input: nums = [2, 0, 2, 1, 1, 0]
// Output: [0, 0, 1, 1, 2, 2]

// Input: nums = [2, 1, 0]
// Output: [0, 1, 2]

// Input: nums = [1, 0, 2, 1, 1, 0]
// Output: [0, 1, 1, 1, 2, 2]
const t1 = [2, 0, 2, 1, 1, 0];
sortColors(t1);
console.log("Sort Colors:", JSON.stringify(t1) === "[0,0,1,1,2,2]" ? "PASSED" : "FAILED");


// Two Sum II – Input array is sorted
// Given a 1-indexed sorted array of integers numbers and an integer target, find two numbers that add up to target. Return the two indices (1-based) as [index1, index2] with index1 < index2. Assume exactly one solution exists.
// [
// Input: numbers = [2, 7, 11, 15], target = 9Output: [1, 2]   (numbers[0] + numbers[1] = 2 + 7 = 9)Input: numbers = [2, 3, 4], target = 6Output: [1, 3]Input: numbers = [-1, 0], target = -1Output: [1, 2]

const twoSumTwo = (nums, target) => {
    let p1 = 0;
    let p2 = nums.length - 1;
    while (p1 < p2) {
        let sum = nums[p1] + nums[p2];
        if (sum < target) {
            p1++;
        } else if (sum > target) {
            p2--;
        } else {
            return [p1+1, p2+1];
        }
    }
}
console.log("Two Sum II:", JSON.stringify(twoSumTwo([2, 7, 11, 15], 9)) === "[1,2]" ? "PASSED" : "FAILED");
console.log("Two Sum II:", JSON.stringify(twoSumTwo([2, 3, 4], 6)) === "[1,3]" ? "PASSED" : "FAILED");
console.log("Two Sum II:", JSON.stringify(twoSumTwo([-1, 0], -1)) === "[1,2]" ? "PASSED" : "FAILED");

// Longest Common Prefix
// Given an array of strings strs, return the longest common prefix of all strings. If there is none, return "".
// Approach: keep a pointer to track index, until a break is found, loop through the strings and increment the pointer / build the prefix
const longestPrefix = (strs) => {
    let prefix = "";
    let p = 0;
    while (true) {
        let char = strs[0][p];
        // loop through and check the same char
        for (let i = 0; i < strs.length; i++) {
            // if char is diff or non existent, break and return
            if (strs[i][p] == undefined || strs[i][p] !== char) {
                return prefix;   
            }
        }
        // if end of loop, add to prefix and increment
        prefix += char;
        p++;
    }
};
console.log("\nLongest Prefix: ");
console.log(longestPrefix(["flower", "flow", "flight"]) == "fl")
console.log(longestPrefix(["dog", "racecar", "car"]) == "")

// Single Number
// Given a non-empty array of integers nums, every element appears twice except for one. Find that single element. Use O(n) time and O(1) extra space if you can.
// approach: use a hashmap to track freq, return freq 1.
const singleNumber = (nums) => {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] =  (map[nums[i]] || 0) + 1;
    }
    const entry = Object.entries(map).find(([, count]) => count === 1);
    return Number(entry[0]);
};
console.log("\nSingle Number: ");
console.log(singleNumber([4, 1, 2, 1, 2]) === 4 ? "PASSED" : "FAILED");
console.log(singleNumber([2, 2, 1]) === 1 ? "PASSED" : "FAILED");
console.log(singleNumber([1]) === 1 ? "PASSED" : "FAILED");

// Longest Repeating Character Replacement
// You have a string s and an integer k. You can change at most k characters in s to any other uppercase letter. Return the length of the longest substring that can be made into a single repeated character (e.g. all 'A's) after those changes.
// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with 'B's (or vice versa) → "BBBB" or "AAAA", length 4.

// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the middle 'A' in "AABABBA" → "AABBBBA". Substring "AABB" or "BBBA" etc. Longest valid substring has length 4.
const longestRepeating = (s, k) => {
    const map = {};
    let p1 = 0;
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = (map[s[i]] || 0) + 1;
        let maxFreq = Math.max(...Object.values(map));
        // Shrink from left until window is valid (decrement the char *leaving* before moving p1)
        while ((i - p1 + 1) - maxFreq > k) {
            map[s[p1]]--;
            p1++;
            maxFreq = Math.max(...Object.values(map));
        }
        maxLength = Math.max(maxLength, i - p1 + 1);
    }
    return maxLength;
};
console.log("Longest Repeating Character Replacement");
console.log(longestRepeating("AABABBA", 1) == 4);
console.log(longestRepeating("ABAB", 2) == 4);


// Contiguous Array
// Given a binary array nums (only 0s and 1s), return the maximum length of a contiguous subarray that has an equal number of 0 and 1.
// Input: nums = [0, 1] Output: 2
// Input: nums = [0, 1, 0] 
// Output: 2   
// (e.g. [0,1] or [1,0])
// Input: nums = [0, 0, 1, 0, 0, 0, 1, 1]
// Output: 6   (e.g. subarray [0,0,1,0,0,0,1,1] from index 1 to 6 has 3 zeros and 3 ones... wait that's 4 zeros 3 ones. Let me check: indices 1-6 = [0,1,0,0,0,1] = 4 zeros 2 ones. Need to find the right subarray. Actually [0,0,1,0,0,0,1,1] - length 8. Equal 0 and 1 = 4 each. So [0,0,1,0,0,0,1,1] has 5 zeros 3 ones. So maybe [1,0,0,0,1,1] = 3 and 3? That's length 6. Yes.)
const contiguousArray = (nums) => {
    const map = { 0: -1 }; // prefix sum 0 "appears" at index -1 so length = i - (-1) when sum is 0
    let runningSum = 0;
    let maxLength = 0;
    for (let i = 0; i < nums.length; i++) {
        runningSum += nums[i] === 0 ? -1 : 1;
        if (map[runningSum] !== undefined) {
            // we've seen this sum before → subarray from (map[runningSum]+1) to i has sum 0
            maxLength = Math.max(maxLength, i - map[runningSum]);
        } else {
            map[runningSum] = i; // first time seeing this sum — store index so we get longest later
        }
    }
    return maxLength;
};
console.log("Contiguous Array:", contiguousArray([0, 1]) === 2 ? "PASSED" : "FAILED");
console.log("Contiguous Array:", contiguousArray([0, 1, 0]) === 2 ? "PASSED" : "FAILED");
console.log("Contiguous Array:", contiguousArray([0, 0, 1, 0, 0, 0, 1, 1]) === 6 ? "PASSED" : "FAILED");

