import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import "../../css/field.scss";
import _ from "lodash";
import { Cell, IAlgorithm, AlgorithmStatus } from "../../types";
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
        weight: 1,
        visited: false,
        isStart: false,
        isEnd: false,
        isWall: false,
        isShortestPath: false,
        iter: 0,
        marked: false,
      });
    }
    arr.push(row);
  }
  return arr;
}

function isValidWeightIncrease(grid: Cell[][], r: number, c: number): boolean {
  if (r >= 0 && r < grid.length && c >= 0 && c < grid[r].length) {
    const cell = grid[r][c];
    if (!cell.isWall && !cell.isEnd && !cell.isStart && !cell.visited) {
      return true;
    }
  }
  return false;
}

const Field: React.FC<{}> = () => {
  const {
    status,
    showWeights,
    algorithm,
    speed,
    dimensions,
    setWalls,
    setFieldCallbacks,
    setStatus,
  } = useContext(GridSettingsContext);
  const [changeDiff, setChangeDiff] = useState<Set<number>>(new Set());
  let grid = useRef<Cell[][]>(getGrid(dimensions.rows, dimensions.columns));
  const ref = useRef<IAlgorithm | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const requestRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setFieldCallbacks((prev) => {
      return {
        ...prev,
        reset: () => {
          grid.current = getGrid(dimensions.rows, dimensions.columns);
          setStart(null);
          setEnd(null);
          setChangeDiff(new Set(grid.current.map((g, i) => i)));
          setWalls(0);
          ref.current = null;
          timeoutRef.current = null;
        },
        generateRandomWalls: () => {
          const diff: Set<number> = new Set();
          let counter = 0;
          for (let i = 0; i < grid.current.length; i++) {
            diff.add(i);
            for (let j = 0; j < grid.current[i].length; j++) {
              const cell = grid.current[i][j];
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
          for (let i = 0; i < grid.current.length; i++) {
            for (let j = 0; j < grid.current[i].length; j++) {
              if (grid.current[i][j].isWall) {
                grid.current[i][j].isWall = false;
                diff.add(i);
              }
            }
          }
          setChangeDiff(diff);
          setWalls(0);
        },
      };
    });
  }, [grid.current]);
  useEffect(() => {
    if (start && end) {
      if (ref.current === null) {
        ref.current = algorithm.start({
          grid: grid.current,
          startCell: grid.current[start.x][start.y],
          targetCell: grid.current[end.x][end.y],
          rows: dimensions.rows,
          columns: dimensions.columns,
        });
        setChangeDiff(new Set());
        setStatus(AlgorithmStatus.RUNNING);
      }
    }
  }, [start, end]);

  const animate = (startTime: number) => {
    const { changedRows } = (ref.current as IAlgorithm).tick();
    setChangeDiff(changedRows);
    const endTime = Date.now();
    requestRef.current = endTime + (speed.value - (endTime - startTime));
  };

  useEffect(() => {
    if (
      ref.current &&
      status !== AlgorithmStatus.PAUSED &&
      timeoutRef.current === null
    ) {
      if (start && end && !ref.current?.isFinished()) {
        const startTime = Date.now();
        if (requestRef.current && startTime < requestRef.current) {
          timeoutRef.current = window.setTimeout(() => {
            if (ref.current) {
              animate(startTime);
              timeoutRef.current = null;
            }
          }, requestRef.current - startTime);
        } else {
          animate(startTime);
        }
      }
      if (ref.current.isFinished()) {
        setStatus(AlgorithmStatus.FINISHED);
      }
    }
  });

  const clickCallback = useCallback(
    (
      event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
      r: number,
      c: number
    ) => {
      if (showWeights && !(ref && ref.current?.isFinished())) {
        const set: Set<number> = new Set();
        if (isValidWeightIncrease(grid.current, r, c)) {
          set.add(r);
          grid.current[r][c].weight += 2;
        }
        if (isValidWeightIncrease(grid.current, r + 1, c)) {
          set.add(r + 1);
          grid.current[r + 1][c].weight += 1;
        }
        if (isValidWeightIncrease(grid.current, r - 1, c)) {
          set.add(r - 1);
          grid.current[r - 1][c].weight += 1;
        }
        if (isValidWeightIncrease(grid.current, r, c + 1)) {
          set.add(r);
          grid.current[r][c + 1].weight += 1;
        }
        if (isValidWeightIncrease(grid.current, r, c - 1)) {
          set.add(r);
          grid.current[r][c - 1].weight += 1;
        }

        if (set.size > 0) {
          setChangeDiff(set);
        }
      } else {
        if (start === null && !grid.current[r][c].isWall) {
          setStart({ x: r, y: c });
          setChangeDiff(new Set([r]));
          grid.current[r][c].isStart = true;
        }
        if (end === null && start !== null && !grid.current[r][c].isWall) {
          setEnd({ x: r, y: c });
          setChangeDiff(new Set([r]));
          grid.current[r][c].isEnd = true;
        }
      }
    },
    [start, end, showWeights]
  );

  const table = useRef<HTMLTableElement | null>(null);
  const onMouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (e.altKey && table.current) {
        const y = Math.floor((e.pageX - table.current.offsetLeft) / 20);
        const x = Math.floor((e.pageY - table.current.offsetTop) / 20);
        if (
          y >= 0 &&
          x >= 0 &&
          y <= dimensions.columns &&
          x <= dimensions.rows
        ) {
          const cell = grid.current[x][y];
          if (
            cell &&
            !cell.isWall &&
            !cell.marked &&
            !(cell.visited && cell.isStart && cell.isEnd)
          ) {
            cell.isWall = true;
            setChangeDiff(new Set([x]));
            setWalls((prev) => prev + 1);
          }
        }
      }
    },
    [grid.current]
  );

  useEffect(() => {
    grid.current = getGrid(dimensions.rows, dimensions.columns);
    setStart(null);
    setEnd(null);
    setChangeDiff(new Set(grid.current.map((g, i) => i)));
    ref.current = null;
    timeoutRef.current = null;
  }, [dimensions.columns, dimensions.rows]);

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
          {grid.current.map((r, i) => {
            const shouldRender = changeDiff.has(i);
            return (
              <FieldRow
                key={i}
                row={r}
                showWeights={showWeights}
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
