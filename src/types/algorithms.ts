import { AlgorithmEnum } from "./enums";
import { Cell } from ".";

export type AlgorithmOptions = {
  grid: Cell[][];
  startCell: Cell;
  targetCell: Cell;
  rows: number;
  columns: number;
};

declare function resetWalls(): void;

export interface FieldCallbacks {
  resetWalls: () => void;
  generateRandomWalls: () => void;
}

export type Algorithm = {
  name: string;
  id: number;
  start(options: AlgorithmOptions): IAlgorithm;
};

export type AlgorithmStore = {
  [key in AlgorithmEnum]: Algorithm;
};

export type TickResults = {
  changedRows: Set<number>;
};

export interface IAlgorithm {
  tick(): TickResults;
  deleteWalls(): number[];
  isFinished(): boolean;
}

export type SpeedOption = {
  label: string;
  id: number;
  value: number;
};
