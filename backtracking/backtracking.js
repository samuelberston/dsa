/**
 * 
 *      Backtracking
 * 
 *      1. Letter Combinations of a Phone Number - not actually backtracking
 *      2. Generate Combinations
 *      3. Sudoku Solver
 *      4. Generate Parentheses
 *      5. Clean Room
 * 
 */

/**
 *      1. Letter Combinations of a Phone Number
 * 
 * @param {number} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
    if (!digits.length) { return []; }
    // Step 1: Create numbers to letters map
    const map = new Map();
    map.set(2, ["a", "b", "c"]);
    map.set(3, ["d", "e", "f"]);
    map.set(4, ["g", "h", "i"]);
    map.set(5, ["j", "k", "l"]);
    map.set(6, ["m", "n", "o", "p"]);
    map.set(7, ["p", "q", "r", "s"]);
    map.set(8, ["t", "u", "v"]);
    map.set(9, ["w", "x", "y", "z"]);

    // Step 2: recursively build each possible solution
    const combos = [];
    let p = 0; // first digit
    digits = digits.split("");

    const inner = (digits, p, combo, combos) => {
        // base case
        if (p > digits.length - 1) {
            combos.push(combo);
            return;
        }
        // recursive case
        for (const char of map.get(parseInt(digits[p]))) {
            inner(digits, p + 1, combo + char, combos);
        }
    }
    inner(digits, 0, "", combos);

    return combos;
};

console.log("\n1. Letter Combinations of a Phone Number");

process.stdout.write("TEST CASE 1: ");
const digits1 = "23"; // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
const combos1 = letterCombinations(digits1);
if (JSON.stringify(combos1) === JSON.stringify(["ad","ae","af","bd","be","bf","cd","ce","cf"])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}

process.stdout.write("TEST CASE 2: ");
const digits2 = "587"; 
const combos2 = letterCombinations(digits2);
if (JSON.stringify(combos2) === JSON.stringify([
    'jtp', 'jtq', 'jtr', 'jts', 'jup',
    'juq', 'jur', 'jus', 'jvp', 'jvq',
    'jvr', 'jvs', 'ktp', 'ktq', 'ktr',
    'kts', 'kup', 'kuq', 'kur', 'kus',
    'kvp', 'kvq', 'kvr', 'kvs', 'ltp',
    'ltq', 'ltr', 'lts', 'lup', 'luq',
    'lur', 'lus', 'lvp', 'lvq', 'lvr',
    'lvs'
  ])) {
    console.log("SUCCESS");
} else {
    console.error("FAILED");
}


/**
 * 
 *      Generate combinitation of k integers in range n 
 *      
 *      Example:
 *      n = 5, k = 3
 *      Output: [[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]]
 * 
 *     
 */
const combinations = (n, k) => {
    // edge cases
    if (k > n) return [];
    if (k === 1) return new Array.from({ length: n}, (_, i) => [i + 1]);

    const combos = [];

    // recursively create combos
    const inner = (start = 1, currCombo = []) => {
        // base case
        if (currCombo.length === k) {
            combos.push([...currCombo]);
            return;
        }

        // recursive cases
        for (let i = start; i <= n; i++) { // digits of n
            currCombo.push(i); // add i to currCombo
            inner(i + 1, currCombo); // recurse on next digit
            currCombo.pop(); // backtrack by removing last digit
        }
    }
    inner(1, []);

    return combos;
}

console.log("\n2. Generate Combinations");
process.stdout.write("TEST CASE 1: ");
const res2a = combinations(5, 3);
if (JSON.stringify(res2a) === JSON.stringify([
    [ 1, 2, 3 ], [ 1, 2, 4 ],
    [ 1, 2, 5 ], [ 1, 3, 4 ],
    [ 1, 3, 5 ], [ 1, 4, 5 ],
    [ 2, 3, 4 ], [ 2, 3, 5 ],
    [ 2, 4, 5 ], [ 3, 4, 5 ]
  ])) { 
    console.log("PASSED");
  } else {
    console.log("FAILED");
  }

/**
 *      3. Sudoku Solver
 * 
 *      Example:
 *      Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
 *      Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
 * 
 *      Approach: backtracking 
 *      - iterate through each cell in the board 
 *      - calculate possible solutions based on checker helper 
 *      - recurse on possible solutions
 *      - base case: reached last cell - check board
*/
const sudokuSolver = (board) => {

    // initialize arrays to track visited rows, columns, boxes
    const rows = Array(9).fill().map(() => ({}));
    const columns = Array(9).fill().map(() => ({}));
    const boxes = Array(9).fill().map(() => ({}));
    let solved = false;

    // box index helper
    const boxIndex = (r, c) => Math.floor(r / 3) * 3 + Math.floor(c / 3);
    
    // could place helper
    const couldPlace = (r, c, n) => !rows[r][n] && !columns[c][n] && !boxes[boxIndex(r, c)][n]; 

    // place number helper
    const placeNumber = (r, c, n) => {
        rows[r][n] = true;
        columns[c][n] = true;
        boxes[boxIndex(r, c)][n] = true;
        board[r][c] = n;
    }

    // remove number helper
    const removeNumber = (r, c, n) => {
        rows[r][n] = false;
        columns[c][n] = false;
        boxes[boxIndex(r, c)][n] = false;
        board[r][c] = '.';
    }

    // backtrack
    const backtrack = (r, c) => {
        if (solved) return;

        // base case
        if (r === 9) { // last row = solved
            solved = true;
            return;
        }
        if (c === 9) { // move to next row
            backtrack(r + 1, 0);
            return;
        }

        // If cell is empty
        if (board[r][c] === '.') {
            // iterate 1 - 9
            for (let n = 1; n < 10; n++) {
                const strN = n.toString();
                if (couldPlace(r, c, strN)) { 
                    placeNumber(r, c, strN);
                    backtrack(r, c + 1); // next cell
                    // If not solved, backtrack
                    if (!solved) removeNumber(r, c, strN);
                }
            }
        } else backtrack(r, c + 1); // next cell   
    }
    // Initial values
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== '.') placeNumber(r, c, board[r][c]);
        }
    }

    // backtrack from first cell
    backtrack(0, 0);
    return board;
}

