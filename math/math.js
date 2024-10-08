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
