import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap'
import '../category-tab-view/category-tab-view.sass';
import becom1 from '../../../assets/images/becom1.png';
import becom2 from '../../../assets/images/becom2.png';
import becom3 from '../../../assets/images/becom3.png';
import becom4 from '../../../assets/images/becom4.png';
import Toolkit1 from '../../../assets/images/toolkit1.png';
import Toolkit2 from '../../../assets/images/toolkit2.png';
import Toolkit3 from '../../../assets/images/toolkit3.png';
import Toolkit4 from '../../../assets/images/toolkit4.png';
import Toolkit5 from '../../../assets/images/toolkit5.png';
import Toolkit6 from '../../../assets/images/toolkit6.png';
import Toolkit7 from '../../../assets/images/toolkit7.png';

const becomedetail = [
    {
        id: 1,
        image: becom1,
        title: "Blockchain Explorer",
        link: "https://www.blockchain.com/"
    },
    {
        id: 2,
        image: becom2,
        title: "Blockstream",
        link: "https://blockstream.com/"
    },
    {
        id: 3,
        image: becom3,
        title: "Etherscan",
        link: "https://etherscan.io/"
    },
    {
        id: 4,
        image: becom4,
        title: "ETHPLORER",
        link: "https://ethplorer.io/"
    }
];
const tolkitdetail = [
    {
        id: 1,
        image: Toolkit1,
        title: "DEXterlab",
        link: "https://dexterlab.com/"
    },
    {
        id: 2,
        image: Toolkit2,
        title: "Dune",
        link: "https://dune.com/home"
    },
    {
        id: 3,
        image: Toolkit3,
        title: "Nansen",
        link: "https://www.nansen.ai/"
    },
    {
        id: 4,
        image: Toolkit4,
        title: "Glassnode",
        link: "https://glassnode.com/"
    },
    {
        id: 5,
        image: Toolkit5,
        title: "DappRadar",
        link: "https://dappradar.com/"
    },
    {
        id: 6,
        image: Toolkit6,
        title: "DEXTools",
        link: "https://dextools.io/app/en"
    },
    {
        id: 7,
        image: Toolkit7,
        title: "Santiment",
        link: "https://santiment.net/"
    },
];
const chacklistdetail = [
    {
        id: 1,
        image: Toolkit1,
        title: "DEXterlab",
        link: "https://dexterlab.com/"
    },
    {
        id: 2,
        image: Toolkit2,
        title: "Dune",
        link: "https://dune.com/home"
    },
    {
        id: 3,
        image: Toolkit3,
        title: "Nansen",
        link: "https://www.nansen.ai/"
    },
    {
        id: 4,
        image: Toolkit4,
        title: "Glassnode",
        link: "https://glassnode.com/"
    },
    {
        id: 5,
        image: Toolkit5,
        title: "DappRadar",
        link: "https://dappradar.com/"
    },
    {
        id: 6,
        image: Toolkit6,
        title: "DEXTools",
        link: "https://dextools.io/app/en"
    },
    {
        id: 7,
        image: Toolkit7,
        title: "Santiment",
        link: "https://santiment.net/"
    },
    {
        id: 8,
        image: becom1,
        title: "Blockchain Explorer",
        link: "https://www.blockchain.com/"
    },
    {
        id: 9,
        image: becom2,
        title: "Blockstream",
        link: "https://blockstream.com/"
    },
    {
        id: 10,
        image: becom3,
        title: "Etherscan",
        link: "https://etherscan.io/"
    },
    {
        id: 11,
        image: becom4,
        title: "ETHPLORER",
        link: "https://ethplorer.io/"
    }
];

export const CategoryTabView = () => {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <>
            {pathname === "/courses/becomepro" &&
                <>
                    <section className='curated-section-course'>
                        <Row>
                            {becomedetail && becomedetail.map((item, i) => (
                                <Col lg={6}>
                                    <div className="curated-all-card mb-3" onClick={() => { item.link && window.open(item.link) }} key={i}>
                                        <div className="curated-card">
                                            <div className="card-image">
                                                <img src={item.image} alt="" className='img-fluid' />
                                            </div>
                                            <div className="card-content">
                                                <h5 className='color-white heading-5'>{item.title}</h5>
                                                <Button onClick={() => { item.link && window.open(item.link) }}><i className="ri-arrow-right-line"></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </>
            }
            {pathname === "/courses/yourtoolkit" &&
                <>
                    <section className='curated-section-course'>
                        <Row>
                            {tolkitdetail && tolkitdetail.map((item, i) => (
                                <Col lg={6}>
                                    <div className="curated-all-card mb-3" onClick={() => { item.link && window.open(item.link) }} key={i}>
                                        <div className="curated-card">
                                            <div className="card-image">
                                                <img src={item.image} alt="" className='img-fluid' />
                                            </div>
                                            <div className="card-content">
                                                <h5 className='color-white heading-5'>{item.title}</h5>
                                                <Button onClick={() => { item.link && window.open(item.link) }}><i className="ri-arrow-right-line"></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </>
            }
            {pathname === "/courses/actionschecklist" &&
                <>
                    <section className='curated-section-course'>
                        <Row>
                            {chacklistdetail && chacklistdetail.map((item, i) => (
                                <Col lg={6}>
                                    <div className="curated-all-card mb-3" onClick={() => { item.link && window.open(item.link) }} key={i}>
                                        <div className="curated-card">
                                            <div className="card-image">
                                                <img src={item.image} alt="" className='img-fluid' />
                                            </div>
                                            <div className="card-content">
                                                <h5 className='color-white heading-5'>{item.title}</h5>
                                                <Button onClick={() => { item.link && window.open(item.link) }}><i className="ri-arrow-right-line"></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </>
            }
        </>
    )
}
