import React from "react";
import { ALGORITHMS } from "../constants/Algorithms";
import { Algorithm } from "../types";

export const defaultContext = {
  algorithm: ALGORITHMS[1],
  setAlgorithm: () => console.log("NOT IMPLEMENTED"),
};

const GridSettingsContext = React.createContext<{
  algorithm: Algorithm;
  setAlgorithm: Function;
}>(defaultContext);

export default GridSettingsContext;
