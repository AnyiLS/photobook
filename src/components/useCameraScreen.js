import CameraPhoto from "jslib-html5-camera-photo";

const useCameraScreen = () => {
  /**
   * Esta funcion cambia la camara de la frontal a la trasera.
   * @returns {void} - retorna el cambio de camara.
   */
  const changeCamera = (cameraPhoto) => {
    // console.log(cameraPhoto.getInputVideoDeviceInfos() ? )
  };

  changeCamera.propTypes = {
    cameraPhoto: typeof CameraPhoto,
  };

  /**
   * Esta funcion retorna la imagen en formato base 64.
   * @return {string} - con la imagen obtenida.
   */
  const getDataUri = () => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvas.toDataURL("image/jpg");
  };

  return {
    changeCamera,
    getDataUri,
  };
};

export default useCameraScreen;

// function showSwitchCameraButtons () {
//     cameraPhoto.enumerateCameras().then((cameras) => {
//       if (cameras && cameras.length > 0) {
//         let cameraButtonsContainer = document.getElementById('cameraButtonsContainerId');
//         cameraButtonsContainer.innerHTML = '';

//         let h3Element = document.createElement('h3');
//         h3Element.innerText = 'Choose your camera :';
//         cameraButtonsContainer.appendChild(h3Element);

//         cameras.forEach((camera) => {
//           let { kind, label, deviceId } = camera;
//           const buttonElement = document.createElement('button');
//           buttonElement.innerHTML = `
//               kind: ${kind} <br/>
//               label: ${label} <br/>
//               deviceId: ${deviceId}
//             `;
//           (function (deviceId) {
//             buttonElement.addEventListener('click', function () {
//               console.log('click on', deviceId);
//               startCameraIdMaxResolution(deviceId);
//             });
//           })(deviceId);
//           cameraButtonsContainer.appendChild(buttonElement);
//         });
//       }
//     }).catch((error) => {
//       console.log('Error could not enumerateCameras:', error);
//     });
//   }
