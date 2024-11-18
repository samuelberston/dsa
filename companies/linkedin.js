/**
 *      LinkedIn leetcode question
 *      https://leetcode.com/company/linkedin/?favoriteSlug=linkedin-thirty-days
 * 
 *      1) Nested List Weight Sum II
 *      2) Find First and Last Position of Element in Sorted Array
 *      3) Factor Combinations
 *      4) Sort Transformed Array
 *      5) Find Leaves of Binary Tree
 *      6) Shorted Word Distanct II
 *      7) Isomorphic Strings
 *      8) Nested List Weight Sum
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
console.log("\n1.Nested List Weight Sum II");
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

/**
 *      Find First and Last Position of Element in Sorted Array
 * 
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const findFirstAndLastPosition = (nums, target) => {
    // Step 1: Use binary search to find element
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            // Step 2: If element is found, move pointers to find first and last position
            let first = mid;
            let last = mid;
            while (nums[first] === target) {
                first--;
            }
            while (nums[last] === target) {
                last++;
            }
            return [first + 1, last - 1];
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [-1, -1]
}

// Find first and last position driver code
console.log("\n2. Find First and Last Position of Element in Sorted Array");
process.stdout.write("Test case 1: ");
const nums1 = [5,7,7,8,8,10];
const target1 = 8;
const res3 = findFirstAndLastPosition(nums1, target1);
if (JSON.stringify(res3) === JSON.stringify([3, 4])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const nums2 = [5,7,7,8,8,8,8,8,10,11];
const target2 = 8;
const res4 = findFirstAndLastPosition(nums2, target2);
if (JSON.stringify(res4) === JSON.stringify([3, 7])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Factor Combinations
 * 
 * Numbers can be regarded as the product of their factors.
 * For example, 8 = 2 x 2 x 2 = 2 x 4.
 * Given an integer n, return all possible combinations of its factors. You may return the answer in any order.
 * 
 * Note that the factors should be in the range [2, n - 1].
 * 
 * @param {number} n
 * @return {number[][]}
 */
const factorCombinations = (n) => {
    // Approach: Iterate through all numbers 2 thought n/2. If the result is divisible by the current number, update the currcombo and recurse on the quotient.
    const combos = [];

    const findFactors = (n, start = 2, currCombo = []) => {
        // Early termination if n is too small
        if (n < start * start) return;

        // Iterate through all numbers 2 through n/2
        for (let i = start; i <= Math.sqrt(n); i++) {
            if (n % i === 0) { // i is a factor of n
                const quotient = n / i;
                // Only add if quotient is greater than i
                if (quotient >= i) {
                    // Add current combo and new factor
                    combos.push([...currCombo, i, quotient]);
                    // recurse on quotient
                    findFactors(quotient, i, [...currCombo, i]);
                }    
            }
        }    
    }
    findFactors(n);
    return combos;
};

