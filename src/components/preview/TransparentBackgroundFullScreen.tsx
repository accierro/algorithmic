import React from "react";
import { motion } from "framer-motion";

const TransparentBackgroundFullScreen: React.FC = ({ children }) => {
  return (
    <motion.div
      className="transparent-background"
      initial={{ background: "rgba(0,0,0, 0)" }}
      animate={{ background: "rgba(0,0,0, 0.4)" }}
      exit={{ background: "rgba(0,0,0, 0)" }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default TransparentBackgroundFullScreen;
