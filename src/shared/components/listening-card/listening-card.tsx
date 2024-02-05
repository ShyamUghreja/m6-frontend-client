import React from "react";
import { Col } from "react-bootstrap";
import HeroImg from "../../../assets/images/hero-img.webp";
import AudioPlayer from "react-h5-audio-player";
import { useNavigate } from "react-router-dom";
import "../../../shared/components/listening-card/listening-card.sass";

const cardData = [
  {
    id: 1,
    image: HeroImg,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    audio: "https://www.bensound.com/bensound-music/bensound-adventure.mp3",
  },
  {
    id: 2,
    image: HeroImg,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    audio: "https://www.bensound.com/bensound-music/bensound-adventure.mp3",
  },
  {
    id: 3,
    image: HeroImg,
    title: "On-chain Perpetual Swaps Trends in 2022 and Post-FTX",
    audio: "https://www.bensound.com/bensound-music/bensound-adventure.mp3",
  },
];

const ListeningCard = () => {
  const nav = useNavigate();
  return (
    <>
      {cardData.map((item : any, i: any) => (
        <Col lg={12} md={12} key={i}>
          <div className="listening-card" role="button" onClick={() => { item?.attributes?.slug && nav(`/podcastsdetails/${item?.attributes?.slug}`)}}>
            <div className="card-image">
              <img src={item.image} alt="card img" className="img-fluid" />
            </div>
            <div className="card-content">
              <h4 className="mb-lg-4 heading-4">{item.title}</h4>
              <div className="d-flex justify-content-between">
                <AudioPlayer
                  style={{ border: "0" }}
                  src={item.audio}
                  showSkipControls={false}
                  showJumpControls={false}
                  showFilledVolume={false}
                  hasDefaultKeyBindings={false}
                  loop={false}
                  layout="horizontal-reverse"
                />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default ListeningCard;
