/**
 * Linked Lists
 * 1. merge 2 sorted lists
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

