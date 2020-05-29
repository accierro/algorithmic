import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import "../../css/drop-down-menu.scss";

interface OptionValue {
  id: string | number;
  name: string;
}

type DropwDownMenuProps<T extends OptionValue> = {
  options: T[];
  value: T;
  onChange: (t: T) => void;
};

function DropDownMenu<T extends OptionValue>({
  options,
  value,
  onChange,
}: DropwDownMenuProps<T> & { children?: React.ReactNode }): React.ReactElement {
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        background: "#0b131b",
        color: "white",
        padding: "8px",
        borderRadius: "4px",
        boxShadow: "inset rgba(255,255,255,0.25) 0px 6px 14px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onClick={() => {
        setDropDownIsVisible(true);
      }}
    >
      {value.name}
      <IoIosArrowDown
        size={20}
        style={{
          transform: `rotate(${dropDownIsVisible ? 180 : 0}deg)`,
          transition: "transform 0.3s",
        }}
      />
      <AnimatePresence>
        {dropDownIsVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.3,
                transition: {
                  ease: "easeOut",
                  duration: 0.2,
                },
              }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                background: "rgb(0,0,0)",
                width: "100vw",
                height: "100vh",
                backdropFilter: "blur(8px)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDropDownIsVisible(false);
              }}
            ></motion.div>
            <motion.div
              className="select-menu"
              initial={{
                opacity: 0,
                transform: "scale(0.2) translateY(-50px)",
              }}
              animate={{
                opacity: 1,
                transform: "scale(1)  translateY(0px)",
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              exit={{
                opacity: 0,
                transform: "scale(0.2)  translateY(-50px)",
                transition: { duration: 0.15, ease: "easeIn" },
              }}
            >
              {options.map((opt) => (
                <p
                  className={value === opt ? "selected" : undefined}
                  key={opt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setDropDownIsVisible(false);
                  }}
                >
                  {opt.name}
                </p>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropDownMenu;
