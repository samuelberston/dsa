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

    insertNode(val) {
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
        dfs(this.tree);
    }

    removeNode(key) {
        // edge cases
        if (!this.tree) return null; // no root node
        if (!this.tree.left && !this.tree.right) { // only one node
            if (this.tree.val = key) { // if only node is the key node
                this.tree = null; // remove it
            }
        } 

        // Step 1: Use bfs to find the deepest node in the tree, and a pointer to the key node 
        let q = [];
        q.push(this.tree);
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

    deleteDeepestNode(dNode) {
        // bfs
        let q = [];
        q.push(this.tree);
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

    getMaxDepth() {
        const dfs = (root) => {
            if (!root) return 0;

            return Math.max(dfs(root.left), dfs(root.right)) + 1;
        };
        return dfs(this.tree);
    }

    flip(root = this.tree) {
        if (!root) return;
        // flip operation
        let tmp = root.left;
        root.left = root.right;
        root.right = tmp;

        // recursive operation
        if (root.left) this.flip(root.left);
        if (root.right) this.flip(root.right);
    }


}

// Tree Practice Driver Code
console.log("\nTree Practice");
console.log("\nAdding nodes to b-tree...");
const bTree = new BinaryTree(1);
bTree.insertNode(2);
bTree.insertNode(3);
bTree.insertNode(4);
bTree.insertNode(5);
console.log("b-tree: ", bTree);
console.log("\nDeleting a node from the b-tree...");
bTree.removeNode(3);
console.log("b-tree: ", bTree);
console.log("\nGetting max depth of the b-tree...");
const bTreeMaxDepth1 = bTree.getMaxDepth();
console.log("bTreeMaxDepth: ", bTreeMaxDepth1);
console.log("\nAdding more nodes to the b-tree...");
bTree.insertNode(6);
bTree.insertNode(7);
console.log("\nGetting udpated max depth of the b-tree...");
const bTreeMaxDepth2 = bTree.getMaxDepth();
console.log("bTreeMaxDepth: ", bTreeMaxDepth2);
console.log("\nFlipping binary tree...");
bTree.flip();
console.log("Flipped tree: ", bTree.tree);

