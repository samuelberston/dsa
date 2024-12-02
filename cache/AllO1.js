/**
 * 
 * All O(1) Data Structure
 * Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the AllOne class:

AllOne() Initializes the object of the data structure.
inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
Note that each function must run in O(1) average time complexity.

 

Example 1:

Input
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output
[null, null, null, "hello", "hello", null, "hello", "leet"]

Explanation
 */
class ListNode {
    constructor(key, freq) {
        this.keys = [key];
        this.freq = freq;
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

    inc(key) {
        // case 1 - key does not already exist
        if (!this.map.get(key)) {

            // case 1a - key with freq 1 does not already exist
            if (this.head.next.freq !== 1) {
                // create new node - default freq = 1
                const newNode = new ListNode(key, 1);

                // add to doubly-linked list
                const tmp = this.head.next;
                this.head.next = newNode;
                newNode.prev = this.head;
                newNode.next = tmp;

                // add to map
                this.map.set(key, newNode);

            // case 1b - key with freq 1 exists - point key to node and add to keys
            } else {
                this.map.set(key, this.head.next);
                this.head.next.keys.push(key);
            }

        // case 2 - increment existing key    
        } else {
            const curNode = this.map.get(key);
            const curFreq = curNode.freq;
            const nextFreq = curNode.next.freq;

            // case 2a - node with currFreq + 1 already exists
            if (curFreq + 1 === nextFreq) {
                // update map to point to next node
                this.map.set(key, curNode.next);

            // case 2b - node with curFreq + 1 does not exist - create new node with Freq to add to doubly-linked list
            } else {

                // insert new node into linked list
                const newNode = new ListNode(key, curFreq + 1);
                const tmp = curNode.next;
                curNode.next = newNode;
                newNode.prev = curNode;
                newNode.next = tmp;

                // point map to new node
                this.map.set(key, newNode);

                // case 2ba - if curNode is now empty, remove it
                if (curNode.keys.list === 1) {
                    let prev = curNode.prev;
                    let next = curNode.next;
                    prev.next = next;
                    next.prev = prev;

                // case 2bb - curNode has other keys, remove the node from its keys array
                } else {
                    curNode.keys = [curNode.keys.slice(0, curNode.keys.indexOf(key)) + curNode.keys.slice(curNode.keys.indexOf(key) + 1)]; 
                }
            }
        }
    }

    dec(key) {
        const curNode = this.map.get(key);
        // check if freq is 1 - remove key 
        if (curNode.freq === 1) {
            // if key is only key, delete node
            if (curNode.keys.length === 1) {
                let prev = curNode.prev;
                let next = curNode.next;
                prev.next = next;
                next.prev = prev;
            } 
        } else {
            // decrement key freq and remove from curNode.keys
            const curFreq = curNode.freq;
            const prevFreq = curNode.prev;
            curNode.keys = curNode.keys.slice(0, curNode.keys.indexOf(key)) + curNode.keys.slice(curNode.keys.indexOf(key) + 1); 
            // dec node already exists
            if (prevFreq === curFreq - 1) {
                this.map.set(key, curFreq.prev);
                // add to previous node key array
                curNode.prev.keys.push(key);
            } else { // create new node with decremented freq 
                const decNode = new ListNode(curFreq - 1);
                // insert decNode before currNode
                const tmp = curNode.prev;
                curNode.prev = decNode;
                decNode.next = curNode;
                decNode.prev = tmp;
            }
        }
    }
}

// All O(1) - driver code
console.log("\nAll O(1) Data Structure");
const allOne = new AllO1();
console.log("\nallOne.inc('string1')");
allOne.inc('string1');
console.log(allOne.head.next.keys[0], ': ', allOne.head.next.freq); // string1: 1
console.log('\ninc string2');
allOne.inc('string2');
console.log('keys in first node: ', ...allOne.head.next.keys);
console.log('\ninc string1');
allOne.inc('string1');
//console.log('keys in first node: ', ...allOne.head.next.keys);
console.log('allOne.head.next.next.keys: ', allOne.head.next.next.keys);
console.log("\ndec string1");
allOne.dec('string1');
console.log(allOne.head.next);
