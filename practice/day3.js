// Day 3 — HackerRank prep warm-up
// Run: node practice/day3.js

// ========== WARM-UP: Two Sum ==========
// Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.
// Assume exactly one solution. Same element may not be used twice.
//
// Example: nums = [2, 7, 11, 15], target = 9  →  [0, 1]
// Example: nums = [3, 2, 4], target = 6        →  [1, 2]

// approach: use a hashmap to track the indices, check for complement, return indices
const twoSum = (nums, target) => {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) return [map[complement], i];
    map[nums[i]] = i;
  }
};

console.log("Day 3 — Two Sum warm-up");
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)) === "[0,1]" ? "PASSED" : "FAILED");
console.log(JSON.stringify(twoSum([3, 2, 4], 6)) === "[1,2]" ? "PASSED" : "FAILED");

// ========== WARM-UP 2: Valid Palindrome ==========
// Given a string s, return true if it's a palindrome after converting to lowercase and removing non-alphanumeric chars.
// Example: "A man, a plan, a canal: Panama" → true
// Example: "race a car" → false

const isPalindrome = (s) => {
  const normalized = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let p1 = 0;
  let p2 = normalized.length - 1;
  while (p1 < p2) {
    if (normalized[p1] !== normalized[p2]) return false;
    p1++;
    p2--;
  }
  return true;
};

console.log("\nValid Palindrome warm-up");
console.log(isPalindrome("A man, a plan, a canal: Panama") === true ? "PASSED" : "FAILED");
console.log(isPalindrome("race a car") === false ? "PASSED" : "FAILED");

// ========== WARM-UP 3: Contains Duplicate ==========
// Given an integer array nums, return true if any value appears at least twice, else false.
// Example: [1, 2, 3, 1] → true
// Example: [1, 2, 3, 4] → false

const containsDuplicate = (nums) => {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    // check for duplicate
    if (map[nums[i]]) return true;
    // track in map
    map[nums[i]] = true;
  }
  return false;
};

console.log("\nContains Duplicate warm-up");
console.log(containsDuplicate([1, 2, 3, 1]) === true ? "PASSED" : "FAILED");
console.log(containsDuplicate([1, 2, 3, 4]) === false ? "PASSED" : "FAILED");

// ========== WARM-UP 4: Merge Two Sorted Arrays ==========
// Given two sorted arrays nums1 and nums2, return one sorted array merging them.
// Example: [1, 3, 5], [2, 4, 6] → [1, 2, 3, 4, 5, 6]
// Example: [1, 2], [3, 4, 5] → [1, 2, 3, 4, 5]

// approach: use two pointers at the start of each array, increment the smaller, build the sorted array

const mergeSorted = (nums1, nums2) => {
  const sorted = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < nums1.length || p2 < nums2.length) {
    if (p1 >= nums1.length) {
      sorted.push(...nums2.slice(p2));
      break;
    }
    if (p2 >= nums2.length) {
      sorted.push(...nums1.slice(p1));
      break;
    }
    if (nums1[p1] <= nums2[p2]) {
      sorted.push(nums1[p1]);
      p1++;
    } else {
      sorted.push(nums2[p2]);
      p2++;
    }
  }
  return sorted;
};

console.log("\nMerge Two Sorted warm-up");
console.log(JSON.stringify(mergeSorted([1, 3, 5], [2, 4, 6])) === "[1,2,3,4,5,6]" ? "PASSED" : "FAILED");
console.log(JSON.stringify(mergeSorted([1, 2], [3, 4, 5])) === "[1,2,3,4,5]" ? "PASSED" : "FAILED");

// ========== WARM-UP 5: Best Time to Buy and Sell Stock ==========
// Given prices[i] = price on day i, return max profit from one buy + one sell (buy before sell).
// Example: [7, 1, 5, 3, 6, 4] → 5 (buy 1, sell 6)
// Example: [7, 6, 4, 3, 1] → 0

// approach: track the min price, and max profit. Compare min to current, and update either

