import React from "react";
import PreviewBox from "./PreviewBox";
import "../../css/preview.scss";
import TransparentBackgroundFullScreen from "./TransparentBackgroundFullScreen";

type PreviewProps = {
  onClose: () => void;
};

const Preview: React.FC<PreviewProps> = ({ onClose }) => {
  return (
    <>
      <TransparentBackgroundFullScreen>
        <PreviewBox onClose={onClose} />
      </TransparentBackgroundFullScreen>
    </>
  );
};

export default Preview;
