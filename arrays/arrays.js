// array data structure

// 2sum problems
const twoSum = (array, target) => {
    array.sort((a, b) => a - b) // sort the array
    let p1 = 0; 
    let p2 = array.length - 1;
    while (p1 < p2) {
        let sum = array[p1] + array[p2];
        if (sum == target) {
            return [array[p1], array[p2]];
        }
        if (sum <= target) {
            p1++
        } else {
            p2--;
        }
    }
    return -1;
}

// 2sum driver code
console.log("\n1. Two Sum");
const arr = [5, 7, 3, 9, 22, 34];
const solution = twoSum(arr, 16);
console.log(solution);

// contains duplicate
const containsDuplicate = (array) => {
    const map = new Map(); // track visited elements
    for (const element of array) {
        if (map[element]) {
            console.log("duplicate element: ", element);
            return true; // found duplicate
        } else {
            map[element] = true;
        }
    }
    console.log("No duplicate detected");
    return false; // no duplicate detected
}

// contains duplicate driver code
console.log("\n2. Contains Duplicate");
console.log("array without duplicate: ");
containsDuplicate(arr);
console.log("array with duplicate: ");
arr.push(34); // add duplicate
containsDuplicate(arr);

// product of array except self
const productArrayExceptSelf = (array) => {
    // edge cases: array has zero or one element
    if (array.length <= 1) { return []; }
    const result = Array(array.length).fill(1);

    // forward pass, multiply elements by all prior elements
    let product = 1; // start with 1
    for (let i = 0; i < array.length; i++) {
        result[i] *= product; 
        product *= array[i]; // carry product to next iteration
    }
    // backward pass
    product = 1;
    for (let i = array.length - 1; i > -1; i--) {
        result[i] *= product;
        product *= array[i];
    }
    console.log(result);
    return result;
}

// product of array except self driver code
console.log("\n3. Producy of Array Except Self");
productArrayExceptSelf(arr);
console.log("checking works with zeros: ");
arr.push(0);
productArrayExceptSelf(arr);
arr.pop();

// container with the most water
/* 
Approach: 
use two pointers initialized at the start and end of the array
track the maxArea
in/decrement the pointer with the smaller hight until they meet

edge cases:
array has zero, one, or two elements

*/
const containerMostWater = (containers) => {
    // edge cases: zero, one, or two nodes
    if (containers.length <= 1) {
        return 0; // no area
    }
    if (containers.length == 2) {
        return Math.min(containers[0], containers[1]) * 1; // area equal to lower height
    }

    let maxArea = 0;
    let p1 = 0;
    let p2 = containers.length - 1;
    // exhaust search space
    while (p1 < p2) {
        const height = Math.min(containers[p1], containers[p2]);
        const width = p2 - p1;
        const currArea = width * height;
        maxArea = Math.max(maxArea, currArea);
        // move pointer with the shorter height
        if (containers[p1] < containers[p2]) {
            p1++;
        } else {
            p2--;
        }
    }
    console.log(maxArea);
    return maxArea;
}

// Container with the most water driver code
const containers = [3, 7, 5, 4, 6, 1, 0];
console.log("\n4. Container with the most water");
containerMostWater(containers);

// Kadane's algorithm, maximum subarray sum
/*
edge cases: 
array contains zero or one element

brute force: 
calculate subarray sum for every possible subarray - O(n^2)

approach:
iterate array tracking start and maxSum, if currSum, < 0, reset it to 0 and continue loop
*/
const kadanesAlg = (array) => {
    // edge cases:
    if (array.length == 0) { return 0; }
    if (array.length == 1) { return array[0]; }

    let maxSum = Number.MIN_SAFE_INTEGER;
    let currSum = 0;
    for (let i = 0; i < array.length; i++) {
        currSum += array[i]; // add current element to currSum
        if (currSum > maxSum) {
            maxSum = currSum;
        }
        if (currSum < 0) {
            currSum = 0;
        }
    }
    console.log(maxSum);
    return maxSum;
}

