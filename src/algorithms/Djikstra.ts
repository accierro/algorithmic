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
    const changedRows = [];

    if (!this.queue.isEmpty()) {
      const node = this.queue.dequeue() as Cell;

      const { x, y } = node;

      this.getNeighboors(node).forEach((n) => {
        const exisitingDist = this.dist.get(n) as number;
        const distToNeighboor = (this.dist.get(node) as number) + 1;

        if (distToNeighboor < exisitingDist) {
          this.dist.set(n, distToNeighboor);

          if (this.queue.hasValue(n)) {
            this.queue.changePriority(n, distToNeighboor);
          }
        }

        if (!this.queue.hasValue(n)) {
          this.queue.enqueue(n, distToNeighboor);
        }

        this.previousCell.set(n, node);
      });

      if (node === this.targetCell) {
        found = true;
      }
      node.visited = true;
      changedRows.push(x);
    }

    if (found) {
      let current = this.targetCell;
      current.isShortestPath = true;
      let i = 0;
      while (current !== this.startCell && i < 100) {
        current = this.previousCell.get(current) as Cell;
        current.isShortestPath = true;
        changedRows.push(current.x);
        i++;
      }
    }

    return { resume: !found || this.queue.isEmpty(), changedRows };
  }

  getNeighboors(cell: Cell, includeVisited = false): Cell[] {
    const neighboors = [];
    const { x, y } = cell;
    if (x - 1 >= 0) {
      const check = this.grid[x - 1][y];
      if (!check.isWall && (includeVisited || !check.visited)) {
        neighboors.push(check);
      }
    }

    if (y - 1 >= 0) {
      const check = this.grid[x][y - 1];
      if (!check.isWall && (includeVisited || !check.visited)) {
        neighboors.push(check);
      }
    }

    if (y + 1 < this.columns) {
      const check = this.grid[x][y + 1];
      if (!check.isWall && (includeVisited || !check.visited)) {
        neighboors.push(check);
      }
    }

    if (x + 1 < this.rows) {
      const check = this.grid[x + 1][y];
      if (!check.isWall && (includeVisited || !check.visited)) {
        neighboors.push(check);
      }
    }

    return neighboors;
  }
}

export default Djikstra;
