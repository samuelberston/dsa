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
  Find Minimum in Rotated Sorted Array
*/


/*
  3 sum
*/



/*
  Trapping Rain Water
*/