import React from "react";
import { Cell } from "../../types";
import { FaMapPin } from "react-icons/fa";
import { motion } from "framer-motion";

type EndCellProps = {
  cell: Cell;
};

const EndCell: React.FC<EndCellProps> = ({ cell }) => {
  return (
    <td className="end" key={`${cell.x}-${cell.y}`}>
      <motion.div
        initial={{ top: "-21px" }}
        animate={{
          top: "-6px",
          transition: {
            ease: "easeIn",
            duration: 0.4,
          },
        }}
        style={{ position: "absolute", left: "1px" }}
      >
        <FaMapPin size={16} />
      </motion.div>
    </td>
  );
};

export default EndCell;
