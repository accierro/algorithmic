import React from "react";
import "../../css/warning.scss";

type WarningBlockProps = {
  warnText?: string;
  message: string;
};

const WarningBlock: React.FC<WarningBlockProps> = ({
  warnText = "Warning! ",
  message,
}) => {
  return (
    <div className="warning-block">
      <b>{warnText}</b> {message}
    </div>
  );
};
export default WarningBlock;