console.log("\n3. Sudoku Solver");
process.stdout.write("TEST CASE 1: ");
const board1 = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
sudokuSolver(board1);
const solution1 = [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]];
console.log(JSON.stringify(board1) === JSON.stringify(solution1) ? "PASSED" : "FAILED");

process.stdout.write("TEST CASE 2: ");
const board2 = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
sudokuSolver(board2);
const solution2 = [["5","1","9","7","4","8","6","3","2"],["7","8","3","6","5","2","4","1","9"],["4","2","6","1","3","9","8","7","5"],["3","5","7","9","8","6","2","4","1"],["2","6","4","3","1","7","5","9","8"],["1","9","8","5","2","4","3","6","7"],["9","7","5","8","6","3","1","2","4"],["8","3","2","4","9","1","7","5","6"],["6","4","1","2","7","5","9","8","3"]];
console.log(JSON.stringify(board2) === JSON.stringify(solution2) ? "PASSED" : "FAILED");

/**
 *      4. Generate Parentheses
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    // approach:
    // - backtracking - generate all combinations
    // - balance - know when to place open or close
    const combos = [];
    // start with opening paren and empty combo
    const backtrack = (leftCount = 0, rightCount = 0, curStr = '') => {
        // base case
        if (curStr.length === 2 * n) {
            combos.push(curStr);
            return;
        }

        // opening count less than n
        if (leftCount < n) {
            curStr += '(';
            backtrack(leftCount + 1, rightCount, curStr);
            curStr = curStr.slice(0, -1);
        }
        // left count greater than right count
        if (leftCount > rightCount) {
            curStr += ')';
            backtrack(leftCount, rightCount + 1, curStr);
            curStr = curStr.slice(0, -1);
        }
    }
    backtrack();
    return combos;
};

console.log("\n4. Generate Parentheses");
process.stdout.write("TEST CASE 1: ");
console.log(JSON.stringify(generateParenthesis(3)) === JSON.stringify(["((()))","(()())","(())()","()(())","()()()"]) ? "PASSED" : "FAILED");
process.stdout.write("TEST CASE 2: ");
console.log(JSON.stringify(generateParenthesis(1)) === JSON.stringify(["()"]) ? "PASSED" : "FAILED");

/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * function Robot() {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     @return {boolean}
 *     this.move = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnLeft = function() {
 *         ...
 *     };
 * 
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void} 
 *     this.turnRight = function() {
 *         ...
 *     };
 *
 *     // Clean the current cell.
 *     @return {void}
 *     this.clean = function() {
 *         ...
 *     };
 * };
 */

/**
 *      5. Clean Room
 * 
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function(robot) {
    const dirs = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1] // left
    ];
    const visited = new Set();

    const goBack = () => {
        robot.turnLeft();
        robot.turnLeft();
        robot.move();
        robot.turnLeft();
        robot.turnLeft();
    }

    // back track every possible path until all squares are clean
    const backtrack = (row = 0, col = 0, dir = 0) => {
        const key = `${row},${col}`;
        visited.add(key);
        robot.clean();

        // recurse in all directions
        for (let i = 0; i < 4; i++) {
            const newDir = (dir + i) % 4;
            const newRow = row + dirs[newDir][0];
            const newCol = col + dirs[newDir][1];
            const newKey = `${newRow},${newCol}`;
            // unvisited area
            if (!visited.has(newKey) && robot.move()) {
                backtrack(newRow, newCol, newDir);
                goBack();
            }
            // rutn clockwise
            robot.turnRight();
        }
    }  

    backtrack();
};

/**
 *      6. Palindrome Partitioning
 * Generate all possible palindrome partitions of a string
 * 
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const partitions = [];

    const isPalindrome = (str) => str.split('').reverse().join('') === str;

    const backtrack = (start = 0, curPart = []) => {
        // base case - end of string
        if (start === s.length) {
            partitions.push([...curPart]);
            return;
        }
        
        // recursive case - iterate through string
        for (let i = start; i < s.length; i++) {
            const substr = s.slice(start, i + 1);
            if (isPalindrome(substr)) {
                curPart.push(substr);
                backtrack(i + 1, curPart);
                curPart.pop();
            }
        }
    }
    backtrack();
    // return partitions
    return partitions;
};

console.log("\n6. Palindrome Partitioning");
process.stdout.write("TEST CASE 1: ");
console.log(JSON.stringify(partition("aab")) === JSON.stringify([["a","a","b"],["aa","b"]]) ? "PASSED" : "FAILED");