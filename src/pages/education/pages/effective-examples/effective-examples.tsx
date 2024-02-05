import React from 'react'
import './effective-examples.sass'
import { Col, Container, Row } from 'react-bootstrap'
import EffectiveBanner from '../../../../assets/images/effective-examples-banner.svg';
import Example from '../../../../assets/images/Examples.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Pin from '../../../../assets/images/pin.svg';
import { useNavigate } from 'react-router-dom';

const Effectiveexamples = () => {

    const nav = useNavigate()

    return (
        <>
            <div>
                <section className='header-sec'>
                    <div className="">
                        <Container>
                            <div className="topheadimg">
                                <img src={EffectiveBanner} className='headerbg' alt="" />
                                <img src={Example} className='user-icon' alt="" />
                            </div>
                            <div className='heading-text'>
                                <h2 className='heading-2'>Effective Examples</h2>
                            </div>
                        </Container>
                    </div>
                </section>
                <section className='effective-sec'>
                    <Container>
                        <div className='main-bg-color'>
                            <div className='d-flex bg-white border-left-secondary p-lg-4 p-3'>
                                <img src={Light} className="img-fluid image-icon" alt="" />
                                <h3 className='fw-500 heading-3'>LIVE Examples Of Effective On-Chain Analysis</h3>
                            </div>
                            <div className='become-pro-catagory bg-white mt-4 p-lg-4 p-3'>
                                <div>
                                    <div className='d-flex'>
                                        <h3 className='intro-category-title heading-3'>Example 1</h3>
                                    </div>
                                    <div className='mt-4 d-flex border-left-primary p-lg-4 p-3'>
                                        <ul className='mb-0'>
                                            <li className='mb-3'>
                                                <h4 className='fw-500 heading-4'>Here we can see how on-chain analysis has been used to analyze why Arbitrum may launch a token</h4>
                                            </li>
                                            <li className=''>
                                                <h4 className='fw-500 heading-4'>As the thread develops, it focuses on transactions per day which is a metric we have covered & cites how this can be compared with other L1s/L2s to make an analytical conclusion</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <Row className='justify-content-center has-ifram mt-3'>
                                        <Col lg={6}>
                                            <div className="twitter-widget-card">
                                                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1614669850420580356&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252FTheDeFISaint%252Fstatus%252F1614669850420580356%26widget%3DTweet&amp;sessionId=7bb30ba8d0fece779b0e7797a0b54d6b854666d6&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1614669850420580356"></iframe>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    <div className='d-flex '>
                                        <h3 className='intro-category-title heading-3'>Example 2</h3>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3 d-flex border-left-primary p-lg-4 p-3'>
                                        <ul className='mb-0'>
                                            <li>
                                                <h4 className='fw-500 heading-4'>Here we can see the on-chain analysis concluded using a tool from our toolkit, Dune Analytics.</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <Row className='justify-content-center mt-3'>
                                        <Col lg={6}>
                                            <div className="twitter-widget-card">
                                                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1614852746792038402&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252FFlowslikeosmo%252Fstatus%252F1614852746792038402%26widget%3DTweet&amp;sessionId=3801bd165a5887c5fed956a53d45b336edb800b2&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1614852746792038402"></iframe>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    <div className='d-flex '>
                                        <h3 className='intro-category-title heading-3'>Example 3</h3>
                                    </div>
                                    <div className='mt-4 d-flex border-left-primary p-lg-4 p-3'>
                                        <ul className='mb-0'>
                                            <li>
                                                <h4 className='fw-500 heading-4'>In example 3, Bubblemaps highlights the use of on-chain analysis by investigating the top tokenholders of Otherdeed NFTs</h4>
                                            </li>
                                            <li className='mt-3'>
                                                <h4 className='fw-500 heading-4'>Through Bubblemaps UI, they identified which wallets are connected through $ETH transfers</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <Row className='justify-content-center mt-3'>
                                        <Col lg={6}>
                                            <div className="twitter-widget-card">
                                                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1520724888155209730&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fbubblemaps%252Fstatus%252F1520724888155209730%26widget%3DTweet&amp;sessionId=2443e1398289dec2be08f76c39ab639ffe6d080e&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1520724888155209730"></iframe>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    <div className='d-flex '>
                                        <h3 className='intro-category-title heading-3'>Example 4</h3>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3 d-flex border-left-primary p-lg-4 p-3'>
                                        <ul className='mb-0'>
                                            <li>
                                                <h4 className='fw-500 heading-4'>ZachXBT has established himself as a reputable on-chain sleuth whose research has led to arrests!</h4>
                                            </li>
                                            <li className='mt-3'>
                                                <h4 className='fw-500 heading-4'>Zach created a visual of his findings to help you understand how North Koreas Lazarus Group washed $63.5m</h4>
                                            </li>
                                        </ul>
                                    </div >
                                    <Row className='justify-content-center mt-3'>
                                        <Col lg={6}>
                                            <div className="twitter-widget-card">
                                                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1614771861266792449&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fzachxbt%252Fstatus%252F1614771861266792449%26widget%3DTweet&amp;sessionId=50c31d05b0af24778f8b54b9b288e35845a3986d&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1614771861266792449"></iframe>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    <div className='d-flex '>
                                        <h3 className='intro-category-title heading-3'>Example 5</h3>
                                    </div>
                                    <div className='mt-lg-5 mt-md-4 mt-3 d-flex border-left-primary p-lg-4 p-3'>
                                        <ul className='mb-0'>
                                            <li>
                                                <h4 className='fw-500 heading-4'>Exploits are inevitable in crypto. But on-chain analysis here is used to show how the stolen funds are being moved</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <Row className='d-flex justify-content-center mt-3'>
                                        <Col lg={6}>
                                            <div className="twitter-widget-card">
                                                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency={true} allowFullScreen={true} style={{ position: "static", visibility: "visible", width: "100%", height: "100%", display: "block", flexGrow: "1" }} title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1619489550233133056&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fzachxbt%252Fstatus%252F1619489550233133056%26widget%3DTweet&amp;sessionId=6438c9dbf3285fb0456031004092a3f8b0a8707d&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1619489550233133056"></iframe>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        <Row className='bg-black this-course'>
                            <Col lg={5} className='d-flex'>
                                <img src={Pin} className="img-fluid image-icon" alt="" />
                                <h2 className='heading-2'>Now that we have seen on-chain analysis in action…</h2>
                            </Col>
                            <Col lg={5} className='align-self-center mt-lg-0 mt-3'>
                                <h5 className='ms-lg-0 ms-md-5 ms-0 mb-3 fw-500 text-color-dark heading-5'>Let’s talk about how you <br />can apply this knowledge to your life! <span>👇</span></h5>
                                <div className='ms-lg-0 ms-md-5 ms-0 d-flex'>
                                    <button className='d-flex this-course-btn' onClick={() => { nav("/courses/actionschecklist") }}>
                                        <img src={Example} className="img-fluid image-icon" alt="" />
                                        <h5 className="heading-5">Actions Checklist</h5>
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

export default Effectiveexamples