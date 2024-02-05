import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './tokenomics.sass'
import Usericon from '../../../../assets/images/user-icon.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import tokenomicsBanner from '../../../../assets/images/tokenomics-banner.svg';
import TokenomicsExample from '../../../../assets/images/Tokenomics-example.svg';
import About from '../../../../assets/images/about.svg';
import What from '../../../../assets/images/what.svg';
import Everything from '../../../../assets/images/everything.svg';
import Pin from '../../../../assets/images/pin.svg';
import Toolkit from '../../../../assets/images/Toolkit.svg';
import TakonomicsBanner from '../../../../assets/images/takonomics-banner.svg';
import { useNavigate } from 'react-router-dom';

const alphacotent = [
    {
        id: 1,
        image: About,
        title: "Everything you need to know about Tokenomics",
        discription: "Here is everything you need to know about Tokenomics. I hope enjoyed this video! Let me know what you think in the comments below. ",
        link: "https://youtu.be/w0HX5Y-yIJY"
    },
    {
        id: 2,
        image: What,
        title: "What is Tokenomics? A beginner’s guide on supply and demand of cryptocurrencies",
        discription: "A popular word for describing the internal dynamics of crypto projects, tokenomics, sheds light on how the asset functions...",
        link: "https://cointelegraph.com/trading-for-beginners/what-is-tokenomics-a-beginners-guide-on-supply-and-demand-of-cryptocurrencies"
    },
    {
        id: 3,
        image: Everything,
        title: "Everything you need to know about Tokenomics",
        discription: "Here is everything you need to know about Tokenomics. I hope enjoyed this video! Let me know what you think in the comments below. ",
        link: "https://twitter.com/tokenterminal/status/1614958363992899585"
    },
]

