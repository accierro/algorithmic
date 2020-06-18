import React from "react";

type FlexProps = {
  orientation?: "vertical" | "horizontal";
};

const Flex: React.FC<FlexProps> = ({ orientation = "vertical", children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
      }}
    >
      {children}
    </div>
  );
};
export default Flex;
