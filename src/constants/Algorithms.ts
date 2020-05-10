import { AlgorithmEnum, Algorithm, AlgorithmStore, Cell } from "../types";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch";
import DepthFirstSearch from "../algorithms/DepthFirstSearch";

export const ALGORITHMS: AlgorithmStore = {
  [AlgorithmEnum.BREADTH_FIRST_SEARCH]: {
    name: "Breadth First Search",
    id: AlgorithmEnum.BREADTH_FIRST_SEARCH,
    start: (options) => {
      return new BreadthFirstSearch(options);
    },
  },
  [AlgorithmEnum.DEPTH_FIRST_SEARCH]: {
    name: "Depth First Search",
    id: AlgorithmEnum.DEPTH_FIRST_SEARCH,
    start: (options) => {
      return new DepthFirstSearch(options);
    },
  },
};