const Tokenomics = () => {

  const nav = useNavigate()

    return (
        <>
            <div>
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={TakonomicsBanner} className='headerbg' alt="" />
                                <img src={Usericon} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='fw-700 heading-2'>Tokenomics Refresher For Dummies</h2>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='tokenomics-sec'>
                    <div className="">
                        <Container>
                            <div className='main-bg-color'>
                                <h3 className='heading-3'>Welcome, my friend 👋</h3>
                                <div className='mt-4 d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                    <img src={Light} className="img-fluid image-icon" alt="" />
                                    <h3 className='fw-500 heading-3'>In this guide, we will analyze a transaction on a block explorer</h3>
                                </div>
                                {/* 1st card  */}
                                <div className='tokenomics-catagory bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>1</span> Key Elements To Tokenomics</h3>
                                    <div className='mt-lg-4 mt-3 bg-color-light-gray p-lg-4 p-3'>
                                        <h3 className='fw-600 heading-3'>Mining and staking</h3>
                                        <p className='large-height mt-lg-3 mt-2'>The main incentive for a group of participants in base-layer blockchains that use a decentralized network of computers to verify transactions and add new blocks is mining. Participants are rewarded with newly mined coins for devoting their computing power and finding new blocks when new blocks are successfully validated.</p>
                                    </div>
                                    <div className='mt-lg-4 mt-3 bg-color-light-gray p-lg-4 p-3'>
                                        <h3 className='fw-600 heading-3'>Yields</h3>
                                        <p className='large-height mt-lg-3 mt-2'>Yields are closely related to DeFi platforms. Tokens are frequently staked in sizable cryptocurrency collections known as liquidity pools, which power various platforms, such as lending and cryptocurrency exchange platforms. Participants can get their rewards in the form of new tokens.</p>
                                    </div>
                                    <div className='mt-lg-4 mt-3 bg-color-light-gray p-lg-4 p-3'>
                                        <h3 className='fw-600 heading-3'>Token burns</h3>
                                        <p className='large-height mt-lg-3 mt-2'>To reduce the number of coins in circulation, blockchains or protocols "burn" tokens. Making the remaining tokens rare could help to support the price.</p>
                                    </div>
                                    <div className='mt-lg-4 mt-3 bg-color-light-gray p-lg-4 p-3'>
                                        <h3 className='fw-600 heading-3'>Limited and unlimited supply</h3>
                                        <p className='large-height mt-lg-3 mt-2'>It defines the quantity of that cryptocurrency ever-present in the market. For instance, the creators of Bitcoin set a limit on the total supply at 21 million coins, the last of which should be in circulation by the year 2140.</p>
                                    </div>
                                    <div className='mt-lg-4 mt-3 bg-color-light-gray p-lg-4 p-3'>
                                        <h3 className='fw-600 heading-3'>Token distribution</h3>
                                        <p className='large-height mt-lg-3 mt-2'>There are typically two methods to launch and distribute tokens: a fair launch and a pre-mining launch. This is known as a fair launch when a token is created and made available to the general public without early access ( Dogecoin and BTC).</p>
                                    </div>

                                </div>
                                {/* 2nd card  */}
                                <div className='tokenomics-catagory bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>2</span> Tokenomics example</h3>
                                    <img src={tokenomicsBanner} className='mt-lg-4 mt-3 img-fluid w-100' alt="" />
                                </div>
                                {/* 3rd card  */}
                                <div className='tokenomics-catagory bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>3</span> Tokenomics example</h3>
                                    <div className='mt-lg-4 mt-3 border-left-primary p-lg-4 p-3'>
                                        <h5 className='fw-500 heading-5'>Market capitalization calculates an asset's total value based on the price at which it is currently traded. MCAP is one of the most straightforward and practical metrics for project evaluation.</h5>
                                        <ul>
                                            <li className='mt-lg-4 mt-3'><h5 className="heading-5">Market Capitalization (MCAP) = Current Price x Circulating Supply</h5></li>
                                        </ul>
                                    </div>
                                    <img src={TokenomicsExample} className='mt-lg-4 mt-3 img-fluid w-100' alt="" />
                                    <div className='mt-lg-4 mt-3 border-left-primary p-lg-4 p-3'>
                                        <h5 className='fw-500 heading-5'>When the development team has issued the maximum number of tokens, FDV is the project's market cap. In other words, it is a technique for calculating a project's potential market cap.</h5>
                                        <ul>
                                            <li className='mt-lg-4 mt-3'><h5 className="heading-5">Fully Diluted Value (FDV) = Current Price x Total Supply</h5></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* 4th card  */}
                                <div className='bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>4</span> Extend Your Alpha Center 🧠</h3>
                                    <div className='chain-analysis-banner mt-lg-4 mt-3'>
                                        {alphacotent.map((item, i) => (
                                            <div className="mb-lg-4 mb-3 chain-card" key={i}>
                                                <Row >
                                                    <Col lg={4} className='analysis-banner'>
                                                        <img src={item.image} className="img-fluid w-100" alt="" />
                                                    </Col>
                                                    <Col lg={8} className='mt-lg-0 mt-3'>
                                                        <div className='banner-data' onClick={() => { window.open(item.link) }}>
                                                            <div>
                                                                <h5 className="heading-5">{item.title}</h5>
                                                                <p className='mt-lg-3 mt-2 FW-500 normal'>{item.discription}</p>
                                                            </div>
                                                            <div>
                                                                {/* <Button className='mt-lg-4 mt-3'>see More</Button> */}
                                                                <Button type="button" onClick={() => { window.open(item.link) }} className="default-button large bg-color-primary btn btn-primary rounded-0"><p className=''>See More</p></Button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Row className='bg-black this-course'>
                                <Col lg={5} className='d-flex'>
                                    <img src={Pin} className="img-fluid image-icon" alt="" />
                                    <h2 className='heading-2'>Now that we understand tokens…</h2>
                                </Col>
                                <Col lg={5} className='align-self-center mt-lg-0 mt-3'>
                                    <h5 className='ms-lg-0 ms-md-5 ms-0 mb-3 fw-500 text-color-dark heading-5'>Let's look at some platforms <br /> we can use to aggregate he token data for us! <span>👇</span></h5>
                                    <div className='d-flex ms-lg-0 ms-md-5 ms-0'>
                                        <button className='d-flex this-course-btn' onClick={() => { nav("/courses/yourtoolkit")}}>
                                            <img src={Toolkit} className="img-fluid image-icon" alt="" />
                                            <h5 className="heading-5">Your Toolkit</h5>
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

export default Tokenomics