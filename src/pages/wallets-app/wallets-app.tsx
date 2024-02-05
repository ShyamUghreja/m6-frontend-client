import { Col, Container, Row } from "react-bootstrap";
import "../wallets-app/wallets-app.sass";
import HeroImg from "../../assets/images/hero-img.webp";

import xdefiIcon from "../../assets/icons/wallet-apps/xdefi.svg";
import metamaskIcon from "../../assets/icons/wallet-apps/metamask.svg";
import terraStationIcon from "../../assets/icons/wallet-apps/terraStation.svg";
import leapIcon from "../../assets/icons/wallet-apps/leap.svg";
import trustIcon from "../../assets/icons/wallet-apps/trust.svg";
import rainbowIcon from "../../assets/icons/wallet-apps/rainbow.svg";
// import rabbyIcon from "../../assets/icons/wallet-apps/rabby.svg"; // https://rabby.io/
import coinbaseIcon from "../../assets/icons/wallet-apps/coinbase.svg";
import exodusIcon from "../../assets/icons/wallet-apps/exodus.svg";
import solfareIcon from "../../assets/icons/wallet-apps/solfare.svg";
import phantomIcon from "../../assets/icons/wallet-apps/phantom.svg";
import keplrIcon from "../../assets/icons/wallet-apps/keplr.svg";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

const ResourcesCardDetails = [
  {
    id: 1,
    title: "Ethereum",
    content: [
      {
        id: 1,
        image: trustIcon,
        title: "Trust Wallet",
        path: "https://trustwallet.com/",
      },
      {
        id: 2,
        image: rainbowIcon,
        title: "Rainbow Wallet",
        path: "https://rainbow.me/",
      },
      {
        id: 3,
        image: coinbaseIcon,
        title: "Coinbase wallet",
        path: "https://www.coinbase.com/wallet",
      },
      {
        id: 4,
        image: metamaskIcon,
        title: "MetaMask",
        path: "https://metamask.io/",
      },
    ]
  },
  {
    id: 2,
    title: "Terra",
    content: [
      {
        id: 1,
        image: xdefiIcon,
        title: "XDefi",
        path: "https://www.xdefi.io/",
      },
      {
        id: 2,
        image: terraStationIcon,
        title: "Terra Station",
        path: "https://station.terra.money/",
      },
      {
        id: 3,
        image: leapIcon,
        title: "LEAP Wallet",
        path: "https://www.leapwallet.io/",
      },
      {
        id: 4,
        image: keplrIcon,
        title: "Keplr",
        path: "https://www.keplr.app/",
      },
    ]
  },
  {
    id: 3,
    title: "Solana",
    content: [
      {
        id: 1,
        image: solfareIcon,
        title: "Solflare",
        path: "https://solflare.com/",
      },
      {
        id: 2,
        image: phantomIcon,
        title: "Phantom",
        path: "https://phantom.app/",
      },
    ]
  },
  {
    id: 4,
    title: "Cosmos",
    content: [
      {
        id: 1,
        image: keplrIcon,
        title: "Keplr",
        path: "https://www.keplr.app/",
      },
    ]
  },
  {
    id: 5,
    title: "EVM",
    content: [
      {
        id: 1,
        image: xdefiIcon,
        title: "XDeFi",
        path: "https://www.xdefi.io/",
      },
      {
        id: 2,
        image: metamaskIcon,
        title: "MetaMask",
        path: "https://metamask.io/",
      },
    ]
  },
  {
    id: 6,
    title: "Multiple",
    content: [
      {
        id: 1,
        image: xdefiIcon,
        title: "XDeFi",
        path: "https://www.xdefi.io/",
      },
      {
        id: 2,
        image: exodusIcon,
        title: "Exodus",
        path: "https://www.exodus.com/",
      },
    ]
  },
];

const MyLoader = () => (
  <>
    <ContentLoader height={50} width={"100%"}>
      <rect y="0" ry="3" width="200" height="25" />
    </ContentLoader>
    <Row>
      <Col lg={3} md={3} xs={6}>
        <ContentLoader width={"100%"}>
          <circle cx="70" cy="50" r="30" />
          <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
        </ContentLoader>
      </Col>
      <Col lg={3} md={3} xs={6}>
        <ContentLoader width={"100%"}>
          <circle cx="70" cy="50" r="30" />
          <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
        </ContentLoader>
      </Col>
    </Row>
  </>
)

export const WalletApps = () => {
  const [isCustome, setIisCustome] = useState(false)

  useEffect(() => {
    setTimeout(() => {
        setIisCustome(true)
    }, 2000);
}, [])

  return (
    <>
      <div className="">
        <section className="categories-defi-section">
          <div className="padding-section pb-0">
            <Container className="default-container position-relative">
              <div className="page-info-section mb-0 wallets-app-page">
                <div className="page-info-heading">
                  <h2 className="font-bold heading-2">Wallet Apps</h2>
                </div>
              </div>
            </Container>
          </div>
        </section>
        <section className='curated-content-section'>
          <div className="padding-section">
            <Container>
              {ResourcesCardDetails.map((item, i) => (
                <Row key={i} className="mb-lg-5 mb-md-4 mb-3">
                  {isCustome ?
                    <Col lg={12} md={12} xs={12}>
                      <div className="section-heading">
                        <h2 className='color-primary heading-2'>{item.title}</h2>
                        <hr className="mt-3" />
                      </div>
                      <div className="apps-card" key={i}>
                        {item.content && item.content.map((item, i) => (
                          <Link to="" onClick={() => { item.path && window.open(item.path, '_blank') }} className="wallet-apps-card" key={i} >
                            <div className="card-image">
                              <img src={item.image} alt="" className='img-fluid mx-auto' />
                            </div>
                            <div className="card-content">
                              <h5 className='heading-5'>{item.title}</h5>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Col> :
                    MyLoader()
                  }
                </Row>
              ))}
            </Container>
          </div>
        </section>
      </div>
    </>
  );
};