// Kadane's algorithm driver code
const array = [-7, 3, -4, 5, 3, -2, 1];
console.log("\n5. Kadane's algorithm, maximum subarray sum");
kadanesAlg(array);
const negativeArray = [-8, -5, -3, -5, -8];


/* 
Best Time to Buy and Sell Stock Algorithm

edge cases:
- less than two prices

brute force:
calculate the max profit from every possible buy/sell combination - O(n^2)

optimal approach:
track the max profit, current minimum, and current profit
if the current price is below the minimum, update the minimum
*/
const bestTimeSellStock = (prices) => {
    // edge cases: less than two prices
    if (prices.length < 2) { return 0; }
    let maxProfit = Number.MIN_SAFE_INTEGER;
    let currProfit;
    let minPrice = prices[0];
    // iterate through prices
    for (let i = 1; i < prices.length; i++) {
        currPrice = prices[i];
        if (currPrice < minPrice) { // current price is less than minimum
            minPrice = currPrice;
            continue;
        }
        currProfit = currPrice - minPrice;
        if (currProfit > maxProfit) { // current profit is greater than maximum
            maxProfit = currProfit;
        }
    }
    console.log(maxProfit);
    return maxProfit;
}

// Best Time to Buy and Sell Stock driver code
const prices = [4, 5, 2, 5, 7, 6];
console.log("\n6. Best Time to Buy and Sell Stock");
console.log("maximum profit: ");
bestTimeSellStock(prices);

/*
Valid Parentheses

Approach: use a stack. For opening paren, add to stack. For closing paren, check stack and pop, or return error.
return true if loop is over and stack is empty
*/
const validParentheses = (p) => {

    const map = {
        "(": ")",
        "{": "}",
        "[": "]"
    }

    const stack = [];

    for (let i = 0; i < p.length; i++) {

        if (Object.keys(map).includes(p[i])) {        // check opening paren
            stack.push(p[i]);
        }

        if (Object.values(map).includes(p[i])) {      // check closing paren
            const top = stack.pop();
            if (map[top] != p[i]) {              // check for invalid pair
                return false;
            }
        }
    }

    return true;                                 // no invalid pair found
}

// Valid Parentheses driver code
const valid   =  "({*[-]}*)";
const invalid =  "(-{**[]-)";
console.log("\n7. Valid Parentheses");
console.log("Identifies valid parentheses: ", validParentheses(valid) == true);
console.log("Identifies invalid parentheses: ", validParentheses(invalid) == false);

/*
  3 sum

  approach: sort the array and use two sum helper function
*/
const threeSum = (numbers) => {
    numbers.sort((a, b) => a - b);        // sort input array

    const twoSum = (slice, target) => {   // two sum helper function
        const pairs = [] 
        let p1 = 0;
        let p2 = slice.length - 1;
        while (p1 < p2) {
            let sum = slice[p1] + slice[p2];
            if (sum == target) {
                pairs.push([slice[p1], slice[p2]]);           // push pair whose sum is target
                p1++;
                p2--;
                // prevent duplicates
                while (slice[p1] == slice[p1 - 1] && p1 < p2) p1++;
                while (slice[p2] == slice[p2 + 1] && p1 < p2) p2--;
            } 
            else if (sum <= target) {
                p1++;
            } 
            else {
                p2--;
            }
        }
        return pairs;
    }

    const triplets = [];

    for (let i = 0; i < numbers.length - 2; i++) {
        if (i > 0 && numbers[i] === numbers[i - 1]) continue;
        let curr = numbers[i];
        // check for pair in the slice that is inverse of curr
        let resPairs = twoSum(numbers.slice(i + 1), -curr);
        if (resPairs.length > 0) {
            for (let j = 0; j < resPairs.length; j++) {
                triplets.push([curr, ...resPairs[j]]);
            }
        }
    }

    return triplets;
} 

// three sum driver code
const numbers = [-1, 0, 2, 1, -1, 3, -2];
console.log("Checking for triplets whose sum is zero within the numbers: ", numbers);
console.log("triplets: ", threeSum(numbers));

