import React, { useState } from "react";
import Field from "./components/field/Field";
import MainView from "./views/MainView";
import GridSettingsContext, {
  defaultContext,
} from "./context/GridSettingsContext";
import { Algorithm, SpeedOption } from "./types";

function App() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    defaultContext.algorithm
  );
  const [walls, setWalls] = useState<number>(defaultContext.walls);
  const [fieldCallbacks, setFieldCallbacks] = useState(
    defaultContext.fieldCallbacks
  );
  const [speed, setSpeed] = useState<SpeedOption>(defaultContext.speed);

  return (
    <div className="App">
      <GridSettingsContext.Provider
        value={{
          algorithm,
          fieldCallbacks,
          walls,
          speed,
          setWalls,
          setAlgorithm,
          setFieldCallbacks,
          setSpeed,
        }}
      >
        <MainView />
      </GridSettingsContext.Provider>
    </div>
  );
}

export default App;
