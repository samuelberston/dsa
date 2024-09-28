// the trie data structure
class TrieNode {
    children;
    wordEnd;
    constructor() {
        this.children = {};
        this.wordEnd = false;
        this.instances = 0;
    }

    insert(word) {
        let currentNode = this;
        // iterate through each char in word
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            // add the char node if not present
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            // iterate to that char node
            currentNode = currentNode.children[char];
        }
        // end the word
        currentNode.wordEnd = true;
        // increment instances
        currentNode.instances++;
    }

    search(word) {
        let currentNode = this;
        // iterate through each char in word
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            // return false if the char is not present
            if (!currentNode.children[char]) {
                return false;
            }
            // iterate to the char node
            currentNode = currentNode.children[char];
        }
        return currentNode.wordEnd;
    }

    startsWith(prefix) {
        // get the current node children
        let currentNode = this;
        // iterate through each char in prefix
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            // return false if the char is not one of the children
            if (!currentNode.children[char]) {
                return false;
            }
            // iterate to the next node
            currentNode = currentNode.children[char];
        }
        // return true bc it doesn't matter if it's a word end
        return true;
    }

    countWords(word) {
        let currentNode = this;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            // return 0 if there's no word
            if (!currentNode.children[char]) { 
                return 0;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.instances;
    }

    countWordsStartingWith(prefix) {
        // first, iterate to the last char in prefix node
        // then, recursively count all word instances of child nodes
        let currentNode = this;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            // return 0 if no words
            if (!currentNode.children[char]) {
                return 0;
            }
            currentNode = currentNode.children[char];
        }
        // recursively count all word instances in all child nodes
        console.log("current node: ", currentNode);
        let count = 0;
        function countInstances(node) {
            // base case: non-existent child
            if (!node) { return; }
            console.log("node: ", node);
            // add the instances to count
            count += node.instances;
            // recursively visit child nodes
            let childrenKeys = Object.keys(node.children);
            console.log("childrenKeys: ", childrenKeys);
            if (childrenKeys.length > 0) {
                for (let j = 0; j < childrenKeys.length; j++) {
                    let childKey = childrenKeys[j];
                    countInstances(node.children[childKey]); 
                }
            }
        }
        countInstances(currentNode);
        return count;
    }

    erase(word) {
        console.log("erase");
        function eraseHelper(node, word, depth) {
            // base case: no child node
            if (!node) { 
                return false; 
            }
            // if we've reached the end of the word
            if (word.length == depth) {
                // the node is no longer a wordEnd
                if (node.wordEnd) {
                    node.instances--;
                    if (node.instances == 0) {
                        node.wordEnd = false;
                    }
                }
                // delete node if it has no children
                return Object.keys(node.children).length == 0;
            }

            const char = word[depth];
            const childNode = node.children[char];

            // recursively delete the child nodes
            if (eraseHelper(childNode, word, depth+1)) {
                delete node.children[char];
                 // If the current node is not the end of another word and has no children, it can be deleted
                return !node.wordEnd && Object.keys(node.children).length === 0;
            }

            return false;
        }
        eraseHelper(this, word, 0);
    }    
}

// driver code
trie = new TrieNode(); //root node
console.log(trie);
trie.insert("cat");
console.log(trie);
ca = trie.search("ca");
cat = trie.search("cat")
console.log("ca: ", ca);
console.log("cat: ", cat);
trie.insert("cats");
cats = trie.search("cats");
console.log("cats: ", cats);
trie.insert("care");
carPrefix = trie.startsWith("car");
console.log("carPrefix: ", carPrefix);
console.log("cat instances: ", trie.countWords("cat"));
trie.insert("cat");
console.log("cat instances after adding: ", trie.countWords("cat"));
instancesStartingWithCa = trie.countWordsStartingWith("ca");
console.log("instancesStartingWithCa: ", instancesStartingWithCa);
console.log("a node before deleting cats: ", trie.children.c.children.a);
console.log("deleting cats from trie");
trie.erase("cats");
console.log("cats: ", trie.search("cats"));
console.log("a node after deleting cats: ", trie.children.c.children.a);
