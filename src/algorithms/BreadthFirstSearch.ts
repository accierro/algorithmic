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
    let found = false;
    const changedRows: number[] = [];
    if (this.queue.length !== 0) {
      const node = this.queue.shift() as Cell;
      this.getNeighboors(this.grid, node).forEach((n) => {
        if (n === this.targetCell) {
          found = true;
        } else if (!n.visited) {
          changedRows.push(n.x);
          n.visited = true;
          this.queue.push(n);
        }
      });
    }
    return { resume: !found && this.queue.length !== 0, changedRows };
  }
}

export default BreadthFirstSearch;
