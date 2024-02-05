import React from 'react';
import '../crypto-card/crypto-card.sass';
import TopWalletsImg from '../../../assets/images/top-wallets-icon.svg';
import TopBlogImg from '../../../assets/images/top-blog.svg';
import PeopleImg from '../../../assets/images/people.svg';
import BestToolImg from '../../../assets/images/best-tool.svg';
import WalletAppImg from '../../../assets/images/wallet-app.svg';
import LearningTrackImg from '../../../assets/images/learning-track.svg';
import '../resources/resources.sass'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const ResourcesCardDetails = [
  {
    id: 2,
    cardImg: BestToolImg,
    title: "Best\nTools",
    path: "/besttools"
  },
  {
    id: 3,
    cardImg: TopBlogImg,
    title: "Top\nPublications",
    path: "/topblogs"
  },
  {
    id: 4,
    cardImg: PeopleImg,
    title: "People to\nfollow",
    path: "/people"
  },
  {
    id: 5,
    cardImg: WalletAppImg,
    title: "Wallet\nApps",
    path: "/walletapps"
  },
  // {
  //   id: 6,
  //   cardImg: TopWalletsImg,
  //   title: "Top\nWallets",
  //   path: "/wallets"
  // },
];

function Resources() {
  const nav = useNavigate()
  return (
    <section className='resources-section padding-100 pb-0'>
      <Container>
        <Row>
          <Col lg={12} md={12}>
            <div className="section-heading">
              <h2 className='text-center color-primary heading-2'>Resources</h2>
            </div>
          </Col>
        </Row>
        <div className="Resources-all-card">
          <Row className='justify-content-center'>
            <Col lg={2} md={3} xs={6}>
              <HashLink to="education#actionableGuides" smooth style={{textDecoration: "none"}}>
                <div className="crypto-card" role="button">
                  <div className="card-image">
                    <img src={LearningTrackImg} alt="" className='img-fluid' />
                  </div>
                  <div className="card-content">
                    <h5 className='mt-3 mb-0 heading-5 font-color-black'>Actionable <br /> Guides</h5>
                  </div>
                </div>
              </HashLink>
            </Col>
            {ResourcesCardDetails.map((item, i) => (
              <Col lg={2} md={3} xs={6} key={i}>
                <div className="crypto-card" role="button" onClick={(id) => item.path ? item.path && nav(item.path) : item.id && nav(`/resourcesdetails/${item.id}`)}>
                  <div className="card-image">
                    <img src={item.cardImg} alt="" className='img-fluid' />
                  </div>
                  <div className="card-content">
                    <h5 className='mt-3 mb-0 heading-5 font-color-black'>{item.title}</h5>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default Resources;