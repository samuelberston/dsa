/**
 * Weighted Graph
 * 
 * Minimum Spanning Tree
 * 
 * Dijkstra's Algorithm
 */

class WeightedGraph {
    list;
    visited;
    constructor(V) {
        this.list = Array(V).fill(null).map(() => []);
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

    // ISSUE: update this to check for parent node, might always be returning true
    // detect cycle in a connected undirected graph using BFS
    isCyclicBFS() {
        const queue = [0];
        const visited = Array(this.V).fill(false);
        while(queue.length) {
            const node = queue.shift();
            if (visited[node]) {
                console.log("Graph contains a cycle")
                return true; // detected cycle
            }
            visited[node] = true;
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
