import React from "react";
import "./curated-content.sass";
import { Button, Col, Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import HeroImg from '../../../assets/icons/educators/bannerImage.jpg';
const ResourcesCardDetails = [
  {
    id: 1,
    image: HeroImg,
    title: "0→100 On-Chain Analysis Guide",
  },
  // {
  //   id: 2,
  //   image: HeroImg,
  //   title: "Beginner",
  // },
  // {
  //   id: 3,
  //   image: HeroImg,
  //   title: "Beginner",
  // },
  // {
  //   id: 4,
  //   image: HeroImg,
  //   title: "Beginner",
  // },
  // {
  //   id: 5,
  //   image: HeroImg,
  //   title: "Beginner",
  // },
];

const CuratedContent = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const nav = useNavigate();
  return (
    <section className='curated-section padding-100'>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey={pathname === "/education" ? "Beginner" : "DeFi"}>
          <div className="section-heading">
            <div className="d-lg-flex d-block align-items-center justify-content-between">
              {pathname === "/education" &&
                <h2 className='color-white heading-2'>Actionable Guides</h2>}
              {pathname === "/" &&
                <h2 className='color-white heading-2'>Actionable Guides</h2>}
              {/* {pathname === "/research" &&
                <Nav variant="pills" className="curated-buttons"> */}
                  {/* <Nav.Item>
                    <Nav.Link eventKey="DeFi">Beginner</Nav.Link>
                  </Nav.Item> */}
                  {/* <Nav.Item>
                    <Nav.Link eventKey="Metaverse">Metaverse</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Market">Market</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Gaming">Gaming</Nav.Link>
                  </Nav.Item> */}
                {/* </Nav>
              } */}
              {/* {pathname === "/" &&
                <Nav variant="pills" className="curated-buttons"> */}
                  {/* <Nav.Item>
                    <Nav.Link eventKey="Beginner">Beginner</Nav.Link>
                  </Nav.Item> */}
                  {/* <Nav.Item>
                    <Nav.Link eventKey="Intermediate">Intermediate</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Advanced">Advanced</Nav.Link>
                  </Nav.Item> */}
                {/* </Nav>
              } */}
            </div>
            <hr className='mt-lg-3 mt-2 color-white' />
          </div>
          {pathname === "/" &&
            <Tab.Content>
              <Tab.Pane eventKey="DeFi">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card"key={i} onClick={() => { nav('/courses') }}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Metaverse">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Market">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Gaming">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
            </Tab.Content>
          }

          {pathname === "/education" &&
            <Tab.Content>
              <Tab.Pane eventKey="Beginner">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" onClick={() => { nav('/courses') }} key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              {/* <Tab.Pane eventKey="Intermediate">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Advanced">
                <div className="curated-all-card">
                  {ResourcesCardDetails.map((item, i) => (
                    <div className="curated-card" key={i}>
                      <div className="card-image">
                        <img src={item.image} alt="" className='img-fluid' />
                      </div>
                      <div className="card-content">
                        <h5 className='color-white heading-5'>{item.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane> */}
            </Tab.Content>
          }
        </Tab.Container>
      </Container >
    </section>
  );
};

export default CuratedContent;
