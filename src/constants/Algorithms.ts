import { AlgorithmEnum, Algorithm, AlgorithmStore, Cell } from "../types";

export const ALGORITHMS: AlgorithmStore = {
  [AlgorithmEnum.BREADTH_FIRST_SEARCH]: {
    name: "Breadth First Search",
    id: AlgorithmEnum.BREADTH_FIRST_SEARCH,
    tick: ({ grid, queue, target, rows, columns }) => {
      let found = false;
      const changedRows = [];
      if (queue.length !== 0) {
        const node = queue.shift() as Cell;

        const { x, y } = node;

        if (x - 1 >= 0) {
          const check = grid[x - 1][y];
          if (check === target) {
            console.log("FOUND");
            found = true;
          } else if (!check.visited) {
            changedRows.push(x - 1);
            check.visited = true;
            queue.push(check);
          }
        }

        if (y - 1 >= 0) {
          const check = grid[x][y - 1];
          if (check === target) {
            console.log("FOUND");
            found = true;
          } else if (!check.visited) {
            changedRows.push(x);
            check.visited = true;
            queue.push(check);
          }
        }

        if (y + 1 < columns) {
          const check = grid[x][y + 1];
          if (check === target) {
            console.log("FOUND");
            found = true;
          } else if (!check.visited) {
            changedRows.push(x);
            check.visited = true;
            queue.push(check);
          }
        }

        if (x + 1 < rows) {
          const check = grid[x + 1][y];
          if (check === target) {
            console.log("FOUND");
            found = true;
          } else if (!check.visited) {
            changedRows.push(x + 1);
            check.visited = true;
            queue.push(check);
          }
        }
      }
      return { found, changedRows };
    },
  },
};
