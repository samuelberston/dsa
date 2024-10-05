/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        // use binary search to find the bad version in O(log n) 
        let left = 1;
        let right = n;
        
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            // check for bad version
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }      
        return left;   
    };
};

/**
 *         Sqrt(x)
 * Compute the squareroot of X without using any built in functions.
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x <= 1) { return x; }     // edge case: sqrt of 0 or 1

    let left = 0;
    let right = x;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (mid * mid <= x) {        // check if mid-squared satisfies condition
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left - 1; // return the last integer that satisfies the condition
};