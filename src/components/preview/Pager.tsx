import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../../css/pager.scss";

type PagerProps = {
  current: number;
  max: number;
  onChange: (n: number) => void;
};

const Pager: React.FC<PagerProps> = ({ current, max, onChange }) => {
  return (
    <div className="pager">
      <FiChevronLeft
        size={25}
        style={{ paddingRight: "5px" }}
        className={`pager-controller ${current === 0 ? "disabled" : ""}`}
        onClick={() => current > 0 && onChange(current - 1)}
      />
      {Array(max)
        .fill(undefined)
        .map((_, i) => (
          <div
            className={`pager-circle${current === i ? "-selected" : ""}`}
            onClick={() => {
              if (current !== i) {
                onChange(i);
              }
            }}
          ></div>
        ))}
      <FiChevronRight
        size={25}
        style={{ paddingLeft: "5px" }}
        className={`pager-controller ${current === max - 1 ? "disabled" : ""}`}
        onClick={() => current < max && onChange(current + 1)}
      />
    </div>
  );
};
export default Pager;
