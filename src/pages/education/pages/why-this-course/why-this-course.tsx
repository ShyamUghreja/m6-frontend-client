import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import './why-this-course.sass';
import Courseheaderbg from '../../../../assets/images/course-header-bg.svg';
import Usericon from '../../../../assets/images/user-icon.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Pin from '../../../../assets/images/pin.svg';
import Sparrow from '../../../../assets/images/sparrow.svg';
import { useNavigate } from 'react-router-dom';

const WhyThisCourse = () => {

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
                <h2 className='heading-2'>Why Take This Course</h2>
              </div>
            </Container>
          </div>
        </section>
        <section className='course-sec'>
          <Container>
            <div className='main-bg-color'>
              <h3 className='heading-3'>Welcome, my friend 👋</h3>
              <div className='mt-3 mt-lg-4 p-lg-4 p-3 d-flex bg-white border-left-secondary'>
                <img src={Light} className="img-fluid image-icon" alt="" />
                <h3 className='fw-500 heading-3'>By examining a range of metrics, on-chain analysts try to improve their knowledge of a network to forecast future price movements.</h3>
              </div>
              <div className='bg-white mt-3 mt-lg-4 p-lg-4 p-3'>
                <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>1</span> Onchain Analysis → Better Insights</h3>
                <div className='mt-3 mt-lg-4 d-flex border-left-primary p-lg-4 p-3'>
                  <h4 className='fw-500 heading-4'>On-chain analysis involves gaining insights from the following types of blockchain data -</h4>
                </div>
                <h4 className='mt-3 mt-lg-4 heading-4'>📈 Transaction volumes</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>💸 Wallet Activity</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>💰 Block details, such as miner rewards</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>📊 Price correlations</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>🔄 Exchange inflows and outflows</h4>
                <h4 className='mt-4 mt-lg-5 color-primary p-0 pe-auto heading-4'>++ Many more data types</h4>

              </div>
              <div className='bg-white mt-3 mt-lg-4 p-lg-4 p-3 bg-color-white'>
                <h3 className='intro-category-title d-flex heading-3'><span className='number-lable bg-color-secondary'>2</span> What You Can Do After Becoming An Onchain Sleuth 🔍</h3>
                <div className='mt-3 mt-lg-4 d-flex border-left-primary p-lg-4 p-3'>
                  <h3 className='fw-500 heading-3'>Traders and investors frequently combine on-chain and technical analyses to pinpoint the best short-term entry and exit points for crypto assets…after this course, you can too!</h3>
                </div>
                <h4 className='mt-3 mt-lg-4 heading-4'>💻 Regularly monitor what happens on the Bitcoin network</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>✨ Track NFT rarities</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>📊 Conclude trends supported by data</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>📈 Spot patterns</h4>
                <h4 className='mt-3 mt-lg-4 heading-4'>⚠️ Detect abnormalities</h4>
                <h4 className='mt-3 mt-lg-4 fw-500 text-color-light heading-4'>…these are all actions that can help strategies for maximizing profitable decision-making within the crypto.</h4>
                <h4 className='mt-3 mt-lg-4 mb-4 mb-lg-5 fw-500 heading-4'>As more data becomes available, its conclusion becomes more substantial. And who knows, <span className='fw-600'> just like ZachXBT </span>, you might end up assisting the FBI 👀</h4>
                <Row className='d-flex justify-content-center'>
                  <Col lg={6}>
                    <div className="twitter-widget-card">
                      <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1621576193152634881&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fzachxbt%252Fstatus%252F1621576193152634881%26widget%3DTweet&amp;sessionId=7f2027316797a719a084f2f3d5e9ed14c3023ec3&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1621576193152634881"></iframe>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <Row className='bg-black this-course'>
              <Col lg={6}>
                <div className='d-flex'>
                  <img src={Pin} className="img-fluid image-icon" alt="" />
                  <div>
                    <h2 className='heading-2'>We mentioned that by becoming an on-chain sleuth, you can:</h2>
                    <h5 className='fw-500 mt-3 heading-5 text-color-dark'><span>📈</span> Spot patterns</h5>
                    <h5 className='fw-500 mt-3 heading-5 text-color-dark'><span>⚠️ </span> Detect abnormalities</h5>
                  </div>
                </div>
              </Col>
              <Col lg={5} className='align-self-center mt-lg-0 mt-3'>
                <h5 className='mb-3 fw-500 text-color-dark ms-0 ms-md-5 ms-lg-0 heading-5'>But how, exactly?… <span>👇</span></h5>
                <div className='d-flex ms-0 ms-md-5 ms-lg-0'>
                  <button className='d-flex this-course-btn' onClick={() => { nav("/courses/catching") }}>
                    <img src={Sparrow} className="img-fluid image-icon" alt="" />
                    <h5 className="heading-5">Catching ‘Em Before They Come</h5>
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

export default WhyThisCourse