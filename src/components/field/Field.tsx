import React, { useRef, useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import "../../css/field.scss";
import FieldStateMachine from "../../machine/FieldStateMachine";
import _ from "lodash";

type Cell = {
  x: number;
  y: number;
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
};

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
  const [counter, setCounter] = useState(0);
  const ref = useRef<{ copy: Cell[][]; queue: Cell[]; target: Cell } | null>(
    null
  );
  const [grid, setGrid] = useState<Cell[][]>(getGrid(30, 70));
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const [state, send] = useMachine(FieldStateMachine);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    if (start && end) {
      if (ref.current === null) {
        const copy = _.cloneDeep(grid);
        copy[start.x][start.y].visited = true;
        const queue = [copy[start.x][start.y]];
        const target = copy[end.x][end.y];
        ref.current = {
          copy,
          queue,
          target,
        };
        setCounter((prev) => prev + 1);
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
    if (queue.length !== 0) {
      const node = queue.shift() as Cell;

      const { x, y } = node;
      if (x + 1 < 30) {
        const check = copy[x + 1][y];
        if (check === target) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
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
          check.visited = true;
          queue.push(check);
        }
      }
      if (x - 1 >= 0) {
        const check = copy[x - 1][y];
        if (check === target) {
          console.log("FOUND");
          found = true;
        } else if (!check.visited) {
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
          check.visited = true;
          queue.push(check);
        }
      }
    }

    setGrid(copy);

    if (!found) {
      setCounter((prev) => prev + 1);
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
  const rows = 30;
  const columns = 70;
  const arr = grid.map((r) => (
    <tr>
      {r.map((c) => {
        return (
          <td
            style={{
              background: c.isStart
                ? "green"
                : c.isEnd
                ? "red"
                : c.visited
                ? "blue"
                : "white",
            }}
            key={`${c.x}-${c.y}`}
            onClick={() => {
              if (start === null) {
                setStart({ x: c.x, y: c.y });
                setGrid((prev) => {
                  return prev.map((i) => {
                    return i.map((j) => {
                      if (j === c) {
                        return { ...j, isStart: true };
                      }
                      return j;
                    });
                  });
                });
              }
              if (end === null && start !== null) {
                setEnd({ x: c.x, y: c.y });
                setGrid((prev) => {
                  return prev.map((i) => {
                    return i.map((j) => {
                      if (j === c) {
                        return { ...j, isEnd: true };
                      }
                      return j;
                    });
                  });
                });
              }
            }}
          >
            {""}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <>
      <table className="field">
        <tbody>{arr}</tbody>
      </table>
      <button onClick={() => setCounter((prev) => prev + 1)}>Rerender</button>
    </>
  );
};

export default Field;
