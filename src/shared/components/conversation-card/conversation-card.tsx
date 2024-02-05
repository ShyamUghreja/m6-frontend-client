import React from 'react'
import Zach from '../../../assets/images/zach.svg';
import CourseProfile from '../../../assets/images/course-profile-img.svg';
import { Button } from 'react-bootstrap';
import '../conversation-card/conversation-card.sass'

export const ConversationCard = () => {
    return (
        <>
            <div className='ZachXBT'>
                <div className='d-flex'>
                    <img src={Zach} alt="" className='img-fluid prof-img' />
                    <div className='ms-2 ms-lg-3'>
                        <h3 className='heading-3'>ZachXBT</h3>
                        <div className='account d-flex'>
                            <h5 className='fw-500 heading-5'>@zachxbt</h5>
                            <h5 className='fw-700 follow heading-5'>Follow</h5>
                        </div>
                    </div>
                </div>
                <div className='profile-bio'>
                    <h3 className='fw-500 mt-2 mt-md-3 mt-lg-4 heading-3'>1/ I am very happy to share the FBI seized crypto, BAYC 9658, AP watch, and Doodle 3114 from the phishing scammer known as Horror (HZ) aka Chase Senecal as a result of my thread.</h3>
                    <img src={CourseProfile} className='img-fluid mt-2 mt-md-3 mt-lg-4' alt="" />
                    <h4 className='fw-500 mt-3 heading-4'>12:27 AM · Feb 4, 2023</h4>
                </div>
                <div className='d-flex align-items-center mt-2 mt-md-3 mt-lg-4'>
                    <img src={Zach} className="prof-img" alt="" />
                    <div className='ms-2 ms-lg-3'>
                        <h4 className='d-flex align-items-center read-twitter heading-4'>Read full conversion on Twitter </h4>
                    </div>
                </div>
                <hr className='mt-2 mt-md-3 mt-lg-4' />
                <div className='footer-icon mt-lg-3 mt-2 d-flex'>
                    <div className='d-flex footer-btn me-lg-4 me-3 align-items-center'>
                        <i className="ri-heart-fill"></i>
                        <h4 className='text-color-light heading-4'>10.2K</h4>
                    </div>
                    <div className='d-flex footer-btn me-lg-4 me-3 align-items-center'>
                        <i className="ri-chat-4-fill"></i>
                        <h4 className='text-color-light heading-4'>10.2K</h4>
                    </div>
                    <div className='d-flex footer-btn align-items-center'>
                        <i className="ri-upload-2-line"></i>
                        <h4 className='text-color-light heading-4'>Share</h4>
                    </div>
                </div>
                <Button className='w-100 rounded-pill py-2 py-lg-3 bg-transparent mt-4 border-btn-secondary' size="lg"><h4 className='color-secondary'>Read 868 people</h4></Button>
            </div>
            
        </>
    )
}
