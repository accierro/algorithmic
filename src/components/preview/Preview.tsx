import React from "react";
import PreviewBox from "./PreviewBox";
import "../../css/preview.scss";
import TransparentBackgroundFullScreen from "./TransparentBackgroundFullScreen";

type PreviewProps = {
  page?: number;
  onClose: () => void;
};

const Preview: React.FC<PreviewProps> = ({ onClose, page }) => {
  return (
    <>
      <TransparentBackgroundFullScreen>
        <PreviewBox onClose={onClose} page={page} />
      </TransparentBackgroundFullScreen>
    </>
  );
};

export default Preview;
