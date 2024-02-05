import React, { useState } from 'react';
import '../crypto-card/crypto-card.sass';
import '../subscribe/subscribe.sass'
import { Button, Col, Row } from 'react-bootstrap';
import SubscribeImg1 from '../../../assets/images/subscribe-channel-img1.svg'
import SubscribeImg2 from '../../../assets/images/subscribe-channel-img2.svg'
import SubscribeImg3 from '../../../assets/images/subscribe-channel-img3.svg'
import SubscribeModal from '../creator-model/subscribe-modal';

const cardData = [
    {
        id: 1,
        title: "Web3 Watch",
        description: "Curating the best content in crypto",
        image: SubscribeImg1,
        link: "https://www.m6labs.co/subscribe"
    },
    {
        id: 2,
        title: "Daily Bullets",
        description: "Daily crypto news and industry analysis",
        image: SubscribeImg2,
        link: "https://www.0xilluminati.com/subscribe"
    },
    {
        id: 3,
        title: "Degen Digest",
        description: "Distributing the best Web3 content & resources",
        image: SubscribeImg3,
        link: "https://www.renoded.com/subscribe"
    },
]

function Subscribe() {
    const [subscribemodal, setSubscribemodal] = useState<boolean>(false)
    const [iframe, setIframe] = useState<any>()
    const subscribemodalToggle = () => {
        setSubscribemodal(!subscribemodal)
    }
    const subscribemodalToggle1 = (item: any) => {
        setIframe(item.iframe)
    }
    const [refreshData, setRefreshData] = useState<boolean>(false)

    return (
        <>
            <div className="padding-section">
                <div className="section-heading">
                    <h2 className='text-center mb-4 heading-2'>Subscribe to our newsletters</h2>
                </div>
                
                <Row className='justify-content-lg-around justify-content-left'>
                    {cardData.map((item, i) => (
                        <Col lg={4} md={6} xs={12} key={i}>
                            <div className="subscribe-card text-center">
                                <img className='mx-auto' src={item.image} alt="" />
                                <h3 className='mb-2 heading-3'>{item.title}</h3>
                                <p className='normal'>{item.description}</p>
                                <Button className='default-button m-auto mt-3' onClick={()=>{ item.link && window.open(item.link)}} data-back="Subscribe">Subscribe</Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <SubscribeModal isOpen={subscribemodal} toggle={subscribemodalToggle} setRefreshData={setRefreshData} iframe={iframe} />
        </>
    );
}

export default Subscribe;
