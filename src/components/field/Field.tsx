import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useMachine } from "@xstate/react";
import "../../css/field.scss";
import FieldStateMachine from "../../machine/FieldStateMachine";
import _ from "lodash";
import { Cell } from "../../types";
import FieldRow from "./FieldRow";
import GridSettingsContext from "../../context/GridSettingsContext";

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
        isWall: false,
      });
    }
    arr.push(row);
  }
  return arr;
}

const ROWS = 60;
const COLUMNS = 70;

const Field: React.FC<{}> = () => {
  const { algorithm } = useContext(GridSettingsContext);
  const [changeDiff, setChangeDiff] = useState<number[]>([]);
  let grid = useRef<Cell[][]>(getGrid(ROWS, COLUMNS)).current;
  const ref = useRef<{ copy: Cell[][]; queue: Cell[]; target: Cell } | null>(
    null
  );
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

    const { found, changedRows } = algorithm.tick({
      grid: copy,
      queue,
      target,
      rows: ROWS,
      columns: COLUMNS,
    });

    if (!found && queue.length !== 0) {
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
    (
      event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
      r: number,
      c: number
    ) => {
      if (event.metaKey || event.ctrlKey) {
        grid[r][c].isWall = true;
        grid[r][c].visited = true;
        setChangeDiff([r]);
      } else {
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
                row={r}
                onClick={clickCallback}
                areEqual={!shouldRender}
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
