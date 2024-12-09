/**
 *      Min-Heap
 * A min-heap is a complete binary tree where the parent node is smaller than the child nodes
 * 
 */
class MinHeap {
    constructor(maxSize) {
        this.heap = new Array(maxSize).fill(null);
        this.maxSize = maxSize;
        this.heapSize = 0;
    }

    isEmpty() { return this.heapSize == 0; }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    getLeftChildIndex(i) { return i * 2 + 1; }

    getRightChildIndex(i) { return i * 2 + 2; }

    swap(index1, index2) { [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]; }

    insert(value) {
        // check for room
        if (this.heapSize == this.maxSize) {
            console.log("Insufficient space in heap to insert item ", value);
            return;
        }
        this.heap[this.heapSize] = value; // insert at the end
        this.heapSize++;
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heapSize - 1; // index of last inserted node
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            // Compare first element if arrays, otherwise compare directly
            const parentValue = Array.isArray(this.heap[parentIndex]) ? this.heap[parentIndex][0] : this.heap[parentIndex];
            const currentValue = Array.isArray(this.heap[index]) ? this.heap[index][0] : this.heap[index];
            if (parentValue > currentValue) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else break;
        }
    }

    extractMin() {
        // zero or one node
        if (this.heap.length == 0) return null;
        if (this.heap.length == 1) { 
            this.heapSize--;
            return this.heap.pop(); }
        
        const min = this.heap[0]; // first node is min
        this.heap[0] = this.heap[this.heapSize - 1]; // move last node to first
        this.heap[this.heapSize - 1] = null; // remove last element
        this.heapSize--; // decrease heap size
        this.heapifyDown(); // reset the min heap property
        return min;
    }

    // Move the root element down to maintain the heap property
    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heapSize) { // child within bounds
            let leftChildIndex = this.getLeftChildIndex(index);
            let rightChildIndex = this.getRightChildIndex(index);
            let smallerChildIndex = leftChildIndex;

            // Compare first element if arrays, otherwise compare directly
            const leftValue = Array.isArray(this.heap[leftChildIndex]) ? this.heap[leftChildIndex][0] : this.heap[leftChildIndex];
            const rightValue = rightChildIndex < this.heapSize ? 
            (Array.isArray(this.heap[rightChildIndex]) ? this.heap[rightChildIndex][0] : this.heap[rightChildIndex]) 
            : Infinity;
        const currentValue = Array.isArray(this.heap[index]) ? this.heap[index][0] : this.heap[index];

            // find smaller child node index
            if (rightChildIndex < this.heapSize && rightValue < leftValue) smallerChildIndex = rightChildIndex;

            const smallerValue = Array.isArray(this.heap[smallerChildIndex]) ? this.heap[smallerChildIndex][0] : this.heap[smallerChildIndex];
            if (currentValue > smallerValue) { // current node is smaller than smaller child node
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex;
            } else break;
        }
    }

    // view min without extracting it
    peak() { return this.heapSize > 0 ? this.heap[0] : null; }

    increaseMaxSize(n) {
        this.maxSize += n;
        console.log("Max size updated to: ", this.maxSize);
    }
}

// Heap driver code
console.log("\n Min-Heap")
const minHeap = new MinHeap(10);
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(30);
minHeap.insert(2);

console.log("\nInserted 10, 5, 30, 2 into heap: ", minHeap.heap);
console.log("\nExtracting min and heapifying: ")
console.log("min: ", minHeap.extractMin());
console.log("heapify: ", minHeap.heap);
console.log("min: ", minHeap.extractMin());
console.log("heapify: ", minHeap.heap);
console.log("min: ", minHeap.extractMin());
console.log("heapify: ", minHeap.heap);
console.log("min: ", minHeap.extractMin());
console.log("heapify: ", minHeap.heap);

console.log("\nReinserted same nodes...")
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(30);
minHeap.insert(2);
console.log("Peak without extracting min: ", minHeap.peak());

export default MinHeap;
