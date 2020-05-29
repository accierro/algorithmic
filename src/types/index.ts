export type Cell = {
  x: number;
  y: number;
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  iter: number;
};

export * from "./enums";
export * from "./algorithms";