/*
  Find Minimum in Rotated Sorted Array

  approach: use binary search to find inflection point and min
*/
const findMinRotatedSortedArray = (rotatedSortedArray) => {
    let left = 0;
    let right = rotatedSortedArray.length -1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (rotatedSortedArray[mid] > rotatedSortedArray[right]) { // mid is greater than end, inflection point is mid or right of mid
            left = mid + 1;
        } else { // mid is less than end, inflection point is mid or left of mid
            right = mid;
        }
    }
    return rotatedSortedArray[left];
}

// Find Min in Rotated Sorted Array Driver Code
const rotSortArr1 = [7, 8, 9, 10, 11, 4, 5, 6];
const rotSortArr2 = [34, 36, 300, 6, 13, 16, 20, 30];
console.log("Find min in rotated sorted array 1: ", findMinRotatedSortedArray(rotSortArr1) == 4);
console.log("Find min in rotated sorted array 2: ", findMinRotatedSortedArray(rotSortArr2) == 6);

/*
  Trapping Rain Water
  Given n non-negative integers representing an elevation map where the 
  width of each bar is 1, compute how much water it can trap after raining.
  approach: the vol of each index is the difference between its height and the min height on either side
*/
const trappingRainWater = (eleMap) => {
    const maxLeft = Array(eleMap.length);
    const maxRight = Array(eleMap.length);
    let maxL = maxR = 0;

    // get max elevation left of i
    for (let i = 0; i < eleMap.length; i++) {
        maxLeft[i] = maxL; 
        if (eleMap[i] > maxL) {
            maxL = eleMap[i]; // update maxL
        }
    }

    // get max elevation right of i
    for (let i = eleMap.length - 1; i > -1; i--) {
        maxRight[i] = maxR;
        if (eleMap[i] > maxR) {
            maxR = eleMap[i]; // update maxR
        }
    }

    let totalVol = 0;
    for (let i = 0; i < eleMap.length; i++) {
        // console.log("min: ", Math.min(maxLeft, maxRight));
        if (eleMap[i] < Math.min(maxLeft[i], maxRight[i])) { // if i can store water
            totalVol += Math.min(maxLeft[i], maxRight[i]) - eleMap[i];
        }
    }
    return totalVol;
}

// Trapping Rain Water Driver Code
const eleMap1 = [0, 1, 0, 2, 1, 0, 1];
console.log("Calculating volume for elevation map 1: ", trappingRainWater(eleMap1) == 2);
const eleMap2 = [1, 0, 2, 4, 3, 6, 2, 3, 0];
console.log("Calculating volume for elevation map 2: ", trappingRainWater(eleMap2) == 3);

/**
 *      Koko eating bananas
 * return the minimum rate needed for koko to consume the bananas in piles in h hours
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var kokoEatingBananas = function(piles, h) {
    let left = 1;
    let right = Math.max(...piles);

    // calculate rate feasibility
    const feasible = (rate) => {
        return piles.reduce((a, b) =>  a + Math.floor((b - 1) / rate) + 1, 0) <= h;
    };

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        // check if rate is feasible
        if (feasible(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};

console.log("\nKoko Eating Bananas");
console.log(kokoEatingBananas([30,11,23,4,20], 6));

/**
 * Minimum number of coins to be added
 * @param {number[]} coins
 * @param {number} target
 * @return {number}
 */
var minimumAddedCoins = function(coins, target) {
    coins.sort((a, b) => a - b );
    let sum = 0; // current max
    let n = 0; // additional coins
    let i = 0; // index

    while (sum < target) {
        if (i < coins.length && coins[i] <= sum + 1) {
            sum += coins[i];
            i++;
        } else {
            sum += sum + 1; // val of coin to be added is sum + 1
            n++; // a coin needs to be added
        }
    }
    return n; 
};

console.log("\nMinimum Number of Coins to be Added");
console.log(minimumAddedCoins([1,4,10,5,7,19], 19));
console.log(minimumAddedCoins([1,4,10], 19));
console.log(minimumAddedCoins([1,1,1], 20));

/*
  Median of Two Sorted Arrays
  The overall run time complexity should be O(log (m+n))
*/