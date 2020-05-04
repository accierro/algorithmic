import React, { useRef, useEffect, useState } from "react";
import "../../css/field.scss";
import FieldEngine from "../../class/FieldEngine";

const Field: React.FC<{}> = () => {
  //   const [counter, setState] = useState(0);
  const requestRef = useRef<number | null>(null);
  const field = useRef(new FieldEngine(30, 70)).current;

  //   const animate = () => {
  //     setState((prev) => prev + 1);
  //     requestRef.current = requestAnimationFrame(animate);
  //   };

  //   useEffect(() => {
  //     requestRef.current = requestAnimationFrame(animate);
  //     return () =>
  //       requestRef.current !== null
  //         ? cancelAnimationFrame(requestRef.current)
  //         : undefined;
  //   }, []);
  return (
    <table className="field">
      <tbody> {field.getField()}</tbody>
      <h2>{counter}</h2>
    </table>
  );
};

export default Field;
