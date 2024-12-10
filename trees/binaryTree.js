// practicing tree algorithms on the binary tree data structure
// algorithms:
// - recursive inorder traversal
// - reverse binary tree (flip)
// - serialize/deserialize binary tree with recursive preorder traversal
// - recursive check height
// - recursive check identical tree
// - recursive level order traversal
// - recursive check tree is subtree
// - recursive inorder DFS check is valid BST
// - iterative breadth-first search with a queue
const test = (condition) => {if (condition) console.log("PASSED"); else console.error("ERROR");}
// node of the binary tree
class Node {
    constructor(item) {
        this.data = item;
        this.right = this.left = null;
    }
}

// construct an in order binary tree
const binaryTree = new Node(4);
binaryTree.left = new Node(2);
binaryTree.right = new Node(5);
binaryTree.left.left = new Node(1);
binaryTree.left.right = new Node(3);

console.log(binaryTree);

// in order traversal of the binaryTree
function inorder(root) {
    // base case: nothing to print
    if (!root) { return; }
    inorder(root.left);
    console.log(root.data);
    inorder(root.right);
}

console.log("In order traversal of binary tree: ")
inorder(binaryTree);

// flip the tree
function flip(root) {
    // base case: no children
    if (!root) { return null; }
    root.left = flip(root.left);
    root.right = flip(root.right);

    // flip the two sides
    let tmp = root.left;
    root.left = root.right;
    root.right = tmp;

    return root;
}

console.log("flip binary tree and print in order: ")
flip(binaryTree);
inorder(binaryTree);
// flip it back
flip(binaryTree);

// serialize/deserialize tree to string and back
let serializedTree = "";
function serialize(root) {
    // preorder traversal
    if (root) {
        serializedTree += JSON.stringify(root.data);
        serialize(root.left);
        serialize(root.right);
    } else {
        serializedTree += "#";
    }
    return serializedTree;
}
console.log("serialized binary tree string: ")
const serializedString = serialize(binaryTree)
console.log(serializedString);

// modify the globally-scoped serializedString through the execution of the recursive function
let treeString = serializedString;
function deserialize() {
    // at each recursion, take the first character from the string
    let data = treeString.charAt(0);
    treeString = treeString.slice(1);
    if (data == "#") {
        return null;
    }
    // pre order build
    let node = new Node(parseInt(data));
    node.left = deserialize();
    node.right = deserialize();
    return node;
}

const deserializedTree = deserialize(serializedString);
console.log("deserizalized binary tree: ")
console.log(deserializedTree);

// check height of the tree
function checkHeight(root) {
    // base case: non-existent node is level 0
    if (!root) return 0;

    // return the max height of either side
    return Math.max(checkHeight(root.left), checkHeight(root.right)) + 1;
}

const height = checkHeight(binaryTree);
console.log("height: ", height);

// add a node and check the height
binaryTree.left.left.right = new Node(6);
console.log("new height: ", checkHeight(binaryTree));

// an identical tree
const identicalTree = new Node(4);
identicalTree.left = new Node(2);
identicalTree.right = new Node(5);
identicalTree.left.left = new Node(1);
identicalTree.left.right = new Node(3);
identicalTree.left.left.right = new Node(6);

// a non-identical tree
const nonIdenticalTree = new Node(4);
nonIdenticalTree.left = new Node(2);
nonIdenticalTree.right = new Node(5);
nonIdenticalTree.left.left = new Node(1);
nonIdenticalTree.left.right = new Node(3);
nonIdenticalTree.right.left = new Node(6);

// check for identical trees
function checkIdentical(root1, root2) {
    // base case: finished recursing and both null
    if (root1 == null && root2 == null) return true;
    // non-identical: one is null
    if (root1 == null || root2 == null) return false;
    // non-identical: different data
    if (root1.data != root2.data) return false;

    // recurse through both sides
    return checkIdentical(root1.left, root2.left) && checkIdentical(root1.right, root2.right);
}

console.log("Trees should be identical: ");
console.log(checkIdentical(binaryTree, identicalTree));
console.log("Trees should not be identical: ");
console.log(checkIdentical(binaryTree, nonIdenticalTree));

// level-order traversal of a tree
let vals = {};
function levelOrder(root, level = 0) {
    // base case: no child node
    if (!root) return;
    vals[level] = vals[level] ? [...vals[level], root.data] : [root.data];
    levelOrder(root.left, level+1);
    levelOrder(root.right, level+1);
    return vals;
}

console.log("level order traversal: ");
console.log(levelOrder(binaryTree));

// check if tree is subtree of another tree
let subtree = new Node('yay');
subtree.left = new Node('huh?');
subtree.right = new Node('heyy');
subtree.left.left = new Node('huzzah!');
subtree.left.right = new Node('foo');