const maxProfit = (prices) => {
  let min = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    const curPrice = prices[i];
    // check for new max profit
    maxProfit = Math.max(maxProfit, curPrice - min);
    min = Math.min(min, curPrice);
  };
  return maxProfit;
};

console.log("\nBest Time to Buy/Sell warm-up");
console.log(maxProfit([7, 1, 5, 3, 6, 4]) === 5 ? "PASSED" : "FAILED");
console.log(maxProfit([7, 6, 4, 3, 1]) === 0 ? "PASSED" : "FAILED");

// ========== WARM-UP 6: Reverse String (in-place) ==========
// Given an array of characters s, reverse it in-place. No extra array.
// Example: ["h","e","l","l","o"] → ["o","l","l","e","h"]

const reverseString = (s) => {
  let p1 = 0;
  let p2 = s.length - 1;
  while (p1 < p2) {
    // swap ends
    let tmp = s[p1];
    s[p1] = s[p2];
    s[p2] = tmp;
    p1++;
    p2--;
  }
  return s;
};

console.log("\nReverse String warm-up");
const s1 = ["h", "e", "l", "l", "o"];
reverseString(s1);
console.log(JSON.stringify(s1) === '["o","l","l","e","h"]' ? "PASSED" : "FAILED");

// ========== WARM-UP 7: Majority Element ==========
// Return the element that appears more than n/2 times. Assume it always exists.
// Example: [3, 2, 3] → 3
// Example: [2, 2, 1, 1, 1, 2, 2] → 2

// approach: use a freq map, return first element to appear more than n/2 times

const majorityElement = (nums) => {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    // update map
    map[nums[i]] = (map[nums[i]] || 0) + 1;
    // check condition
    if (map[nums[i]] > (nums.length / 2)) return nums[i];
  };
};

console.log("\nMajority Element warm-up");
console.log(majorityElement([3, 2, 3]) === 3 ? "PASSED" : "FAILED");
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2 ? "PASSED" : "FAILED");

// ========== WARM-UP 8: First Unique Character ==========
// Return the index of the first non-repeating character. If none, return -1.
// Example: "leetcode" → 0 (’l’)
// Example: "loveleetcode" → 2 (’v’)
// Example: "aabb" → -1

// approach: build freq map, then second pass to return first with freq 1;

const firstUniqChar = (s) => {
  // Step 1: Freq map
  const map = {};
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
  };
  // Step 2: return first unique, if any
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }  
  // no found, return -1
  return -1;
};

console.log("\nFirst Unique Char warm-up");
console.log(firstUniqChar("leetcode") === 0 ? "PASSED" : "FAILED");
console.log(firstUniqChar("loveleetcode") === 2 ? "PASSED" : "FAILED");
console.log(firstUniqChar("aabb") === -1 ? "PASSED" : "FAILED");

// ========== MEDIUM: Longest Substring Without Repeating Characters ==========
// Return the length of the longest substring with all unique characters.
// Example: "abcabcbb" → 3 ("abc")
// Example: "bbbbb" → 1
// Example: "pwwkew" → 3 ("wke")

// Map = char → last index we saw it. We never remove — we only overwrite with latest index.
// Duplicate = "this char is in the map AND its index is still inside our window" → map[s[i]] >= p1.
// Then move p1 to map[s[i]] + 1. Always do map[s[i]] = i at end of loop.
const lengthOfLongestSubstring = (s) => {
  let maxLength = 0;
  let p1 = 0;
  const map = {};
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] !== undefined && map[s[i]] >= p1) {
      p1 = map[s[i]] + 1;
    }
    map[s[i]] = i;
    maxLength = Math.max(maxLength, i - p1 + 1);
  }
  return maxLength;
};

console.log("\nLongest Substring (medium)");
console.log(lengthOfLongestSubstring("abcabcbb") === 3 ? "PASSED" : "FAILED");
console.log(lengthOfLongestSubstring("bbbbb") === 1 ? "PASSED" : "FAILED");
console.log(lengthOfLongestSubstring("pwwkew") === 3 ? "PASSED" : "FAILED");

