import React, { useContext } from "react";
import GridSettingsContext from "../../context/GridSettingsContext";
import DropDownMenu from "../input/DropDownMenu";
import { ALGORITHMS, SPEED } from "../../constants/Algorithms";
import WallsController from "../controller/WallsController";
import { Algorithm, AlgorithmStatus } from "../../types";
import ButtonSwitch from "../input/ButtonSwitch";
import { IoIosInformationCircleOutline } from "react-icons/io";

type PathFinderSettingsProps = {
  onTutorial: (n: number) => void;
};

const PathFinderSettings: React.FC<PathFinderSettingsProps> = ({
  onTutorial,
}) => {
  const {
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    fieldCallbacks,
    status,
    setStatus,
  } = useContext(GridSettingsContext);
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
          disabled={status !== AlgorithmStatus.PREPARATION}
          value={algorithm}
          options={Object.values(ALGORITHMS)}
          onChange={(algo: Algorithm) => setAlgorithm(algo)}
        />
        <WallsController onInfo={() => onTutorial(3)} />
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
          <IoIosInformationCircleOutline
            className="clickable"
            size={26}
            onClick={() => onTutorial(2)}
          />
        </div>
        <ButtonSwitch
          options={SPEED}
          value={speed}
          onChange={(newSpeed) => {
            setSpeed(newSpeed);
          }}
        />
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ position: "relative" }}>
            {status === AlgorithmStatus.FINISHED && (
              <div className="pinger"></div>
            )}
            <button
              className="btn primary danger md"
              onClick={() => {
                fieldCallbacks.reset();
                setStatus(AlgorithmStatus.PREPARATION);
              }}
            >
              Reset
            </button>
          </div>
          <button
            style={{ marginLeft: "16px" }}
            className="btn primary md"
            disabled={
              status === AlgorithmStatus.FINISHED ||
              status === AlgorithmStatus.PREPARATION
            }
            onClick={() => {
              if (status === AlgorithmStatus.RUNNING) {
                setStatus(AlgorithmStatus.PAUSED);
              } else {
                setStatus(AlgorithmStatus.RUNNING);
              }
            }}
          >
            {status === AlgorithmStatus.PAUSED ? "Continue" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathFinderSettings;
