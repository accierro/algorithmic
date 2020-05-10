import { AlgorithmEnum, Algorithm, AlgorithmStore, Cell } from "../types";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch";

export const ALGORITHMS: AlgorithmStore = {
  [AlgorithmEnum.BREADTH_FIRST_SEARCH]: {
    name: "Breadth First Search",
    id: AlgorithmEnum.BREADTH_FIRST_SEARCH,
    start: (options) => {
      return new BreadthFirstSearch(options);
    },
  },
};
