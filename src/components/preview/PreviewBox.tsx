import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";
import Pager from "./Pager";
import WarningBlock from "../warning/WarningBlock";
import Shortcut from "../common/Shortcut";

type PreviewBoxProps = {
  page?: number;
  onClose: () => void;
};

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

const pages = [
  {
    title: "Welcome",
    body: (
      <>
        <p>
          Algorithmic - is pathfinding algorithms visualizer. It was built in
          order to help to understand how different pathfinding algorithms work
          and what's the difference between them.
        </p>
        <p>
          Currently following algorithms are supported:
          <ul>
            <li>Breadth First</li>
            <li>Depth First</li>
            <li>Djikstra</li>
            <li>Greedy</li>
            <li>A*</li>
          </ul>
        </p>
      </>
    ),
  },
  {
    title: "Where to Start?",
    body: (
      <>
        <p>
          In front of you, we can see an interactive field. You are able to
          select start and finish positions. After that selected algorithm is
          going to run and try to find a path.
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/StartFinishDemo.gif`}
          alt="Puting start and finish position demo"
          style={{
            width: "150px",
            borderRadius: "4px",
            alignSelf: "center",
            flexGrow: 0,
          }}
        />
        <p>
          After finishing or in progress you are able to reset the field using a{" "}
          <b>Reset</b> button.
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/ResetDemo.gif`}
          alt="Field reseting demo"
          style={{
            width: "100px",
            borderRadius: "4px",
            alignSelf: "center",
            flexGrow: 0,
          }}
        />
      </>
    ),
  },
  {
    title: "Speed Control",
    body: (
      <>
        <p>
          You are able to control how many cells an algorithm can go through in
          a one tick using three buttons <b>Slow</b>, <b>Medium</b> and{" "}
          <b>Fast</b>.{" "}
        </p>
        <p style={{ marginTop: 0 }}>
          Use <b>Pause</b> button to stop an execution, after use the same
          button to continue execution.
        </p>
        <WarningBlock
          warnText="Please Note!"
          message="Depending on your computer hardware 'Fast' option would not be a good decision if you have quite old computer."
        />
      </>
    ),
  },
  {
    title: "We Need Walls!",
    body: (
      <>
        <p>
          Use <Shortcut shortcut={`${isMac ? "\u2318" : "Ctr"} + Click`} /> and
          then move your mouse above the field thereby creating walls.
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/WallDemo.gif`}
          alt="Wall creation demo"
          style={{
            width: "170px",
            borderRadius: "4px",
            alignSelf: "center",
            flexGrow: 0,
            marginBottom: "20px",
          }}
        />
        <p>
          Use <b>Reset</b> button if you want to clean a field from walls.
        </p>
        <WarningBlock
          warnText="Hint!"
          message="You can create/delete walls even when algorithm is already running."
        />
      </>
    ),
  },
  {
    title: "Weights",
    body: (
      <>
        <p>
          Each cell has weight which indicates the travel cost to that cell.
          Weights are used by two algorithms: Djikstra and A*, others ignore
          that value.
        </p>
        <p style={{ marginTop: 0 }}>
          You can turn on/off displaying weight values inside the cell using a
          checkbox on the right side.
        </p>
      </>
    ),
  },
];

const PreviewBox: React.FC<PreviewBoxProps> = ({ page = 0, onClose }) => {
  const ref = useRef(null);
  const [currentPage, setCurrentPgae] = useState(page);
  useClickAway(ref, onClose);
  return (
    <motion.div
      ref={ref}
      className="preview-box"
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h1 style={{ marginBottom: 0 }}>{pages[currentPage].title}</h1>
      {pages[currentPage].body}
      <Pager
        current={currentPage}
        max={pages.length}
        onChange={(n) => {
          setCurrentPgae(n);
        }}
      />
      <button
        className="btn"
        style={{ position: "absolute", bottom: 29, right: 32 }}
        onClick={onClose}
      >
        Let's go
      </button>
    </motion.div>
  );
};

export default PreviewBox;
