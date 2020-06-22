import React, { memo } from "react";
import { Cell } from "../../types";
import StartCell from "./StartCell";
import EndCell from "./EndCell";

type FieldRowProps = {
  row: Cell[];
  areEqual: boolean;
  showWeights: boolean;
  onClick: (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    r: number,
    c: number
  ) => void;
};

const FieldRow: React.FC<FieldRowProps> = ({ row, showWeights, onClick }) => {
  return (
    <tr>
      {row.map((c) => {
        if (c.isStart) {
          return <StartCell cell={c} key={`${c.x}-${c.y}`} />;
        }
        if (c.isEnd) {
          return <EndCell cell={c} key={`${c.x}-${c.y}`} />;
        }
        return (
          <td
            className={`${
              c.isWall
                ? "wall"
                : c.isShortestPath
                ? "shortest"
                : c.visited
                ? "visited"
                : ""
            }`}
            style={{
              background: c.color,
            }}
            key={`${c.x}-${c.y}`}
            onClick={(e) => onClick(e, c.x, c.y)}
          >
            {showWeights && !c.isWall ? c.weight : ""}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(FieldRow, (prev, next) => {
  return (
    prev.onClick === next.onClick &&
    next.areEqual &&
    prev.showWeights === next.showWeights
  );
});
