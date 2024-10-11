/**
 *      Cache
 * 
 * 1. LRU Cache
 * 2. Expiry Cache
 * 
 */

/**
 *      LRU Cache
 * A cache with given capacity that evicts entries based on LRU.
 * 
 * 
 */

class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUcache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node(-1, -1); 
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        let node = this.cache.get(key);
        this.remove(node);
        this.add(node);
        return node.val;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            let existingNode = this.cache.get(key);
            existingNode.val = value;
            this.remove(existingNode);
            this.add(existingNode);
        } else {
            let node = new Node(key, value);
            this.add(node);
            this.cache.set(key, node);
            if (this.cache.size > this.capacity) {
                let evict = this.head.next;
                this.remove(evict);
                this.cache.delete(evict.key);
            }
        }
    }

    add(node) {
        let prev = this.tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.tail;
        this.tail.prev = node;
    }

    remove(node) {
        let { prev, next } = node;
        prev.next = next;
        next.prev = prev;
    }
}

// LRU Cache driver code
const cache = new LRUcache(2);
console.log("put 1", cache.put(1, 1));
console.log("put 2", cache.put(2, 2));
console.log("put 3", cache.put(3, 3));
console.log("get 1", cache.get(1)); // -1
console.log("get 2", cache.get(2)); // 2
console.log("put 4", cache.put(4, 4));
console.log("get 3", cache.get(3)); // -1
console.log("put 4", cache.put(4, 44));
console.log("get 4", cache.get(4)); // 44

/**
 *      2. Expiry Cache
 * 
 * Evicts node based on expiry date
 */
import MinHeap from "../trees/heap.js";

class ExpiryCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.heap = new MinHeap(capacity);
        this.ttl = new Map();
    }

    add(key, val, ttl) { // ttl in seconds
        this.audit();
        if (this.cache.size == this.capacity) { 
            console.log("Cache has reached capacity, must wait for items to expire.");
            return;
        }
        if (this.cache.has(key)) {
            console.log(`Item with key ${key} already exists.`);
        } else {
            let expiry = Date.now() + ttl * 1000;
            this.cache.set(key, val);
            this.heap.insert(expiry);
            this.ttl.set(expiry, key);
        }
    }

    get(key) {
        this.audit();
        if (!this.cache.has(key)) {
            return -1;
        }
        return this.cache.get(key);
    }

    // remove expired items from cache
    audit() {
        console.log("audit");
        console.log("cache: ", this.cache);
        let minExpiry = this.heap.peak();
        console.log(minExpiry);
        while (minExpiry && minExpiry < Date.now()) {
            console.log("delete");
            let extracted = this.heap.extractMin();
            console.log("extracted", extracted);
            let key = this.ttl.get(extracted);
            console.log("key: ", key);
            this.cache.delete(key);
            console.log(this.cache);
            this.ttl.delete(extracted);
            minExpiry = this.heap.peak();
        }
    }
}

// Expiry Cache driver code
console.log("\nExpiry Cache");

// TEST 1
console.log("TEST 1");
const expiryCache = new ExpiryCache(100);
expiryCache.add(1, 1, 5); // lives for 5 seconds
expiryCache.add(2, 2, 1);
expiryCache.add(3, 3, 1);
console.log("get 1", expiryCache.get(1)); // 1

// wait five seconds
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function example1() {
    await sleep(1000);
    console.log("now: ", Date.now());
    expiryCache.audit();
}
example1();
async function example2() {
    await sleep(2000);
    console.log("get 3", expiryCache.get(3)); // 1
}
example2();


