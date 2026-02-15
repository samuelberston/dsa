// --- TREES CRAM (CEO mandate) ---
// Use this node shape (LeetCode/HackerRank standard). Your repo uses Node with .data — same idea, use .val here.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// ========== 1. MAX DEPTH OF BINARY TREE (Easy) ==========
// Given the root of a binary tree, return its maximum depth.
// Max depth = number of nodes along the longest path from root to leaf.
const maxDepth = (root) => {
  if (root == null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// Test tree: [3, 9, 20, null, null, 15, 7]  →  depth 3
function buildTree1() {
  const root = new TreeNode(3);
  root.left = new TreeNode(9);
  root.right = new TreeNode(20);
  root.right.left = new TreeNode(15);
  root.right.right = new TreeNode(7);
  return root;
}
console.log("Max Depth TEST 1:", maxDepth(buildTree1()) === 3 ? "PASSED" : "FAILED");
console.log("Max Depth TEST 2:", maxDepth(null) === 0 ? "PASSED" : "FAILED");

// ========== 2. BINARY TREE LEVEL ORDER TRAVERSAL (Medium) ==========
// Given the root of a binary tree, return the level-order traversal as an array of arrays.
// Each inner array is one level, left to right. Example: [[3], [9, 20], [15, 7]]
// Approach: Use a q to process each level, and build the current level each time
const levelOrder = (root) => {
  // edge case 
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const levelSize = q.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = q.shift();
      currentLevel.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
};

function buildTree2() {
  const root = new TreeNode(3);
  root.left = new TreeNode(9);
  root.right = new TreeNode(20);
  root.right.left = new TreeNode(15);
  root.right.right = new TreeNode(7);
  return root;
}
console.log(
  "Level Order TEST 1:",
  JSON.stringify(levelOrder(buildTree2())) === JSON.stringify([[3], [9, 20], [15, 7]])
    ? "PASSED"
    : "FAILED"
);
console.log("Level Order TEST 2:", JSON.stringify(levelOrder(null)) === JSON.stringify([]) ? "PASSED" : "FAILED");
