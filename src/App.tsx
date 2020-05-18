import React, { useState } from "react";
import Field from "./components/field/Field";
import MainView from "./views/MainView";
import GridSettingsContext, {
  defaultContext,
} from "./context/GridSettingsContext";
import { Algorithm } from "./types";

function App() {
  const [gridSettings, setGridSettings] = useState<Algorithm>(
    defaultContext.algorithm
  );

  return (
    <div className="App">
      <GridSettingsContext.Provider
        value={{ algorithm: gridSettings, setAlgorithm: setGridSettings }}
      >
        <MainView />
      </GridSettingsContext.Provider>
    </div>
  );
}

export default App;
