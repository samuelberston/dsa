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
console.log("Create clone of graph: ", adjList);
console.log(cloneGraph(adjList));