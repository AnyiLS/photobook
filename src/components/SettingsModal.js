import React from 'react';
import PropTypes from 'prop-types';

import './settingsModal.css';

const SettingsModal = ({ setShowModal, setIsTimerSet, isTimerSet, setIsFullScreen, isFullScreen }) => {

    const handleTimerSet = (e) => {
        setIsTimerSet(e.target.checked);
    }

    const handleFullScreen = (element, check) => {
        if (check.target.checked) {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        setIsFullScreen(check.target.checked);
    }

    return (
        <div className="modal-bc">
            <div className="modal-content">
                <div className="input-container_modal">
                    <input
                        type="checkbox"
                        name="timer"
                        onChange={handleTimerSet}
                        checked={isTimerSet}
                    />
                    <label>Temporizador</label>
                </div>
                <div className="input-container_modal">
                    <input
                        type="checkbox"
                        name="fullscreen"
                        onChange={(e) => handleFullScreen(document.documentElement, e)}
                        checked={ isFullScreen }
                    />
                    <label>Pantalla completa</label>
                </div>
                <div className="input-container_modal">
                    <button
                        onClick={() => setShowModal(false)}
                    >Salir</button>
                </div>
            </div>
        </div>
    );
};

SettingsModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    setIsTimerSet: PropTypes.func.isRequired,
    isTimerSet: PropTypes.bool.isRequired,
    setIsFullScreen: PropTypes.func.isRequired,
    isFullScreen: PropTypes.bool.isRequired
};

export default SettingsModal;
