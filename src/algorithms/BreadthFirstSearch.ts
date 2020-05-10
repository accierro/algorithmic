import { Cell, AlgorithmOptions } from "../types";

class BreadthFirstSearch {
  private grid: Cell[][];

  private queue: Cell[];

  private startCell: Cell;
  private targetCell: Cell;

  private rows: number;
  private columns: number;
  constructor(options: AlgorithmOptions) {
    this.grid = options.grid;
    this.startCell = options.startCell;
    this.targetCell = options.targetCell;

    this.rows = options.rows;
    this.columns = options.columns;

    this.startCell.visited = true;
    this.queue = [this.startCell];
  }

  tick() {
    let found = false;
    const changedRows = [];
    if (this.queue.length !== 0) {
      const node = this.queue.shift() as Cell;

      const { x, y } = node;
      if (x - 1 >= 0) {
        const check = this.grid[x - 1][y];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x - 1);
          check.visited = true;
          this.queue.push(check);
        }
      }

      if (y - 1 >= 0) {
        const check = this.grid[x][y - 1];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x);
          check.visited = true;
          this.queue.push(check);
        }
      }

      if (y + 1 < this.columns) {
        const check = this.grid[x][y + 1];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x);
          check.visited = true;
          this.queue.push(check);
        }
      }

      if (x + 1 < this.rows) {
        const check = this.grid[x + 1][y];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x + 1);
          check.visited = true;
          this.queue.push(check);
        }
      }
    }
    return { resume: !found && this.queue.length !== 0, changedRows };
  }
}

export default BreadthFirstSearch;
