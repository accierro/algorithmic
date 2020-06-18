import React, { useState } from "react";
import Header from "../components/header/Header";
import Field from "../components/field/Field";
import PathFinderSettings from "../components/settings/PathFinderSettings";
import { PREVIEW_STORAGE_KEY } from "../constants/Preview";
import { AnimatePresence } from "framer-motion";
import Preview from "../components/preview/Preview";
import InfoPage from "../components/preview/InfoPage";

const MainView: React.FC<{}> = () => {
  const [showPreview, setShowPreview] = useState<number>(() => {
    const val = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    return val === "1" ? 0 : -1;
  });
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {showPreview > -1 && (
          <Preview page={showPreview} onClose={() => setShowPreview(-1)} />
        )}
        {showInfo && <InfoPage onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
      <Header
        onInfo={() => setShowInfo(true)}
        onTutorial={() => {
          setShowPreview(0);
        }}
      />
      <main>
        <Field />
        <PathFinderSettings onTutorial={(n: number) => setShowPreview(n)} />
      </main>
    </div>
  );
};

export default MainView;
