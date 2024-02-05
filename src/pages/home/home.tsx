import React from 'react';
import '../home/home.sass'
import Hero from '../../shared/components/hero/hero';
import Trending from '../../shared/components/trending/trending';
import Subscribe from '../../shared/components/subscribe/subscribe';
import Resources from '../../shared/components/resources/resources';
import AllTags from '../../shared/components/all-tags/all-tags';
import { Col, Container, Row } from 'react-bootstrap';
import OurPodcasts from '../../shared/components/our-podcasts/our-podcasts';
import CuratedContent from '../../shared/components/curated-content/curated-content';
import { SayOnTwitter } from '../../shared/components/say-on-twitter/say-on-twitter';
import ToTheDeth from '../../shared/components/creator-model/SpotifySocialLogin';

const Home = () => {

  return (
    <>
      <div className="">
        <AllTags />
        <ToTheDeth />
        <Hero />
        <Resources />
        <div className="home-curated">
          <CuratedContent />
        </div>
        <section className='treding-month padding-100'>
          <Container>
            <Row>
              <Col lg={12} md={12}>
                <div className="section-heading">
                  <h2 className='text-center heading-2'>Trending this month</h2>
                </div>
              </Col>
              <Trending />
            </Row>
          </Container>
        </section>
        <section className='subscribe-section padding-100'>
          <Container>
            <SayOnTwitter />
            <Subscribe />
          </Container>
        </section>
        <OurPodcasts />
      </div>
    </>
  )
}

export default Home
