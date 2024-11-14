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