import React from "react";
import Header from "../components/header/Header";
import Field from "../components/field/Field";

const MainView: React.FC<{}> = () => {
  return (
    <div>
      <Header></Header>
      <Field />
    </div>
  );
};

export default MainView;
