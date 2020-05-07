import React, { memo } from "react";
import { Cell } from "../../types";

type FieldRowProps = {
  row: Cell[];
  areEqual: boolean;
  onClick: (r: number, c: number) => void;

  i: number;
};

const FieldRow: React.FC<FieldRowProps> = ({ row, onClick, i }) => {
  //   console.log("RENDER", i);
  return (
    <tr>
      {row.map((c) => (
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
          onClick={() => onClick(c.x, c.y)}
        >
          {""}
        </td>
      ))}
    </tr>
  );
};

export default memo(FieldRow, (prev, next) => {
  return !(prev.onClick === next.onClick || next.areEqual);
});
