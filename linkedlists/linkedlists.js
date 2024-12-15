/**
 * Linked Lists
 * 1. merge 2 sorted lists
 * 2. merge k sorted lists
 * 3. copy list with random pointer
 * 4. remove duplicates from sorted list II
 * 5. intersection of two linked lists
 * 6. swap nodes in pairs
 * 7. delete duplicates from sorted list
 */

class ListNode {
    val;
    next;
    constructor(val, next) {
        this.val = val == undefined ? null : val;
        this.next = null === undefined ? null : next;
    }
}

/**
 * Merge Two Sorted Lists
 * return the head of the first linked list
 * 
 * approach: merge lists recursively by comparing nodes
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
*/
const mergeTwoLists = (list1, list2) => {
    let dummyHead = new ListNode("-1");
    let prev = dummyHead;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            prev.next = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }
    if (list1 != null) {
        prev.next = list1;
    } else {
        prev.next = list2;
    }
    return dummyHead.next;
}

// Merge Two Sorted Lists driver code
let l1 = new ListNode("1");
l1.next = new ListNode("4");
l1.next.next = new ListNode("7");
l1.next.next.next = new ListNode("10");

let l2 = new ListNode("2");
l2.next = new ListNode("6");
l2.next.next = new ListNode("9");
l2.next.next.next = new ListNode("13");


console.log("\n1. Merge Two Sorted Linked Lists");
console.log("l1: ", l1);
console.log("l2: ", l2);
const merged = mergeTwoLists(l1, l2);
console.log("merged: ", merged);


/**
 * Merge K Sorted Lists
 * 
 * approach: merge two lists at once
 * 
 * @param {ListNode[]} listArray
 * @return {ListNode}
 */
const mergeKLists = (listArray) => {
    let head = listArray[0];

    for (let i = 1; i < listArray.length; i++) {
        head = mergeTwoLists(head, listArray[i]);
    }

    return head;
}


// Merge K Sorted Lists driver code
l1 = new ListNode("1");
l1.next = new ListNode("4");
l1.next.next = new ListNode("7");
l1.next.next.next = new ListNode("10");

l2 = new ListNode("2");
l2.next = new ListNode("6");
l2.next.next = new ListNode("9");
l2.next.next.next = new ListNode("13");

const l3 = new ListNode("3");
l3.next = new ListNode("5");
l3.next.next = new ListNode("8");
l3.next.next.next = new ListNode("11");
l3.next.next.next.next = new ListNode("12");

const l4 = new ListNode("7");
l4.next = new ListNode("15");

console.log("\n2. Merge K Lists");
const lists = [l1, l2, l3, l4];
console.log("Merged list: ", mergeKLists(lists));

/**
 *      Copy List with Random Pointer
 * 
 *      Approach: Treat it as a graph with multuiple edges, use a visited map to cache nodes
 */
class RandomNode {
    constructor(val, next, random) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

const copyRandomList = (head) => {
    // store previously visited nodes in hashmap
    let visitedHash = new Map();

    const cloneNode = (node) => {
        if (!node) return null;

        // Cached node in hashmap
        if (visitedHash.has(node)) return visitedHash.get(node);

        // Create new node
        let newNode = new RandomNode(node.val);
        visitedHash.set(node, newNode);

        // Recursively clone remaining linkedlist
        newNode.next = cloneNode(node.next);
        newNode.random = cloneNode(node.random);
        return newNode; 
    };
    return cloneNode(head);
};

// Copy Random List driver code
console.log("\n3. Copy List with Random Pointer");

// Create nodes
const n1 = new RandomNode(1);
const n2 = new RandomNode(2);
const n3 = new RandomNode(3);
const n4 = new RandomNode(4);

// Connect next pointers
n1.next = n2;
n2.next = n3;
n3.next = n4;

// Connect random pointers
n1.random = n3;  // 1 points to 3
n2.random = n2;  // 2 points to itself
n3.random = n1;  // 3 points to 1
n4.random = n4;  // 4 points to itself

// Create the deep copy
const copiedList = copyRandomList(n1);

// Helper function to print the list with random pointers
const printRandomList = (head) => {
    let current = head;
    while (current) {
        console.log(
            `Node ${current.val} -> next: ${current.next?.val || 'null'}, ` +
            `random: ${current.random?.val || 'null'}`
        );
        current = current.next;
    }
};

console.log("Original list:");
printRandomList(n1);
console.log("\nCopied list:");
printRandomList(copiedList);

/**
 *      Remove Duplicates from Sorted List II
 * 
 *      Approach: use a dummy node to save the pointer to the predecessor, in case of sublist of duplicates
 *      
 */
const removeDuplicates = (head) => {
    // Pointer to predecessor
    let dummy = new ListNode(-1, head);
    let pred = dummy;
    while (head) {
        if (head.next && head.val === head.next.val) {
            // skip all duplicates
            while (head.next && head.val === head.next.val) {
                head = head.next;
            }
            pred.next = head;
        } else {
            pred = pred.next;
        }
        // move forward
        head = head.next;
    }
    return dummy.next;
}

// Remove duplicates driver code
console.log("\nRemove Duplicates from linked list");
const dupList = new ListNode(1);
dupList.next = new ListNode(2);
dupList.next.next = new ListNode(2);
dupList.next.next.next = new ListNode(3);
const dedup = removeDuplicates(dupList);
console.log(dedup);

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Intersection of Two Linked Lists
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // approach: 
    // - save map with pointers to nodes in A
    // - iterate b and check if any node it pointing to node in A

