// @ts-nocheck
import React from "react";
import { FaGithub } from "react-icons/fa";

type HeaderProps = {
  onTutorial: () => void;
};

const Header: React.FC<HeaderProps> = ({ onTutorial }) => {
  return (
    <header>
      <div>Algorithmic</div>
      <div className="navigation">
        <button className="btn" onClick={onTutorial}>
          Tutorial
        </button>
        <FaGithub
          className="clickable"
          size={30}
          style={{ marginLeft: "10px" }}
          onClick={() =>
            window.open("https://github.com/accierro/algorithmic", "_blank")
          }
        />
      </div>
    </header>
  );
};

export default Header;
