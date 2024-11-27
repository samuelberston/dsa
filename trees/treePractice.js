// tree practice
class Node {
    constructor(val) {
        this.val = val;
        this.right = this.left = null;
    }
}

class BinaryTree {
    constructor(root) {
        this.tree = new Node(root);
    }

    insertNode(val, root = this.tree) {
        // add child node if possible, starting with the left child
        if (!root.left) {
            root.left = new Node(val);
            return;
        }

        if (!root.right) {
            root.right = new Node(val);
            return;
        }

        // recurse on subtrees
        this.insertNode(val, root.left);
        this.insertNode(val, root.right);
    }

    removeNode(key, root = this.tree) {
        // edge cases
        if (!root) return null; // no root node
        if (!root.left && !root.right && root.val === key) { // if only node is the key node
            root = null; // remove it
        } 

        // Step 1: Use bfs to find the deepest node in the tree, and a pointer to the key node 
        let q = [];
        q.push(root);
        let keyNode = null; // pointer to node to delete
        let curr;

        while (q.length) {
            curr = q.shift();

            // found node to delete
            if (curr.val === key) keyNode = curr;

            // continue search
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
        
        // If the key was found, use helper function to delete it
        if (keyNode) {
            let x = curr.val; // data from last node
            
            keyNode.val = x; // Update node to delete with data from deepest node

            this.deleteDeepestNode(curr);
        }
    }

    deleteDeepestNode(dNode, root = this.tree) {
        // bfs
        let q = [];
        q.push(root);
        let curr;
        while (q.length) {
            curr = q.shift();

            if (curr === dNode) {
                curr = null;
                return;
            }

            if (curr.left === dNode) {
                curr.left = null;
                return;        
            }

            if (curr.right === dNode) {
                curr.right = null;
                return;
            }

            // Continue search
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
    }

    getMaxDepth(root = this.tree) {
        if (!root) return 0;
        return Math.max(this.getMaxDepth(root.left), this.getMaxDepth(root.right)) + 1;
    }

    flip(root = this.tree) {
        if (!root) return;

        // flip operation
        let tmp    = root.left;
        root.left  = root.right;
        root.right = tmp;

        // recursive operations
        if (root.left)  this.flip(root.left);
        if (root.right) this.flip(root.right);
    }

    // shed a layer of leaves from the tree
    trim(root = this.tree) {
        // check for leaves
        if (root.left && !root.left.left && !root.left.right) root.left = null;
        if (root.right && !root.right.left && !root.right.right) root.right = null;
        
        // recursive operations
        if (root.left) this.trim(root.left);
        if (root.right) this.trim(root.right);
    }

    // Check for complete tree

    // Check for Balanced binary tree
    isBalanced(root = this.tree) {
        const dfs = (root) => {
            // Base case - depth of zero
            if (!root) return 0;

            // Recursively get depth of subtrees
            const lDepth = dfs(root.left);
            const rDepth = dfs(root.right);

            // Check if tree is unbalanced, return -1 if so
            if (Math.abs(lDepth - rDepth) > 1) return -1;
            if (lDepth === -1 || rDepth === -1) return -1;

            // Return height of current subtree
            return Math.max(lDepth, rDepth) + 1;
        }    
        return dfs(root) !== -1;
    }
}

// Tree Practice Driver Code
console.log("\nTree Practice");
console.log("\nAdding nodes to binary tree...");
const tree = new BinaryTree(1);
tree.insertNode(2);
tree.insertNode(3);
tree.insertNode(4);
tree.insertNode(5);
console.log("b-tree: ", tree);
console.log("\nDeleting a node from the binary tree...");
tree.removeNode(3);
console.log("b-tree: ", tree);
console.log("\nGetting max depth of the binary tree...");
const bTreeMaxDepth1 = tree.getMaxDepth();
console.log("bTreeMaxDepth: ", bTreeMaxDepth1);
console.log("\nAdding more nodes to the binary tree...");
tree.insertNode(6);
tree.insertNode(7);
console.log("\nGetting udpated max depth of the binary tree...");
const bTreeMaxDepth2 = tree.getMaxDepth();
console.log("bTreeMaxDepth: ", bTreeMaxDepth2);
console.log("\nFlipping binary tree...");
tree.flip();
console.log("Flipped tree: ", tree.tree);
console.log("\nTrimming leaves from tree...");
tree.trim();
console.log("new max depth: ", tree.getMaxDepth());
console.log("\nChecking if tree is balanced...");
const isBalanced = tree.isBalanced();
console.log(isBalanced);


// Binary Search Tree
class BinarySearchTree {
    constructor(root) {
        this.tree = new Node(root);
    }

    insertNode(val, root = this.tree) {
        if (val < root.val) {
            if (!root.left) {
                root.left = new Node(val);
                return;
            } else {
                this.insertNode(val, root.left);
            }
        } else if (val >= root.val) {
            if (!root.right) {
                root.right = new Node(val);
            } else {
                this.insertNode(val, root.right);
            }
        }
    }

    deleteNode(val, root = this.tree) {
        // edge case - no root node
        if (!root) return null;

        // Step 1: Recursively find node to delete
        if (root.val < val) {
            root.right = this.deleteNode(val, root.right);
            return root;
        } 
        if (root.val > val) {
            root.left = this.deleteNode(val, root.left);
            return root;
        } 
        
        // Step 2: Found node to delete, handle 3 cases:
        // Case 1: Leaf node - just delete it
        if (!root.left && !root.right) {
            return null;
        }

        // Case 2: Node has one child - replace with child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Node has two children - find successor
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }

        // Replace current node value with successor
        root.val = successor.val;

        // Delete the successor
        root.right = this.deleteNode(successor.val, root.right);
        return root;
    }

    // Least common ancestor of two nodes
    LCA(node1, node2, root = this.tree) {
        // edge case - ensure node1 is < node2
        if (node1 > node2) {
            [node1, node2] = [node2, node1];
        }

        if (root.val >= node1 && root.val <= node2) {
            return root.val;
        }
        if (root.val > node2) {
            return this.LCA(node1, node2, root.left);
        }
        if (root.val < node1) {
            return this.LCA(node1, node2, root.right);
        }
    }

    // find Min
    findMin(root = this.tree) {
        while(root.left) {
            root = root.left;
        }
        return root.val;
    }

    // find Max
    findMax(root = this.tree) {
        while(root.right) {
            root = root.right;
        }
        return root.val;
    }

    // find Kth smallest
    // isValidBST
}

// BinarySearchTree driver code
console.log("\n**Binary Search Tree**");
const BST = new BinarySearchTree(6);
console.log("\nInserting nodes...");
BST.insertNode(3);
BST.insertNode(8);
BST.insertNode(1);
BST.insertNode(7);
BST.insertNode(5);
BST.insertNode(10);
const LCA = BST.LCA(7, 10);
console.log("\nLeast common ancestor of 7 and 10: ", LCA);
console.log("\nDeleting node 7...");
BST.deleteNode(7);
console.log("BST: ", BST);
console.log("\nFinding min node in BST...");
const min = BST.findMin();
console.log(min);
console.log("\nFinding max node in BST...");
const max = BST.findMax();
console.log(max);

// enumeration of binary tree (# trees with n nodes)

// AVL tree