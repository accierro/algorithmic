import React, { useRef, useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import "../../css/field.scss";
import FieldEngine from "../../class/FieldEngine";
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
  const [grid, setGrid] = useState<Cell[][]>(getGrid(30, 70));
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const [state, send] = useMachine(FieldStateMachine);
  //   const [counter, setState] = useState(0);
  const requestRef = useRef<number | null>(null);
  console.log(grid);
  useEffect(() => {
    if (start && end) {
      const copy = _.cloneDeep(grid);
      copy[start.x][start.y].visited = true;
      const queue = [copy[start.x][start.y]];
      const target = copy[end.x][end.y];

      while (queue.length !== 0) {
        const node = queue.shift() as Cell;

        const { x, y } = node;
        if (x + 1 < 30) {
          const check = copy[x + 1][y];
          if (check === target) {
            console.log("FOUND");
            break;
          } else if (!check.visited) {
            check.visited = true;
            queue.push(check);
          }
        }

        if (y + 1 < 70) {
          const check = copy[x][y + 1];
          if (check === target) {
            console.log("FOUND");
            break;
          } else if (!check.visited) {
            check.visited = true;
            queue.push(check);
          }
        }
        if (x - 1 >= 0) {
          const check = copy[x - 1][y];
          if (check === target) {
            console.log("FOUND");
            break;
          } else if (!check.visited) {
            check.visited = true;
            queue.push(check);
          }
        }

        if (y - 1 >= 0) {
          const check = copy[x][y - 1];
          if (check === target) {
            console.log("FOUND");
            break;
          } else if (!check.visited) {
            check.visited = true;
            queue.push(check);
          }
        }
      }

      setGrid(copy);
    }
  }, [start, end]);

  console.log(state);
  //   const animate = () => {
  //     setState((prev) => prev + 1);
  //     requestRef.current = requestAnimationFrame(animate);
  //   };

  //   useEffect(() => {
  //     requestRef.current = requestAnimationFrame(animate);
  //     return () =>
  //       requestRef.current !== null
  //         ? cancelAnimationFrame(requestRef.current)
  //         : undefined;
  //   }, []);
  const rows = 30;
  const columns = 70;
  console.time("grid");
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
                console.log("SELECTING END");
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
  console.timeEnd("grid");

  return (
    <table className="field">
      <tbody>{arr}</tbody>
    </table>
  );
};

export default Field;
