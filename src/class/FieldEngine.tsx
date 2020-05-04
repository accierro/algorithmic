import React from "react";

class FieldEngine {
  private rows: number;
  private columns: number;

  state = false;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
  }

  getField() {
    const arr = [];
    for (let i = 0; i < this.rows; i++) {
      let cols = [];
      for (let j = 0; j < this.columns; j++) {
        cols.push(
          <td
            onClick={() => {
              console.log(i, j);
              this.state = !this.state;
            }}
          ></td>
        );
      }
      arr.push(<tr>{cols}</tr>);
    }
    return arr;
  }
}

export default FieldEngine;
