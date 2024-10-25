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
