import React from "react";
import { State, AnyEventObject } from "xstate";

type MachineProps = { state: State<any, AnyEventObject, any, any>; send: any };

class FieldEngine {
  private rows: number;
  private columns: number;
  private machine: MachineProps;

  private grid: JSX.Element[] = [];

  state = false;

  constructor(options: {
    rows: number;
    columns: number;
    machine: MachineProps;
  }) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.machine = options.machine;

    for (let i = 0; i < this.rows; i++) {
      let cols = [];
      for (let j = 0; j < this.columns; j++) {
        cols.push(
          <td
            key={`${i}-${j}`}
            onClick={() => {
              console.log(this.machine.state);
              this.machine.send("SELECT_START");
              console.log(i, j);
              this.state = !this.state;
            }}
          >
            {""}
          </td>
        );
      }
      this.grid.push(<tr key={i}>{cols}</tr>);
    }
  }

  getField() {
    return this.grid;
  }
}

export default FieldEngine;