// ========== MEDIUM: Group Anagrams ==========
// Given an array of strings strs, group the anagrams together. Return in any order.
// Example: ["eat","tea","tan","ate","nat","bat"] → [["eat","tea","ate"],["tan","nat"],["bat"]]

// approach: sort the strings and use them as keys

const groupAnagrams = (strs) => {
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    // get key
    const key = strs[i].split("").sort().join("");
    // add to map
    if (map[key]) {
      map[key].push(strs[i]);
    }  else {
      map[key] = [strs[i]];
    }
    
  }
  return Object.values(map);
};

console.log("\nGroup Anagrams (medium)");
const ga = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
const gaOk = ga.length === 3 && ga.every(g => g.length >= 1) && ga.some(g => g.includes("eat") && g.includes("tea"));
console.log(gaOk ? "PASSED" : "FAILED");

// ========== MEDIUM: Two Sum II (input sorted) ==========
// Array is sorted. Return 1-based indices of two numbers that add up to target.
// Example: [2, 7, 11, 15], target 9 → [1, 2]
// Example: [2, 3, 4], target 6 → [1, 3]

// array is sorted, so we can use a pointer at either end

const twoSumII = (numbers, target) => {
  let p1 = 0;
  let p2 = numbers.length - 1;
  while (p1 < p2) {
    const n1 = numbers[p1];
    const n2 = numbers[p2];
    let sum = n1 + n2;
    // console.log("n1: ", n1);
    // console.log("n2: ", n2);
    // console.log("sum: ", sum);
    if (sum === target) return [p1 + 1, p2 + 1];
    if (sum >= target) p2--;
    else p1++;
  };
};

console.log("\nTwo Sum II (medium)");
console.log(JSON.stringify(twoSumII([2, 7, 11, 15], 9)) === "[1,2]" ? "PASSED" : "FAILED");
console.log(JSON.stringify(twoSumII([2, 3, 4], 6)) === "[1,3]" ? "PASSED" : "FAILED");

// ========== MEDIUM: Remove Duplicates from Sorted Array (in-place) ==========
// In-place: unique elements at the front, return count of uniques.
// Example: [1,1,2] → 2, nums becomes [1,2,_]
// Example: [0,0,1,1,1,2,2,3,3,4] → 5

// approach: use a pointer to track where to insert. Use a map to check for unique

const removeDuplicates = (nums) => {
  const map = {};
  // add first number
  map[nums[0]] = true;
  let p = 1;
  for (let i = 1; i < nums.length; i++) {
    // console.log("p: ", p);
    // console.log("map: ", map);
    // console.log("cur: ", nums[i]);
    // check unique, if so insert at p1 and increment
    if (!map[nums[i]]) {
      nums[p] = nums[i];
      p++;
    }
    // duplicate, so just add to map
    map[nums[i]] = true;
  }
  return p;
};

console.log("\nRemove Duplicates (medium)");
const rd1 = [1, 1, 2];
console.log(removeDuplicates(rd1) === 2 && rd1[0] === 1 && rd1[1] === 2 ? "PASSED" : "FAILED");
const rd2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(rd2) === 5 ? "PASSED" : "FAILED");

// ========== MEDIUM: Top K Frequent Elements ==========
// Return the k most frequent elements. Answer in any order.
// Example: [1,1,1,2,2,3], k=2 → [1,2]
// Example: [1], k=1 → [1]

// Approach: Use a freq map, then sort by freq and return top k

const topKFrequent = (nums, k) => {
  // Step 1: Build freq map
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    map[cur] = (map[cur] || 0) + 1;
  }
  return Object.entries(map).sort((a, b) => a[1] - b[1]).slice(k - 1).map(a => Number(a[0]));
};

console.log("\nTop K Frequent (medium)");
console.log(JSON.stringify(topKFrequent([1, 1, 1, 2, 2, 3], 2).sort()) === JSON.stringify([1, 2]) ? "PASSED" : "FAILED");
console.log(JSON.stringify(topKFrequent([1], 1)) === "[1]" ? "PASSED" : "FAILED");

