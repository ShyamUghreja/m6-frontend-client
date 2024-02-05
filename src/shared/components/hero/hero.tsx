import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../hero/hero.sass'
import Latest from '../latest/latest';
import Feature from '../feature/feature';
import Community from '../community/community';
import { useLocation } from 'react-router-dom';
import TopCreators from '../top-creators/top-creators';

function Hero() {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <section>
            <div className="hero-section">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <Feature />
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <div className="latest-community w-100 latestsection">
                                <div className="latest-section w-100">
                                    <Latest />
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <div className="latest-community w-100">
                                <div className="latest-section w-100">
                                    {pathname === "/" && <Community/> }
                                    {pathname === "/research" && <TopCreators/> }
                                    {pathname === "/podcasts" &&  <Community /> }
                                    {pathname === "/news" &&  <Community /> }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}

export default Hero;
