import React, { useState } from "react";
import Field from "./components/field/Field";
import MainView from "./views/MainView";
import GridSettingsContext, {
  defaultContext,
} from "./context/GridSettingsContext";
import { Algorithm } from "./types";

function App() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    defaultContext.algorithm
  );
  const [walls, setWalls] = useState<number>(defaultContext.walls);
  const [fieldCallbacks, setFieldCallbacks] = useState(
    defaultContext.fieldCallbacks
  );

  return (
    <div className="App">
      <GridSettingsContext.Provider
        value={{
          algorithm,
          fieldCallbacks,
          walls,
          setWalls,
          setAlgorithm,
          setFieldCallbacks,
        }}
      >
        <MainView />
      </GridSettingsContext.Provider>
    </div>
  );
}

export default App;
