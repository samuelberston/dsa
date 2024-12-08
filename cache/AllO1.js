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
 */
class ListNode {
    constructor(key, freq) {
        this.keys = [key]; // array of key strings
        this.freq = freq; // frequency of key strings
        this.prev = this.next = null;
    }
}

class AllO1 {
    constructor() {
        this.map = new Map(); // store strings
        this.head = new ListNode(null, 0); // point to min count
        this.tail = new ListNode(null, 0); // point to max count
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // helper functions
    removeKey(key, node) {
        return node.keys.filter(k => k !== key);
    }

    removeNode(node) {
        const { prev, next } = node;
        next.prev = prev;
        prev.next = next;
    }

    addNodeBefore(curNode, newNode) {
        const tmp = curNode.prev;
        curNode.prev = newNode;
        newNode.next = curNode;
        newNode.prev = tmp;
        tmp.next = newNode;
    }    

    addNodeAfter(curNode, newNode) {
        const tmp = curNode.next;
        curNode.next = newNode;
        newNode.prev = curNode;
        newNode.next = tmp;
        tmp.prev = newNode;
    }

    // getMaxKey
    getMaxKey() {
        return this.tail.prev.keys[0] || "";
    }

    // getMinKey
    getMinKey() {
        return this.head.next.keys[0] || "";
    }

    // inc - increments key value - in production, make this method synchronized for thread safety
    inc(key) {
        if (!this.map.get(key)) {               // case 1 - key does not already exist
            if (this.head.next.freq !== 1) {    // case 1a - key with freq 1 does not already exist
                // insert new node after head node
                const newNode = new ListNode(key, 1);
                this.addNodeAfter(this.head, newNode);
                this.map.set(key, newNode);
            } else {                            // case 1b - key with freq 1 exists - point key to node and add to keys
                this.map.set(key, this.head.next);
                this.head.next.keys.push(key);
            }
        } else {                                // case 2 - key exists - increment existing key   
            const curNode = this.map.get(key);
            if (curNode.freq + 1 === curNode.next.freq) {     // case 2a - node with currFreq + 1 already exists
                // update map to point to next node
                this.map.set(key, curNode.next);
                // add key to nextNode's key array
                curNode.next.keys.push(key);                
            } else {                            // case 2b - node with curFreq + 1 does not exist - create new node with Freq to add to doubly-linked list
                // insert new node after curNode
                const newNode = new ListNode(key, curNode.freq + 1);
                this.addNodeAfter(curNode, newNode);
                // point map to new node
                this.map.set(key, newNode);
            }
            // clean up - if key was the only key in curNode, remove it entirely
            if (curNode.keys.length === 1) this.removeNode(curNode);
            else curNode.keys = this.removeKey(key, curNode); 
        }
    }

    // dec
    dec(key) {
        const curNode = this.map.get(key);
        if (curNode.freq === 1) {                              // Case 1 - key has freq 1
            if (curNode.keys.length === 1) {                   // Case 1a - node has only one key 
                // remove node entirely
                this.removeNode(curNode);
                // remove from map
                this.map.delete(key);
            } else curNode.keys = this.removeKey(key, curNode);// Case 1b - node with freq 1 has more than one key - simply remove
        } else {                                               // Case 2 - key has freq > 1
            if (curNode.prev.freq === curNode.freq - 1) {      // Case 2a: Node with freq-1 exists
                // Add key to existing node
                curNode.prev.keys.push(key);
                // update map 
                this.map.set(key, curNode.prev);
            // Case 2b: Create new node with freq-1
            } else {
                // insert new node before curNode
                const decNode = new ListNode(key, curNode.freq - 1);
                this.addNodeBefore(curNode, decNode);
                // insert into map
                this.map.set(key, decNode);
            }
        }
        // clean up - remove node or key
        if (curNode.keys.length === 1) { this.removeNode(curNode) } 
        else { curNode.keys = this.removeKey(key, curNode) }
    }
}

// All O(1) - driver code
console.log("\nAll O(1) Data Structure");
const test = (condition) => { if (condition) { console.log("PASSED") } else { console.error('FAILED') } };

const allOne = new AllO1();

process.stdout.write("\nTEST CASE 1 - adds new string and increments frequency to 1: ");
allOne.inc('string1');
test(allOne.head.next.keys[0] === 'string1' && allOne.head.next.freq === 1);   

process.stdout.write("\nTEST CASE 2 - increments frequency of existing string to 2 and removes node with freq 1: ");
allOne.inc('string1');
test(allOne.head.next.keys[0] === 'string1' && allOne.head.next.freq === 2);

process.stdout.write("\nTEST CASE 3 - adds a second key and updates linkedlist: ");
allOne.inc('string2');
test(allOne.head.next.keys[0] === 'string2' && allOne.head.next.freq === 1 &&
    allOne.head.next.next.keys[0] === 'string1' && allOne.head.next.next.freq === 2);

process.stdout.write("\nTEST CASE 4 - retrieves key with min frequency: ");
const min1 = allOne.getMinKey();
test(min1 === 'string2');

process.stdout.write("\nTEST CASE 5 - retrieves key with max frequency: ");
const max1 = allOne.getMaxKey();
test(max1 === 'string1');

process.stdout.write('\nTEST CASE 6 - increments second key to also have freq 2, and removes node with freq 1: ');
allOne.inc('string2');
test(allOne.head.next.keys.length === 2 && allOne.head.next.freq === 2);

process.stdout.write("\nTEST CASE 7  - decrements key frequency, returning to last state before increment: ");
allOne.dec('string2');
test(allOne.head.next.keys[0] === 'string2' && allOne.head.next.freq === 1 &&
    allOne.head.next.next.keys[0] === 'string1' && allOne.head.next.next.freq === 2);

process.stdout.write("\nTEST CASE 8 - decrements key frequency, removing key and node: ");
allOne.dec('string2');
test(allOne.head.next.keys[0] === 'string1' && allOne.head.next.freq === 2);