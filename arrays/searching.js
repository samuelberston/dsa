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