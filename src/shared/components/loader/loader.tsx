import React from 'react';
import { Modal } from 'react-bootstrap';
import "./loader.sass"
import LoaderImg from '../../../assets/images/loading.svg';

interface LoaderProps {
    msg?: string,
    isOpen: boolean,
    onClose: () => any
}

const Loader = ({ msg = '', isOpen, onClose }: LoaderProps) => {
    return (
        <Modal
            size="sm"
            show={isOpen}
            onHide={onClose}
            // isBlackClose={true}
            centered
            animation={false}
            className='loader-cls'
            >
            <Modal.Body>
                <div className='loader-modal-bg'>
                    <div className="loading-wrapper">
                        <img
                            className="loading-icon"
                            src={LoaderImg}
                            alt="loading"
                        />
                        <div className="loading-message">{msg && msg}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Loader