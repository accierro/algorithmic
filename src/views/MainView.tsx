import React, { useState } from "react";
import Header from "../components/header/Header";
import Field from "../components/field/Field";
import PathFinderSettings from "../components/settings/PathFinderSettings";
import { PREVIEW_STORAGE_KEY } from "../constants/Preview";
import { AnimatePresence } from "framer-motion";
import Preview from "../components/preview/Preview";

const MainView: React.FC<{}> = () => {
  const [showPreview, setShowPreview] = useState<number>(() => {
    const val = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    return val === "1" ? 0 : -1;
  });

  return (
    <div>
      <AnimatePresence>
        {showPreview > -1 && (
          <Preview page={showPreview} onClose={() => setShowPreview(-1)} />
        )}
      </AnimatePresence>
      <Header
        onTutorial={() => {
          setShowPreview(0);
        }}
      />
      <main>
        <Field />
        <PathFinderSettings openTutorial={(n: number) => setShowPreview(n)} />
      </main>
    </div>
  );
};

export default MainView;
