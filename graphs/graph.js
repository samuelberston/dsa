// graph data structures
// - adjacency matrix
// - undirected adjacency list
// - directed adjacency list: transpose, bfs, dfs, detect cycle, topological sort
// - undirected weighted graph

// adjacency matrix representation
class AdjacencyMatrix {
    matrix; // VxV matric representing undirected edges in the graph
    constructor(V) {
        this.matrix = Array.from({ length: V }, () => Array(V).fill(0));
    }
    addEdge(i, j) {
        this.matrix[i][j] = 1; // graph is
        this.matrix[j][i] = 1; // undirected
    }
    displayMatrix() {
        for (const row of this.matrix) {
            console.log(row.join(", "));
        }
    }
}

// driver code - undirected unconnected adjacency matrix graph
console.log("\nUndirected Adjacency Matrix");
console.log("----------------")
let adjMat = new AdjacencyMatrix(4);
console.log("adding edges to graph...");
adjMat.addEdge(0, 2);
adjMat.addEdge(2, 3);
adjMat.addEdge(1, 3);
console.log("1. display undirected adjacency matrix");
adjMat.displayMatrix();

// adjacency list representation
class AdjacencyList {
    list;
    constructor(V) {
        this.list = Array(V).fill(null).map(() => []);
    } 
    addEdge(i, j) {
        this.list[i].push(j); // graph is
        this.list[j].push(i); // undirected
    }
    displayList() {
        for (let i = 0; i < this.list.length; i++) {
            // prevent new line
            process.stdout.write(`${i}: `);
            for (const edge of this.list[i]) {
                process.stdout.write(`${edge} `);
            }
            console.log();
        }
    }
}

// driver code - undirected adjacency list
console.log("\nUndirected Adjacency List");
console.log("-------------------------")
let adjList = new AdjacencyList(4);
adjList.addEdge(0, 2);
adjList.addEdge(2, 3);
adjList.addEdge(1, 3);
console.log("1. display undirected adjacency list");
adjList.displayList();

// directed graph class
class directedAdjacencyList {
    list;
    visited;
    constructor(V) {
        this.list = Array(V).fill(null).map(() => []);
        this.visited = Array(V).fill(false);
        this.indegree = Array(V).fill(0);
    }

    // add edge
    addEdge(src, dest) {
        // edge case: node already present
        if (this.list[src].includes(dest)) {
            console.log(`cannot add duplicate edge: ${src}->${dest}`);
            return;
        }
        // directed graph only adds the edge to the outgoing node
        this.list[src].push(dest);
        this.indegree[dest]++;
        console.log(`added edge: ${src}-${dest}`);
    }

    // remove edge
    removeEdge(src, dest) {
        // edge case: edge not present
        if (!this.list[src].includes(dest)) {
            console.log(`edge not present: ${src}->${dest}`);
            return;
        }
        const index = this.list[src].indexOf(dest);
        this.list[src].splice(index, 1);
        console.log(`removed edge: ${src}->${dest}`);
    }

    // display graph
    displayGraph() {
        // iterate through nodes and print all neighbors
        for (let i = 0; i < this.list.length; i++) {
            let vertex = this.list[i];
            process.stdout.write(`${i}: `);
            for (let j = 0; j < vertex.length; j++) {
                process.stdout.write(`${vertex[j]} `);
            }
            console.log();
        }
    }

    // transpose the direction of all the edges in the graph
    transpose() {
        let transposed = Array(this.list.length).fill(null).map(() => []);
        // iterate nodes and transpose src/dest nodes
        for (let i = 0; i < this.list.length; i++) {
            let src = i;
            let edges = this.list[src];
            // iterate edges
            for (let j = 0; j < edges.length; j++) {
                let dest = edges[j];
                // reassign the edge from the destination node to the source node
                transposed[dest].push(src);
            }
        }
        this.list = transposed;
    }

    // reset visited
    resetVisited() {
       this.visited = Array(this.list.length).fill(false);
    }

    // 3. breadth-first search of directed graph
    bfs(src, visited = Array(this.V).fill(false)) {
        const queue = [];
        // visit the first node and enqueue it
        visited[src] = true;
        queue.push(src);
        // pull nodes from the queue in level-order
        while (queue.length) {
            const curr = queue.shift();
            process.stdout.write(`${curr} `);
            // iterate over edges
            for (const x of this.list[curr]) {
                if (!visited[x]) {
                    visited[x] = true; // visit edge
                    queue.push(x); // enqueue edge
                }
            }
        }
    }

