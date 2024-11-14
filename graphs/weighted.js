/**
 * Weighted Graph
 * 
 * Minimum Spanning Tree
 * 
 * Dijkstra's Algorithm
 */

import MinHeap from "../trees/heap.js";

class WeightedGraph {
    v;
    list;
    constructor(v) {
        this.v = v;
        this.list = [];
    }

    // add edge to undirected graph
    addEdge(src, dest, weight) {
        this.list.push([src, dest, weight]);
        // check if increased v
        if (this.list.length > this.v) {
            this.v++;
        }
    }

    // display graph
    displayGraph() {
        console.log("\nsrc| dest| weight")
        for (const edge of this.list) {
            console.log(`\n${edge.join("  |  ")}`);
        }
    }

    // detect cycle in a connected undirected graph using Union Find
    isCyclic() {
        // Step 1: Initialize Union Find
        const uf = new UnionFind(this.v);

        // Step 2: Check if two vertices share a root
        for (const [u, v, weight] of this.list) {
            let rootU = uf.find(u);
            let rootV = uf.find(v);
            if (rootU == rootV) { // if vertices share a root
                return true; // a cycle exists
            }
            uf.union(u, v); // union the disjoint sets
        }

        // no cycle found
        return false
    }

    // minimum spanning tree
    // A minimum spanning tree (MST) is defined as a spanning tree that 
    // has the minimum weight among all the possible spanning trees.
    kruskalMST() {
        // Step 1: sort edges by weight
        const sorted = this.list.sort((a, b) => a[2] - b[2]);
        
        // Step 2: Initialize Union-Find
        const uf = new UnionFind(this.v);
        const mst = [];
        let mstWeight = 0;

        // Step 3: Process edges in increasing order
        for (const [u, v, weight] of sorted) {
            if (uf.find(u) !== uf.find(v)) {
                uf.union(u, v);
                mst.push([u, v, weight]);
                mstWeight += weight;
            }
        }
        return {mst, mstWeight}
    }

    /*
    Dijkstra's algorithm
    */
    dijkstra(start) {
        // Convert to adjacency list
        const adjList = {};
        for (const [u, v, w] of this.list) {
            // add edge u -> v with weight w
            adjList[u] = adjList[u] ? [...adjList[u], [v, w]] : [[v, w]];
            // add edge v -> u with weight w
            adjList[v] = adjList[v] ? [...adjList[v], [u, w]] : [[u, w]];
        }

        // Initialize distance array
        const distances = Array(this.v).fill(Infinity);
        distances[start] = 0;

        // Initialize parents array
        const parents = Array(this.v).fill(null);

        // Initialize min heap
        const minHeap = new MinHeap(this.v);
        minHeap.insert([0, start]); // [distance, vertex]

        // Main loop
        while (!minHeap.isEmpty()) {
            const [currentDist, current] = minHeap.extractMin();

            // Skip if distance is greater than the recorded distance
            if (currentDist > distances[current]) continue;

            // Process all edges from the current vertex
            for (const [neighbor, weight] of adjList[current] || []) {
                const distance = distances[current] + weight;
                
                // If new distance is shorter, update distance and parent
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    parents[neighbor] = current;
                    minHeap.insert([distance, neighbor]);
                }
            }
        }
        return {distances, parents};
    }

    getPath(parents, target) {
        const path = [];
        let current = target;
        while (current !== null) {
            path.push(current);
            current = parents[current];
        }
        return path.reverse();
    }
}

/**
 * Disjoint Set Union Find
 */
class UnionFind {
    parent;
    rank;
    constructor(V) {
        this.parent = Array.from({ length: V }, (_, i) => i);
        this.rank = Array(V).fill(0);
    }

    find(x) {
        if (!this.parent[x] == x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression, each node points to root
        }
        return this.parent[x]
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            // Union by rank to keep the tree balanced
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

// Weighted Graph driver coxced
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
console.log(weightedGraph.isCyclic());
console.log("\n2. Minimum Spanning Tree - Kruskal's Algorithm")
console.log(weightedGraph.kruskalMST());

console.log("\n3. Dijkstra's Algorithm")
const dijkstraResult = weightedGraph.dijkstra(0);
console.log(dijkstraResult);
console.log("\n3. Path from 0 to 3: ")
console.log(weightedGraph.getPath(dijkstraResult.parents, 3));