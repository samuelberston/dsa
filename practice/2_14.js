// fibonacci sequence
// Given a number n, return that digit in the fibonacci sequence
// Input: 5, Output: 5, i.e. 0, 1, 2, 3, 5

// Approach: Assign the first two values, and tabulate the nth digit by adding the former two together

const fibonacci = (n) => {
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let tmp = a + b;
        a = b;
        b = tmp;
    };
    return b;
}

console.log("\nFibonacci Sequence");
console.log("TEST CASE 1: ", fibonacci(5) === 5 ? 'PASSED' : 'FAILED');
console.log("TEST CASE 2: ", fibonacci(6) === 8 ? 'PASSED' : 'FAILED');

// ========== EASY: Plus One ==========
// Given an array of digits representing a large integer, add one and return the result as an array.
// Example: [1, 2, 3] → [1, 2, 4]
// Example: [9, 9] → [1, 0, 0]
// Example: [0] → [1]

// approach: join the array, add one, split it

const plusOne = (digits) => {
    const plusOne = Number(digits.join("")) + 1;
    
    const res = JSON.stringify(plusOne).split("").map(n => Number(n));
    return res;
};

console.log("\nPlus One");
console.log(JSON.stringify(plusOne([1, 2, 3])) === "[1,2,4]" ? "PASSED" : "FAILED");
console.log(JSON.stringify(plusOne([9, 9])) === "[1,0,0]" ? "PASSED" : "FAILED");
console.log(JSON.stringify(plusOne([0])) === "[1]" ? "PASSED" : "FAILED");

// ========== EASY: Power of Two ==========
// Given an integer n, return true if it's a power of two, false otherwise.
// Example: 1 → true (2^0)
// Example: 16 → true (2^4)
// Example: 3 → false
// Example: 0 → false

// Approach: if it's a power of two, you can divide by 2 until it's 2, if the quotient is ever > 0, it's false

const isPowerOfTwo = (n) => {
  // edge case
  if (n <= 0) return false;
  while (n >= 2) {
    // not divisible by 2
    if (n % 2 !== 0) return false;
    // divide by 2;
    n = n / 2;
  }
  return true;
};

console.log("\nPower of Two");
console.log(isPowerOfTwo(1) === true ? "PASSED" : "FAILED");
console.log(isPowerOfTwo(16) === true ? "PASSED" : "FAILED");
console.log(isPowerOfTwo(3) === false ? "PASSED" : "FAILED");
console.log(isPowerOfTwo(0) === false ? "PASSED" : "FAILED");

// ========== EASY: Roman to Integer ==========
// Convert a roman numeral string to an integer.
// I=1, V=5, X=10, L=50, C=100, D=500, M=1000
// Subtraction rule: if a smaller value comes before a larger one, subtract it (IV=4, IX=9, etc.)
// Example: "III" → 3
// Example: "LVIII" → 58  (50 + 5 + 3)
// Example: "MCMXCIV" → 1994  (1000 + 900 + 90 + 4)

const romanToInt = (s) => {
  const dict = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
  };
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (dict[char] < dict[s[i+1]]) {
        sum -= dict[char];
    } else {
        sum += dict[char];
    }
  }
  return sum;
};

console.log("\nRoman to Integer");
console.log(romanToInt("III") === 3 ? "PASSED" : "FAILED");
console.log(romanToInt("LVIII") === 58 ? "PASSED" : "FAILED");
console.log(romanToInt("MCMXCIV") === 1994 ? "PASSED" : "FAILED");

// ========== EASY: Palindrome Number ==========
// Given an integer x, return true if it reads the same backwards. No string conversion allowed.
// Example: 121 → true
// Example: -121 → false (negative sign)
// Example: 10 → false
// Hint: reverse the second half of the number and compare.

const isPalindromeNum = (x) => {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0;
  while (reversed < x) {
    reversed = reversed * 10 + (x % 10);  // multiply first, then add the last digit
    x = Math.floor(x / 10);
  }
  // even length: x === reversed. Odd length: middle digit is in reversed, so drop it.
  return x === reversed || x === Math.floor(reversed / 10);
};

