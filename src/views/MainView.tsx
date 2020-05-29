import React from "react";
import Header from "../components/header/Header";
import Field from "../components/field/Field";
import PathFinderSettings from "../components/settings/PathFinderSettings";

const MainView: React.FC<{}> = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Field />
        <PathFinderSettings />
      </main>
    </div>
  );
};

export default MainView;