let actualSubtree = new Node(2);
actualSubtree.left = new Node(1);
actualSubtree.right = new Node(3);
actualSubtree.left.right = new Node(6);

// approach: dfs of input tree, for each node, run the checkIdentical algorithm
function checkSubtree(root, subtree) {
    // base case: there was no child
    if (!root) return false;
    // base case: empty subtree is a subtree
    if (!subtree) return true;

    // check every node and check if they're the same
    if (checkIdentical(root, subtree)) return true;
    // recursive case succeeds for either right or left
    return checkSubtree(root.left, subtree) || checkSubtree(root.right, subtree);
}

console.log("check if non-identical subtree is child of binaryTree: ");
console.log(checkSubtree(binaryTree, subtree));

console.log("check if actual subtree is a child of binaryTree: ");
console.log(checkSubtree(binaryTree, actualSubtree));

// is valid bst
// approach: in order dfs check data increasing order
function isValidBST(root, min = -Infinity, max = Infinity) {
    // base case: no node
    if (!root) return true;

    // check if the current node is within the min and max
    if (root.data <= min || root.data >= max) return false;

    return isValidBST(root.left, min, root.data) && isValidBST(root.right, root.data, max);
}

// BFS using a queue
function bfs(root) {
    //edge case: no root, return empty answer
    if (!root) return [];
    // use a queue to visit the nodes in level order
    let queue = [root];
    // serialize the nodes in an array
    let ans = [];
    // iteratively visit each node
    while (queue.length !== 0) {
        // add the first node in the queue to the ans (could be null for no child)
        let node = queue.shift();
        if (node) {
            ans.push(node.data);
            // child nodes might be null
            queue.push(node.left);
            queue.push(node.right);
        } else {
            ans.push("#");
        }
    }
    return ans;
}

// BFS driver code
console.log("\nBFS of binary tree: ");
let serializedBFS = bfs(binaryTree);
console.log(serializedBFS);

// find lowest common ancestor of two nodes in a BST
// approach: in a BST, the left child node is smaller and the right child node is greater than the parent
// so, the LCA is the first node that is in between the values of the two child nodes
// recursively check if the current node is smaller or larger than the two nodes and move accordingly
function findLCAofBST(root, n1, n2) {
    // edge case: no root:
    if (!root) { return; }
    // Ensure n1 is less than or equal to n2
    if (n1 > n2) {
        [n1, n2] = [n2, n1];
    }
    // base case: found the in between parent node
    if (n1 <= root.data && n2 >= root.data) {
        return root.data;
    }
    // recursive cases
    // current node is larger than both nodes: go to the left
    if (n1 < root.data && n2 < root.data) {
        return findLCAofBST(root.left, n1, n2);
    }
    // current node is smaller than both nodes; go right
    if (n1 > root.data && n2 > root.data) {
        return findLCAofBST(root.right, n1, n2);
    }
}

// driver code
console.log("\nFind LCA of BST");
const binarySearchTree = new Node(4);
binarySearchTree.left = new Node(2);
binarySearchTree.left.left = new Node(1);
binarySearchTree.left.right = new Node(3);
binarySearchTree.right = new Node(6);
binarySearchTree.right.left = new Node(5);
binarySearchTree.right.right = new Node(7);

// the LCA of nodes 5 and 7 is 6
const LCA = findLCAofBST(binarySearchTree, 5, 7);
console.log(LCA); // should be 6

/**
 *      Convert Sorted Array to Binary Search Tree
 * 
 *      Given an integer array nums where the elements are sorted in ascending order, convert it to a 
 *      height-balanced binary search tree.
 * 
 *      Approach: get the middle element, which will be the root node val. Split the array to the left and right.
 *                recursively build the subtrees using the same approach.
 * 
 *      Time Complexity: O(N)
 *      Space Complexity: O(log N) - recursion stack space bc tree is height balanced
 * 
 * @param {number[]} array
 * @return {Node}
 */
const arrayToBST = (array) => {

    const inner = (left, right) => {
        // base case
        if (left > right) return null;

        let p = Math.floor(left + (right - left) / 2);

        const root = new Node(array[p]);
        root.left = inner(left, p - 1);
        root.right = inner(p+1, right);
        return root;
    };

    return inner(0, array.length - 1);
};

// Sorted Array to BST driver code
console.log("\nSorted Array to BST");
const arr1 = [-10, -3, 0, 1, 5, 10];
const res1 = arrayToBST(arr1);
console.log("TEST CASE 1"); // use in order traversal to check tree is BST

const inOrder1 = [];
function inorder1(root) {
    // base case: nothing to print
    if (!root) { return; }
    inorder1(root.left);
    inOrder1.push(root.data);
    inorder1(root.right);
}
inorder1(res1);

if (JSON.stringify(inOrder1) === JSON.stringify(arr1)) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

