// Intervals
class Intervals {
    intervals;
    constructor(n) {
        if (n < 2) { // min two intervals
            console.log("Intervals must contains at least two elements");
            return;
        }
        this.intervals = Array.from({length: n}, () => Array(2));
        this.n = n;
    }

    // add intervals
    addIntervals(elements) {
        if (elements.length !== this.n * 2) {
            console.log("Incorrect # of elements, expect: ", this.n * 2);
        }
        let elementIndex = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < 2; j++) {
                this.intervals[i][j] = elements[elementIndex++];
            }
        }
    }

    // display intervals
    displayIntervals() {
        for (let i = 0; i < this.intervals.length; i++) {
            process.stdout.write(`[${this.intervals[i]}] `);
        }
        console.log();
    }

    /* 
    Merge Intervals

    edge cases:
    less than two intervals

    brute force:

    optimal approach:
    1. iterate through sorted intervals array tracking currentInterval
    2. if current interval end overlaps next start, update currentInterval tp use the greater end and continue
    3. else if no overlap, push the currentInterval and update it to before continuing
    4. push the last interval and retyrn results

    */
    mergeIntervals() {
        const sorted = this.intervals.sort((a, b) => a[0] - b[0]);
        const results = [];
        let currentInterval = sorted[0];

        for (let i = 1; i < sorted.length; i++) {
            if (currentInterval[1] >= sorted[i][0]) { // current end overlaps next start
                currentInterval = [currentInterval[0], Math.max(currentInterval[1], sorted[i][1])]; // use the greater end
            } else { // no overlap
                results.push(currentInterval); // push current interval
                currentInterval = sorted[i];
            }
        } 
        results.push(currentInterval); // push the last interval
        console.log(results);
        return results;
    }

    /**
     *      Minimum Number of Arrows to Burst Balloons
     * given a set of intervals, return the minimum points which is contained by them
     * 
     * @param {number[][]} points
     * @return {number}
     */
    minArrows(points = this.intervals) {
        // Step 1: sort points
        points = points.sort((a, b) => a[0] - b[0]);

        // Step 2: iterate points, count disjoint sets of points that overlap
        let sets = 0;
        let curr = points[0];
        for (let i = 1; i < points.length; i++) {
            // find overlap with current point
            if (curr[1] >= points[i][0]) { // curr end overlaps next start
                if (curr[1] >= points[i][1]) { // curr end overlaps next end
                    curr = points[i][1]; 
                } else { // curr end less than next end
                    curr = [curr[1], points[i][0]];
                }
            } else {
                sets++; // pop baloon
                curr = points[i];
            }
        }
        console.log(sets);
        return sets;
    }
}

// Intervals driver code
const intervals = new Intervals(6);
console.log("adding intervals...");
const elements = [1, 4, 6, 8, 3, 5, 7, 9, 0, 5, 11, 12];
intervals.addIntervals(elements);
console.log("display intervals");
intervals.displayIntervals();
console.log("merge intervals");
intervals.mergeIntervals();
console.log("min arrows to burst balloons");
intervals.minArrows();
