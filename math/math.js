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

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
    // edge case 
    if (num === 0) return 'Zero';

    // Arrays to store English words
    const below_ten = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const below_twenty = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const below_hundred = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const convertToWords = (num) => {
        // < 10
        if (num < 10) return below_ten[num];
        // < 20
        if (num < 20) return below_twenty[num - 10];
        // < 100
        if (num < 100) return below_hundred[Math.floor(num / 10)] + (num % 10 != 0 ? " " + convertToWords(num % 10) : ""); 
        // < 1000
        if (num < 1000) return below_ten[Math.floor(num / 100)] + ' Hundred' + (num % 100 != 0 ? " " + convertToWords(num % 100) : "");
        // < 1000000
        if (num < 1000000) return convertToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 != 0 ? " " + convertToWords(num % 1000) : "");
        // < 1000000000
        if (num < 1000000000) return convertToWords(Math.floor(num / 1000000)) + ' Million' + (num % 1000000 != 0 ? " " + convertToWords(num % 1000000): "");
        // < 1000000000000
        return convertToWords(Math.floor(num / 1000000000)) + ' Billion' + (num % 1000000000 != 0 ? " " + convertToWords(num % 1000000000) : "");
    }

    return convertToWords(num);
};

// Number to Words driver code
console.log("\n4. Number to Words");
process.stdout.write("TEST CASE 1: ");
console.log(numberToWords(123) === "One Hundred Twenty Three" ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 2: ");
console.log(numberToWords(12345) === "Twelve Thousand Three Hundred Forty Five" ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 3: ");
console.log(numberToWords(1234567) === "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 4: ");
console.log(numberToWords(1234567891) === "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One" ? "PASSED" : "FAILED");