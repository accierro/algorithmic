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
import { Cell, IAlgorithm } from "../../types";
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
        isShortestPath: false,
        iter: 0,
      });
    }
    arr.push(row);
  }
  return arr;
}

const ROWS = 50;
const COLUMNS = 70;

const Field: React.FC<{}> = () => {
  const { algorithm } = useContext(GridSettingsContext);
  const [changeDiff, setChangeDiff] = useState<number[]>([]);
  let grid = useRef<Cell[][]>(getGrid(ROWS, COLUMNS)).current;
  const ref = useRef<IAlgorithm | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  // const [state, send] = useMachine(FieldStateMachine);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    if (start && end) {
      if (ref.current === null) {
        ref.current = algorithm.start({
          grid,
          startCell: grid[start.x][start.y],
          targetCell: grid[end.x][end.y],
          rows: ROWS,
          columns: COLUMNS,
        });
        setChangeDiff([]);
      }
    }
  }, [start, end]);

  const animate = () => {
    const { resume, changedRows } = (ref.current as IAlgorithm).tick();
    setChangeDiff(changedRows);
    if (resume) {
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

  const table = useRef<HTMLTableElement | null>(null);
  const onMouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (e.altKey && table.current) {
        const y = Math.floor((e.pageX - table.current.offsetLeft) / 16);
        const x = Math.floor((e.pageY - table.current.offsetTop) / 16);
        const cell = grid[x][y];
        if (
          cell &&
          !(cell.visited && cell.isWall && cell.isStart && cell.isEnd)
        ) {
          cell.isWall = true;
          setChangeDiff([x]);
        }
      }
    },
    [grid]
  );

  return (
    <>
      <table
        ref={table}
        className="field"
        cellSpacing={0}
        onMouseDown={(e) => {
          e.preventDefault();
          if (table.current && e.altKey) {
            table.current.addEventListener("mousemove", onMouseMoveHandler);
          }
        }}
        onMouseLeave={() => {
          table.current?.removeEventListener("mousemove", onMouseMoveHandler);
        }}
        onMouseUp={() => {
          table.current?.removeEventListener("mousemove", onMouseMoveHandler);
        }}
      >
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
    </>
  );
};

export default Field;
