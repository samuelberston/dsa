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
        if (sum > target) return; // Invalid combo
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

/**
 * Maximum Subarray Sum 
 * 
 * Example: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 */
const maxSubSum = (nums) => {
    // edge case
    if (nums.length === 1) return nums[0];

    let max = -Infinity;
    let curSum = 0;
    
    // iterate nums, track max and cur
    for (let i = 0; i < nums.length; i++) {
        curSum += nums[i];
        if (curSum < 0) curSum = 0;
        max = Math.max(max, curSum);
    }
    return max;
}

// Maximum Subarray Sum Driver code
console.log("\nMaximum Subarray Sum");
process.stdout.write("Test 1: ");
test(maxSubSum([-2,1,-3,4,-1,2,1,-5,4]) === 6);
process.stdout.write("Test 2: ");
test(maxSubSum([1]) === 1);
process.stdout.write("Test 3: ");
test(maxSubSum([5,4,-1,7,8]) === 23);
process.stdout.write("Test 4: ");
test(maxSubSum([-1]) === -1);


/**
 * 
 * Insert Delete GetRandom O(1)
 * 
 * Example: 
 * 
 */
class RandomizedCollection {
    constructor() {
        this.map = new Map(); // Maps val to Set of indices in list
        this.list = []; // List of elements in collection
    }

    insert(val) {
        const indices = this.map.get(val) || new Set();
        indices.add(this.list.length);
        this.map.set(val, indices);
        this.list.push(val);
        return indices.size === 1; // Returns true if this is the first occurrence
    }

    remove(val) {
        if (!this.map.has(val)) return false;
        
        // Get indices set for this value
        const indices = this.map.get(val);
        const indexToRemove = indices.values().next().value;
        const lastIndex = this.list.length - 1;
        const lastElement = this.list[lastIndex];

        // Swap with last element
        this.list[indexToRemove] = lastElement;
        
        // Update indices
        indices.delete(indexToRemove);
        if (indices.size === 0) this.map.delete(val);

        const lastElementIndices = this.map.get(lastElement);
        if (lastElement !== val) {
            lastElementIndices.delete(lastIndex);
            lastElementIndices.add(indexToRemove);
        } else {
            indices.delete(lastIndex);
            if (indexToRemove !== lastIndex) indices.add(indexToRemove);
        }

        // Remove last element
        this.list.pop();
        return true;
    }
    
    getRandom() {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
}



/** 
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
console.log("\nInsert Delete GetRandom O(1)");
const obj = new RandomizedCollection();
process.stdout.write("Test 1: ");
test(obj.insert(1)); // true
process.stdout.write("Test 2: ");
test(!obj.insert(1)); // false
process.stdout.write("Test 3: ");
test(obj.insert(2)); // true
process.stdout.write("Test 4: ");
let random = obj.getRandom();
test(random === 1 || random === 2); // 1 or 2
process.stdout.write("Test 5: ");
test(obj.remove(1)); // true
process.stdout.write("Test 6: ");
random = obj.getRandom();
test(random === 1 || random === 2); // 1 or 2
