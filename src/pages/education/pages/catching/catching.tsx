import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import './catching.sass'
import Courseheaderbg from '../../../../assets/images/course-header-bg.svg';
import Usericon from '../../../../assets/images/user-icon.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Pin from '../../../../assets/images/pin.svg';
import Metrics from '../../../../assets/images/metrics.svg';
import ChainAnalysis from '../../../../assets/images/chain-analysis.svg';
import ChainData from '../../../../assets/images/chain-data.svg';
import ProBlockchain from '../../../../assets/images/pro-blockchain.svg';
import CatchingBanner from '../../../../assets/images/catching-banner.svg';
import { useNavigate } from 'react-router-dom';

const Catching = () => {

  const nav = useNavigate()

    return (
        <>
            <div>
                <section className='header-sec'>
                    <Container>
                        <div className="topheadimg">
                            <img src={CatchingBanner} className='headerbg' alt="" />
                            <img src={Usericon} className='user-icon' alt="" />
                        </div>
                        <div className='heading-text'>
                            <h2 className='heading-2'>Catching ‘Em Before They Come</h2>
                        </div>
                    </Container>
                </section>
                <section className='catching-sec'>
                    <Container>
                        <div className='main-bg-color'>
                            <div className='d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                <img src={Light} className="image-icon img-fluid" alt="" />
                                <h3 className='fw-500 heading-3'>“The early bird catches the worm” Becoming an on-chain sleuth enables you to catch things essentially before they happen by seeing trends on chain</h3>
                            </div>
                            {/* 1st card  */}
                            <div className='catching-catagory bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>1</span> Key Metrics of On-Chain Analysis</h3>
                                <Row className='d-flex mt-lg-4 mt-3'>
                                    <Col lg={7} className='matrics-banner'>
                                        <img src={Metrics} className="img-fluid w-100" alt="" />
                                    </Col>
                                    <Col lg={5} className='mt-lg-0 mt-3'>
                                        <h4 className='heading-4'>💰 Outstanding Loans</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>💸 Volume (USD and the token)</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>🔄 Transactions</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>📈 Market movements</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>💼 Investor behaviors</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>👥 Active users</h4>
                                        <h4 className='mt-3 mt-lg-4 heading-4'>👤 Unique lenders</h4>
                                    </Col>
                                </Row>
                                <div className='mt-lg-5 mt-md-4 mt-3 d-flex border-left-primary p-lg-4 p-3'>
                                    <h5 className='fw-500 heading-5'>Other key metrics of on-chain analysis that can help you come to an informed conclusion :</h5>
                                </div>
                            </div>
                            {/* 2nd card */}
                            <div className='p-lg-4 p-3 bg-white mt-lg-4 mt-3'>
                                <h3 className='intro-category-title d-flex heading-3'>
                                    <span className='number-lable bg-color-secondary'>2</span>
                                    Example: On-Chain Analysis Helped Foresee FTX Collapse 📉
                                </h3>
                                <h4 className='mt-lg-5 mt-4 chain-analysis text-color-light heading-4'>A real-life example of the sheer power of on-chain analysis! Wouldn’t you want to be able to fore see the next FTX-esque event?</h4>
                                <div className='chain-analysis-banner mt-3 mt-lg-4 p-lg-4 p-3'>
                                    <Row className='d-flex'>
                                        <Col lg={4} className='analysis-banner'>
                                            <img src={ChainAnalysis} className="img-fluid w-100" alt="" />
                                        </Col>
                                        <Col lg={8} className='mt-lg-0 mt-3'>
                                            <div className='banner-data' onClick={() => { window.open("https://decrypt.co/115386/onchain-data-shows-ftx-collapse-was-inevitable-report") }}>
                                                <div>
                                                    <h5 className="heading-5">BNB Chain’s Cross-Chain Bridge Exploit Explained</h5>
                                                    <p className='mt-2 mt-lg-3 fw-500 normal'>Fallen crypto exchange FTX was quite likely doomed months ago once crypto project Terra went up in flames, according to Glassnode. In its latest report, the blockchain
                                                        data firm said that FTX’s digital asset reserves dropped massively following Terra’s ignominious crash in May.</p>
                                                </div>
                                                <div>
                                                    <Button className='mt-lg-4 mt-3' onClick={() => { window.open("https://decrypt.co/115386/onchain-data-shows-ftx-collapse-was-inevitable-report") }}>Read More</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            {/* 3st card  */}
                            <div className='p-lg-4 p-3  bg-white mt-lg-4 mt-3'>
                                <h3 className='intro-category-title d-flex heading-3'>
                                    <span className='number-lable bg-color-secondary'>3</span>
                                    Example: On-Chain Data Provided a Post-Mortem of the BNB Cross-Chain Bridge Exploit
                                </h3>
                                <div className='mt-lg-5 mt-md-4 mt-3 d-flex analysis'>
                                    <h5 className='fw-500 border-left-primary p-lg-4 p-3 heading-5'>A real-life example of the sheer power of on-chain analysis! Wouldn’t you want to be able to foresee the next FTX-esque event?</h5>
                                </div>
                                <div className='chain-analysis-banner mt-lg-4 mt-3'>
                                    <Row className='d-flex '>
                                        <Col lg={4} className='analysis-banner'>
                                            <img src={ChainData} className="img-fluid w-100" alt="" />
                                        </Col>
                                        <Col lg={8} className='mt-lg-0 mt-3'>
                                            <div className='banner-data' onClick={() => { window.open("https://www.nansen.ai/research/bnb-chains-cross-chain-bridge-exploit-explained") }}>
                                                <div>
                                                    <h5 className="heading-5">Onchain Data Shows FTX Collapse Was ‘Inevitable’: Report</h5>
                                                    <p className='mt-lg-3 mt-2 FW-500 normal'>Fallen crypto exchange FTX was quite likely doomed months ago once crypto project Terra went up in flames, according to Glassnode. In its latest report, the blockchain
                                                        data firm said that FTX’s digital asset reserves dropped massively following Terra’s ignominious crash in May.</p>
                                                </div>
                                                <div>
                                                    <Button className='mt-lg-4 mt-3' onClick={() => { window.open("https://www.nansen.ai/research/bnb-chains-cross-chain-bridge-exploit-explained") }}>Read More</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <Row className='bg-black this-course'>
                            <Col lg={5} className='d-flex'>
                                <img src={Pin} className="img-fluid image-icon" alt="" />
                                <h2 className='heading-2'>Now That We Know Which Metrics Help Us Foresee Any Trouble…</h2>
                            </Col>
                            <Col lg={5} className='align-self-center mt-lg-0 mt-3'>
                                <h5 className='ms-lg-0 ms-md-5 ms-0 mb-3 fw-500 text-color-dark heading-5'>Let’s See How <br /> We Can Apply Those Metrics Of Analysis <span>👇</span></h5>
                                <div className='d-flex ms-lg-0 ms-md-5 ms-0'>
                                    <button className='d-flex this-course-btn' onClick={() => { nav("/courses/becomepro")}}>
                                        <img src={ProBlockchain} className="img-fluid image-icon" alt="" />
                                        <h5 className="heading-5">Become a Pro Blockchain Explorer</h5>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Catching