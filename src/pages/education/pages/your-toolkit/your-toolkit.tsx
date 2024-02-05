import React from 'react'
import './your-toolkit.sass'
import { Col, Container, Row } from 'react-bootstrap'
import Toolkit from '../../../../assets/images/Toolkit.svg';
import Example from '../../../../assets/images/Examples.svg';
import ToolkitBanner from '../../../../assets/images/toolkit-banner.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Pin from '../../../../assets/images/pin.svg';
import { CategoryTabView } from '../../../../shared/components/category-tab-view/category-tab-view';
import { useNavigate } from 'react-router-dom';


const Yourtoolkit = () => {

  const nav = useNavigate()

    return (
        <>
            <div className="div">
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={ToolkitBanner} className='headerbg' alt="" />
                                <img src={Toolkit} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='heading-2'>Your Toolkit</h2>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='your-toolkit-sec'>
                    {/* <div className=""> */}
                        <Container>
                            <div className='main-bg-color'>
                                <h3 className='heading-3 heading-3'>Welcome, my friend 👋</h3>
                                <div className='mt-4 d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                    <img src={Light} className="img-fluid image-icon" alt="" />
                                    <h3 className='fw-500 heading-3'>On-Chain Analysis Toolkit</h3>
                                </div>
                                <h5 className='fw-500 mt-3 heading-5'>On-chain analysis would be IMPOSSIBLE without a solid base. Here are some tools that range from free to paid, which you can consider. Just click on the box, and you’ll learn how much the tool costs**, the best** use case, and it’s drawbacks</h5>
                                <div className='your-toolkit-catagory  bg-white mt-lg-5 mt-md-4 mt-3 p-lg-4 p-3     '>
                                   <CategoryTabView />
                                </div>
                            </div>
                            <Row className='bg-black this-course'>
                                <Col lg={5} className='d-flex'>
                                    <img src={Pin} className="img-fluid image-icon" alt="" />
                                    <h2 className='heading-2'>Now that we can see which tools are essential…</h2>
                                </Col>
                                <Col lg={5} className='align-self-center mt-lg-0 mt-3'>
                                    <h5 className='ms-lg-0 ms-md-5 ms-0 mb-3 fw-500 text-color-dark heading-5'>Let’s see some of them put to use! <span>👇</span></h5>
                                    <div className='ms-lg-0 ms-md-5 ms-0 d-flex'>
                                        <button className='d-flex this-course-btn' onClick={() => { nav("/courses/effectiveexamples")}}>
                                            <img src={Example} className="img-fluid image-icon" alt="" />
                                            <h5 className="heading-5">Effective Examples</h5>
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    {/* </div> */}
                </section>
            </div>
        </>
    )
}

export default Yourtoolkit