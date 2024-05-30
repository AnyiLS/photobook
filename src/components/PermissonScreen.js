import React from 'react';
import PropTypes from 'prop-types';

import './responsive-permisson.css';
import './permissonScreen.css';
import './animate.compat.css';

const PermissonScreen = ({ setScreenToShow }) => {

    const handleActivateCamera = (screen) => {
        
        if(window.innerWidth < 1200 && window.orientation === 0) {
            alert('Por favor gira tu dispositivo');
        } else {
            setScreenToShow(screen);
        }
    }

    return (
        <div className="main-container_permisson animated fadeIn">
            <header className="header_permisson">
                <div className="logo-wrapper_permisson">
                    <img
                        src="./assets/images/logo.png"
                        alt="preview"
                    /> 
                </div>
            </header>

            <main className="main_permisson">
                <p className="up-p_permisson">
                    Si utilizas un dispositivo móvil (teléfono o tableta) <br/>
                    por favor girar tu dispositivo horizontalmente antes de comenzar.
                </p>

                <div 
                    className="middle_permisson"
                    onClick={ () => handleActivateCamera('camera') }
                >
                    <div className="btn-wrapper_permison">
                        <img 
                            src="./assets/images/permisson-btn.png"
                            alt="hablitar camara"
                        />
                    </div>
                </div>

                <p className="down-p_permisson">
                    Las fotografías NO SON almacenadas, <br/>
                    todo se ejecuta desde tu navegador
                </p>
            </main>

        </div>
    );
};

PermissonScreen.propTypes = {
    setScreenToShow: PropTypes.func.isRequired
};

export default PermissonScreen;
