/*
    Dynamic Programming
    
    - Longest Common Subsequence
*/

/*
    Longest Common Subsequence
    Given two strings, S1 and S2, the task is to find the length of 
    the Longest Common Subsequence. If there is no common subsequence, return 0.

    Geeks for geeks - https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/
*/

/**
 *      Unique Binary Search Trees
 * 
 *  Given an integer n, return the number of structurally 
 *  unique BST's (binary search trees) which has exactly 
 *  n nodes of unique values from 1 to n.
 * 
 * @param {number} n
 * @return {number}
 */
const numTrees = (n) => {
    // Step 1: Set up G to tabulate results
    let G = new Array(n + 1).fill(0);
    // one BST config with 1 or 2 nodes
    G[0] = 1; 
    G[1] = 1;

    // Step 2: tabulate results by calculating the sum of products of preceding pairs
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            G[i] += G[j - 1] * G[i - j];
        }
    }
    return G[n];
};

console.log("\nUnique Binary Search Trees");
process.stdout.write("TEST CASE 1: ");
if (numTrees(3) === 5) {
    console.log("SUCCESS");
} else {
    console.error("ERROR");
}
process.stdout.write("TEST CASE 1: ");
if (numTrees(5) === 42) {
    console.log("SUCCESS");
} else {
    console.error("ERROR");
}

/**
 *  Pascal's Triangle II
 *  Given an integer rowIndex, return the rowIndex-th (0-indexed) row of the Pascal's triangle.
 * 
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    // tabulate each row of pascal's triangle from prev row
    let prev = [1];
    for (let i = 1; i < rowIndex + 1; i++) {
        // current row level
        let curr = Array(i+1).fill(1);
        for (let j = 1; j < i; j++) {
            curr[j] = prev[j-1] + prev[j];
        }
        prev = curr;
    }
    return prev;
};

// Pascal's Triangle II Driver Code
console.log("\nPascal's Triangle II");
process.stdout.write("TEST CASE 1: ");
console.log(JSON.stringify(getRow(3)) === JSON.stringify([1,3,3,1]) ? "PASSED" : "FAILED");

/**
 *      Nth Fibonacci Number
 * 
 *      Example: n = 5
 *      0, 1, 1, 2, 3, 5
 *      return: 5
 */
const nthFibonacci = (n) => {
    // edge case
    if (n <= 1) return n;

    // tabulate fibonacci sequence
    let curr = 0
    let prev1 = 0;
    let prev2 = 1;
    for (let i = 2; i <= n; i++) {
        curr = prev1 + prev2;

        prev1 = prev2;
        prev2 = curr;
    }

    return curr;
}

console.log("\nNth Fibonacci Number");
console.log(nthFibonacci(6)); // 8
