import React, { Dispatch, SetStateAction } from "react";
import { ALGORITHMS, SPEED } from "../constants/Algorithms";
import { Algorithm, FieldCallbacks, SpeedOption } from "../types";

export const defaultContext = {
  algorithm: ALGORITHMS[1],
  fieldCallbacks: {
    resetWalls: () => {},
    generateRandomWalls: () => {},
  },
  walls: 0,
  speed: SPEED[0],
  setAlgorithm: () => console.log("NOT IMPLEMENTED"),
  setWalls: () => console.log("setWalls() NOT IMPLEMENTED"),
  setFieldCallbacks: () => console.log("setFieldCallbacks NOT IMPLEMENTED"),
  setSpeed: () => console.log("setSpeed NOT IMPLEMENTED"),
};

const GridSettingsContext = React.createContext<{
  algorithm: Algorithm;
  walls: number;
  speed: SpeedOption;
  fieldCallbacks: FieldCallbacks;
  setAlgorithm: Dispatch<SetStateAction<Algorithm>>;
  setWalls: Dispatch<SetStateAction<number>>;
  setFieldCallbacks: Dispatch<SetStateAction<FieldCallbacks>>;
  setSpeed: Dispatch<SetStateAction<SpeedOption>>;
}>(defaultContext);

export default GridSettingsContext;
