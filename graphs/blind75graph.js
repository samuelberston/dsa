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