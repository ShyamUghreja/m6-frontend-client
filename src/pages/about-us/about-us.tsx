import React from "react";
import "./about-us.sass"
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {

    const nav = useNavigate();

    return (
        <>
            <div className="">
                <section className="categories-defi-section primary-bg-background">
                    <div className="padding-section">
                        <Container className="default-container position-relative mb-lg-5 mb-md-4 mb-3">
                            <Button className='default-button' onClick={() => { nav(-1) }}><i className="ri-arrow-left-line"></i><span>Back</span></Button>
                            <h2 className="mt-3 section-header heading-2">About Us</h2>
                            <p className="large-height page-description">Renoded is a fast-growing new media company focused on Web3. Our readership includes executives, investors, founders, and crypto enthusiasts.</p>
                        </Container>
                        <Container>
                            <div className="p-lg-5 p-4 mb-4" style={{ background: "#F4F4F499" }}>
                                <h2 className="text-center heading-2">Our Mission</h2>
                                <div className="mt-4">
                                    <Row>
                                        <Col lg={6} md={6} sm={12} className="learn">
                                            <i className="ri-book-open-line color-secondary"></i>
                                            <div className="ps-2">
                                                <h4 className='heading-4'>Empower</h4>
                                                <p className='fw-500 mt-2 large-height'>Empower the top researchers and journalists in Web3 by providing a digital platform to distribute knowledge.</p>
                                            </div>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} className="learn">
                                            <i className="ri-book-line color-primary"></i>
                                            <div className="ps-2">
                                                <h4 className='heading-4'>Educate</h4>
                                                <p className='fw-500 mt-2 large-height'>Create and curate the best Web3 education, providing our community with actionable insights and reliable news.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="p-lg-5 p-4 mb-3" style={{ background: "#F4F4F499" }}>
                                <h2 className="text-center heading-2">Contact us</h2>
                                <div className="mt-4">
                                    <Row>
                                        <Col lg={6} className="contact">
                                            <div className="bg-color-white p-4">
                                                <h4 className='heading-4'>Help us get better</h4>
                                                <p className='fw-500 mt-2 large'>Have a tip, suggestion, or request ?</p>
                                                <Button type='submit' onClick={()=>{window.open("mailto:info@renoded.com")}} className='second-btn mt-lg-4 mt-md-3 mt-3'><p className="large fw-600">Contact our editorial team</p></Button>
                                            </div>
                                        </Col>
                                        <Col lg={6} className="">
                                            <div className="bg-color-white p-4">
                                                <h4 className='heading-4'>Advertise with Renoded</h4>
                                                <p className='fw-500 mt-2 large'>Have a tip, suggestion, or request ?</p>
                                                <Button type='submit' onClick={()=>{nav("/advertise")}} className='second-btn mt-lg-4 mt-md-3 mt-3'><p className="large fw-600">Contact for advertising</p></Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Container>
                    </div>
                </section>
            </div>
        </>
    );
};
