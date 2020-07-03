import React, { useRef } from "react";
import TransparentBackgroundFullScreen from "./TransparentBackgroundFullScreen";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";
import TabNavigation from "../common/TabNavigation";

type InfoPageProps = {
  onClose: () => void;
};

const tabs = [
  {
    label: "About",
    body: (
      <>
        <p style={{ marginBottom: 0 }}>
          I built this web application primarily for the following reasons:
        </p>
        <ul>
          <li>Improve my knowledge of Typescript and React.</li>
          <li>Learn new algorithms.</li>
          <li>
            Gain a better understanding of the optimisation of React
            applications.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Stack",
    body: (
      <>
        <p style={{ marginBottom: 0 }}>The dependency list is fairly short.</p>
        <ul>
          <li>Typesctipt + React</li>
          <li>Animations - Framer Motion</li>
        </ul>
      </>
    ),
  },
  {
    label: "What's Next",
    body: (
      <>
        <ul>
          <li>
            Create an alternative field using canvas, WASM and Rust. (Sounds
            promising)
          </li>
        </ul>
      </>
    ),
  },
];

const InfoPage: React.FC<InfoPageProps> = ({ onClose }) => {
  const ref = useRef(null);
  useClickAway(ref, onClose);

  return (
    <TransparentBackgroundFullScreen>
      <motion.div
        ref={ref}
        className="preview-box"
        initial={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TabNavigation tabs={tabs} />
      </motion.div>
    </TransparentBackgroundFullScreen>
  );
};
export default InfoPage;
