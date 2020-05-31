import React, { Dispatch, SetStateAction } from "react";
import { ALGORITHMS } from "../constants/Algorithms";
import { Algorithm, FieldCallbacks } from "../types";

export const defaultContext = {
  algorithm: ALGORITHMS[1],
  fieldCallbacks: {
    resetWalls: () => {},
    generateRandomWalls: () => {},
  },
  walls: 0,
  setAlgorithm: () => console.log("NOT IMPLEMENTED"),
  setWalls: () => console.log("setWalls() NOT IMPLEMENTED"),
  setFieldCallbacks: () => console.log("setFIeldCallbacks NOT IMPLEMENTED"),
};

const GridSettingsContext = React.createContext<{
  algorithm: Algorithm;
  walls: number;
  fieldCallbacks: FieldCallbacks;
  setAlgorithm: Dispatch<SetStateAction<Algorithm>>;
  setWalls: Dispatch<SetStateAction<number>>;
  setFieldCallbacks: Dispatch<SetStateAction<FieldCallbacks>>;
}>(defaultContext);

export default GridSettingsContext;
