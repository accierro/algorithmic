import {
  AlgorithmEnum,
  Algorithm,
  AlgorithmStore,
  Cell,
  SpeedEnum,
} from "../types";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch";
import DepthFirstSearch from "../algorithms/DepthFirstSearch";
import Djikstra from "../algorithms/Djikstra";
import GreedyAlgorithm from "../algorithms/GreedyAlgorithm";
import AStarAlgorithm from "../algorithms/AStarAlgorithm";

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
  [AlgorithmEnum.DJIKSTRA]: {
    name: "Djikstra Algorithm",
    id: AlgorithmEnum.DJIKSTRA,
    start: (options) => {
      return new Djikstra(options);
    },
  },
  [AlgorithmEnum.GREEDY_ALGORITHM]: {
    name: "Greedy Algorithm",
    id: AlgorithmEnum.GREEDY_ALGORITHM,
    start: (options) => {
      return new GreedyAlgorithm(options);
    },
  },
  [AlgorithmEnum.A_STAR_ALGORITHM]: {
    name: "A* Algorithm",
    id: AlgorithmEnum.A_STAR_ALGORITHM,
    start: (options) => {
      return new AStarAlgorithm(options);
    },
  },
};

export const SPEED = [
  {
    value: 100,
    label: "Slow",
    id: SpeedEnum.SLOW,
  },
  {
    value: 50,
    label: "Medium",
    id: SpeedEnum.MEDIUM,
  },
  {
    value: 20,
    label: "Fast",
    id: SpeedEnum.FAST,
  },
];
