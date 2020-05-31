import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import "../../css/field.scss";
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
  const { algorithm, speed, setWalls, setFieldCallbacks } = useContext(
    GridSettingsContext
  );
  const [changeDiff, setChangeDiff] = useState<Set<number>>(new Set());
  let grid = useRef<Cell[][]>(getGrid(ROWS, COLUMNS)).current;
  const ref = useRef<IAlgorithm | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setFieldCallbacks((prev) => {
      return {
        ...prev,
        generateRandomWalls: () => {
          const diff: Set<number> = new Set();
          let counter = 0;
          for (let i = 0; i < grid.length; i++) {
            diff.add(i);
            for (let j = 0; j < grid[i].length; j++) {
              const cell = grid[i][j];
              if (!cell.visited && !cell.isEnd && !cell.isStart) {
                const ran = Math.random();
                if (ran < 0.15) {
                  cell.isWall = true;
                  counter++;
                } else {
                  cell.isWall = false;
                }
              }
            }
          }
          setChangeDiff(diff);
          setWalls(counter);
        },
        resetWalls: () => {
          const diff: Set<number> = new Set();
          for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
              if (grid[i][j].isWall) {
                grid[i][j].isWall = false;
                diff.add(i);
              }
            }
          }
          setChangeDiff(diff);
          setWalls(0);
        },
      };
    });
  }, [grid]);
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
        setChangeDiff(new Set());
      }
    }
  }, [start, end]);

  const animate = () => {
    const { changedRows } = (ref.current as IAlgorithm).tick();
    setChangeDiff(changedRows);
  };

  useEffect(() => {
    if (start && end && !ref.current?.isFinished()) {
      const startTime = Date.now();
      if (requestRef.current && startTime < requestRef.current) {
        setTimeout(() => {
          animate();
        }, requestRef.current - startTime);
      } else {
        animate();
      }
      const endTime = Date.now();
      requestRef.current = endTime + (speed.value - (endTime - startTime));
    }
  });

  const clickCallback = useCallback(
    (
      event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
      r: number,
      c: number
    ) => {
      if (event.metaKey || event.ctrlKey) {
        grid[r][c].isWall = true;
        grid[r][c].visited = true;
        setChangeDiff(new Set([r]));
      } else {
        if (start === null && !grid[r][c].isWall) {
          setStart({ x: r, y: c });
          setChangeDiff(new Set([r]));
          grid[r][c].isStart = true;
        }
        if (end === null && start !== null && !grid[r][c].isWall) {
          setEnd({ x: r, y: c });
          setChangeDiff(new Set([r]));
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
        if (y >= 0 && x >= 0 && y <= COLUMNS && x <= ROWS) {
          const cell = grid[x][y];
          if (
            cell &&
            !cell.isWall &&
            !(cell.visited && cell.isStart && cell.isEnd)
          ) {
            cell.isWall = true;
            setChangeDiff(new Set([x]));
            setWalls((prev) => prev + 1);
          }
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
            const shouldRender = changeDiff.has(i);
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
