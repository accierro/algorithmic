import React, { useState, ReactElement } from "react";
import Flex from "./Flex";

type TabNavigationProps = {
  tabs: { label: string; body: ReactElement }[];
};

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  const [selected, setSelected] = useState(tabs[0]);
  return (
    <Flex orientation="vertical">
      <Flex orientation="horizontal">
        {tabs.map((t) => {
          return (
            <div
              key={t.label}
              style={{
                marginRight: "25px",
                fontWeight: "bold",
                fontSize: "22px",
                color: selected === t ? "#0a84ff" : "#1c1c1e",
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelected(t);
              }}
            >
              {t.label}
            </div>
          );
        })}
      </Flex>
      {selected.body}
    </Flex>
  );
};
export default TabNavigation;
