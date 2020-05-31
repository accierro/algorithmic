import { Cell, AlgorithmOptions } from "../types";
import BaseAlgorithm from "./BaseAlgorithm";

class BreadthFirstSearch extends BaseAlgorithm {
  private queue: Cell[];
  constructor(options: AlgorithmOptions) {
    super(options);
    this.startCell.visited = true;
    this.queue = [this.startCell];
  }

  tick() {
    const changedRows: Set<number> = new Set();
    if (this.queue.length !== 0) {
      const node = this.queue.shift() as Cell;
      this.getNeighboors(this.grid, node).forEach((n) => {
        if (n === this.targetCell) {
          this.finished = true;
        } else if (!n.visited) {
          changedRows.add(n.x);
          n.visited = true;
          this.queue.push(n);
        }
      });
    } else {
      this.finished = true;
    }
    return { changedRows };
  }
}

export default BreadthFirstSearch;
