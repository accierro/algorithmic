import React from "react";
import { Cell } from "../../types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

type StartCellProps = {
  cell: Cell;
};

const StartCell: React.FC<StartCellProps> = ({ cell }) => {
  return (
    <td className="start" key={`${cell.x}-${cell.y}`}>
      <motion.div
        initial={{ top: "-21px" }}
        animate={{
          top: "-7px",
          transition: {
            ease: "easeIn",
            duration: 0.4,
          },
        }}
        style={{ position: "absolute", left: "-1px" }}
      >
        <FaMapMarkerAlt size={16} />
      </motion.div>
    </td>
  );
};

export default StartCell;