/**
 *      Symmetric Tree
 * Given the root of a binary tree, check whether it is a 
 * mirror of itself (i.e., symmetric around its center).
 * 
 * 
 */
const symmetricTree = (root) => {
    const symmetrical = (root1, root2) => {
        // base cases
        if (!root1 && !root2) return true;
        if (!root1 || !root2) return false;
        if (root1.data !== root2.data) return false;
        // recursive case
        return symmetrical(root1.left, root2.right) && symmetrical(root1.right, root2.left)
    }
    return symmetrical(root.left, root.right);
};

console.log("\nSymmetric Tree");
process.stdout.write("TEST CASE 1: ");
const symTree = new Node(1);
symTree.left = new Node(2);
symTree.right = new Node(2);
symTree.left.left = new Node(3);
symTree.right.left = new Node(3);
symTree.left.right = new Node(3);
symTree.right.right = new Node(3);
if (symmetricTree(symTree)) console.log("SUCCESS"); else console.error("ERROR");

process.stdout.write("TEST CASE 2: ");
const asymTree = new Node(1);
asymTree.left = new Node(2);
asymTree.right = new Node(2);
asymTree.left.left = new Node(3);
asymTree.right.left = new Node(3);
asymTree.left.right = new Node(4);
asymTree.right.right = new Node(5);
if (!symmetricTree(asymTree)) console.log("SUCCESS"); else console.error("ERROR");

/**
 *      Balanced Binary Tree
 * 
 * Given a binary tree, determine if it is height-balanced.
 * A height-balanced binary tree is a binary tree in which the depth 
 * of the two subtrees of every node never differs by more than one.
 *      
 */
const isBalanced = (root) => {
    // helper function to check depth
    const checkDepth = (root) => {
        // base case
        if (!root) return 0; // depth of 0
        return Math.max(checkDepth(root.right), checkDepth(root.left)) + 1;
    }

    const compareDepth = (root) => {
        // base cases
        if (!root) return true;
        if (Math.abs(checkDepth(root.left) - checkDepth(root.right)) > 1) return false;
        // recursive case
        return compareDepth(root.left) && compareDepth(root.right);
    }
    return compareDepth(root);
};

console.log("\nBalanced Binary Tree");
process.stdout.write("TEST CASE 1: ");
const balancedTree = new Node(1);
balancedTree.left = new Node(2);
balancedTree.right = new Node(3);
balancedTree.right.left = new Node(4);
balancedTree.right.right = new Node(5);
if (isBalanced(balancedTree)) console.log("SUCCESS"); else console.error("ERROR");

process.stdout.write("TEST CASE 2: ");
const unbalancedTree = new Node(1);
unbalancedTree.left = new Node(2);
unbalancedTree.right = new Node(3);
unbalancedTree.right.left = new Node(4);
unbalancedTree.right.right = new Node(5);
unbalancedTree.right.left.left = new Node(6);
if (isBalanced(unbalancedTree)) console.log("SUCCESS"); else console.error("ERROR");

/**
 *      Sum Root to Leaf Numbers
 */
const sumNumbers = (root) => {
    let sum = 0;
    const dfs = (root, num) => {
        if (root) {
            // update num
            num *= 10;
            num += root.data;
            // base case
            if (!root.left && !root.right) {
                sum += num;
                return;
            }
            // recursive case
            dfs(root.left, num);
            dfs(root.right, num);
        }
    }
    dfs(root, 0);
    return sum;
};

console.log("\nSum Root to Leaf Numbers");
process.stdout.write("TEST CASE 1: ");
// reusing the balanced tree
if (sumNumbers(balancedTree) === 281) console.log("SUCCESS"); else console.error("FAILED");

process.stdout.write("TEST CASE 1: ");
// reusing the unbalanced tree
if (sumNumbers(unbalancedTree) === 1493) console.log("SUCCESS"); else console.error("FAILED");

/**
 *      Upside Down Binary Tree
 * 
 * Given the root of a binary tree, turn the tree upside down and return the new root.
 * 
 * 
 */
var upsideDownBinaryTree = function(root) {
    if (!root || !root.left) return root;

    const newRoot = upsideDownBinaryTree(root.left);

    root.left.right = root;
    root.left.left = root.right;
    root.left = null;
    root.right = null;

    return newRoot;
};

// Upside Down Binary Tree driver code
console.log("\nUpside Down Binary Tree");
process.stdout.write("TEST CASE 1: ");
const upsideDownTree = new Node(1);
upsideDownTree.left = new Node(2);
upsideDownTree.right = new Node(3);
upsideDownTree.left.left = new Node(4);
upsideDownTree.left.right = new Node(5);
const newRoot = upsideDownBinaryTree(upsideDownTree);
test(newRoot.data === 4 && newRoot.left.data === 5 && newRoot.right.data === 2 && newRoot.right.left.data === 3 && newRoot.right.right.data === 1);
