import React, { useState, useEffect } from "react";
import MainView from "./views/MainView";
import GridSettingsContext, {
  defaultContext,
} from "./context/GridSettingsContext";
import { Algorithm, SpeedOption, AlgorithmStatus } from "./types";
import { DIMENSIONS } from "./constants/Algorithms";
import _ from "lodash";

function getWidthAndHeight(): [number, number] {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  return [vw, vh];
}

function App() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    defaultContext.algorithm
  );
  const [walls, setWalls] = useState<number>(defaultContext.walls);
  const [fieldCallbacks, setFieldCallbacks] = useState(
    defaultContext.fieldCallbacks
  );
  const [speed, setSpeed] = useState<SpeedOption>(defaultContext.speed);
  const [status, setStatus] = useState<AlgorithmStatus>(defaultContext.status);
  const [showWeights, setShowWeights] = useState(false);
  const [dimensions, setDimensions] = useState(() => {
    const [vw, vh] = getWidthAndHeight();
    return {
      ...defaultContext.dimensions,
      columns: Math.min(
        Math.max(Math.floor((vw - 96 - 250) / 20), DIMENSIONS.minColumns),
        DIMENSIONS.maxColumns
      ),
      rows: Math.min(
        Math.max(Math.floor((vh - 128 - 50) / 20), DIMENSIONS.minRows),
        DIMENSIONS.maxRows
      ),
    };
  });
  useEffect(() => {
    const func = _.debounce(() => {
      const [vw, vh] = getWidthAndHeight();

      const columns = Math.min(
        Math.max(Math.floor((vw - 96 - 250) / 20), DIMENSIONS.minColumns),
        DIMENSIONS.maxColumns
      );
      const rows = Math.min(
        Math.max(Math.floor((vh - 128 - 50) / 20), DIMENSIONS.minRows),
        DIMENSIONS.maxRows
      );

      setDimensions({
        columns,
        rows,
      });
    }, 90);

    window.addEventListener("resize", func);

    return () => {
      window.removeEventListener("resize", func);
    };
  }, []);

  return (
    <div className="App">
      <GridSettingsContext.Provider
        value={{
          status,
          showWeights,
          algorithm,
          fieldCallbacks,
          walls,
          speed,
          dimensions,
          setWalls,
          setAlgorithm,
          setFieldCallbacks,
          setSpeed,
          setStatus,
          setShowWeights,
        }}
      >
        <MainView />
      </GridSettingsContext.Provider>
    </div>
  );
}

export default App;
