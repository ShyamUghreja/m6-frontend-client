import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import '../feature/feature.sass'
import './community.sass'
import HeroImg from '../../../assets/images/hero-img.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getAllCommunityLink } from '../../../pages/API/ApiCall';
import moment from 'moment';
import LoaderComp from '../loader-component/loader-component';

// newsletter icon imports
import m6LabsIcon from '../../../assets/icons/newsletters/m6_labs.svg';
import blocmatesIcon from '../../../assets/icons/newsletters/blocmatesIcon.svg';
import route2fiIcon from '../../../assets/icons/newsletters/route2fi.svg';
import dailyDegenIcon from '../../../assets/icons/newsletters/daily_degen.svg';
import shirosAlphasIcon from '../../../assets/icons/newsletters/shiros_alphas.svg';
import cryptoIlluminatiIcon from '../../../assets/icons/newsletters/crypto_illuminati.svg';

// podcasts icon imports
import uponlyIcon from '../../../assets/icons/podcasts/uponly.svg';
import banklessIcon from '../../../assets/icons/podcasts/bankless.svg';
import unchainedIcon from '../../../assets/icons/podcasts/unchained.svg';
import theDefiantIcon from '../../../assets/icons/podcasts/the_defiant.svg';
import hashingItOutIcon from '../../../assets/icons/podcasts/hashing_it_out.svg';
import blockbytesIcon from '../../../assets/icons/podcasts/blockbytes.svg';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

const topnews = [
    {
        id: 1,
        title: "M6 Labs",
        image: m6LabsIcon,
        link: 'https://www.m6labs.co/'

    },
    {
        id: 2,
        title: "Renoded",
        image: blocmatesIcon,
        link: 'https://www.renoded.com/subscribe'
    },
    {
        id: 3,
        title: "Route2FI",
        image: route2fiIcon,
        link: 'https://route2fi.substack.com/'
    },
    {
        id: 4,
        title: "The Daily Degen",
        image: dailyDegenIcon,
        link: 'https://thedailydegen.substack.com/'
    },
    {
        id: 5,
        title: "Shiro’s Alphas",
        image: shirosAlphasIcon,
        link: 'https://cryptoshiro.substack.com/'
    },
    {
        id: 6,
        title: "The Crypto Illuminati",
        image: cryptoIlluminatiIcon,
        link: 'https://www.0xilluminati.com/'
    },
];
const toppodcast = [
    {
        id: 1,
        title: "Up Only",
        image: uponlyIcon,
        link: 'https://uponly.tv/ '
    },
    {
        id: 2,
        title: "Bankless",
        image: banklessIcon,
        link: 'https://www.bankless.com/listen'
    },
    {
        id: 3,
        title: "Unchained",
        image: unchainedIcon,
        link: 'https://unchainedcrypto.com/'
    },
    {
        id: 4,
        title: "The Defiant",
        image: theDefiantIcon,
        link: 'https://thedefiant.io/podcasts'
    },
    {
        id: 5,
        title: "Hashing It Out",
        image: hashingItOutIcon,
        link: 'https://www.buzzsprout.com/2096415'
    },
    {
        id: 6,
        title: "Blockbytes",
        image: blockbytesIcon,
        link: 'https://www.youtube.com/@Blockbytes_/videos'
    },
];

