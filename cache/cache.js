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
 * No capacity limit and instead evicts node based on expiry date
 */
import MinHeap from "../trees/heap";

class ExpiryCache {
    constructor(capacity) {
        this.cache = new Map();
        this.heap = new MinHeap(Number.MAX_SAFE_INTEGER);
    }

    add(key, value, ttl) { // ttl in seconds
        this.audit();
        if (this.cache[key]) {
            // deal with already exists
        } else {
            let expiry = Date.now() + ttl;
            this.cache[key] = value;
            this.heap.insert({ expiry: key });
        }
    }

    get(key) {
        this.audit();
        if (!this.cache[key]) {
            return -1;
        }
        return this.cache[key];
    }

    // remove expired items from cache
    audit() {
        let minExpiry = this.heap.peak();
        while (minExpiry < Date.now()) {
            let extracted = this.heap.extractMin();
            this.cache.delete(extracted)
        }
    }
}