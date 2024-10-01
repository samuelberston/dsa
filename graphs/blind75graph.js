/*
    Blind 75 Graph Problems

    1. Clone Graph
    2. Course Schedule
    3. Pacific Atlantic Water Flow
    4. Number of Islands (Grid and Graph)
    5. Longest Consquetive Sequence
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
    const clone = Array.from({length: graph.length}).map(() => []);
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
console.log("1. Create clone of graph: ", adjList);
console.log(cloneGraph(adjList));


/**
 * 2. Course Schedule I
 * There are total numCourses to take.
 * Given and array of prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
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
const prerequisites1 = [[1 ,0], [2, 1], [3, 2]];
console.log("\n2. Course Schedule")
console.log("Detects valid schedule: ", courseSchedule(numCourses1, prerequisites1));

const numCourses2 = 2;
const prerequisites2 = [[1,0],[0,1]];
console.log("Detects invalid schedule: ", !courseSchedule(numCourses2, prerequisites2));

/**
 * 3. Pacific Atlantic Water Flow
 * Step 1: Create visited matrixes for Pacific / Atlantic sides
 * Step 2: Use BFS to determine water flow from Pacific / Atlantic oceans
 * Step 3: Compare the two matrices to determine cells which flow to both oceans
 * @param {number[][]} graph
 * @return {number[][]}
 */
const waterFlow = (graph) => {
    // edge cases
    if (!graph || graph.length === 0 || graph[0].length === 0) return [];

    // Step 1 - initialize visited matrices and directions
    const m = graph.length;
    const n = graph[0].length;
    const visitedPacific = Array.from({ length: m }).map(() => Array(n).fill(false));
    const visitedAtlantic = Array.from({ length: m }).map(() => Array(n).fill(false));
    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1] // right
    ];

    // Step 2 - bfs for water flow
    const bfs = (cell, visited) => {
        const queue = [];
        let head = 0;
        queue.push(cell);
        while (head < queue.length) {
            const curr = queue[head];
            head++;
            const i = curr[0];
            const j = curr[1];
    
            for (const [dx, dy] of directions) { // visit adjacent cells
                const x = i + dx;
                const y = j + dy;
    
                if (
                    x >= 0 && x < m && // check cell is
                    y >= 0 && y < n && // within parameters
                    !visited[x][y] && // not visited
                    graph[x][y] >= graph[i][j] // water can flow
                ) {
                    queue.push([x, y]); // enqueue and 
                    visited[x][y] = true; // visit cell
                }
            }
        }
    }    

    // Pacific water flow
    for (let i = 0; i < m; i++) {
        bfs([i, 0], visitedPacific); // first column
    }
    for (let j = 0; j < n; j++) { 
        bfs([0, j], visitedPacific); // top row
    }
    console.log(visitedPacific);

    // Atlantic water flow
    for (let i = 0; i < m; i++) {
        bfs([i, n - 1], visitedAtlantic); // last column
    }
    for (let j = 0; j < n; j++) {
        bfs([m - 1, j], visitedAtlantic); // bottom row
    }
    console.log(visitedAtlantic);

    // Step 3: Form results
    const results = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (
                visitedPacific[i][j] && // waters flows to both
                visitedAtlantic[i][j]   // Pacific and Atlantic
            ) {
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