// Factor combinations driver code
console.log("\n3. Factor Combinations");
process.stdout.write("Test case 1: ");
const n1 = 8;
const res5 = factorCombinations(n1);
if (JSON.stringify(res5) === JSON.stringify([[2, 2, 2], [2, 4]])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

process.stdout.write("Test case 2: ");
const n2 = 32;
const res6 = factorCombinations(n2);
if (JSON.stringify(res6) === JSON.stringify([[2, 16], [2, 2, 2, 2, 2], [2, 2, 2, 4], [2, 2, 8], [2, 4, 4], [4, 8]])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Sort Transformed Array
 * Given a sorted integer array nums and three integers a, b and c, 
 * apply a quadratic function of the form f(x) = ax2 + bx + c 
 * to each element nums[i] in the array, and return the array in a sorted order.
 * 
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
const sortTransformedArray = (nums, a, b, c) => {
    const transformed = nums.map(x => a * x * x + b * x + c).sort((a, b) => a - b);
    return transformed;
}

// Sort transformed array driver code
console.log("\n4. Sort Transformed Array");
process.stdout.write("Test case 1: ");
const nums3 = [-4, -2, 2, 4];
const a1 = 1;
const b1 = 3;
const c1 = 5;
const res7 = sortTransformedArray(nums3, a1, b1, c1);
if (JSON.stringify(res7) === JSON.stringify([3, 9, 15, 33])) {
    console.log("PASSED");
} else {
    console.error("FAILED");
}

/**
 *      Find Leaves of Binary Tree
 * Given the root of a binary tree, collect a tree's nodes as if you were doing this:
 * Collect all the leaf nodes.
 * Remove all the leaf nodes.
 * Repeat until the tree is empty.
 * 
 * @param {Node}
 * @return {number[][]}
 */

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const findLeaves = (root) => {
    const leaves = [];

    //  trim leaves using dfs
    const trimLeaves = (root, trimmed = []) => {
        // base case - null node
        if (!root) return;

        // base case - leaf node
        if (!root.left && !root.right) {
            trimmed.push(root.val);
            root.val = null; // trim
            return true;
        }
        if (root.left && trimLeaves(root.left, trimmed)) {
            root.left = null;
        }
        if (root.right && trimLeaves(root.right, trimmed)) {
            root.right = null;
        }

        return false;
    }

    // iterate root node while exists, incrementally removing leaves
    while (root && root.val !== null) {
        const trimmed = [];
        trimLeaves(root, trimmed);
        leaves.push(trimmed);
    };
    
    return leaves;
};

// Trim leaves driver code
const tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.left.left = new Node(4);
tree.left.right = new Node(5);
tree.right.left = new Node(6);
tree.right.right = new Node(7);

console.log("\n5. Find Leaves of Binary Tree");
process.stdout.write("TEST CASE 1: ");
if(JSON.stringify(findLeaves(tree)) === JSON.stringify([ [ 4, 5, 6, 7 ], [ 2, 3 ], [ 1 ] ])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

/**
 *      Shortest Word Distance II
 * 
 * Design a data structure that will be initialized with a string array, 
 * and then it should answer queries of the shortest distance between two different strings from the array.
 * 
 * Implement the WordDistance class:
 * WordDistance(String[] wordsDict) initializes the object with the strings array wordsDict.
 * int shortest(String word1, String word2) returns the shortest distance between word1 and word2 in the array wordsDict.
 * 
 * ["practice", "makes", "perfect", "coding", "makes"]
 */
class WordDistance {
    constructor(wordsDict) {
        this.wordsDict = wordsDict;
        this.dict = this.makeDict();

    }

    makeDict() {
        const dict = {};
        for (let i = 0; i < this.wordsDict.length; i++) {
            const word = this.wordsDict[i];
            dict[word] = dict[word] ? [...dict[word], i] : [i];
        }
        return dict;
    }

    shortest(word1, word2) {
        // calculate shortest distance between two words, whether one or more occurances
        let shortest = Infinity;
        let p1 = 0;
        let p2 = 0;
        // w1: [1, 4]
        // w2 [3, 5]
        while(p1 < this.dict[word1].length && p2 < this.dict[word2].length) {
            // update shortest
            shortest = Math.min(shortest, Math.abs(this.dict[word1][p1] - this.dict[word2][p2]));
            // move pointers
            if (this.dict[word1][p1] <= this.dict[word2][p2]) {
                p1++
            } else {
                p2++;
            }
        }
        return shortest;
    }
}

// Shortest word distance driver code
console.log("\n6. Shortest Word Distance II");
const WD = new WordDistance(["practice", "makes", "perfect", "coding", "makes", "perfect", "practice"]);
process.stdout.write("TEST CASE 1: ");
const WDres1 = WD.shortest("practice", "makes"); // 1
if (WDres1 === 1) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

process.stdout.write("TEST CASE 2: ");
const WDres2 = WD.shortest("practice", "perfect"); // 1
if (WDres2 === 1) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

// LCA II
/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
var lowestCommonAncestor = function(p, q) {
    // Track visited nodes
    const visited = new Set();

    // track path up from p
    let curr = p;
    while (curr) {
        visited.add(curr);
        curr = curr.parent;
    }

    // track path up from q until we find first vistied node
    curr = q;
    while (curr) {
        if (visited.has(curr)) {
            return curr;
        }
        curr = curr.parent;
    }
    return null;
};

/**
 *      Isomorphic Strings
 * 
 * Given two strings s and t, determine if they are isomorphic.
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isIsomorphic = (s, t) => {
    if (s.length !== t.length) return false;

    const mapST = {};
    const mapTS = {};

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i]; 

        // char aligns with maps
        if (mapST[charS] === charT && mapTS[charS] === charS) {
            continue;
        }

        // char already in map and doesn't match curr chars
        if (mapST[charS] && mapST[charS] !== charT ||
            mapTS[charT] && mapTS[charT] !== charS) {
                return false;
        }

        // chars not in maps, add them
        else if (!mapST[charS] && !mapTS[charT]) {
            mapST[charS] = charT;
            mapTS[charT] = charS;
        }
    };

    return true;
}

// Isomorphic strings driver code
console.log("\n7. Isomorphic Strings");
process.stdout.write("TEST CASE 1: ");
const strings1 = ["egg", "foo"];
const Ires1 = isIsomorphic(...strings1); // true
if (Ires1) { 
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

process.stdout.write("TEST CASE 2: ");
const strings2 = ["foo", "bar"];
const Ires2 = isIsomorphic(...strings2); // false
if (!Ires2) { 
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

process.stdout.write("TEST CASE 3: ");
const strings3 = ["paper", "title"];
const Ires3 = isIsomorphic(...strings3); // true
if (Ires3) { 
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

/**
 *      Nested List Weight Sum
 * 
 * You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
 * The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth.
 * Return the sum of each integer in nestedList multiplied by its depth.
 * 
 * @param {number[][]}
 * @return {number}
 */
const depthSum = (nestedList) => {
    let sum = 0;

    const dfs = (list, level = 1) => {
        // iterate elements in nested list
        for (const element of list) {
            // base case
            if (typeof element === 'number') {
                sum += element * level;
            }
            else if (Array.isArray(element)) {
                dfs(element, level + 1);
            }
        }
    };
    dfs(nestedList);

    return sum;
};

// Nested List driver code
console.log("\n8. Nested List Weight Sum");
process.stdout.write("TEST CASE 1: ");
const nl1 = [1,[2,2],[[3],2],1];
const nlres1 = depthSum(nl1);
if (nlres1 === 23) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

/**
 *      Course Schedule II
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return the ordering of courses you should take to finish all courses. 
 * If there are many valid answers, return any of them. 
 * If it is impossible to finish all courses, return an empty array.
 * 
 * Example:
 *      numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 *      Output: [0,2,1,3]
 * 
 * @param {number[][]}
 * @return {number[]}
 */
const courseScheduleII = (n, prereqs) => {
    // Step 1: Convert prereqs to adjacency list
    const adjList = new Array(n).fill(null).map(() => []);

    for (const [course, prereq] of prereqs) {
        adjList[prereq] = adjList[prereq] ? [...adjList[prereq], course] : [course];
    }

    // Step 2: Calculate in-degree of each course (# of prereqs)
    const inDegree = new Array(n).fill(0);
    for (const node of adjList) {
        if (node.length) {
            for (const neighbor of node) {
                inDegree[neighbor]++;
            }
        }
    }

    // Step 3: Topological sort using Khan's alg - BFS
    const topologicalSort = [];
    let q = [];
    // fill initial q with nodes with 0-indegree
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] === 0) {
            q.push(i);
        }
    }
    while (q.length) {
        const curr = q[0];
        q = q.slice(1);
        
        topologicalSort.push(curr);

        // bfs
        if (adjList[curr].length) {
            for (const neighbor of adjList[curr]) {
                // decrement inDegree
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    q.push(neighbor);
                }
            }
        }
    }

    // check for cycle
    if (topologicalSort.length !== adjList.length) {
        console.log("Graph contains cycle, no solution")
        return [];
    }
    return topologicalSort;
};

// Course Schedule driver code
console.log("\n9. Course Schedule II");
process.stdout.write("TEST CASE I: ");
const prereqs1 = [[1,0],[2,0],[3,1],[3,2]];
const CSres1 = courseScheduleII(4, prereqs1);
if (JSON.stringify(CSres1) === JSON.stringify([ 0, 1, 2, 3 ])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}