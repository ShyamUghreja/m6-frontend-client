import React from 'react';
import '../creator-partner/creator-partner.sass';
import { Col, Container, Row } from 'react-bootstrap';
import HeroImg from '../../assets/images/hero-img.webp';

const creatorPrtnert = [
  {
    id: 1,
    title: "Behance",
    image: HeroImg
  },
  {
    id: 2,
    title: "Behance",
    image: HeroImg
  },
  {
    id: 3,
    title: "Behance",
    image: HeroImg
  },
  {
    id: 4,
    title: "Behance",
    image: HeroImg
  },
  {
    id: 5,
    title: "Behance",
    image: HeroImg
  },
  {
    id: 6,
    title: "Behance",
    image: HeroImg
  },
];

const CreatorPartner = () => {

  return (
    <>
      <div className="creator-partner-page">
        <section className="padding-section">
          <Container >
            <div className="creator-partners-profile">
              <div className="creator-partner-image">
                <img src={HeroImg} className="img-fluid" alt="" />
              </div>
              <h3 className='heading-3'>Kadeem Clarke</h3>
            </div>
          </Container>
        </section>
        <Container>
          <section className='creator-partner-card-section'>
            <Row>
              {creatorPrtnert && creatorPrtnert.map((item, i) => (
                <Col lg={6} md={6} xs={12} key={i}>
                  <div className="creator-partner-card">
                    <div className="creator-partner-card-image">
                      <img src={item.image} className="img-fluid" alt="" />
                    </div>
                    <div className='partner-name'>{item.title}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      </div>
    </>
  )
}

export default CreatorPartner;
