import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import DropDownMenu from "../input/DropDownMenu";
import { ALGORITHMS } from "../../constants/Algorithms";

const PathFinderSettings: React.FC = () => {
  const { algorithm, setAlgorithm } = useContext(GridSettingsContext);
  return (
    <div className="path-finder-settings">
      <div>
        <h3 style={{ marginTop: 0, fontWeight: 300, marginBottom: "8px" }}>
          Algorithm
        </h3>
        <DropDownMenu
          value={algorithm}
          options={Object.values(ALGORITHMS)}
          onChange={(algo: Algorithm) => setAlgorithm(algo)}
        />
      </div>
    </div>
  );
};

export default PathFinderSettings;
