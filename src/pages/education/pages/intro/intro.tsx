import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './intro.sass'
import Courseheaderbg from '../../../../assets/images/course-header-bg.svg';
import Usericon from '../../../../assets/images/user-icon.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Chart from '../../../../assets/images/chart.svg';
import Pin from '../../../../assets/images/pin.svg';
import Mind from '../../../../assets/images/mind.svg';
import { useNavigate } from 'react-router-dom';

const Intro = () => {

  const nav = useNavigate()

  return (
    <>
      <div>
        <section className='header-sec'>
          <div className="">
            <Container>
              <div className="topheadimg">
                <img src={Courseheaderbg} className='headerbg' alt="" />
                <img src={Usericon} className='user-icon' alt="" />
              </div>
              <div className='heading-text'>
                <h2 className='heading-2'>Intro</h2>
              </div>
            </Container>
          </div>
        </section>
        <section className='intro-sec'>
          <div className="">
            <Container>
              <div className='main-bg-color'>
                <h3 className='heading-3'>Welcome, my friend 👋</h3>
                <div className='mt-4 p-3 p-lg-4 d-flex bg-white border-left-secondary'>
                  <img src={Light} className="img-fluid image-icon" alt="" />
                  <h3 className='fw-500 heading-3'>We want to share our enthusiasm for the blockchain and empower you to explore and participate in the world of tomorrow.</h3>
                </div>
                <h3 className='my-4 fw-600 heading-3'>Let's find out more about On-Chain Analysis, but first, we should mention what the “On-Chain” term means:</h3>
                <div className='d-flex p-3 p-lg-4 border-left-primary'>
                  <img src={Chart} className="img-fluid image-icon" alt="" />
                  <h3 className='fw-600 heading-3'>On-chain data refers to all information recorded on a Blockchain's blocks or, to put it another way, all information related to all transactions that have occurred on a specific Blockchain network.</h3>
                </div>

                <h5 className='mt-3 fw-500 heading-5'>This data is visible to all users in the case of a public Blockchain.</h5>
                <h3 className='fw-600 heading-3 mt-4 mt-md-4 mt-lg-5 mb-4'>The information can be roughly divided into three different categories:</h3>

                <div className='p-lg-4 p-3 bg-white'>
                  <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>1</span> Transaction data</h3>
                  <h4 className='mt-2 mt-md-3 mt-lg-3 fw-500 heading-4'>e.g., sending and receiving address, transferred amount, remaining value for a specific address</h4>
                </div>
                <div className='p-lg-4 p-3 bg-white my-lg-4 my-3'>
                  <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>2</span> Block data</h3>
                  <h4 className='mt-2 mt-md-3 mt-lg-3 fw-500 heading-4'>e.g., timestamps, miner fees, rewards</h4>
                </div>
                <div className='p-lg-4 p-3 bg-white'>
                  <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>3</span> Smart contract code</h3>
                  <h4 className='mt-2 mt-md-3 mt-lg-3 fw-500 heading-4'>i.e., codified business logic on a Blockchain</h4>
                </div>
              </div>

              <Row className='bg-black this-course'>
                <Col lg={6} md={12}>
                  <div className='d-flex'>
                    <img src={Pin} className="img-fluid image-icon" alt="" />
                    <h2 className='heading-2'>Now we have <br /> broken down the introduction…</h2>
                  </div>
                </Col>
                <Col lg={5} md={12} className='align-self-center mt-lg-0 mt-3'>
                  <h5 className='mb-3 fw-500 ms-lg-0 ms-md-5 ms-4 text-color-dark heading-5'>Follow us closely as we explain<span>👇</span></h5>
                  <div className='d-flex ms-lg-0 ms-md-5 ms-4'>
                    <button className='d-flex this-course-btn' onClick={() => { nav("/courses/whythiscourse")}}>
                      <img src={Mind} className="img-fluid image-icon" alt="" />
                      <h5 className="heading-5">Why Take This Course</h5>
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

export default Intro