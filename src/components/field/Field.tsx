import React, { useRef, useEffect, useState, useCallback } from "react";
import { useMachine } from "@xstate/react";
import "../../css/field.scss";
import FieldStateMachine from "../../machine/FieldStateMachine";
import _ from "lodash";
import { Cell } from "../../types";
import FieldRow from "./FieldRow";

function getGrid(rows: number, columns: number): Cell[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push({
        x: i,
        y: j,
        visited: false,
        isStart: false,
        isEnd: false,
      });
    }
    arr.push(row);
  }
  return arr;
}

const Field: React.FC<{}> = () => {
  const [changeDiff, setChangeDiff] = useState<number[]>([]);
  let grid = useRef<Cell[][]>(getGrid(30, 70)).current;
  const ref = useRef<{ copy: Cell[][]; queue: Cell[]; target: Cell } | null>(
    null
  );
  // const [grid, setGrid] = useState<Cell[][]>(getGrid(30, 70));
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  // const [state, send] = useMachine(FieldStateMachine);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    if (start && end) {
      if (ref.current === null) {
        const copy = grid;
        copy[start.x][start.y].visited = true;
        const queue = [copy[start.x][start.y]];
        const target = copy[end.x][end.y];
        ref.current = {
          copy,
          queue,
          target,
        };
        setChangeDiff([]);
      }
    }
  }, [start, end]);

  const animate = () => {
    const { queue, copy, target } = ref.current as {
      copy: Cell[][];
      queue: Cell[];
      target: Cell;
    };
    let found = false;
    const changedRows = [];
    if (queue.length !== 0) {
      const node = queue.shift() as Cell;

      const { x, y } = node;

      if (x - 1 >= 0) {
        const check = copy[x - 1][y];
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
        const check = copy[x][y - 1];
        if (check === target) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x);
          check.visited = true;
          queue.push(check);
        }
      }

      if (y + 1 < 70) {
        const check = copy[x][y + 1];
        if (check === target) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
          changedRows.push(x);
          check.visited = true;
          queue.push(check);
        }
      }

      if (x + 1 < 30) {
        const check = copy[x + 1][y];
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

    if (!found) {
      setChangeDiff(changedRows);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (ref.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () =>
      requestRef.current !== null
        ? cancelAnimationFrame(requestRef.current)
        : undefined;
  }, [ref.current]);

  const clickCallback = useCallback(
    (r: number, c: number) => {
      if (start === null) {
        setStart({ x: r, y: c });
        setChangeDiff([r]);
        grid[r][c].isStart = true;
      }
      if (end === null && start !== null) {
        setEnd({ x: r, y: c });
        setChangeDiff([r]);
        grid[r][c].isEnd = true;
      }
    },
    [start, end]
  );
  return (
    <>
      <table className="field">
        <tbody>
          {grid.map((r, i) => {
            const shouldRender = changeDiff.includes(i);
            return (
              <FieldRow
                key={i}
                i={i}
                row={r}
                onClick={clickCallback}
                areEqual={shouldRender}
              />
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setChangeDiff([])}>Rerender</button>
    </>
  );
};

export default Field;
