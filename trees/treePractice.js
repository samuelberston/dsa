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
        // dfs
        const dfs = (root) => {
            // add child node if possible, starting with the left child
            if (!root.left) {
                root.left = new Node(val);
                return;
            }
            if (!root.right) {
                root.right = new Node(val);
                return;
            }

            // recurse on child nodes
            dfs(root.left);
            dfs(root.right);
        }
        dfs(root);
    }

    removeNode(key, root = this.tree) {
        // edge cases
        if (!root) return null; // no root node
        if (!root.left && !root.right) { // only one node
            if (root.val = key) { // if only node is the key node
                root = null; // remove it
            }
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

            // Add children to queue
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
    }

    getMaxDepth(root = this.tree) {
        const dfs = (root) => {
            if (!root) return 0;

            return Math.max(dfs(root.left), dfs(root.right)) + 1;
        };
        return dfs(root);
    }

    flip(root = this.tree) {
        if (!root) return;

        // flip operation
        let tmp = root.left;
        root.left = root.right;
        root.right = tmp;

        // recursive operations
        if (root.left) this.flip(root.left);
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
            if (!root) return 0;

            // Recursively get depth of subtrees
            const lDepth = dfs(root.left);
            const rDepth = dfs(root.right);

            // Unbalanced tree
            if(Math.abs(lDepth - rDepth) > 1) return -1;
            if (lDepth === -1 || rDepth === -1) return -1;

            // Return height of current subtree
            return Math.abs(lDepth, rDepth) + 1;
        }

        return dfs(root) !== -1;
    }


}

// Tree Practice Driver Code
console.log("\nTree Practice");
console.log("\nAdding nodes to b-tree...");
const tree = new BinaryTree(1);
tree.insertNode(2);
tree.insertNode(3);
tree.insertNode(4);
tree.insertNode(5);
console.log("b-tree: ", tree);
console.log("\nDeleting a node from the b-tree...");
tree.removeNode(3);
console.log("b-tree: ", tree);
console.log("\nGetting max depth of the b-tree...");
const bTreeMaxDepth1 = tree.getMaxDepth();
console.log("bTreeMaxDepth: ", bTreeMaxDepth1);
console.log("\nAdding more nodes to the b-tree...");
tree.insertNode(6);
tree.insertNode(7);
console.log("\nGetting udpated max depth of the b-tree...");
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
        const dfs = (root) => {
            if (val < root.val) {
                if (!root.left) {
                    root.left = new Node(val);
                    return;
                } else {
                    dfs(root.left);
                }

            } else if (val >= root.val) {
                if (!root.right) {
                    root.right = new Node(val);
                } else {
                    dfs(root.right);
                }
            }
        }
        dfs(root);
    }

    // Least common ancestor of two nodes
    LCA(node1, node2, root = this.tree) {
        // edge case - ensure node1 is < node2
        if (node1 > node2) {
            [node1, node2] = [node2, node1];
        }

        const dfs = (root) => {
            if (root.val >= node1 && root.val <= node2) {
                return root.val;
            }
            if (root.val > node2) {
                return dfs(root.left);
            }
            if (root.val < node1) {
                return dfs(root.right);
            }
        }
       return dfs(root);
    }

}

// BinarySearchTree driver code
console.log("\n**Binary Search Tree**");
const BST = new BinarySearchTree(6);
console.log("\nBST: ", BST);
console.log("\nInserting nodes...");
BST.insertNode(3);
BST.insertNode(8);
BST.insertNode(1);
BST.insertNode(7);
BST.insertNode(5);
BST.insertNode(10);
const LCA = BST.LCA(7, 10);
console.log("\nLeast common ancestor of 7 and 10: ", LCA);


// enumeration of binary tree (# trees with n nodes)

// AVL tree