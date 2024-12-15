const test = (condition) => { if (condition) console.log('PASSED'); else console.log('FAILED'); }
/**
 * Max Consecutive Ones
 * 
 * You have an input array nums and an integer k representing how many 0's you can flip
 * 
 * Example:
 * - input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
 * Output: 6
 * 
 * Approach: Use two pointers, track how many flipped, once flipped reaches max, move pointer past last zero and update max 
 */
const maxOnes = (nums, k) => {
    let max = 0;
    let flips = 0;

    // Sliding window
    let left = 0;
    for (let i = left; i < nums.length; i++) {
        if (nums[i] === 0) flips++;
        while (flips > k) {
            flips -= 1 - nums[left];
            left++;
        }
        max = Math.max(max, i - left + 1);
    }
    return max;
};

// Max Consecutive Ones driver code
console.log("\nMax Consecutive Ones");
process.stdout.write("Test 1: ");
test(maxOnes([1,1,1,0,0,0,1,1,1,1,0], 2) === 6);
process.stdout.write("Test 2: ");
test(maxOnes([1,1,1,0,0,0,1,1,1,1,0], 3) === 10);

/**
 *      Lowest Common Ancestor of BST
 * 
 * Example: root = [6,2,8,0,4,7,9,null,null,3,5], p = 3, q = 5
 * Returns: 4
 * 
 */
const LCA = (root, p, q) => {
    while(root) {
        // Move left
        if (root.val > q) root = root.left;
        // Move right
        else if (root.val < p) root = root.right;
        // base case - between two vals
        else return root.val;
    }
    return -1; // no LCA found;
};

// LCA Driver code  
console.log("\nLowest Common Ancestor of BST");

class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const root = new TreeNode(6, new TreeNode(2, new TreeNode(0), new TreeNode(4, new TreeNode(3), new TreeNode(5))), new TreeNode(8, new TreeNode(7), new TreeNode(9)));
process.stdout.write("Test 1: ");
test(LCA(root, 3, 5) === 4);


/**
 * 
 * Find Leaves of a Binary Tree
 * 
 * Example: [1,2,3,4,5]
 * Output: [[4,5,3],[2],[1]]
 */
const findLeaves = (root) => {
    if (!root) return [];

    // Trim with DFS
    const trim = (root, leaves = []) => {
        // base case
        if (!root) return;
        if (!root.left && !root.right) {
            leaves.push(root.val);
            root.val = null;
            return true;
        }

        // recursive cases
        if (root.left && trim(root.left, leaves)) root.left = null;
        if (root.right && trim(root.right, leaves)) root.right = null;
        return false;
    }

    // Iteratively trim tree
    const result = [];
    while (root && root.val) {
        const leaves = [];
        trim(root, leaves);
        result.push(leaves);

    }
    return result;
};

// Trim Tree Driver code
console.log("\nFind Leaves of a Binary Tree");
process.stdout.write("Test 1: ");
const root1 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
test(JSON.stringify(findLeaves(root1)) === JSON.stringify([[4,5,3],[2],[1]]));

/**
 * 
 * Combination Sum
 * Given a set of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
 * 
 * Example: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 */
const comboSum = (nums, target) => {
    const result = [];
    const map = new Map(); // prevent duplicates

    const backtrack = (start = 0, combo = [], sum = 0) => {
        // base cases
        if (sum > target) return false; // Invalid combo
        if (sum === target) {
            combo = combo.sort();
            const key = JSON.stringify(combo);
            if (!map.has(key)) {
                map.set(key, true);
                result.push([...combo]);
            }
            return;
        }
        
        // recursive cases
        for (let i = start; i < nums.length; i++) {
            const cur = nums[i];
            // skip duplicaters
            if (i > 0 && cur === cur[i - 1]) continue;
            combo.push(cur);
            backtrack(i + 1, combo, sum + cur);
            combo.pop(); // backtrack
        }
    }
    backtrack();

    return result;
};

// Combination Sum Driver code
console.log("\nCombination Sum");
process.stdout.write("Test 1: ");
test(JSON.stringify(comboSum([2, 2, 3, 6, 7], 7)) === JSON.stringify([[2,2,3],[7]]));
process.stdout.write("Test 2: ");
test(JSON.stringify(comboSum([2, 3, 6, 7], 7)) === JSON.stringify([[7]]));
