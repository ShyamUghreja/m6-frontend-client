import React from 'react';
import { Button, Col } from 'react-bootstrap';
import '../trending-news/trending-news.sass';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import HeroImg from '../../../assets/images/hero-img.svg'

interface TrendingNewsModalProps {
    publicationsData: any
}

function TrendingNews({ publicationsData }: TrendingNewsModalProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const nav = useNavigate()

    function toTitleCase(str: any) {
        if (str != undefined && str != "") {
            return str.replace(/\w\S*/g, function (txt: any) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
            );
        }
    }

    return (
        <>
            {publicationsData && publicationsData.map((item: any, i: number) => (
                <Col lg={4} md={6} key={i}>
                    <div className="news-hero-card" >
                        <div className="section-heading">
                            <h2 className='heading-2'>{item.pubName}</h2>
                            {pathname === "/news" &&
                                <p className='large-height w-80'>{item.publicaitonDescription}</p>
                            }
                        </div>
                        <div className="hero-section-content" role='button' onClick={() => {
                            item?.publicationObj?.attributes?.slug &&
                                nav(`/news-post/${item?.publicationObj?.attributes?.slug}`)
                        }}>
                            <div className="hero-section-img">
                                <img src={item?.publicationObj?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                            </div>
                            <div className="text-part">
                                <div className="hero-heading justify-content-between">
                                    {/* <div className='sub-heading'>{item?.publicaitonName}</div> */}
                                    {/* <div className='d-flex'>
                                        {item?.publicationObj?.attributes?.categories &&
                                            item?.publicationObj?.attributes?.categories.map((category: any, i: number) => (
                                                <Button key={i} className='default-button medium bg-color-primary'>{category.length > 0 ? category?.name : "No tag available"}</Button>
                                            ))
                                        }
                                    </div> */}
                                </div>
                                <hr />
                                <h3 className='heading-3 heading-3'>{item?.publicationObj?.attributes?.title && item?.publicationObj?.attributes?.title || "No title available"}</h3>
                                <p className='sub-heading normal'>{item?.publicationObj?.attributes?.subtitle || "No sub title available"}</p>
                                <div className="by-date mb-0">
                                    <p className='by-them normal'>by
                                        <span> {item?.publicationObj?.attributes?.authors && toTitleCase(item?.publicationObj?.attributes?.authors[0]) || "Unknown"}</span>
                                    </p>
                                    <p className='article-date color-primary normal'>{item?.publicationObj?.attributes?.publishDate && moment.unix(Number(item?.publicationObj?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="news-content">
                            <div className="daily-newsletters">
                                {/* <div className='news-heading mb-3'>Sign Up For Our Daily Newsletter</div> */}
                                <>
                                    {item.publicaitonName === "renoded" ?
                                        <>
                                            <div className='news-heading mb-3'>Distributing the best Web3 content and resources</div>
                                            <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="58" frameBorder="0" scrolling="no" style={{ margin: 0, width: "100%", borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                        </> :
                                        item.publicaitonName === "m6-labs" ?
                                            <>
                                                <div className='news-heading mb-3'>Daily crypto news and industry analysis</div>
                                                <iframe src="https://embeds.beehiiv.com/8b6bb0e0-03ac-4a2f-883e-05f79b9eb14e?slim=true" data-test-id="beehiiv-embed" height="58" frameBorder="0" scrolling="no" style={{ margin: 0, width: "100%", borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                            </> :
                                            item.publicaitonName === "the-crypto-illuminati" ?
                                                <>
                                                    <div className='news-heading mb-3'>Curating the best content in crypto</div>
                                                    <iframe src="https://embeds.beehiiv.com/228313cb-e405-4a10-abaf-53e1a945993a?slim=true" data-test-id="beehiiv-embed" height="58" frameBorder="0" scrolling="no" style={{ margin: 0, width: "100%", borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                                </> : ""
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    );
}

export default TrendingNews;
