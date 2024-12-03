/**
 * 716. Max Stack
 * Hard
 * Topics
 * Companies
 *  Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.

 * Implement the MaxStack class:

 *  MaxStack() Initializes the stack object.
 * void push(int x) Pushes element x onto the stack.
 * int pop() Removes the element on top of the stack and returns it.
 * int top() Gets the element on the top of the stack without removing it.
 * int peekMax() Retrieves the maximum element in the stack without removing it.
 * int popMax() Retrieves the maximum element in the stack and removes it. If there is more than one maximum element, only remove the top-most one.
 * You must come up with a solution that supports O(1) for each top call and O(logn) for each other call.

 

 * Example 1:

 * Input
 * ["MaxStack", "push", "push", "push", "top", "popMax", "top", "peekMax", "pop", "top"]
 * [[], [5], [1], [5], [], [], [], [], [], []]
 * 
 * Output
 * [null, null, null, null, 5, 5, 1, 5, 1, 5]
 * 
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.prev = this.next = null;
    }
}

class MaxStack {
    constructor() {
        // stack for push, pop. and top - O(1)
        this.stack = []; 
        // map of keys with pointer to each node and index in stack
        this.nodes = new Map();
        // doubly-linked list for peekMax O(1) and popMax O(logN)
        this.head = new ListNode(-1);
        this.tail = new ListNode(-1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // push - add item to top of stack and insert into linkedlist in order - O(logN)
    push(item) {
        // error handling
        if (!item || typeof item !== 'number') throw Error('argument must be a number');
        // add to stack
        this.stack.push(item);
        // insert into linked list
        const newNode = this.insertNode(item);
        // update nodes map
        this.nodes.set(item, {
            'node': newNode,
            // support multiple items with the same value in the stack
            'index': this.nodes.has(item) ? [...this.nodes.get(item).index, this.stack.length - 1] : [this.stack.length - 1]
        });
    }

    // pop - remove item from stop of stack, remove from list, return item - O(1)

    // top - display item at top of stack - O(1)

    // peekMax - display item at end of list - O(1)

    // popMax - remove item from stack and remove node from list - O(1)

    // helper - insert node into list in order - O(logN)
    insertNode(item) {
        const newNode = new ListNode(item);
        // find first node less than newNode
        let curr = this.head.next;
        while (curr.val >= item) {
            curr = curr.next;
        }
        // insert newNode before current curr
        const prev = curr.prev;
        prev.next = newNode;
        newNode.prev = prev;
        newNode.next = curr;
        curr.prev = newNode;

        return newNode;
    }
}

// Max Stack driver code
console.log("\nMaximum Stack");
const maxStack = new MaxStack();

process.stdout.write("\nTEST CASE 1: Can push item to max stack: ");
maxStack.push(5);
if (maxStack.stack[0] === 5 && maxStack.head.next.val === 5) {console.log("SUCCESS")} else {console.error("FAILED")}