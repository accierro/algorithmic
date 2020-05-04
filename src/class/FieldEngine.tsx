import React from "react";

class FieldEngine {
  private rows: number;
  private columns: number;

  private grid: JSX.Element[] = [];

  state = false;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    for (let i = 0; i < this.rows; i++) {
      let cols = [];
      for (let j = 0; j < this.columns; j++) {
        cols.push(
          <td
            key={`${i}-${j}`}
            onClick={() => {
              console.log(i, j);
              this.state = !this.state;
            }}
          ></td>
        );
      }
      this.grid.push(<tr>{cols}</tr>);
    }
  }

  getField() {
    return this.grid;
  }
}

export default FieldEngine;
