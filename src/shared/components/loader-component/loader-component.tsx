import React from 'react';
import LoaderModel from '../loader-modal/loader-model';
import "./loader-component.sass";
import LoaderImg from '../../../assets/images/loading.svg';

interface LoaderProps {
    msg?: string,
    isOpen: boolean,
    onClose: () => any
}

const LoaderComp = ({ msg = '', isOpen, onClose }: LoaderProps) => {
    return (
        <LoaderModel isOpen={isOpen} onClose={onClose} isBlackClose={true}>
            <div className={'loader-modal-bg'}>
                <div className="loading-wrapper">
                    <img
                        className="loading-icon"
                        src={LoaderImg}
                        alt="loading"
                    />
                    <div className="loading-message">{msg && msg}</div>
                </div>
            </div>
        </LoaderModel>
    )
}

export default LoaderComp