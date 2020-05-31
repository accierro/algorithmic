import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import DropDownMenu from "../input/DropDownMenu";
import { ALGORITHMS, SPEED } from "../../constants/Algorithms";
import WallsController from "../controller/WallsController";
import { Algorithm } from "../../types";
import ButtonSwitch from "../input/ButtonSwitch";
import { IoIosInformationCircleOutline } from "react-icons/io";

const PathFinderSettings: React.FC = () => {
  const { algorithm, setAlgorithm, speed, setSpeed } = useContext(
    GridSettingsContext
  );
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <h2
            style={{
              fontWeight: 300,
              fontSize: "1.35em",
              margin: "0 16px 0 0",
            }}
          >
            Speed
          </h2>
          <IoIosInformationCircleOutline size={26} />
        </div>
        <ButtonSwitch
          options={SPEED}
          value={speed}
          onChange={(newSpeed) => {
            setSpeed(newSpeed);
          }}
        />
      </div>
    </div>
  );
};

export default PathFinderSettings;