    // 4. bfs for disconnected graph, touches all nodes
    bfsDisconnected() {
        const visited = Array(this.V).fill(false);
        // iteratively visit each node and do bfs on adjacent nodes
        for (let i = 0; i < this.list.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                this.bfs(i, visited); // invoke bfs function for each node
            }
        }
    }

    // 5. depth-first search of directed graph
    dfs(src, visited = Array(this.V).fill(false)) {
        // visit current node
        visited[src] = true;
        process.stdout.write(`${src} `);
        // recursively visit adjacent nodes
        if (this.list[src]) {
            for (const node of this.list[src]) {
                if (!visited[node]) {
                    this.dfs(node, visited);
                }
            }
        }
    }

    // 6. depth-first search of a directed graph with disconnected node
    dfsDiconnected() {
        const visited = Array(this.V).fill(false);
        // loop through all vertices to handle disconnected graph
        for (let i = 0; i < this.list.length; i++) {
            if (!visited[i]) {
                this.dfs(i, visited); // perform dfs
            }
        }
    }

    // 7. find level of X node using bfs level-order traversal
    findLevel(X) {
        // edge case: node is not in the graph
        if (!this.list[X]) {
            return -1;
        }
        // level order traversal 
        const queue = [0];
        let level = 0; // track level
        const visited = Array(this.V).fill(false);
        while (queue.length) {
            // iterate nodes at current level in graph
            for (let i = 0; i < queue.length; i++) {
                const node = queue.shift(); // current node
                // return level if X is node
                if (X == node) {
                    console.log(`the level of node ${X} is ${level}`);
                    return level;
                }
                // visit and enqueue adjacent nodes in level-order
                for (const dest of this.list[node]) {
                    if (!visited[dest]) {
                        visited[dest] = true;
                        queue.push(dest);
                    }
                }
            }
            level++; // increment level each ancestral pass through the loop
        }
    }

    // find ancestors of each node in the graph
    findAncestors() {
        // transpose the graph so that nodes point to their ancestors
        this.transpose();
        // print ancestors of each node
        for (let j = 0; j < this.list.length; j++) {
            process.stdout.write(`Ancestors of node ${j}: `);
            if (this.list[j].length == 0) {
                console.log("None");
            } else {
                console.log([...this.list[j]].join(", "));
            }
        } 
        // transpose back to normal
        this.transpose();  
    }

    // cycle detection using dfs
    // track recursion stack to check if node has already been visited during current path
    isCyclicUtil(node, visited, recStack) {
        if (!visited[node]) {
            visited[node] = true; // visit node
            recStack[node] = true; // add to recursion stack
            for (const neighbor of this.list[node]) { // visit each
                if (!visited[neighbor] &&  // unvisited neighbor
                    this.isCyclicUtil(neighbor, visited, recStack)) {
                    return true;
                } else if (recStack[neighbor]) {
                    return true;
                }
            }
        }
        recStack[node] = false; // remove from recursion stack before returning, starting new path
        return false;
    }

    // Function to detect cycle in a directed graph
    isCyclic() {
        const visited = new Array(this.list.length).fill(false);
        const recStack = new Array(this.list.length).fill(false);

        // Call the recursive helper function to 
        // detect cycle in different DFS trees
        for (let i = 0; i < this.list.length; i++) { // iterate each node in case there's a disconnected node
            if (!visited[i] && 
                this.isCyclicUtil(i, visited, recStack)) {
                return true;
            }
        }

        return false; // no cycle detected
    }

    // topological sort for directed acyclic graph
    topologicalSort() {
        const visited = Array(this.list.length).fill(false); // have to delcare visited here for recursion - figure out why
        const stack = []; // it's an actual empty stack this time, not a bool array
        for (let i = 0; i < this.list.length; i++) { // for each
            if (!visited[i]) { // unvisited node
                this.topologicalSortDFS(i, visited, stack); // perform dfs
            }
        }

        // After all vertices have been visited, pop elements from the stack and append them to the output list until the stack is empty.
        const result = [];
        while (stack.length) {
            result.push(stack.pop());
        }
        console.log(`DFS topological sort: ${result.join(", ")}`);
        return result;
    }

    // topological sort depth-first search helper
    // How do you know you're chosing the number with min adjacent nodes ???? sort by node list length?
    topologicalSortDFS(node, visited, stack) {
        visited[node] = true; // visit current node
        if (this.list[node]) { // if there are neighbor nodes
            for (const neighbor of this.list[node]) { // for each
                if (!visited[neighbor]) { // unvisited neighbor
                    this.topologicalSortDFS(neighbor, visited, stack); // recurse on neighbor
                }
            }
        }
        stack.push(node); // once all neighbors visited, push node to recStack
    }

    // Khan's algorithm for topological sort
    khansAlg() {
        // Vector to store in-degree of each node
        const indegree = Array(this.list.length).fill(0);
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i]) {
                for (const neighbor of this.list[i]) {
                    indegree[neighbor]++;
                }
            }
        }
        // q of vertices with in-degree 0
        const q = [];
        for (let i = 0; i < indegree.length; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }
        const result = [];
        while (q.length) { // while nodes with in-degree 0
            const node = q.shift();
            result.push(node);
            // decrease in-degree of adjacent nodes
            for (const neighbor of this.list[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        // check for cycle
        if (result.length !== this.list.length) {
            console.log("Graph contains cycle!");
            return [];
        }
        console.log(`Khan's algorithm topological sort: ${result.join(", ")}`)
        return result;
    }

    // 11. add max edges to DAG so it is still a DAG
    addMaxEdgesDAG() {
        const topologicalOrder = this.khansAlg(); // get nodes in topological order
        const visited = Array(this.V).fill(false);
        for (const node of topologicalOrder) { // for each node in topological order
            for (const neighbor of this.list[node]) { // visit adjacent nodes 
                visited[neighbor] = true;
            }
            for (let j = node + 1; j < topologicalOrder.length; j++) { // for each node following it
                if (!visited[this.list[j]]) { // if the edge is not present
                    this.addEdge(node, j); // add edge
                }
                visited[j] = false; // reset visited status
            }
        }
    }

    // connected components
    connectedComponents() {

    }

}

// driver code - directed adjacency list 
let dirAdjList = new directedAdjacencyList(5);
// cyclical graph with disconnected node 4
dirAdjList.addEdge(0, 1);
dirAdjList.addEdge(1, 3);
dirAdjList.addEdge(2, 3);
dirAdjList.addEdge(3, 0);
dirAdjList.addEdge(3, 2);
dirAdjList.addEdge(4, 2);
console.log("\nDirected Adjacency List Algorithms");
console.log("----------------------------------");
console.log("\n1. Display directed adjacency list: ");
dirAdjList.displayGraph();
console.log("\n2. Transpose directed adjacency list: ");
dirAdjList.transpose();
dirAdjList.displayGraph();
dirAdjList.transpose();
console.log("\n3. Breadth-first search of disconnected directed adjacency list starting from node 0: ");
dirAdjList.bfs(0);
dirAdjList.resetVisited();
console.log("\n\n4. Disconnected breadth-first search of directed adjacency list: ")
dirAdjList.bfsDisconnected();
dirAdjList.resetVisited();
console.log("\n\n5. Depth-first search of directed adjacency list starting from node 0: ");
dirAdjList.dfs(0);
dirAdjList.resetVisited();
console.log("\n\n6. Disconnected depth-first search: ");
dirAdjList.dfsDiconnected();
dirAdjList.resetVisited();
console.log("\n\n7. find level of X node in graph: ");
dirAdjList.findLevel(3);
console.log("\n8. find ancestors of all nodes in the graph: ");
dirAdjList.findAncestors();
console.log("\n9. Detect a cycle in a directed graph")
containsCycle = dirAdjList.isCyclic();
console.log(`Contains cycle: ${containsCycle}`);
console.log("\n10. topological sort of DAG")
console.log("adding/removing edges to form DAG")
dirAdjList.removeEdge(2, 3);
dirAdjList.removeEdge(3, 0);
dirAdjList.addEdge(0, 4);
console.log("transformed graph: ");
dirAdjList.displayGraph();
dirAdjList.topologicalSort();
dirAdjList.khansAlg();
console.log("\n11. Add max edges to DAG using topological sort");
dirAdjList.addMaxEdgesDAG();
dirAdjList.displayGraph();



// undirected weighted graph
class WeightedGraph {
    list;
    visited;
    constructor(V) {
        this.list = Array(V).fill(null).map(() => []);
        this.visited = Array(V).fill(null).map(() => false);
    }

    // add edge to undirected graph
    addEdge(n1, n2, weight) {
        this.list[n1].push({
            node: n2,
            weight: weight
        });
        this.list[n2].push({
            node: n1,
            weight: weight
        });
    }

    // display graph
    displayGraph() {
        for (let i = 0; i < this.list.length; i++) {
            let edges = this.list[i].map(edge => `${edge.node} (weight: ${edge.weight})`).join(", ");
            if (edges) {
                console.log(`${i}: ${edges}`);
            } else {
                console.log(`${i}: None`);
            }
        }
    }

    // add a new vertex to the graph - increase graph size
    addVertex(n = 1) {
        for (let i = 0; i < n; i++) {
            this.list.push([]);
        }
    }

    // detect cycle in a connected undirected graph using BFS
    isCyclicBFS() {
        const queue = [0];
        while(queue.length) {
            const node = queue.shift();
            if (this.visited[node]) {
                console.log("Graph contains a cycle")
                return true; // detected cycle
            }
            this.visited[node] = true;
            // enqueue adjacent nodes
            if (this.list[node]) {
                for (const neighbor of this.list[node]) {
                    queue.push(neighbor);
                }
            }
        }
        console.log("Graph does not contain a cycle");
        return false;
    }


    // minimum spanning tree
    // A minimum spanning tree (MST) is defined as a spanning tree that 
    // has the minimum weight among all the possible spanning trees.
    minSpanningTree() {
        // Kruskal's algorithm
        // first, sort edges by weight
        // then, iteratively find spanning tree, adding lowest weights w/o forming a cycle

    }

    /*
    Djikstra's algorithm
    */
}

// driver code - weighted graph
console.log("\nWeighted Graph");
console.log("----------------")
const weightedGraph = new WeightedGraph(5);
// connected cyclic weighted graph 
weightedGraph.addEdge(0, 1, 2);
weightedGraph.addEdge(1, 3, 3);
weightedGraph.addEdge(2, 3, 4);
weightedGraph.addEdge(3, 4, 1);
weightedGraph.addEdge(4, 0, 2);
console.log("\n1. Display undirected weighted graph ");
weightedGraph.displayGraph();
console.log("\n1. Detect cycle in undirected graph: ")
weightedGraph.isCyclicBFS();
