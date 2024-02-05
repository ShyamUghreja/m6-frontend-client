import React from "react";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeroImg from '../../../assets/images/hero-img.webp';
import '../../components/podcasts-card/podcasts-card.sass'

const cardData = [
  {
    id: 1,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 2,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 3,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 4,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 5,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 6,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 7,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
  {
    id: 8,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    image: HeroImg,
    guests: "SBF, Mr Doge",
    hostedBy: "Kadeem Clarke",
    badge: "defi",
    social: "Twitter | Instagram",
    date: "Dec 21, 2022",
  },
];

const PodcastsCard = () => {
  const nav = useNavigate();
  return (
    <>
      {cardData.map((item: any, i: any) => (
        <Col lg={3} md={6} xs={12} key={i}>
          <div className="crypto-card" role="button" onClick={() => { item?.attributes?.slug && nav(`/podcastsdetails/${item?.attributes?.slug}`)}}>
            <div className="card-image">
              <img src={item.image} alt="" className='img-fluid' />
            </div>
            <div className="card-content">
              <div className="content-heading">
                <p className="small fw-500">The Crypto Illuminati</p>
                {/* <div>
                  <p className='small fw-500' style={{ color: "#516AF5" }}>Guests</p>
                  <p className='small fw-500'>{item.guests}</p>
                </div>
                <div>
                  <p className='small fw-500' style={{ color: "#FF6737" }}>Hosted by</p>
                  <p className='small fw-500'>{item.hostedBy}</p>
                </div> */}
                <div className="d-flex">
                  <Button className='default-button bg-color-primary small'>{item.badge}</Button>
                  <Button className='default-button small'>Metavrse</Button>
                </div>
              </div>
              <hr />
              <h5 className="heading-5">{item.title}</h5>
              <div className="by-date">
                <p className='small fw-500'>{item.social}</p>
                <p className='small fw-500'>{item.date}</p>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default PodcastsCard;
