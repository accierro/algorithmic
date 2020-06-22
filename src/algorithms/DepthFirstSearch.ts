import { AlgorithmOptions, Cell } from "../types";
import BaseAlgorithm from "./BaseAlgorithm";

class DepthFirstSearch extends BaseAlgorithm {
  private stack: Cell[];

  constructor(options: AlgorithmOptions) {
    super(options);

    this.stack = [this.startCell];
  }

  tick() {
    const changedRows: Set<number> = new Set();

    if (this.stack.length !== 0) {
      const node = this.stack.pop() as Cell;
      node.visited = true;
      const { x } = node;
      changedRows.add(x);

      this.getNeighboors(this.grid, node).forEach((n) => {
        if (n === this.targetCell) {
          this.finished = true;
        } else if (!n.visited) {
          this.stack.push(n);
        }
      });
    } else {
      this.finished = true;
    }

    return { changedRows };
  }
}

export default DepthFirstSearch;
