import React, { useRef, useEffect, useState } from 'react'
import CameraPhoto, {
	FACING_MODES,
	IMAGE_TYPES,
} from 'jslib-html5-camera-photo'

import useCameraScreen from './useCameraScreen'

import SettingsModal from './SettingsModal'

import './responsive-camera.css'
import './cameraScreen.css'
import './Camera.css'
import './animate.compat.css'

import ImageBackground from '../images/fondo.png'

//Variables de configuracion de enfoque y resolucion de la camara
// const facingMode = FACING_MODES.ENVIRONMENT;
const idealResolution = { width: 640, height: 480 }

const CameraScreen = () => {
	/** Hooks */
	const { getDataUri } = useCameraScreen()

	const [isCameraReady, setIsCameraReady] = useState(false)
	const [photoTaken, setPhotoTaken] = useState(false)
	const [imageToDownload, setImageToDownload] = useState('#')
	const [showModal, setShowModal] = useState(false)
	const [isTimerSet, setIsTimerSet] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [counter, setCounter] = useState(3)
	const [showCounter, setShowCounter] = useState(false)
	/** Variables */
	const videoRef = useRef()
	let cameraPhoto = new CameraPhoto(videoRef)

	//Crear referencia para tomar el html de video
	let facing = JSON.parse(localStorage.getItem('facing'))

	const startCamera = () => {
		let facingMode =
			facing === 'USER' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
		cameraPhoto
			.startCamera(facingMode, idealResolution)
			.then(() => {
				setIsCameraReady(true)
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		if (!facing) {
			localStorage.setItem('facing', JSON.stringify('USER'))
		}

		let screen = JSON.parse(localStorage.getItem('screen'))

		if (!screen) {
			localStorage.setItem('screen', JSON.stringify('camera'))
		}
		// eslint-disable-next-line
		cameraPhoto = new CameraPhoto(videoRef.current)

		//Instanciar la libreria e iniciar la camara
		// eslint-disable-next-line
		// setCameraPhoto(new CameraPhoto(videoRef.current));
		startCamera()

		// console.log(cameraPhoto.inputVideoDeviceInfos);

		if (window.innerWidth < 1200) {
			window.addEventListener('orientationchange', (e) => {
				const popUp = document.querySelector('.rotatePop')

				if (window.orientation === 0) {
					popUp.style.display = 'flex'
				} else {
					popUp.style.display = 'none'
				}
			})
		}
		// eslint-disable-next-line
	}, [])

	const changeCamera = () => {
		if (facing === 'USER') {
			localStorage.setItem('facing', JSON.stringify('ENVIRONMENT'))
		} else {
			localStorage.setItem('facing', JSON.stringify('USER'))
		}

		window.location.reload()
	}

	useEffect(() => {}, [])

	// const startCamera = (idealFacingMode, idealResolution) => {
	//   console.log("facing_mode", idealFacingMode);
	//   console.log("resolution", idealResolution);
	//   console.log("dsfdsaf", facing === "USER" ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT)
	//   let facingMode = facing === "USER" ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT;
	//   cameraPhoto
	//     .startCamera(facing === "USER" ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT, idealResolution)
	//     .then(() => {
	//       console.log("camera is started !");
	//       setIsCameraReady(true);
	//     })
	//     .catch((error) => {
	//       alert(error, "asnid");
	//     });
	// };

	// Pintar foto en canvas
	const displayPicture = (uri) => {
		const canvas = document.getElementById('photo')
		let context = canvas.getContext('2d')
		let image = new Image()
		image.onload = () => {
			context.drawImage(image, canvas.width * 0.1, 0, 470, 350)

			let frame = new Image()
			frame.onload = () => {
				context.drawImage(frame, 0, 0, 670, 350)
				setImageToDownload(canvas.toDataURL('image/jpg'))
			}

			frame.src = './assets/images/fondo.png'
		}

		image.src = uri
	}

	// Tomar la foto
	const takePhoto = () => {
		localStorage.removeItem('screen')
		let dataUri = getDataUri()

		console.log(dataUri)

		if (isTimerSet) {
			setTimeout(() => {
				setCounter(2)
			}, 1000)

			setTimeout(() => {
				setCounter(1)
			}, 2000)

			setTimeout(() => {
				displayPicture(dataUri)
				setPhotoTaken(true)
			}, 3000)
		} else {
			displayPicture(dataUri)
			setPhotoTaken(true)
		}
	}

	//Reiniciar camara
	const restartCamera = () => {
		// Limpiar canvas, contador de timer y volver a mostrar la camara
		// setPhotoTaken(false)
		// setCounter(3)
		// setShowCounter(false)

		// const canvas = document.getElementById('photo')
		// const ctx = canvas.getContext('2d')
		// ctx.clearRect(0, 0, canvas.width, canvas.height)

    window.location.reload();
	}

	const [width, setWidth] = React.useState(0)

	React.useEffect(() => {
		if (document.getElementById('background-image')) {
			setWidth(document.getElementById('background-image').clientWidth)

			window.addEventListener('resize', () => {
				console.log(document.getElementById('background-image'))
				setWidth(
					document.getElementById('background-image').clientWidth
				)
			})
		}

		return () => {
			window.removeEventListener('resize', () => {
				setWidth(
					document.getElementById('background-image').clientWidth
				)
			})
		}
	}, [])

	return (
		<React.Fragment>
			<div
				class="video-container"
				style={{ width: width > 0 ? width : 'auto', background: photoTaken ? 'white' : 'black' }}>
				{!photoTaken && (
					<video
						style={{ width: width > 0 ? width : 'auto' }}
						width="400"
						height="341"
						id="video"
						ref={videoRef}
            playsInline
						autoPlay></video>
				)}
				<img
					src={ImageBackground}
					alt="Overlay image"
					id="background-image"
					class="overlay-image"
				/>
				<canvas
					className="animated fadeIn"
					id="photo"
					width="700"
					height="350"
					style={{
						display: photoTaken ? 'block' : 'none',
					}}></canvas>
				{!photoTaken ? (
					<div className="btns-wrapper_camera">
						<div className="div-wrapper">
							<button
								className="settings-btn_camera"
								onClick={() => setShowModal(true)}></button>
							<button
								className="take-btn_camera"
								onClick={takePhoto}
								disabled={!isCameraReady}></button>
							<button
								className="take-btn_camera2"
								onClick={changeCamera}></button>
						</div>
					</div>
				) : (
					<div className="btns-wrapper_camera">
						<div className="div-wrapper" style={{ marginLeft: photoTaken ? 0 : '5%' }}>
							<div className="trie" style={{ marginLeft: photoTaken ? 0 : '11%' }}>
								<button
									className="try-btn_camera"
									onClick={restartCamera}></button>
								{/* <p className="blue">Descarta esta foto <br /> e intenta de nuevo</p> */}
							</div>
							<div className="guardar">
								{/* eslint-disable-next-line */}
								<a
									id="download"
									className="save-btn_camera"
									download="selfie"
									href={imageToDownload}></a>
								{/* <p className="pink">Guarda tu foto</p> */}
							</div>
						</div>
					</div>
				)}
				{showModal && (
					<SettingsModal
						setShowModal={setShowModal}
						isTimerSet={isTimerSet}
						setIsTimerSet={setIsTimerSet}
						setIsFullScreen={setIsFullScreen}
						isFullScreen={isFullScreen}
					/>
				)}
			</div>
		</React.Fragment>

		// <div className="main-container_camera animated fadeIn">
		//   {/* <div className="logo-poto1">
		//     <img src="./assets/images/logo.png" alt="" />
		//   </div> */}
		//   <RotateDevicePop />

		//   {photoTaken && (
		//     <h2 className="blue animated fadeInLeft">
		//       <span className="pink">¡Te ves genial! ████</span> <br />
		//       ████ Guarda tu foto
		//     </h2>
		//   )}

		//   <div className="video-wrapper_camera">
		//     <div
		//       className="initial-img_camera"
		//       style={{ display: photoTaken ? "none" : "block" }}
		//     >
		//       {/* <img src="./assets/images/frame.png" alt="marco" /> */}
		//       <video ref={videoRef} autoPlay={true} id="video" height={500} />

		//       {showCounter && <div className="timer_camera">{counter}</div>}
		//     </div>

		//     <canvas
		//       className="animated fadeIn"
		//       id="photo"
		//       width="650"
		//       height="350"
		//       style={{ display: photoTaken ? "block" : "none" }}
		//     ></canvas>
		//   </div>

		//   {!photoTaken ? (
		//     <div className="btns-wrapper_camera">
		//       <div className="div-wrapper">
		//         <button
		//           className="settings-btn_camera"
		//           onClick={() => setShowModal(true)}
		//         ></button>
		//         <button
		//           className="take-btn_camera"
		//           onClick={takePhoto}
		//           disabled={!isCameraReady}
		//         ></button>
		//         <button className="take-btn_camera2" onClick={changeCamera}>

		//         </button>
		//       </div>
		//     </div>
		//   ) : (
		//     <div className="btns-wrapper_camera">
		//       <div className="div-wrapper">

		//         <div className="trie">
		//           <button
		//             className="try-btn_camera"
		//             onClick={restartCamera}
		//           ></button>
		//           {/* <p className="blue">Descarta esta foto <br /> e intenta de nuevo</p> */}
		//         </div>
		//         <div className="guardar">
		//           {/* eslint-disable-next-line */}
		//           <a
		//             id="download"
		//             className="save-btn_camera"
		//             download="selfie"
		//             href={imageToDownload}
		//           ></a>
		//           {/* <p className="pink">Guarda tu foto</p> */}
		//         </div>
		//       </div>
		//     </div>
		//   )}

		//   {/* MODAL DE CONFIGURACIONES */}
		//   {showModal && (
		//     <SettingsModal
		//       setShowModal={setShowModal}
		//       isTimerSet={isTimerSet}
		//       setIsTimerSet={setIsTimerSet}
		//       setIsFullScreen={setIsFullScreen}
		//       isFullScreen={isFullScreen}
		//     />
		//   )}
		// </div>
	)
}

const RotateDevicePop = () => {
	return (
		<div className="rotatePop">
			<div className="icon-box">
				<div className="icon-wrapper animated shakeX">
					<img src="./assets/images/icon.png" alt="rotate" />
				</div>
			</div>
			<div className="text-box">
				<p>Por favor gira tu dispositivo</p>
			</div>
		</div>
	)
}

export default CameraScreen
