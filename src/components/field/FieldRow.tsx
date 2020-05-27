import React, { memo } from "react";
import { Cell } from "../../types";
import StartCell from "./StartCell";
import EndCell from "./EndCell";

function getColor(iter: number): string {
  const red = 10 - (10 - 6) * (iter / (60 * 70));
  const green = 132 - (132 - 51) * (iter / (60 * 70));
  const blue = 255 - (255 - 97) * (iter / (60 * 70));

  return `rgb(${Math.min(10, red)}, ${Math.min(132, green)}, ${Math.min(
    255,
    blue
  )})`;
}

type FieldRowProps = {
  row: Cell[];
  areEqual: boolean;
  onClick: (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    r: number,
    c: number
  ) => void;
};

const FieldRow: React.FC<FieldRowProps> = ({ row, onClick }) => {
  return (
    <tr>
      {row.map((c) => {
        if (c.isStart) {
          return <StartCell cell={c} />;
        }
        if (c.isEnd) {
          return <EndCell cell={c} />;
        }
        return (
          <td
            className={`${
              c.isWall
                ? "wall"
                : c.visited
                ? "visited"
                : c.isShortestPath
                ? "shortest"
                : ""
            }`}
            style={{
              background:
                c.visited && c.iter != 0 ? getColor(c.iter) : undefined,
            }}
            key={`${c.x}-${c.y}`}
            onClick={(e) => onClick(e, c.x, c.y)}
          >
            {""}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(FieldRow, (prev, next) => {
  return prev.onClick === next.onClick && next.areEqual;
});
