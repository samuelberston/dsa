/*
    Blind 75 Graph Problems

    1. Clone Graph
    2. Course Schedule
    3. Pacific Atlantic Water Flow
    4. Number of Islands (Grid and Graph)
    5. Longest Consecutive Sequence
    6. Alien dictionary
    7. Graph valid tree
    8. Connected Components

*/

/**
 * 1. Clones a connected undirected graph using BFS
 * Nodes are 1-indexed, each node's value is equal to its index   
 * @param {number[][]} graph - Adjacency list representation of the graph.
 * @returns {number[][]} - Cloned adjacency list.
*/
const cloneGraph = (graph) => {
    const queue = []; // use bfs
    const clone = Array.from({length: graph.length}, () => []);
    const visited = Array(graph.length).fill(false);
    // visit and enqueue first node
    queue.push(1); // start with one not zero because 1-indexed
    visited[1 - 1] = true; // -1 because 1-indexed
    while (queue.length > 0) {
        const curr = queue.shift();
        // visit adjacent nodes and add them to clone
        for (const neighbor of graph[curr - 1]) {
            clone[curr - 1].push(neighbor); // add to the clone
            if (!visited[neighbor - 1]) { // for unvisited edges (-1 because 1-indexed)
                visited[neighbor - 1] = true; // mark visited (-1 because 1-indexed)
                queue.push(neighbor); // enqueue adjacent node
            }
        }
    }
    return clone;
}

// Clone Graph driver code
const adjList = [[2,4],[1,3],[2,4],[1,3]];
console.log("\n1. Create clone of graph: ", adjList);
const cloned = cloneGraph(adjList);
process.stdout.write("TEST CASE 1: ");
if (JSON.stringify(cloned) === JSON.stringify(adjList)) {
    console.log('\x1b[32m%s\x1b[0m', "SUCCESS");
} else {
    console.error("FAILED");
}


/**
 * 2. Course Schedule I
 * There are total numCourses to take.
 * Given an array of prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * Return true if you can finish all courses, otherwise false.
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean} 
 */
const courseSchedule = (n, pre) => { // approach: bfs detect cycle
    // Step 1: Form adjacency list
    const adjList = [];
    for (const edge of pre) {
        let course = edge[0];
        let prereq = edge[1];
        if (!adjList[prereq]) {
            adjList[prereq] = [];
        }
        adjList[prereq].push(course);
    }

    // Step 2: bfs detect cycle 
    const queue = [];
    const visited = Array(n).fill(false);

    queue.push(0); // enqueu first node

    while (queue.length) {
        const curr = queue.shift();

        if (visited[curr]) { // check for cycle
            return false;
        }

        visited[curr] = true; // visit current node

        if (adjList[curr]) {
            for (const neighbor of adjList[curr]) { // visit and 
                queue.push(neighbor); // enqueue adjacent nodes
            }
        }
    }

    return true; // no cycle detected
}

// driver code
const numCourses1 = 2;
const prerequisites1 = [[1, 0], [2, 1], [3, 2]];
console.log("\n2. Course Schedule")
console.log("Detects valid schedule: ", courseSchedule(numCourses1, prerequisites1));

const numCourses2 = 2;
const prerequisites2 = [[1,0],[0,1]];
console.log("Detects invalid schedule: ", !courseSchedule(numCourses2, prerequisites2));

/**
 * 3. Pacific Atlantic Water Flow
 * 
 * Step 1: Create visited matrices for Pacific / Atlantic sides
 * Step 2: Use BFS to determine water flow from Pacific / Atlantic oceans
 * Step 3: Compare the two matrices to determine cells which flow to both oceans
 * 
 * @param {number[][]} graph
 * @return {number[][]}
 */
const waterFlow = (graph) => {

    // Step 1: create visited matrices for Pacific/Atlantic and define n, m
    const n = graph.length; // # rows
    const m = graph[0].length; // # columns

    const visitedPacific = Array.from({ length: n }, () => Array(m).fill(false));
    const visitedAtlantic = Array.from({ length: n }, () => Array(m).fill(false));
    
    // Step 2: Use BFS to determine water flow for Pacific/Atlantic oceans
    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1] // right
    ];

    /**
     * visiter helper function
     * @param {Number} sr 
     * @param {Number} sc 
     * @param {Boolean[][]} visited 
     */
    const bfs = (sr, sc, visited) => {
        let queue = [[sr, sc]];
        visited[sr][sc] = true;
        while (queue.length) {
            const [i, j] = queue[0]; // for
            queue = queue.slice(1); // speed

            // visit adjacent points
            for (const [dx, dy] of directions) {
                let x = i + dx;
                let y = j + dy;
                if (
                    x >= 0 && x < n && // row in bounds
                    y >= 0 && y < m && // column in bouns
                    !visited[x][y] && // not visited
                    graph[x][y] >= graph[i][j] // water can flow
                ) {
                    queue.push([x, y]);
                    visited[x][y] = true; // visit current point
                }
            }
        }
    }

    // visit Pacific top row
    for (let i = 0; i < m; i++) {
        bfs(0, i, visitedPacific);
    }
    // visit Pacific first column
    for (let i = 0; i < n; i++) {
        bfs(i, 0, visitedPacific);
    }
    // visit Atlantic bottom row
    for (let i = 0; i < m; i++) {
        bfs(n - 1, i, visitedAtlantic);
    }
    // visit Atlantic last column
    for (let i = 0; i < n; i++) {
        bfs(i, m - 1, visitedAtlantic);
    }

    // Step 3: Determine two matrices overlap
    const results = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (visitedPacific[i][j] && visitedAtlantic[i][j]) { // water can flow to both oceans
                results.push([i, j]);
            }
        }
    }
    return results;
}

// Pacific Atlantic Water Flow driver code
console.log("\n3. Pacific Atlantic Water Flow");
const heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
console.log(waterFlow(heights));
