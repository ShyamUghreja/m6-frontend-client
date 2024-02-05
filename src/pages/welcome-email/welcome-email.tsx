import React from 'react'
import { Container } from 'react-bootstrap'
import "../welcome-email/welcome-email.sass"
import clapIcon from '../../assets/icons/educators/clap_icon.svg'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/footer-logo.svg';
import logoImg from '../../assets/images/renoded-logo.svg';

export const WelcomeEmail = () => {
    return (
        <>
            <div className="advertise-page article-page">
                <Container>
                    <div className="text-center mb-lg-5 mb-md-4 mb-3 top-image-logo">
                        <img src={logoImg} alt="" className='img-fluid m-auto' />
                    </div>
                    <div className="mb-3 mt-3 text-center">
                        <h2 className='heading-2'>Welcome to your <br /> <span className='color-primary'>Web3</span>  gateway! Here's your <br /> onboarding guide.</h2>
                    </div>
                    <div className="p-lg-5 p-3 mb-lg-5 mb-md-4 mb-3 mt-lg-4 mt-md-4 mt-4" style={{ background: "linear-gradient(180deg, rgba(255, 103, 55, 0.12) 0%, rgba(255, 255, 255, 0) 48.78%)" }}>
                        <h3 className='text-center heading-3'><span className='color-secondary'>Gm</span>, we're thrilled <br />   to be part of our <span className='color-primary'>Web3</span> journey!</h3>
                        <h5 className='heading-5 fw-400 mt-4 text-center'>Renoded is a newsletter, digital platform, and community that offers actionable education, news, & resources to help you find your place in the decentralized world. We are dedicated to making Web3 knowledge more approachable and understandable.</h5>
                    </div>
                    <h3 className='text-center heading-3'>Here are a few <br />tips to help you get started:</h3>
                    <div className="mail-all-card">
                        <div className="mail-card">
                            <div className="number-text">01</div>
                            <p className="large-height fw-500">Check out our homepage for the latest Web3 news, analysis, and opinion pieces.</p>
                        </div>
                        <div className="mail-card">
                            <div className="number-text">02</div>
                            <p className="large-height fw-500">Sign up for our newsletter to get the latest updates delivered
                                straight to your inbox.</p>
                        </div>
                        <div className="mail-card">
                            <div className="number-text">03</div>
                            <p className="large-height fw-500">Join our community on social media to connect with other
                                like-minded individuals and stay up-to-date on the latest news
                                and trends.</p>
                        </div>
                        <div className="mail-card">
                            <div className="number-text">04</div>
                            <p className="large-height fw-500">Visit our education center for in-depth guides, tutorials, and
                                courses designed to help you master the basics of Web3 and
                                beyond.</p>
                        </div>
                    </div>
                    <p className='large-height'>We're here to help you navigate the complex world of Web3, so please don't hesitate to reach out to us with any questions or suggestions. We're always happy to hear from our readers.</p>
                    <div className="thank-you-part text-center my-lg-5 my-md-4 my-3">
                        <img src={clapIcon} alt="" className='img-fluid m-auto' />
                        <h3 className='text-center heading-3 mb-2'>Thanks for choosing <span className='color-primary'>Renoded</span> -</h3>
                        <p className='large-height text-center fw-500'>we're excited to have you on board!</p>
                    </div>
                    <div className="mail-social-part mb-lg-5 mb-md-4 mb-3">
                        <div className="">
                            <ul className='mb-0'>
                                <li>
                                    <Link to=""><i className="ri-twitter-fill"></i></Link>
                                </li>
                                <li>
                                    <Link to=""><i className="ri-instagram-fill"></i></Link>
                                </li>
                                <li>
                                    <Link to=""><i className="ri-linkedin-fill"></i></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mail-footer-part d-lg-flex d-md-flex d-block justify-content-between">
                        <p>Update your email preferences or unsubscribe here</p>
                        <img src={Logo} alt="" className='img-fluid' />
                        <p>228 Park, Ave S # 29976, New York, New York 10003</p>
                    </div>
                </Container>
            </div>

        </>
    )
}
