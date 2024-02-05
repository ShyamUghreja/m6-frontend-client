import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Usericon from '../../../../assets/images/user-icon.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Pin from '../../../../assets/images/pin.svg';
import Explorer from '../../../../assets/images/explorer.svg';
import Chart from '../../../../assets/images/chart.svg';
import Toolkit from '../../../../assets/images/Toolkit.svg';
import CatchingBanner from '../../../../assets/images/catching-banner.svg';
import { CategoryTabView } from '../../../../shared/components/category-tab-view/category-tab-view';
import { useNavigate } from 'react-router-dom';

const Becomepro = () => {

    const nav = useNavigate();
    let [embedURL, setEmbedURL] = useState("")
    
    useEffect(() => {
        setEmbedURL(`http://${new URL(window.location.href).host}/news-post/etherscan-101-beginners-guide-investigating-ethereum-confidence`)
    }, [])

    return (
        <>
            <div>
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={CatchingBanner} className='headerbg' alt="" />
                                <img src={Usericon} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='heading-2'>Become a Pro Blockchain Explorer</h2>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='become-pro-sec'>
                    <div className="">
                        <Container>
                            <div className='main-bg-color'>
                                <h3 className='heading-3'>Welcome, my friend 👋</h3>
                                <div className='mt-4 d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                    <img src={Light} className="img-fluid image-icon" alt="" />
                                    <h3 className='fw-500 heading-3'>In this guide, we will analyze a transaction on a block explorer</h3>
                                </div>
                                {/* 1st card  */}
                                <div className='bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>1</span> Block Explorers - "Google of crypto and blockchain" 🔎</h3>
                                    <div className='mt-lg-4 mt-3 d-flex border-left-primary p-lg-4 p-3'>
                                        <h5 className='fw-500 heading-5'>A block explorer is an essential tool for cryptocurrency and blockchain users. It enables users to navigate a blockchain in a similar way that browsers allow users to navigate websites.</h5>
                                    </div>
                                    <h4 className='mt-3 heading-4'>You'll get crucial information about cryptocurrency transactions, including addresses and fees.</h4>
                                </div>
                                {/* 2nd card */}
                                <div className='bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>2</span> How to use a Block Explorer 📝</h3>
                                    <h4 className='mt-lg-4 mt-3 text-color-light heading-4'>A real-life example of the sheer power of on-chain analysis! Wouldn’t you want to be able to fore see the next FTX-esque event?</h4>
                                    <div className='mt-lg-4 mt-3'>
                                        <img src={Explorer} className="img-fluid w-100" alt="" />
                                    </div>
                                    <div className='mt-lg-4 mt-3'>
                                        <h4 className='heading-4'>Here's what this all means…</h4>
                                        <div className='mt-lg-4 mt-3 meanings'>
                                            <p className='fw-500 large-height red'><span>1) TRANSACTION ID: </span> Also referred to as the Transaction Hash, this code uniquely identifies this particular transaction.</p>
                                            <p className='fw-500 large-height mt-3 blue'><span>2) SOURCE ADDRESS: </span> This section displays the cryptocurrency addresses they are trying to send to them and the amount they are sending. The address's previous incoming and outgoing transactions can be viewed by clicking on it.</p>
                                            <p className='fw-500 large-height mt-3 purple'><span>3) FEES:</span> Transactions on the majority of cryptocurrency networks incur fees. In this section, you can see how much the transaction has cost in fees. These fees are paid to those who validate blocks of transactions for the network.</p>
                                            <p className='fw-500 large-height mt-3 orange'><span>4) DESTINATION ADDRESSES: </span> We can see which addresses are a transaction's intended destination in this section and how much is being sent to each address. You can click on the receiving address to view their transaction history, similarly to how you would with the sending address.</p>
                                            <p className='fw-500 large-height mt-3 green'><span>5) TRANSACTION STATUS: </span> Before a transaction can be finished and deemed valid, it must first be confirmed by the parties responsible for validating it. It's best to treat transactions that haven't been confirmed as "not received yet" and to hold off until they are.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* 3st card  */}
                                <div className='bg-white mt-lg-4 mt-3 p-lg-4 p-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>3</span> Commonly Used Explorers 🧭</h3>
                                    <h4 className='fw-600 my-lg-4 my-3 text-color-light heading-4'>A real-life example of the sheer power of on-chain analysis! Wouldn’t you want to be able to fore see the next FTX-esque event?</h4>
                                    <CategoryTabView />

                                </div>
                                {/* 4th card  */}
                                <div className='p-lg-4 p-3 bg-white mt-lg-4 mt-3'>
                                    <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>4</span> Etherscan 101 🕵️</h3>
                                    <h4 className='my-4 text-color-light heading-4'>Here's a complete DEXterlab's guide to using Etherscan - the most commonly used block explorer for Ethereum</h4>
                                    <div className=''>
                                        <div className='large fw-500 mt-3 h-100'>
                                        {/* "https://www.renoded.com/p/etherscan-101-beginners-guide-investigating-ethereum-confidence"  */}
                                            <iframe src={embedURL}
                                            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin allow-storage-access-by-user-activation" 
                                            style={{left: "0px", top: "0px", width: "100%", height: "1000px", borderRadius: "1px", pointerEvents: "auto", backgroundColor: "white"}}>
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Row className='bg-black this-course'>
                                <Col lg={6} md={12}>
                                    <div className="d-flex">
                                        <img src={Pin} className="img-fluid image-icon" alt="" />
                                        <div>
                                            <h2 className='heading-2'>What To Take Away</h2>
                                            <h5 className='fw-500 mt-lg-4 mt-3 text-color-dark heading-5'><span>🧭</span> Most explorers have similar UIs, so by mastering one, you can navigate 90% of them</h5>
                                            <h5 className='fw-500 mt-lg-4 mt-3 text-color-dark heading-5'><span>🔍</span> Transaction IDs can show you the status of your transaction</h5>
                                            <h5 className='fw-500 mt-lg-4 mt-3 text-color-dark heading-5'><span>👥</span> All transactions on the blockchain have a sender & receiver</h5>
                                            <h5 className='fw-500 mt-lg-4 mt-3 text-color-dark heading-5'><span>🔎</span> Block explorers are the “Google” of crypto & blockchain for transactionsz</h5>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={5} md={12} className="mt-lg-0 mt-3">
                                    <div className='Take-Away ms-lg-0 ms-md-5 ms-0'>
                                        <h5 className='mb-3 fw-500 text-color-dark heading-5'>(For Beginners) <br />Need a refresher on tokenomics? Go deeper <span>👇</span></h5>
                                        <div className='d-flex'>
                                            <button className='d-flex this-course-btn' onClick={() => { nav('/courses/tokenomics') }}>
                                                <img src={Chart} className="img-fluid image-icon" alt="" />
                                                <h5 className="heading-5">Tokenomics Refresher for Dummies</h5>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-lg-5 mt-3 Take-Away ms-lg-0 ms-md-5 ms-0'>
                                        <h5 className='mb-3 fw-500 text-color-dark heading-5'>Let’s look at some platforms <br /> we can use to aggregate the token data for us! <span>👇</span></h5>
                                        <div className='d-flex '>
                                            <button className='d-flex this-course-btn' onClick={() => { nav("/courses/yourtoolkit") }}>
                                                <img src={Toolkit} className="img-fluid image-icon" alt="" />
                                                <h5 className="heading-5">Your Toolkit</h5>
                                            </button>
                                        </div>
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

export default Becomepro