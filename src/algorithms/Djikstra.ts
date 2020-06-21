import { AlgorithmOptions, Cell } from "../types";
import PriorityQueue from "./PriorityQueue";
import BaseAlgorithm from "./BaseAlgorithm";

class Djikstra extends BaseAlgorithm {
  private dist = new Map<Cell, number>();
  private queue = new PriorityQueue<Cell>();
  private previousCell = new Map<Cell, Cell | null>();

  constructor(options: AlgorithmOptions) {
    super(options);

    this.dist.set(this.startCell, 0);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.grid[i][j] != this.startCell) {
          this.dist.set(this.grid[i][j], Infinity);
          this.previousCell.set(this.grid[i][j], null);
        }
      }
    }

    this.queue.enqueue(this.startCell, 0);
  }

  tick() {
    let found = false;
    const changedRows: Set<number> = new Set();

    if (!this.queue.isEmpty()) {
      const node = this.queue.dequeue() as Cell;
      const { x, y } = node;

      this.getNeighboors(this.grid, node).forEach((n) => {
        const exisitingDist = this.dist.get(n) as number;
        const distToNeighboor = (this.dist.get(node) as number) + n.weight;

        if (distToNeighboor < exisitingDist) {
          this.dist.set(n, distToNeighboor);

          if (this.queue.hasValue(n)) {
            this.queue.changePriority(n, distToNeighboor);
            this.previousCell.set(n, node);
          }
        }

        if (!this.queue.hasValue(n)) {
          this.queue.enqueue(n, distToNeighboor);
          this.previousCell.set(n, node);
        }
      });

      if (node === this.targetCell) {
        this.finished = true;
        found = true;
      }
      node.visited = true;
      changedRows.add(x);
    } else {
      this.finished = true;
    }

    if (found) {
      let current = this.targetCell;
      current.isShortestPath = true;
      let i = 0;
      while (current !== this.startCell && i < 100) {
        current = this.previousCell.get(current) as Cell;
        current.isShortestPath = true;
        changedRows.add(current.x);
        i++;
      }
    }

    return { changedRows };
  }
}

export default Djikstra;
