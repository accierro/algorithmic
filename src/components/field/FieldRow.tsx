import React, { memo } from "react";
import { Cell } from "../../types";

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
      {row.map((c) => (
        <td
          style={{
            background: c.isShortestPath
              ? "yellow"
              : c.isWall
              ? "black"
              : c.isStart
              ? "green"
              : c.isEnd
              ? "red"
              : c.visited
              ? "blue"
              : "unset",
          }}
          key={`${c.x}-${c.y}`}
          onClick={(e) => onClick(e, c.x, c.y)}
        >
          {""}
        </td>
      ))}
    </tr>
  );
};

export default memo(FieldRow, (prev, next) => {
  return prev.onClick === next.onClick && next.areEqual;
});
