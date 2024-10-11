/**
 *      SORTING
 * 
 * 1. Merge Sort
 */

/**
 *      Merge Sort
 * Uses a recursive divide-and-conquer approach to sort an array 
 * 
 * @param {number[]} array
 * @return {number[]} 
 */

const merge = (arr, left, mid, right) => {
    // create copies of arrays
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = Array(n1);
    let R = Array(n2);
    // copy elements to subarrays
    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    // sort subarrays
    i = 0; // L index
    j = 0; // R index
    let k = left; // merged array index
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    // copy remaining elements of L and R
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

const mergeSort = (array, left, right) => {
    // base case
    if (left >= right) {
        return;
    }
    const mid = Math.floor(left + (right - left) / 2);
    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);
    merge(array, left, mid, right);
};


// mergesort driver code
console.log("\n1. Merge Sort");

// TEST 1
console.log("\nTest Case 1: ");
const arr1 = [6, 3, 8, 4, 10, 33, 22];
mergeSort(arr1, 0, arr1.length - 1);
if (JSON.stringify(arr1) === JSON.stringify([3,  4,  6, 8, 10, 22, 33])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

// TEST 2
console.log("\nTest Case 2: ");
const arr2 = [5, 8, 3, 500, 9, 43, 142];
mergeSort(arr2, 0, arr2.length - 1);
if (JSON.stringify(arr2) === JSON.stringify([3, 5, 8, 9, 43, 142, 500])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}
