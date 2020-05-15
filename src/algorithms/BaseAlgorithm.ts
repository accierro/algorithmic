import { Cell, AlgorithmOptions } from "../types";

class BaseAlgorithm {
  protected grid: Cell[][];

  protected startCell: Cell;
  protected targetCell: Cell;

  protected rows: number;
  protected columns: number;
  constructor(options: AlgorithmOptions) {
    this.grid = options.grid;
    this.startCell = options.startCell;
    this.targetCell = options.targetCell;

    this.rows = options.rows;
    this.columns = options.columns;
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

export default BaseAlgorithm;
