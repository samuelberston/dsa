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

            // increment spirals
            spirals++;
        }
        console.log(result);
        return result;
    }

    /*
      Capture Surrounded Regions in a Matrix
      A surrounded region is captured by replacing all 'O's with 'X's in the input matrix board.
    */
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
