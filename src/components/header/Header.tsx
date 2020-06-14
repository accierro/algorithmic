// @ts-nocheck
import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import { ALGORITHMS } from "../../constants/Algorithms";

const Header: React.FC<{}> = () => {
  // const { algorithm, setAlgorithm } = useContext(GridSettingsContext);
  return (
    <header>
      <span>Algorithmic</span>
    </header>
  );
};

export default Header;
