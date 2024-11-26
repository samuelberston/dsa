/**
 * 
 * 2016. Maximum Difference Between Increasing Elements
 * Given a 0-indexed integer array nums of size n, find the maximum difference between nums[i] and nums[j] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j].
 * Return the maximum difference. If no such i and j exists, return -1.
 * 
 * Example:
 * - [7,1,5,4]
 * - returns 4
 * 
 * @param {number[]}
 * @return {number}
 */
var maximumDifference = function(nums) {
    // Step 1: Initialize variables
    let p0 = 0;
    let p1 = 1;
    let maxDif = -1;
    let currDif;
    while (p1 < nums.length) {
        // Check to update min
        if (nums[p1] < nums[p0]) {
            p0 = p1; // move the pointer to the new min
        }

        // Check for new maxDif
        currDif = nums[p1] - nums[p0];
        if (currDif > 0) {
            console.log("min: ", nums[p0])
            console.log("currDiff: ", currDif);
            console.log("maxDiff: ", maxDif);
            console.log();
            maxDif = maxDif < currDif ? currDif : maxDif; 
        }
        p1++; 
    }

    return maxDif;
};

// Driver code
const test1 = [7,1,5,4];
const res1 = maxDif(test1);
console.log(res1); // 4

const test2 = [1, 4, 3, 9, 6]; 
const res2 = maxDif(test2);
console.log(res2); // 8


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if (!postorder.length || !inorder.length) return null;

    // current root is last element of the postorder array
    const curr = postorder.pop();
    const root = new TreeNode(curr);

    // find the index of the root in the inorder array
    const rootInd = inorder.indexOf(curr);

    // divide the inorder array into left and right subtrees
    const leftInorder = inorder.slice(0, rootInd);
    const rightInorder = inorder.slice(rootInd+1);

    // divide the postorder array into left and right subtrees
    const leftPostorder = postorder.slice(0, leftInorder.length);
    const rightPostorder = postorder.slice(leftInorder.length);

    // recursively build the left and right subtrees
    root.left = buildTree(leftInorder, leftPostorder);
    root.right = buildTree(rightInorder, rightPostorder);

    return root;
};