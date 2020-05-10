import { AlgorithmOptions, Cell } from "../types";

class DepthFirstSearch {
  private grid: Cell[][];

  private stack: Cell[];

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

      if (x - 1 >= 0) {
        const check = this.grid[x - 1][y];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          this.stack.push(check);
        }
      }

      if (y - 1 >= 0) {
        const check = this.grid[x][y - 1];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          this.stack.push(check);
        }
      }

      if (y + 1 < this.columns) {
        const check = this.grid[x][y + 1];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          this.stack.push(check);
        }
      }

      if (x + 1 < this.rows) {
        const check = this.grid[x + 1][y];
        if (check === this.targetCell) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          this.stack.push(check);
        }
      }
    }

    return { resume: !found && this.stack.length > 0, changedRows };
  }
}

export default DepthFirstSearch;
