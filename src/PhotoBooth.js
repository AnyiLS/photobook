import React, { useEffect, useState } from "react";

import MainScreen from "./components/MainScreen";
import PermissonScreen from "./components/PermissonScreen";
import CameraScreen from "./components/CameraScreen";

const PhotoBooth = () => {
  
  return (
    <>
      {/* {screenToShow === "main" && (
        <MainScreen setScreenToShow={setScreenToShow} />
      )}

      {screenToShow === "permisson" && (
        <PermissonScreen setScreenToShow={setScreenToShow} />
      )} */}

      <CameraScreen />
    </>
  );
};

export default PhotoBooth;
