import React, { useContext } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import GridSettingsContext from "../../context/GridSettingsContext";

const WallsController: React.FC = () => {
  const { walls, fieldCallbacks } = useContext(GridSettingsContext);
  return (
    <div style={{ marginTop: "16px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h2
          style={{ fontWeight: 300, fontSize: "1.35em", margin: "0 16px 0 0" }}
        >
          <span style={{ fontSize: "1.2em", fontWeight: 500 }}>{walls}</span>{" "}
          Walls
        </h2>
        <IoIosInformationCircleOutline size={26} />
      </div>
      <div
        style={{
          width: "145px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button
          className="btn primary"
          onClick={() => fieldCallbacks.generateRandomWalls()}
        >
          Random
        </button>
        <button
          className="btn primary danger"
          onClick={() => fieldCallbacks.resetWalls()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WallsController;
