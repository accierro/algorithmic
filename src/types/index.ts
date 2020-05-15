export type Cell = {
  x: number;
  y: number;
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
};

export * from "./enums";
export * from "./algorithms";
