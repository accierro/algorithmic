import React from "react";
import "../../css/checkbox.scss";

type CheckBoxProps = {
  value: boolean;
  label?: string;
  onChange: (val: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ label, value, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "4px 0",
      }}
    >
      <input
        className="react-checkbox"
        name={label}
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <label htmlFor={label} style={{ fontSize: "13pt", color: "#1f1f1f" }}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