function Community() {
    const [allCommunityData, setAllCommunityData] = useState<any>()
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)
    const [isCustome, setIisCustome] = useState(false)
    const [totalNumberOfLatestRecords, setTotalNumberOfLatestRecords] = useState(0)

    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (pathname === "/") {
            getAllCommunityLinkData()
        }
    }, [pathname])
    const nav = useNavigate()
    const getAllCommunityLinkData = async () => {
        try {
            setIsLoading(true)
            await getAllCommunityLink(0, 4)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let data = res?.data?.data || [];
                        const convertedData = data.slice(0, 4)
                        setTotalNumberOfLatestRecords(res?.data?.meta?.pagination?.total || 0)
                        setAllCommunityData(convertedData)
                        setIsLoading(false)
                    }
                }).catch((err: any) => {
                    toast.error(err?.response?.data?.error?.message)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            return { error: err?.response?.data };
        }
    };

    const MyLoader = () => (
        <>
          <ContentLoader height={50} width={"100%"}>
            <rect y="0" ry="3" width="200" height="25" />
          </ContentLoader>
          <Row>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
          </Row>
        </>
    )

    useEffect(() => {
        setTimeout(() => {
            setIisCustome(true)
        }, 2000);
    }, [])

    return (
        <>
            {isLoading ?
                <>
                    <ContentLoader height={50} width={"100%"}>
                        <rect y="0" ry="3" width="200" height="25" />
                    </ContentLoader>
                    <ContentLoader
                        height={140}
                        speed={1}
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                        <rect x="90" y="17" rx="4" ry="4" width="100%" height="8" />
                        <rect x="90" y="40" rx="3" ry="3" width="100%" height="8" />
                    </ContentLoader>
                    <ContentLoader
                        height={140}
                        speed={1}
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                        <rect x="90" y="17" rx="4" ry="4" width="100%" height="8" />
                        <rect x="90" y="40" rx="3" ry="3" width="100%" height="8" />
                    </ContentLoader>
                    <ContentLoader
                        height={140}
                        speed={1}
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                        <rect x="90" y="17" rx="4" ry="4" width="100%" height="8" />
                        <rect x="90" y="40" rx="3" ry="3" width="100%" height="8" />
                    </ContentLoader>
                    <ContentLoader
                        height={140}
                        speed={1}
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                        <rect x="90" y="17" rx="4" ry="4" width="100%" height="8" />
                        <rect x="90" y="40" rx="3" ry="3" width="100%" height="8" />
                    </ContentLoader>
                </> :
                <>
                    {pathname === "/" &&
                        <div className="community-section">
                            <div className="section-heading">
                                <h2 className='heading-2'>Community</h2>
                            </div>
                            {allCommunityData && allCommunityData?.map((item: any, i: any) => (
                                <Link to="" onClick={() => { item?.attributes?.link?.link && window.open(item?.attributes?.link?.link, '_blank') }} className="crypto-card community-card" key={i}>
                                    <div className="card-image">
                                        <img src={item?.attributes?.link?.image} alt="" className='img-fluid' />
                                    </div>
                                    <div className="card-content w-100">
                                        {/* <div className="content-heading">
                                    <p className='medium fw-500'></p>
                                    <div className='d-flex'>
                                        <Button className='default-button bg-color-primary small'>Defi</Button>
                                    </div>
                                </div> */}
                                        {/* <hr /> */}
                                        <h5 className="heading-5">{item?.attributes?.link?.title}</h5>
                                        <div className="by-date">
                                            <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user?.name || item?.attributes?.link?.user?.username || "unknown "}</span></p>
                                            <p className='article-date small fw-500'>{moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {allCommunityData && allCommunityData.length > 4 ?
                                <div className="creator-cards top-creators bg-transparent">
                                    <div className="creator-all-btn">
                                        <Button onClick={() => { nav("/allcategory/communities") }}><div className='btn-div'>View All Community</div></Button>
                                    </div>
                                </div> : ""}
                        </div>
                    }
                    <ToastContainer />
                </>
            }
            {isCustome ?
                <>
                    {pathname === "/news" &&
                        <div className="community-section">
                            <div className="section-heading">
                                <h2 className='heading-2'>Top Creators</h2>
                            </div>
                            <div className="creator-cards card-before top-creators">
                                <Row>
                                    {topnews && topnews.map((item: any, i: any) => (
                                        <Col lg={6} md={4} xs={6} key={i}>
                                            <div className="ecosystem-card" role="button" onClick={() => { item.link && window.location.replace(item.link) }}>
                                                <div className="card-image text-center">
                                                    <img src={item.image} alt="Card Image" className='img-fluid mx-auto' />
                                                </div>
                                                <div className="card-content">
                                                    <h6 className='text-center mt-lg-4 mt-md-3 mt-2 heading-6'>{item.title}</h6>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                {topnews && topnews.length > 6 ?
                                    <div className="creator-cards top-creators bg-transparent">
                                        <div className="creator-all-btn">
                                            <Button onClick={() => { nav("/allcreator") }}><div className='btn-div'>View All Community</div></Button>
                                        </div>
                                    </div> : ""}
                            </div>
                        </div>
                    }
                    {pathname === "/podcasts" &&
                        <div className="community-section">
                            <div className="section-heading">
                                <h2 className='heading-2'>Top Creators</h2>
                            </div>
                            <div className="creator-cards card-before top-creators">
                                <Row>
                                    {toppodcast && toppodcast.map((item: any, i: any) => (
                                        <Col lg={6} md={4} xs={6} key={i}>
                                            <div className="ecosystem-card" role="button" onClick={() => { item.link && window.location.replace(item.link) }}>
                                                <div className="card-image text-center">
                                                    <img src={item.image} alt="Card Image" className='img-fluid mx-auto' />
                                                </div>
                                                <div className="card-content">
                                                    <h6 className='text-center mt-lg-4 mt-md-3 mt-2 heading-6'>{item.title}</h6>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            {toppodcast && toppodcast.length > 6 ?
                                <div className="creator-cards top-creators bg-transparent">
                                    <div className="creator-all-btn">
                                        <Button onClick={() => { nav("/allcreator") }}><div className='btn-div'>View All Community</div></Button>
                                    </div>
                                </div> : ""}
                        </div>
                    }
                </> :
                MyLoader()
            }
        </>
    );
}

export default Community;
