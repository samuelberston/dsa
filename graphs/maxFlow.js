/**
 *      Max Flow in a directed weighted graph
 * 
 */
class DirWeighedGraph {
    constructor(V) {
        this.V = V;
        this.list = [];
    }

    // add edge
    addEdge(src, dst, wt) {
        this.list[src] = this.list[src] ? [...this.list[src], [dst, wt]] : [[dst, wt]];
        if (this.list.length > this.V) {
            this.V++;
        }
    }

    // display graph
    displayGraph() {
        for (let i = 0; i < this.list.length; i++) {
            for (const edge of this.list[i]) {
                console.log(`${i} -${edge[1]}-> ${edge[0]}`);
            }
        }
    }

    // Return true if path from source to sink exists
    // fills parent array with path
    pathExists(rGraph, src, dst, parent) {
        const visited = new Array(this.V).fill(false);
        const queue = [];
        queue.push(src);
        visited[src] = true;
        parent[src] = -1;
        while (queue.length) {
            const node = queue.shift();
            console.log(node);
            for (const [neighbor, weight] of rGraph[node]) {
                if (!visited[neighbor] && weight > 0) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                    parent[neighbor] = node;
                }
            }
        }
        return visited[dst];
    }

    // Ford-Fulkerson algorithm
    fordFulkerson(src, dst) {
        // create residual graph
        const rGraph = Array.from({length: this.V }, () => []);
        for (let i = 0; i < this.V; i++) {
            if (this.list[i]) {
                for (const [dest, weight] of this.list[i]) {
                    // add edge to residual graph
                    rGraph[i].push([dest, weight])
                }
            }
        }
        console.log(rGraph);

        // Initialize parent array
        const parent = new Array(this.V).fill(-1);

        // Augment the flow while there is path from source to sink
        let maxFlow = 0;

        while (this.pathExists(rGraph, src, dst, parent)) {
            let pathFlow = Infinity;

            // find minimum residual capacity of the edges along the path filled by pathExists function
            for (let v = dst; v != src; v = parent[v]) {
                const u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v][1]);
            }

            // update residual capacities of the edges and reverse edges along the path
            for (let v = dst; v != src; v = parent[v]) {
                const u = parent[v];
                rGraph[u][v][1] -= pathFlow;
                rGraph[v][u][1] += pathFlow;
            }

            // add path flow to max flow
            maxFlow += pathFlow;
        }

        return maxFlow;
    }
    
}

console.log("\nDirected Weighted Graph");
const DWG = new DirWeighedGraph(6);
DWG.addEdge(0, 1, 16);
DWG.addEdge(0, 2, 13);
DWG.addEdge(1, 2, 10);
DWG.addEdge(1, 3, 12);
DWG.addEdge(2, 1, 4);
DWG.addEdge(2, 4, 14);
DWG.addEdge(3, 2, 9);
DWG.addEdge(3, 5, 20);
DWG.addEdge(4, 3, 7);
DWG.addEdge(4, 5, 4);
console.log("\nDisplay graph:");
DWG.displayGraph();
console.log("\nFord-Fulkerson algorithm:");
const ff = DWG.fordFulkerson(0, 5);
console.log(`Max flow: ${ff}`);