// @ts-nocheck
import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import { ALGORITHMS } from "../../constants/Algorithms";

const Header: React.FC<{}> = () => {
  const { algorithm, setAlgorithm } = useContext(GridSettingsContext);
  console.log(ALGORITHMS);
  return (
    <header>
      Algorithmic
      <select
        onChange={(e) => {
          setAlgorithm(e.target.value);
        }}
      >
        {Object.keys(ALGORITHMS).map((key) => {
          return (
            <option
              selected={algorithm === ALGORITHMS[key]}
              value={ALGORITHMS[key].id}
            >
              {ALGORITHMS[key].name}
            </option>
          );
        })}
      </select>
    </header>
  );
};

export default Header;
