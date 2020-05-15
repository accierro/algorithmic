import { AlgorithmOptions, Cell } from "../types";
import BaseAlgorithm from "./BaseAlgorithm";

class DepthFirstSearch extends BaseAlgorithm {
  private stack: Cell[];

  constructor(options: AlgorithmOptions) {
    super(options);

    this.stack = [this.startCell];
  }

  tick() {
    let found = false;
    const changedRows = [];

    if (this.stack.length !== 0) {
      const node = this.stack.pop() as Cell;
      node.visited = true;
      const { x, y } = node;
      changedRows.push(x);

      this.getNeighboors(node).forEach((n) => {
        if (n === this.targetCell) {
          found = true;
        } else if (!n.visited) {
          this.stack.push(n);
        }
      });
    }

    return { resume: !found && this.stack.length > 0, changedRows };
  }
}

export default DepthFirstSearch;
