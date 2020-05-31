import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import DropDownMenu from "../input/DropDownMenu";
import { ALGORITHMS } from "../../constants/Algorithms";
import WallsController from "../controller/WallsController";
import { Algorithm } from "../../types";

const PathFinderSettings: React.FC = () => {
  const { algorithm, setAlgorithm } = useContext(GridSettingsContext);
  return (
    <div className="path-finder-settings">
      <div>
        <h2
          style={{
            marginTop: 0,
            fontWeight: 300,
            marginBottom: "8px",
            fontSize: "1.35em",
          }}
        >
          Algorithm
        </h2>
        <DropDownMenu
          value={algorithm}
          options={Object.values(ALGORITHMS)}
          onChange={(algo: Algorithm) => setAlgorithm(algo)}
        />
        <WallsController />
      </div>
    </div>
  );
};

export default PathFinderSettings;
