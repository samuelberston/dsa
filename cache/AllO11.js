/**
 * 
 * All O(1) Data Structure
 * Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.  
 * Implement the AllOne class:
 * AllOne() Initializes the object of the data structure.
 * inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
 * dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
 * getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
 * getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
 * Note that each function must run in O(1) average time complexity.
 * 
 * Example 1:
 * Input
 * ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
 * [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
 * Output
 * [null, null, null, "hello", "hello", null, "hello", "leet"]
 * 
 * Explanation
 */
class ListNode {
    constructor(key, freq = 1) {
        this.keys = [key];
        this.freq = freq;
        this.prev = this.next = null;
    }
}

class AllO1 {
    constructor() {
        this.map = new Map(); // map key to freq node
        this.head = new ListNode(-1, 0);
        this.tail = new ListNode(-1, 0);
        this.head.next = this.tail;
        this.tail.next = this.head;
    }

    // helper functions 
    removeNode(node) {
        const {prev, next} = node;
        prev.next = next;
        next.prev = prev;
    }

    removeNodeKey(node, key) { node.keys = node.keys.filter(k => k !== key); }

    insertNodeBefore(node, newNode) {
        const tmp = node.prev;
        node.prev = newNode;
        newNode.next = node;
        newNode.prev = tmp;
        tmp.next = newNode;
    }

    insertNodeAfter(node, newNode) {
        const tmp = node.next;
        node.next = newNode;
        newNode.prev = node;
        newNode.next = tmp;
        tmp.prev = newNode;
    }

    // inc
    inc(key) {
        if (!this.map.has(key)) {                           // Case 1 - key does not already exist                    
            if (this.head.next.freq !== 1) {                // Case 1a - freq 1 node does not already exist - create it
                const newNode = new ListNode(key);
                this.insertNodeAfter(this.head, newNode);
                this.map.set(key, newNode);
            } else {                                        // Case 1b - freq 1 node already exists - update map and node keys 
                this.head.next.keys.push(key);
                this.map.set(key, this.head.next);
            }
        } else {                                            // Case 2 - key already exists
            const curNode = this.map.get(key);
            if (curNode.next.freq !== curNode.freq + 1) {   // Case 2a - freq+1 node does not exists - create it
                const newNode = new ListNode(key, curNode.freq+1);
                this.insertNodeAfter(curNode, newNode);
                this.map.set(key, newNode);
            } else {                                        // Case 2b - freq+1 node exists - update map and node keys
                curNode.next.keys.push(key);
                this.map.set(key, curNode.next);
            }
            // Clean up - if curNode now has no keys, remove it
            if (curNode.keys.length === 1) this.removeNode(curNode);
            else this.removeNodeKey(curNode, key);
        }
    }

    // dec
    dec(key) {
        const curNode = this.map.get(key);      
        if (curNode.freq === 1) {                                          // Case 1 - key points to freq 1 node
            if (curNode.keys.length === 1) this.removeNode(curNode);        // Case 1a - freq1 node has one key - delete node and update map
            else this.removeNodeKey(curNode, key);                         // Case 1b - remove from freq1 node keys and map 
            this.map.delete(key);
        } else {                                                           // Case 2 - key points to freq>1 node
            if (curNode.prev.freq !== curNode.freq - 1) {                  // Case 2a - node with freq-1 does not exist, create it and update map
                const newNode = new ListNode(key, curNode.freq-1);
                this.insertNodeBefore(curNode, newNode);
                this.map.set(key, newNode);
            } else {                                                      // Case 2b - node with freq-1 exists - update node keys and map
                curNode.prev.keys.push(key);
                this.map.set(key, curNode.prev);
            }                                  
            // cleanup
            if (curNode.keys.length === 1) this.removeNode(curNode)
            else this.removeNodeKey(curNode, key);
        }
    }

    // getMaxKey
    getMaxKey() {
        return this.tail.prev.keys[0] || '';
    }

    // getMinKey
    getMinKey() {
        return this.head.next.keys[0] || '';
    }
}

// All O(1) - driver code
console.log("\nAll O(1) Data Structure");
const allO1 = new AllO1();

const test = (condition) => {if (condition) {console.log("PASSED")} else {console.log("FAILED")}}

process.stdout.write("\nTEST CASE 1: Insert new string using inc method: ");
allO1.inc('string1');
test(allO1.head.next.keys[0] === 'string1' && allO1.head.next.freq === 1 &&
    allO1.tail.prev.keys[0] === 'string1' && allO1.tail.prev.freq === 1);

process.stdout.write("\nTEST CASE 2: Increment existing string using inc method: ");
allO1.inc('string1');
test(allO1.head.next.keys[0] === 'string1' && allO1.head.next.freq === 2 &&
    allO1.tail.prev.keys[0] === 'string1' && allO1.tail.prev.freq === 2);

process.stdout.write("\nTEST CASE 3: Inc a new string using inc method: ");
allO1.inc('string2');
test(allO1.head.next.keys[0] === 'string2' && allO1.head.next.freq === 1 &&
    allO1.tail.prev.keys[0] === 'string1' && allO1.tail.prev.freq === 2);

process.stdout.write("\nTEST CASE 4: getMaxKey: ");
test(allO1.getMaxKey() === 'string1');

process.stdout.write("\nTEST CASE 5: getMinKey: ");
test(allO1.getMinKey() === 'string2');

process.stdout.write("\nTEST CASE 6: Use dec method to decrement key with freq 2: ");
allO1.dec('string1');
test(allO1.head.next.keys.length === 2 && allO1.head.next.freq === 1 &&
    allO1.tail.prev.keys.length === 2 && allO1.tail.prev.freq === 1);

process.stdout.write("\nTEST CASE 7: Dec key with freq1 deletes key: ");
allO1.dec('string2');
test(allO1.head.next.keys[0] === 'string1' && allO1.head.next.freq === 1 &&
    allO1.tail.prev.keys[0] === 'string1' && allO1.tail.prev.freq === 1);

process.stdout.write("\nTEST CASE 8: dec remaining key with freq one deletes last key: ");
allO1.dec('string1');
test(allO1.head.next === allO1.tail && allO1.tail.next === allO1.head);