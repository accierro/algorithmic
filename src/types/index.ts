export type Cell = {
  x: number;
  y: number;
  weight: number;
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  iter: number;
  marked: boolean;
  color: string | undefined;
};

export * from "./enums";
export * from "./algorithms";
