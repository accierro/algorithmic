import { Cell, AlgorithmOptions } from "../types";

class BaseAlgorithm {
  protected grid: Cell[][];

  protected startCell: Cell;
  protected targetCell: Cell;

  protected rows: number;
  protected columns: number;
  protected iter: number;
  constructor(options: AlgorithmOptions) {
    this.grid = options.grid;
    this.startCell = options.startCell;
    this.targetCell = options.targetCell;

    this.rows = options.rows;
    this.columns = options.columns;

    this.iter = 0;
  }

  getNeighboors(grid: Cell[][], cell: Cell, includeVisited = false): Cell[] {
    this.iter++;
    const neighboors = [];
    const { x, y } = cell;
    if (x - 1 >= 0) {
      const check = grid[x - 1][y];
      if (!check.isWall && (includeVisited || !check.visited)) {
        check.iter = this.iter;
        neighboors.push(check);
      }
    }

    if (y - 1 >= 0) {
      const check = grid[x][y - 1];
      if (!check.isWall && (includeVisited || !check.visited)) {
        check.iter = this.iter;
        neighboors.push(check);
      }
    }

    if (y + 1 < this.columns) {
      const check = grid[x][y + 1];
      if (!check.isWall && (includeVisited || !check.visited)) {
        check.iter = this.iter;
        neighboors.push(check);
      }
    }

    if (x + 1 < this.rows) {
      const check = grid[x + 1][y];
      if (!check.isWall && (includeVisited || !check.visited)) {
        check.iter = this.iter;
        neighboors.push(check);
      }
    }

    return neighboors;
  }

  deleteWalls(): number[] {
    const diff = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].isWall) {
          this.grid[i][j].isWall = false;
          diff.push(i);
        }
      }
    }
    return diff;
  }
}

export default BaseAlgorithm;
