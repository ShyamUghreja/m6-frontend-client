import React from 'react'
import './subscribe-modal.sass'
import { Modal } from 'react-bootstrap';
import SubModal from '../../../assets/images/sub-modal.svg';
interface createModalProps {
    isOpen: boolean,
    toggle: () => void,
    iframe: any,
    setRefreshData: any,
    removeCross?: Boolean
  }

const SubscribeModal = ({isOpen, toggle, iframe, removeCross} : createModalProps) => {
    return (
        <>
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggle}
                className="p-lg-5 p-3 subscribe-modal">
                {removeCross ? null : <Modal.Header closeButton={isOpen}>
                </Modal.Header>}
                <Modal.Body className='p-2 p-lg-3'>
                        <div>
                            <div className='d-flex'>
                                <h1 className='heading'>Distributing the best Web3 content & resources</h1>
                                <img src={SubModal} alt="" />
                            </div>
                            <h4 className='fw-400 mb-5'>Subscribe and get our weekly newsletter to accelerate your progress in the decentralized world</h4>
                            <>
                            {iframe}</>
                        </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SubscribeModal