import React from "react";

type ShortcutProps = {
  shortcut: string;
};

const Shortcut: React.FC<ShortcutProps> = ({ shortcut }) => {
  return <span className="shortcut">{shortcut}</span>;
};
export default Shortcut;
