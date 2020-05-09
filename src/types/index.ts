import { AlgorithmEnum } from "./enums";

export type Cell = {
  x: number;
  y: number;
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
};

type TickOptions = {
  grid: Cell[][];
  queue: Cell[];
  target: Cell;
  rows: number;
  columns: number;
};

type TickResults = {
  changedRows: number[];
  found: boolean;
};

export type Algorithm = {
  name: string;
  id: number;
  tick(options: TickOptions): TickResults;
};

export type AlgorithmStore = {
  [key in AlgorithmEnum]: Algorithm;
};

export * from "./enums";
