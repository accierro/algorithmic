import React from "react";
import classnames from "classnames";

interface Option {
  label: string;
  value: string | number;
}

type ButtonSwitchProps<T extends Option> = {
  value: T;
  options: T[];
  onChange: (t: T) => void;
};

function ButtonSwitch<T extends Option>({
  options,
  value,
  onChange,
}: ButtonSwitchProps<T> & { children?: React.ReactNode }): React.ReactElement {
  return (
    <div className="button-switch">
      {options.map((o) => {
        const classNames = classnames({
          "button-switch-btn": true,
          "button-switch-btn__selected": o === value,
        });
        return (
          <button
            className={classNames}
            onClick={() => {
              if (o !== value) {
                onChange(o);
              }
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonSwitch;