console.log("\nPalindrome Number");
console.log(isPalindromeNum(121) === true ? "PASSED" : "FAILED");
console.log(isPalindromeNum(-121) === false ? "PASSED" : "FAILED");
console.log(isPalindromeNum(10) === false ? "PASSED" : "FAILED");
console.log(isPalindromeNum(12321) === true ? "PASSED" : "FAILED");

// ========== EASY: Move Zeroes ==========
// Move all 0s to the end of the array in-place, keeping the order of non-zero elements.
// Example: [0, 1, 0, 3, 12] → [1, 3, 12, 0, 0]
// Example: [0] → [0]

// Approach: use a pointer to track where to insert non-zeros
const moveZeroes = (nums) => {
  let p = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
        nums[p] = nums[i];
        nums[i] = 0;
        p++;
    }
    // console.log("p: ", p);
    // console.log("nums[i]: ", nums[i]);
    // console.log("nums: ", nums);
  };
};

console.log("\nMove Zeroes");
const mz1 = [0, 1, 0, 3, 12];
moveZeroes(mz1);
console.log(JSON.stringify(mz1) === "[1,3,12,0,0]" ? "PASSED" : "FAILED");
const mz2 = [0];
moveZeroes(mz2);
console.log(JSON.stringify(mz2) === "[0]" ? "PASSED" : "FAILED");

// ========== EASY: Reverse Integer ==========
// Given a 32-bit signed integer, reverse its digits. Return 0 if it overflows.
// Example: 123 → 321
// Example: -123 → -321
// Example: 120 → 21

const reverseInteger = (x) => {
  let neg = x < 0;
  if (neg) x = Math.abs(x);
  let reversed = 0;
  while (x > 10) {
    reversed += x % 10;
    reversed *= 10;
    x = Math.floor(x / 10);
    // console.log("reversed: ", reversed);
    // console.log("x: ", x);
  };
  if (!neg) return reversed + x;
  else return -(reversed + x)
};

console.log("\nReverse Integer");
console.log(reverseInteger(123) === 321 ? "PASSED" : "FAILED");
console.log(reverseInteger(-123) === -321 ? "PASSED" : "FAILED");
console.log(reverseInteger(120) === 21 ? "PASSED" : "FAILED");

// ========== EASY: Length of Last Word ==========
// Given a string s of words separated by spaces, return the length of the last word.
// Example: "Hello World" → 5
// Example: "   fly me   to   the moon  " → 4
// Example: "luffy is still joyboy" → 6

// approach: iterate the array backwards. Start the counter at the first char, update til you reach another space, then return 
const lengthOfLastWord = (s) => {
  let len = 0;
  let done = false;
  // Start from the end of the string to find the first char
  for (let i = s.length - 1; i >= 0; i--) {
    let char = s[i];
    // exhaust last char
    while (char !== " ") {
      len++;
      i--;
      char = s[i]
      done = true;
    }
    if (done) return len;
  }
};

console.log("\nLength of Last Word");
console.log(lengthOfLastWord("Hello World") === 5 ? "PASSED" : "FAILED");
console.log(lengthOfLastWord("   fly me   to   the moon  ") === 4 ? "PASSED" : "FAILED");
console.log(lengthOfLastWord("luffy is still joyboy") === 6 ? "PASSED" : "FAILED");

// ========== EASY: Search Insert Position ==========
// Given a sorted array and a target, return the index where it is found.
// If not found, return the index where it would be inserted to keep the array sorted.
// Example: [1,3,5,6], target 5 → 2
// Example: [1,3,5,6], target 2 → 1
// Example: [1,3,5,6], target 7 → 4
// Hint: binary search.

const searchInsert = (nums, target) => {
  let p1 = 0; 
  let p2 = nums.length - 1;
  while (p1 <= p2) {
    let mid = p1 + Math.floor((p2 - p1) / 2);
    // console.log("mid: ", mid);
    // console.log("nums[mid]: ", nums[mid]);
    if (nums[p1] === target) return p1;
    if (nums[mid] === target) return mid;
    if (nums[p2] === target) return p2;
    if (target > nums[mid]) {
      p1 = mid + 1;
    }
    if (target < nums[mid]) {
      p2 = mid - 1;
    }
  }
  return p1;
}

