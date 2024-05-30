import React, { useEffect, useState } from "react";

import MainScreen from "./components/MainScreen";
import PermissonScreen from "./components/PermissonScreen";
import CameraScreen from "./components/CameraScreen";

const PhotoBooth = () => {
  const [isLandscape, setIsLandscape] = React.useState(false)
  React.useEffect(() => {
    const orientation = window.screen.orientation.type;
    setIsLandscape(!orientation.includes('portrait'));
    console.log(!orientation.includes('portrait'))

    window.addEventListener('orientationchange', () => {
      setIsLandscape(window.screen.orientation.type === 'landscape-primary')
      if (window.screen.orientation.type === 'landscape-primary') window.location.reload()
      console.log(window.screen.orientation.type)
    })

    return () => {
      window.removeEventListener('orientationchange', () => setIsLandscape(!orientation.includes('portrait')), false)
    }
  }, [])

  console.log('portrait', isLandscape)

  return (
    <React.Fragment>
      {
        isLandscape ? <CameraScreen /> : (
          <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: 'white' }}>
            <img src='/assets/images/icon.png' alt="" width={150} height={150}/>
            <span style={{ marginTop: 30, fontFamily: 'Roboto' }}>Voltea de manera horizontal tu dispositivo</span>
          </div>
        )
      }
      {/* {screenToShow === "main" && (
        <MainScreen setScreenToShow={setScreenToShow} />
      )}

      {screenToShow === "permisson" && (
        <PermissonScreen setScreenToShow={setScreenToShow} />
      )} */}

      
    </React.Fragment>
  );
};

export default PhotoBooth;