// Count paren to swap
// Give a string of paren, return how many pairs to swap to make it valid
// Input: ")()()(", Output: 1
// Input: ")(()))((", Output: 2
// Input: "()()(", Output: -1 - no valid answer

// Approach: Use a stack to track the last. Count unmatched open and unmatched closed
// return the unmatched / 2, or -1 is it's an unequal #
const parenSwap = (s) => {
  let unmatchedClosed = 0;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    // first check for an opening paren, to add to the stack
    if (cur === "(") {
      count++;
    } else {
      count--;
    }
    if (count < 0) {
      unmatchedClosed++;
      count = 0;
    }
  }
  let unmatchedOpen = count;
  return (unmatchedOpen + unmatchedClosed) / 2;
};

console.log("Paren Swap", );
// Input: ")()()(", Output: 1
console.log("TEST CASE 1: ", parenSwap(")()()(") == 1 ? 'PASSED' : 'FAILED');


// ========== MEDIUM: Permutation in String (sliding window + hashmap) ==========
// Given s1 and s2, return true if s2 contains a permutation of s1 (i.e. some contiguous substring of s2 has the same chars and counts as s1).
// Example: s1 = "ab", s2 = "eidbaooo" → true (s2 has "ba")
// Example: s1 = "ab", s2 = "eidboaoo" → false

// approach: sliding window for substring, create a freq map of s1, update the one for s2 as we move.
// How do we know if / when to move the pointer?
// If the char is not in the s1 freq map at all, move the pointer up to the curr index

const checkInclusion = (s1, s2) => {
  // Step 1: s1 freq map
  const map1 = {};
  for (let i = 0; i < s1.length; i++) {
    map1[s1[i]] = (map1[s1[i]] || 0) + 1;
  }
  // Step 2: Iterate s2 with a sliding window, tracking freq to match, adjust as required
  const map2 = {};
  let p1 = 0;
  for (let i = 0; i < s2.length; i++) {
    const substr = s2.slice(p1, i + 1);
    // check for matching frequencies - compare sorted strings
    if (s1.split("").sort().join("") == substr.split("").sort().join("")) return true;
    // Check for char NOT in map (move p1 to i)
    if (!map1[s2[i]]) p1 = i + 1;
    // Check for frequency character gone over
    map2[s2[i]] = (map2[s2[i]] || 0) + 1;
    if (map2[s2[i]] > map1[s2[i]]) {
      // move pointer to position AFTER that strings index in the substr
      p1 += substr.indexOf(s2[i]) + 1;
    }
  }
  return false
};

console.log("\nPermutation in String (medium)");
console.log(checkInclusion("ab", "eidbaooo") === true ? "PASSED" : "FAILED");
console.log(checkInclusion("ab", "eidboaoo") === false ? "PASSED" : "FAILED");
console.log(checkInclusion("adc", "dcda") === true ? "PASSED" : "FAILED");

// ========== MEDIUM: Longest Substring with At Most K Distinct Characters ==========
// Given string s and integer k, return the length of the longest substring that contains at most k distinct characters.
// Example: s = "eceba", k = 2 → 3 ("ece" or "eba")
// Example: s = "aaabbcc", k = 1 → 3 ("aaa")
// Example: s = "aaabbcc", k = 2 → 5 ("aaabb" or "bbccc")

// Approach: Two pointer sliding window. Use a freq map to track chars.
// If the length of the # keys in the map > 1 goes over, move the pointer, and decrement the map

const lengthOfLongestSubstringKDistinct = (s, k) => {
  const map = {};
  let p1 = 0;
  for (let i = 0; i < s.length; i++) {
    // 
  }
};

console.log("\nAt Most K Distinct (medium)");
console.log(lengthOfLongestSubstringKDistinct("eceba", 2) === 3 ? "PASSED" : "FAILED");
console.log(lengthOfLongestSubstringKDistinct("aaabbcc", 1) === 3 ? "PASSED" : "FAILED");
console.log(lengthOfLongestSubstringKDistinct("aaabbcc", 2) === 5 ? "PASSED" : "FAILED");