console.log("\nSearch Insert Position");
console.log(searchInsert([1,3,5,6], 5) === 2 ? "PASSED" : "FAILED");
console.log(searchInsert([1,3,5,6], 2) === 1 ? "PASSED" : "FAILED");
console.log(searchInsert([1,3,5,6], 7) === 4 ? "PASSED" : "FAILED");
console.log(searchInsert([1,3,5,6], 0) === 0 ? "PASSED" : "FAILED");

// ========== EASY: Isomorphic Strings ==========
// Two strings are isomorphic if the characters in s can be mapped 1-to-1 to characters in t
// (same structure, different letters). No two chars map to the same char, and a char maps to itself is fine.
// Example: "egg", "add" → true  (e→a, g→d)
// Example: "foo", "bar" → false (o maps to both a and r)
// Example: "paper", "title" → true (p→t, a→i, e→l, r→e)

const isIsomorphic = (s, t) => {
  if (s.length !== t.length) return false;
  const smap = {};
  const tmap = {};
  for (let i = 0; i < s.length; i++) {
    let schar = s[i];
    let tchar = t[i];
    // console.log("schar: ", schar);
    // console.log("tchar: ", tchar);
    // console.log("smap: ", smap);
    // console.log("tmap: ", tmap);
    // check for mismatch
    if (smap[schar] !== undefined && schar !== tmap[tchar]) return false;
    // update maps
    smap[schar] = tchar;
    tmap[tchar] = schar;
  };
  return true;
};

console.log("\nIsomorphic Strings");
console.log(isIsomorphic("egg", "add") === true ? "PASSED" : "FAILED");
console.log(isIsomorphic("foo", "bar") === false ? "PASSED" : "FAILED");
console.log(isIsomorphic("paper", "title") === true ? "PASSED" : "FAILED");

// ========== EASY: Valid Parentheses ==========
// Given a string containing just '(', ')', '{', '}', '[', ']', determine if it's valid.
// Every open bracket must be closed by the same type in the correct order.
// Example: "()" → true
// Example: "()[]{}" → true
// Example: "(]" → false
// Example: "([)]" → false
// Example: "{[]}" → true

const isValid = (s) => {
  const map = {
    "(": ")",
    "{": "}",
    "[": "]"
  }
  const stack = [];
  for (const p of s) {
    // console.log(p);
    // open paren - add to stack
    if (map[p]) {stack.push(p);
    // console.log("stack: ", stack);
    // closing paren and doesn't match stack - invalid
    } else if (!map[p] && map[stack[stack.length - 1]] !== p) {
      return false;
    // closing paren matches
    } else if (!map[p] && map[stack[stack.length - 1]] == p) {
      stack.pop();
    }  
  }
  return true;
};

console.log("\nValid Parentheses");
console.log(isValid("()") === true ? "PASSED" : "FAILED");
console.log(isValid("()[]{}") === true ? "PASSED" : "FAILED");
console.log(isValid("(]") === false ? "PASSED" : "FAILED");
console.log(isValid("([)]") === false ? "PASSED" : "FAILED");
console.log(isValid("{[]}") === true ? "PASSED" : "FAILED");

// ========== EASY: Ransom Note ==========
// Return true if ransomNote can be built from characters in magazine (each used at most once).
// Example: "a", "b" → false
// Example: "aa", "aab" → true
// Example: "aa", "ab" → false

const canConstruct = (ransomNote, magazine) => {
  const map = {};
  for (const char of magazine) {
    map[char] = (map[char] || 0) + 1;
  }
  for (const char of ransomNote) {
    if (map[char] == undefined || map[char] == 0) return false;
    map[char]--;
  }
  return true;
};

console.log("\nRansom Note");
console.log(canConstruct("a", "b") === false ? "PASSED" : "FAILED");
console.log(canConstruct("aa", "aab") === true ? "PASSED" : "FAILED");
console.log(canConstruct("aa", "ab") === false ? "PASSED" : "FAILED");
