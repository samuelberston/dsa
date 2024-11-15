/**
 *      LinkedIn leetcode question
 *      https://leetcode.com/company/linkedin/?favoriteSlug=linkedin-thirty-days
 * 
 *      1) Nested List Weight Sum II
 *      2) Find First and Last Position of Element in Sorted Array
 *      3) Factor Combinations
 *      4) Sort Transformed Array
 */

/**
 *      Nested List Weight Sum II
 * 
 * You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
 * The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
 * The weight of an integer is maxDepth - (the depth of the integer) + 1.
 * Return the sum of each integer in nestedList multiplied by its weight.
 * 
 * @param {Number[]}
 * @return {Number}
 */
const nestedListWeightSumII = (nestedList) => {
    // Step 1: Recursively calculate max depth
    let maxLevel = 1;

    const maxDepth = (list, level) => {
        // base case - no nested list
        if (!list.length) return level;

        // update level  
        let currentMax = level;   

        // iterate each element in the nestedList
        for (let i = 0; i < list.length; i++) {
            // recursive case - element is array, increment level and recurse on nested element
            if (Array.isArray(list[i])) {
                currentMax = Math.max(currentMax, maxDepth(list[i], level+ 1));
            }
        }
        return currentMax;
    }
    maxLevel = maxDepth(nestedList, 1);

    // Step 2: Recursively calculate inverse weight product sum
    let sum = 0;
    const productSum = (list, level) => {
        // iterate each element in the nestedList
        for (let i = 0; i < list.length; i++) {
            // base case - element is integer
            if (typeof list[i] === 'number') {
                sum += list[i] * (maxLevel - level + 1);
            }
            // recursive case - element is array, increment level and recurse on nested element
            if (Array.isArray(list[i])) {
                productSum(list[i], level + 1);
            }
        }
    }
    productSum(nestedList, 1);
    return sum;
}

// Nested list II driver code
console.log("\n1.Nested List Weight Sum II");
process.stdout.write("Test case 1: ");
const nestedList1 = [1,[2,2],[[3],2],1];
const res1 = nestedListWeightSumII(nestedList1);
if (res1 === 21) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const nestedList2 = [1, [4, [6]]];
const res2 = nestedListWeightSumII(nestedList2);
if (res2 === 17) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Find First and Last Position of Element in Sorted Array
 * 
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const findFirstAndLastPosition = (nums, target) => {
    // Step 1: Use binary search to find element
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            // Step 2: If element is found, move pointers to find first and last position
            let first = mid;
            let last = mid;
            while (nums[first] === target) {
                first--;
            }
            while (nums[last] === target) {
                last++;
            }
            return [first + 1, last - 1];
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [-1, -1]
}

// Find first and last position driver code
console.log("\n2. Find First and Last Position of Element in Sorted Array");
process.stdout.write("Test case 1: ");
const nums1 = [5,7,7,8,8,10];
const target1 = 8;
const res3 = findFirstAndLastPosition(nums1, target1);
if (JSON.stringify(res3) === JSON.stringify([3, 4])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const nums2 = [5,7,7,8,8,8,8,8,10,11];
const target2 = 8;
const res4 = findFirstAndLastPosition(nums2, target2);
if (JSON.stringify(res4) === JSON.stringify([3, 7])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Factor Combinations
 * 
 * Numbers can be regarded as the product of their factors.
 * For example, 8 = 2 x 2 x 2 = 2 x 4.
 * Given an integer n, return all possible combinations of its factors. You may return the answer in any order.
 * 
 * Note that the factors should be in the range [2, n - 1].
 * 
 * @param {number} n
 * @return {number[][]}
 */
const factorCombinations = (n) => {
    // Approach: Iterate through all numbers 2 thought n/2. If the result is divisible by the current number, update the currcombo and recurse on the quotient.
    const combos = [];

    const findFactors = (n, start = 2, currCombo = []) => {
        // Early termination if n is too small
        if (n < start * start) return;

        // Iterate through all numbers 2 through n/2
        for (let i = start; i <= Math.sqrt(n); i++) {
            if (n % i === 0) { // i is a factor of n
                const quotient = n / i;
                // Only add if quotient is greater than i
                if (quotient >= i) {
                    // Add current combo and new factor
                    combos.push([...currCombo, i, quotient]);
                    // recurse on quotient
                    findFactors(quotient, i, [...currCombo, i]);
                }    
            }
        }    
    }
    findFactors(n);
    return combos;
};

// Factor combinations driver code
console.log("\n3. Factor Combinations");
process.stdout.write("Test case 1: ");
const n1 = 8;
const res5 = factorCombinations(n1);
if (JSON.stringify(res5) === JSON.stringify([[2, 2, 2], [2, 4]])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const n2 = 32;
const res6 = factorCombinations(n2);
if (JSON.stringify(res6) === JSON.stringify([[2, 16], [2, 2, 2, 2, 2], [2, 2, 2, 4], [2, 2, 8], [2, 4, 4], [4, 8]])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Sort Transformed Array
 * Given a sorted integer array nums and three integers a, b and c, 
 * apply a quadratic function of the form f(x) = ax2 + bx + c 
 * to each element nums[i] in the array, and return the array in a sorted order.
 * 
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
const sortTransformedArray = (nums, a, b, c) => {
    const transformed = nums.map(x => a * x * x + b * x + c).sort((a, b) => a - b);
    return transformed;
}

// Sort transformed array driver code
console.log("\n4. Sort Transformed Array");
process.stdout.write("Test case 1: ");
const nums3 = [-4, -2, 2, 4];
const a1 = 1;
const b1 = 3;
const c1 = 5;
const res7 = sortTransformedArray(nums3, a1, b1, c1);
if (JSON.stringify(res7) === JSON.stringify([3, 9, 15, 33])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}