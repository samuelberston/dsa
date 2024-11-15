/**
 *      LinkedIn leetcode question
 *      https://leetcode.com/company/linkedin/?favoriteSlug=linkedin-thirty-days
 * 
 *      1) Nested List Weight Sum II
 */

/**
 *      Nested List Weight Sum II
 * 
 * You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
 * The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
 * The weight of an integer is maxDepth - (the depth of the integer) + 1.
 * Return the sum of each integer in nestedList multiplied by its weight.
 * 
 * @param {Number[]}
 * @return {Number}
 */
const nestedListWeightSumII = (nestedList) => {
    // Step 1: Recursively calculate max depth
    let maxLevel = 1;

    const maxDepth = (list, level) => {
        // base case - no nested list
        if (!list.length) return level;

        // update level  
        let currentMax = level;   

        // iterate each element in the nestedList
        for (let i = 0; i < list.length; i++) {
            // recursive case - element is array, increment level and recurse on nested element
            if (Array.isArray(list[i])) {
                currentMax = Math.max(currentMax, maxDepth(list[i], level+ 1));
            }
        }
        return currentMax;
    }
    maxLevel = maxDepth(nestedList, 1);

    // Step 2: Recursively calculate inverse weight product sum
    let sum = 0;
    const productSum = (list, level) => {
        // iterate each element in the nestedList
        for (let i = 0; i < list.length; i++) {
            // base case - element is integer
            if (typeof list[i] === 'number') {
                sum += list[i] * (maxLevel - level + 1);
            }
            // recursive case - element is array, increment level and recurse on nested element
            if (Array.isArray(list[i])) {
                productSum(list[i], level + 1);
            }
        }
    }
    productSum(nestedList, 1);
    return sum;
}

// Nested list II driver code
console.log("Nested List Weight Sum II");
process.stdout.write("Test case 1: ");
const nestedList1 = [1,[2,2],[[3],2],1];
const res1 = nestedListWeightSumII(nestedList1);
if (res1 === 21) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const nestedList2 = [1, [4, [6]]];
const res2 = nestedListWeightSumII(nestedList2);
if (res2 === 17) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}