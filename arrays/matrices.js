// Matrix data structure
class Matrix {
    matrix;
    n;
    m;
    constructor(n, m) {
        this.matrix = Array(n).fill(null).map(() => Array(m));
        this.n = n;
        this.m = m;
    }
    
    // add cell
    addCell(value, n, m) {
        if (!this.matrix[n] || !this.matrix[n][m]) {
            console.log(`cell does not exist at ${n} ${m}`);
            return;
        }
    }

    // add elements to matrix
    addElements(elements) {
        if (elements.length !== this.n * this.m) {
            console.log(`Incorrect # of elements, expected ${n*m}`);
        }
        let elementIndex = 0; 
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (elementIndex < elements.length) {
                    this.matrix[i][j] = elements[elementIndex];
                    elementIndex++;
                }
            }
        }
    }

    // display matrix
    displayMatrix() {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i]);
        }
    }

    /*
      spiral traversal
    */
    spiralTraversal() {
        const result = [];
        let spirals = 0;
        while (spirals < Math.min(this.n, this.m) / 2) { // exhaust space
            for (let i = spirals; i < this.m - spirals; i++) { // across top row
                result.push(this.matrix[spirals][i]); 
            }
            for (let i = spirals + 1; i < this.n - spirals; i++) { // down left column
               result.push(this.matrix[i][this.m - spirals - 1]);
            }
            if (this.n - spirals - 1 > spirals) { // if not the same as top row
                for (let i = this.n - spirals - 1; i > spirals - 1; i-- ) { // backwards across bottom row
                    result.push(this.matrix[this.n - spirals - 1][i])
                }    
            }
            if (this.m - spirals - 1 > spirals) { // if not the same as left column
                for (let i = this.n - spirals - 2; i > spirals; i--) { // up right column
                    result.push(this.matrix[i][spirals]);
                }    
            }
            spirals++;
        }
        console.log(result);
        return result;
    }
}


// matrix driver code
console.log("Matrix");
console.log("------");
const matrix = new Matrix(3, 4);
const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
console.log("adding elements...");
matrix.addElements(elements);
console.log("display matrix");
matrix.displayMatrix();
console.log("spiral traversal");
matrix.spiralTraversal();

/**
 * Flood Fill
 * Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].
 * Change the colors of any neighboring pixels that share the same color as the original pixel.
 * A neighboring pixel is connected adjacently, including to one with changed color.
 * 
 * Approach:
 * - use a direction helper function to visit and color the adjacent pixels
 * - use a visited matrix to avoid infinite loops
 * 
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const n = image.length;
    const m = image[0].length
    // create visited array
    const visited = Array.from({ length: n }).map(() => Array(m).fill(false));

    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1] // right
    ];

    const orCol = image[sr][sc]; // original color

    const visiter = (i, j) => {
        visited[i][j] = true;
        image[i][j] = color;

        // visit adjacent pixels
        for (const dir of directions) {
            let dx = dir[0];
            let dy = dir[1];
            let x = i + dx;
            let y = j + dy;
            if (
                x >=0 && x < n && 
                y >= 0 && y < m &&
                !visited[x][y] &&
                image[x][y] == orCol
            ) {
                visiter(x, y);
            }
        }
    }
    
    visiter(sr, sc);

    return image;
};

// Flood Fill Driver Code
console.log("\n1. Flood Fill Image");
const image = [[1,1,1],[1,1,0],[1,0,1]];
console.log("original image: ", image);
console.log("flooded image: ", floodFill(image, 1, 1, 2))

/**
 *      Sudoku Checker
 */
const sudokuChecker = (board) => {
    // Step 1: Initialize column, row, and box checkers
    const rows = Array(9).fill(null).map(() => ({}));
    const columns = Array(9).fill(null).map(() => ({}));
    const boxes = Array(9).fill(null).map(() => ({}));

    const check = (i, j) => {
        const val = board[i][j];
        // handle empty cells
        if (val === '.') return true;

        // edge case
        if (!/^[1-9]$/.test(val)) return false;

        const num = parseInt(val);
        // check row
        if(rows[i][num]) return false;
        rows[i][num] = true;
        // check column
        if (columns[j][num]) return false;
        columns[j][num] = true;
        // check box
        const box = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        if (boxes[box][num]) return false;
        boxes[box][num] = true;
        
        return true;
    };

    // Step 2: Check all cells
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!check(i, j)) return false;
        }
    }

    return true;
};

// Suduoku checker driver code
console.log("\nSudoku checker");
process.stdout.write("TEST CASE 1: ");
const sudoku1 = [["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]];

if (sudokuChecker(sudoku1)) {
    console.log("SUCCESS")
} else {
    console.log("FAILED");
}

process.stdout.write("TEST CASE 2: ");
const sudoku2 = [["8","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]];
if (!sudokuChecker(sudoku2)) {
    console.log("SUCCESS")
} else {
    console.log("FAILED");
}                

/**
    Surrounded Regions

    iterate matrix. Once once encounter an O, use iterate BFS to check surrounding nodes, tracking the index of each O. If we encounter an edge, return: it's not a surrounded region. If we finish traversing the subregion without encountering and edge, update all the saved O indices to X's.
    TC: O(n) where n is number of nodes in the matrix

 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    const visited = Array.from({ length: board.length }, () => Array(board[0].length).fill(false));
    
    const bfs = (i, j) => {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const q = [[i, j]];
        const coordinates = [[i, j]];
        visited[i][j] = true;
        
        let isSurrounded = true;
        
        while (q.length > 0) {
            let [i, j] = q.shift();
            // Check if current position is on border
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                isSurrounded = false;
            }
            
            for (const [dx, dy] of directions) {
                let x = i + dx;
                let y = j + dy;

                // Within bounds and unvisited O
                if (x >= 0 && x < board.length && y >= 0 && y < board[0].length 
                    && board[x][y] === 'O' && !visited[x][y]) {
                    visited[x][y] = true;
                    q.push([x, y]);
                    coordinates.push([x, y]);
                }
            }
        }
        
        if (isSurrounded) {
            for (const [x, y] of coordinates) {
                board[x][y] = 'X';
            }
        }
    };

    // Only process O's
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 'O' && !visited[i][j]) {
                bfs(i, j);
            }
        }
    }

    return board;
};

// Surrounded regions driver code
console.log("\nSurrounded regions");
process.stdout.write("TEST CASE 1: ");
const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
console.log("original board: ", board);
console.log("solved board: ", solve(board));