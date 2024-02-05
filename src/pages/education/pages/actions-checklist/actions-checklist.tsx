import React from 'react'
import './actions-checklist.sass'
import { Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Example from '../../../../assets/images/Examples.svg';
import ActionBanner from '../../../../assets/images/action-banner.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Mind from '../../../../assets/images/mind.svg';
import Metrics from '../../../../assets/images/metrics.svg';
import Sparrow from '../../../../assets/images/sparrow.svg';
import ProBlockchain from '../../../../assets/images/pro-blockchain.svg';
import CommonExplorer from '../../../../assets/images/common-explorer.svg';
import Pin from '../../../../assets/images/pin.svg';
import { CategoryTabView } from '../../../../shared/components/category-tab-view/category-tab-view';
import { useNavigate } from 'react-router-dom';



const ResourcesCardDetails = [
    {
        title: "Defi",
        content: [
            {
                id: 1,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 2,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 3,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 4,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 5,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 6,
                image: CommonExplorer,
                title: "DEXterlab",
            },
        ]
    },
    {
        title: "Metaverse",
        content: [
            {
                id: 1,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 2,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 3,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 4,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 5,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 6,
                image: CommonExplorer,
                title: "DEXterlab",
            },
        ]
    },
    {
        title: "Market",
        content: [
            {
                id: 1,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 2,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 3,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 4,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 5,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 6,
                image: CommonExplorer,
                title: "DEXterlab",
            },
        ]
    },
    {
        title: "Gaming",
        content: [
            {
                id: 1,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 2,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 3,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 4,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 5,
                image: CommonExplorer,
                title: "DEXterlab",
            },
            {
                id: 6,
                image: CommonExplorer,
                title: "DEXterlab",
            },
        ]
    }
];

const Actionschecklist = () => {
    const nav = useNavigate()

    return (
        <>
            <div>
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={ActionBanner} className='headerbg' alt="" />
                                <img src={Example} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='heading-2'>Actions Checklist</h2>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='action-sec'>
                    <div className="">
                        <Container>
                            <div className='main-bg-color'>
                                <div className='d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                    <img src={Light} alt="" />
                                    <h3 className='fw-500 heading-3'>Hey there, you on-chain sleuth, let’s put your new knowledge into action!</h3>
                                </div>
                                <div className='bg-white mt-lg-4 mt-3 check-list'>
                                    <div>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-1">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>Be familiar with what on-chain analysis is? 🤔</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <button className='d-flex this-course-btn white mt-lg-4 mt-3'>
                                            <img src={Example} className="img-fluid image-icon" alt="" />
                                            <h5 className='font-color-black heading-5' onClick={() => { nav("/courses/intro") }}>Intro</h5>
                                        </button>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3'>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-2">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>Increase the frequency of analyzing transaction volumes, active users, activewallets, and other related metrics 📊</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <button className='d-flex this-course-btn white mt-lg-4 mt-3'>
                                            <img src={Mind} className="img-fluid image-icon" alt="" />
                                            <h5 className='font-color-black heading-5' onClick={() => { nav("/courses/whythiscourse") }}>Why Take This Course</h5>
                                        </button>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3'>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-3">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>After completing this guide, be able to track NFT rarities, identify trends supported by data, spot patterns, and detect abnormalities</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <button className='d-flex this-course-btn white mt-lg-4 mt-3'>
                                            <img src={Mind} className="img-fluid image-icon" alt="" />
                                            <h5 className='font-color-black heading-5' onClick={() => { nav("/courses/whythiscourse") }}>Why Take This Course</h5>
                                        </button>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3'>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-4">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>Become an expert in these metrics👇</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <Row>
                                            <Col lg={8}>
                                                <img src={Metrics} className="my-3 img-fluid w-100" alt="" />
                                            </Col>
                                        </Row>
                                        <button className='d-flex this-course-btn white mt-lg-4 mt-3'>
                                            <img src={Sparrow} className="img-fluid image-icon" alt="" />
                                            <h5 className='font-color-black heading-5'  onClick={() => { nav("/courses/catching") }}>Catching ‘Em Before They Come</h5>
                                        </button>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3'>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-5">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>Learn how to read a blockchain explorer expertly 📖</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <button className='d-flex this-course-btn white mt-lg-5 mt-md-4 mt-3'>
                                            <img src={ProBlockchain} className="img-fluid image-icon" alt="" />
                                            <h5 className='font-color-black heading-5'  onClick={() => { nav("/courses/becomepro") }}>Become a Pro Blockchain Explorer</h5>
                                        </button>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3'>
                                        <Form.Check type="checkbox" className='d-flex' id="check-api-6">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label><h3 className='fw-500 heading-3'>Use the On-Chain Analysis Tool Kit like weapons 🔫</h3> </Form.Check.Label>
                                        </Form.Check>
                                        <div className='your-toolkit-catagory  bg-white mt-lg-5 mt-md-4 mt-3'>
                                            <CategoryTabView />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row className='bg-black this-course'>
                                <Col lg={12} className='d-flex'>
                                    <img src={Pin} className="img-fluid image-icon" alt="" />
                                    <div className="">
                                        <h2 className='heading-2'>You are now ready to enter the world of on-chain analysis. This guide shouldn’t be a one-time read. Whenever you are lost, this guide can be the beacon of light to reignite your crypto journey.</h2>
                                        <button className='d-flex this-course-btn mt-lg-4 mt-3'>
                                            <img src={Example} className="img-fluid image-icon" alt="" />
                                            <h5 className='fw-500 color-white heading-5' onClick={() => { window.open("https://www.renoded.com/subscribe") }}>Subscribe to our daily newsletter for daily crypto news and industry analysis!</h5>
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Actionschecklist