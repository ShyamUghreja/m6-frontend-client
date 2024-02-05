import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React from 'react'
import './education.sass';
import Courseheaderbg from '../../assets/images/course-header-bg.svg';
import Usericon from '../../assets/images/user-icon.svg';
import Intro from '../../assets/images/Intro.svg';
import Keyword from '../../assets/images/Keyword.svg';
import Course from '../../assets/images/Take-Course.svg';
import Labs6 from '../../assets/images/labs.svg';
import Catching from '../../assets/images/Catching.svg';
import Become from '../../assets/images/Become.svg';
import Tokenomics from '../../assets/images/Tokenomics.svg';
import Toolkit from '../../assets/images/Toolkit.svg';
import Examples from '../../assets/images/Examples.svg';
import Checklist from '../../assets/images/Checklist.svg';
import { Link, useNavigate } from 'react-router-dom';

const Education = () => {

    const nav = useNavigate();

    return (
        <>
            <div className="">
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={Courseheaderbg} className='headerbg' alt="" />
                                <img src={Usericon} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='mb-3 heading-2'>Be a Sleuth, Not a Victim! (0→100 On-Chain Analysis Guide)</h2>
                                <h3 className='fw-500 heading-3'>In this guide, we cover what on-chain analysis is and provide some tips to assist you during your crypto journey.</h3>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='modual-sec'>
                    <Container>
                        <Col>
                            <div className='main-bg-color'>
                                <h2 className='mb-3 heading-2'>Modules</h2>
                                <div className='p-4 bg-white mb-3'>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/intro') }}>
                                        <img src={Intro} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Intro</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/keyword') }}>
                                        <img src={Keyword} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Keyword</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center' role="button" onClick={() => { nav('/courses/whythiscourse') }}>
                                        <img src={Course} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Why Take This Course?</h3>
                                    </div>
                                </div>
                                <div className='p-4 bg-white mb-3'>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/catching') }}>
                                        <img src={Catching} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Catching ‘Em Before They Come</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/becomepro') }}>
                                        <img src={Become} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Become a Pro Blockchain Explorer</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center' role="button" onClick={() => { nav('/courses/tokenomics') }}>
                                        <img src={Tokenomics} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Tokenomics Refresher For Dummies</h3>
                                    </div>
                                </div>
                                <div className='p-4 bg-white'>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/yourtoolkit') }}>
                                        <img src={Toolkit} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Your Toolkit</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center mb-3 mb-lg-4' role="button" onClick={() => { nav('/courses/effectiveexamples') }}>
                                        <img src={Examples} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Effective Examples</h3>
                                    </div>
                                    <div className='intro d-flex align-items-center' role="button" onClick={() => { nav('/courses/actionschecklist') }}>
                                        <img src={Checklist} className='img-fluid image-icon' alt="" />
                                        <h3 className='fw-500 heading-3'>Actions Checklist</h3>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Container>
                </section>
                <section className='subscribe-sec'>
                    <Container>
                        <Row>
                            <Col lg={6} md={6} className='h-100 '>
                                <div className='labs bg-black mb-md-0 mb-lg-0 mb-3'>
                                    <img src={Labs6} className='img-fluid mb-3 ' alt="" />
                                    <h5 className="heading-5">If you have any specific questions, please DM us on Twitter <div className='d-inline' role='button'  onClick={() => { window.open("https://twitter.com/RenodedMedia")}}>@RenodedMedia</div></h5>
                                </div>
                            </Col>  
                            <Col lg={6} md={6} className=''>
                                <div className='labs h-100 bg-black'>
                                    <h5 className='news-heading mb-3 heading-5'>Subscribe to our daily newsletter for daily crypto news & industry analysis!</h5>
                                    {/* <Form.Group className="position-relative" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Enter email address" />
                                        <Button className='news-sign-button'>Submit</Button>
                                    </Form.Group> */}
                                    <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{margin: 0, borderRadius: "0px!important", backgroundColor: "transparent"}}></iframe>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Education


