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
    }

    // pop - remove item from stop of stack, remove from list, return item - O(1)
    pop() {
        // pop top item from stack
        const top = this.stack.pop();    
        // remove node from list
        this.removeNode(top);
        // return top item
        return top;
    }

    // top - display item at top of stack - O(1)
    top() {
        return this.stack[this.stack.length - 1];
    }

    // peekMax - display item at end of list - O(1)
    peekMax() {
        return this.tail.prev.val;
    }

    // popMax - remove item from stack and remove node from list - O(1)
    popMax() {
        const max = this.tail.prev.val;

        // remove node
        this.removeNode(max);

        // remove from stack
        const index = this.stack.lastIndexOf(max); // handle duplicates - remove top occurance of item in stack 
        this.stack = this.stack.filter((_, i) => i !== index);
    }

    // helper - insert node into list in order - O(logN)
    insertNode(item) {
        const newNode = new ListNode(item);
        // find first node less than newNode
        let curr = this.head.next;
        while (curr !== this.tail && curr.val < item) {
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

    // helper - remove node from linked list - O(N)
    removeNode(val) {
        let curr = this.head.next;
        while (curr !== this.tail) {
            if (curr.val === val) {
                const { prev, next } = curr;
                prev.next = next;
                next.prev = prev;
                break;
            }
            curr = curr.next;
        }
    }
}

// Max Stack driver code
console.log("\nMaximum Stack");
const maxStack = new MaxStack();

process.stdout.write("\nTEST CASE 1: Can push item to max stack: ");
maxStack.push(5);
if (maxStack.stack[0] === 5 && maxStack.head.next.val === 5) {console.log("SUCCESS")} else {console.error("FAILED")}

process.stdout.write("\nTEST CASE 2: Can push second item to max stack: ");
maxStack.push(3);
if (maxStack.stack[1] === 3 && maxStack.head.next.val === 3 &&
    maxStack.stack[0] === 5 && maxStack.head.next.next.val === 5 
) {console.log("SUCCESS")} else {console.error("FAILED")}

process.stdout.write("\nTEST CASE 3: View top item in stack: "); // update to check without modifying original array
const top1 = maxStack.top();
if (top1 === 3) {console.log("SUCCESS")} else {console.error("FAILED")}

process.stdout.write("\nTEST CASE 4: peekMax item in stack: ");
const max1 = maxStack.peekMax();
if (max1 === 5) {console.log("SUCCESS")} else {console.error("FAILED")}

process.stdout.write("\nTEST CASE 5: Pop item from top of stack: ");
const pop1 = maxStack.pop();
const top2 = maxStack.top();
const min1 = maxStack.head.next.val;
if (pop1 === 3 && top2 === 5 && min1 === 5) {console.log("SUCCESS")} else {console.error("FAILED")}