    const setA = new Set();
    while (headA) {
        setA.add(headA);
        headA = headA.next;
    }

    while (headB) {
        // check if node is in mapA
        if (setA.has(headB)) return headB;
        headB = headB.next;
    }
    return null;
};

// Intersection of Two Linked Lists driver code
console.log("\n4. Intersection of Two Linked Lists");
process.stdout.write("TEST CASE 1: ");
const l1a  = new ListNode(8);
l1a.next = new ListNode(4);
l1a.next.next = new ListNode(5);
l1a.next.next.next = new ListNode(4);
l1a.next.next.next.next = new ListNode(5);

const l2a = new ListNode(4);
l2a.next = new ListNode(5);
l2a.next.next = l1a.next.next;

const intersection = l1a.next.next;

console.log(getIntersectionNode(l1a, l2a) === intersection ? "PASSED" : "FAILED");

/**
 * Swap Nodes in Pairs
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // edge case 
    if (!head || !head.next) return head;

    let dummy = new ListNode(-1);
    dummy.next = head;
    let prev = dummy;

    while(head && head.next) {
        const first = head;
        const second = head.next;
        // swap nodes
        first.next = second.next;
        second.next = first;
        prev.next = second;

        // move to next nodes
        prev = first;
        head = first.next; 
    }

    return dummy.next;
};

// Swap Nodes in Pairs driver code
console.log("\n5. Swap Nodes in Pairs");
const swapList = new ListNode(1);
swapList.next = new ListNode(2);
swapList.next.next = new ListNode(3);
swapList.next.next.next = new ListNode(4);
console.log(swapPairs(swapList));

/**
 *  Delete Duplicates from Sorted List
* 
 * Example:
 * - Input: [1, 1, 2, 3, 4, 4, 5]
 * - Returns: [2, 3, 5]
 * 
 * @param {ListNode}
 * @return {ListNode}
 */
const deleteDuplicates = (head) => {
    let sentinel = new ListNode(-1); // Sentinel node to build deduplicated list
    let prev = sentinel; // Prev pointer to track previous node to current node
    sentinel.next = head;
    let current = head;

    while (current) {
        // Duplicate 
        if (current.next && current.val === current.next.val) {
            while (current.next && current.val === current.next.val) current = current.next;
            // move past last duplicate
            prev.next = current.next;
        } else prev = prev.next;
        current = current.next;
    }

    return sentinel.next;
};

// Delete Duplicates driver code
console.log("\n6. Delete Duplicates from Sorted List");
const dupList1 = new ListNode(1);
dupList1.next = new ListNode(1);
dupList1.next.next = new ListNode(2);
dupList1.next.next.next = new ListNode(3);
dupList1.next.next.next.next = new ListNode(4);
dupList1.next.next.next.next.next = new ListNode(4);
dupList1.next.next.next.next.next.next = new ListNode(5);
const test = (condition) => condition ? console.log("PASSED") : console.log("FAILED");
process.stdout.write("TEST CASE 1: ");
test(deleteDuplicates(dupList1) === dupList1.next.next);
