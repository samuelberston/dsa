/**
 *      Math-related problems
 * 
 * 1. n-th root of x
 * 
 */

/**
 *      N-th root of X
 * @param {number} n
 * @param {number} x
 * @return {float}
 */
const nthRoot = (x, n) => {
    // edge cases: x is 1 or 0
    if (x <= 1) { return x; }

    // condition - int to the power of n
    const condition = (int) => {
        return Math.pow(int, n);
    }

    // binary search
    let p1 = 0;
    let p2 = x;
    while (p2 - p1 >= 0.001) {
        let mid = (p1 + p2) / 2;
        let midpown = condition(mid);
        if (midpown > x) {
            p2 = mid;
        } else if (midpown < x) {
            p1 = mid;
        } else {
            break;
        }
    }

    return Math.floor(((p1 + p2) / 2) * 1000) / 1000; // nearest thousandth
};

// n-th root of x - driver code
console.log("\n1. N-th Root of X");
console.log(nthRoot(1, 4));  // 1
console.log(nthRoot(8, 3));  // 2
console.log(nthRoot(7, 3));  // 1.912
console.log(nthRoot(36, 4)); // 2.449

/**
 *      K-th Factor of N
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthFactor = (n, k) => {
    for (let i = 1; i < n + 1; i++) {
        // Check for factor
        if (n % i === 0) {
            // Check for k-th factor
            if (k === 1) return i;
            // Decrement k
            k--;
        }
    }
    // Searched space and did not find k-th factor
    return -1;
};

// k-th factor of n - driver code
console.log("\n2. K-th Factor of N");
process.stdout.write("TEST CASE 1: ");
console.log(kthFactor(12, 3) === 3 ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 2: ");
console.log(kthFactor(7, 2) === 7 ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 3: ");
console.log(kthFactor(4, 4) === -1 ? "PASSED" : "FAILED");

/**
 *      Single Number
 * 
 * Math: 2 * (a + b + c) - (2a + 2b + c) = c
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // bitwise operation
    let a = 0;
    for (const num of nums) {
        a ^= num;
    }
    return a;
};

//  Single Number driver code
console.log("\n3. Single Number");
process.stdout.write("TEST CASE 1: ");
console.log(JSON.stringify(singleNumber([2,2,1])) === JSON.stringify(1) ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 2: ");
console.log(JSON.stringify(singleNumber([4,1,2,1,2])) === JSON.stringify(4) ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 3: ");
console.log(JSON.stringify(singleNumber([1])) === JSON.stringify(1) ? "PASSED" : "FAILED");