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
