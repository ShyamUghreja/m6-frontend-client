import React, { useEffect, useState } from 'react';
import HeroImg from '../../../assets/images/hero-img.webp';
import { Button, Col, Row } from 'react-bootstrap';
import '../lab-research/lab-research.sass';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";

interface createModalProps {
    sectionWeb3Data: any
}

function LabResearch({ sectionWeb3Data }: createModalProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const nav = useNavigate()
    console.log("sectionWeb3Data", sectionWeb3Data)

    function toTitleCase(str: any) {
        if (str != undefined && str != "") {
            return str.replace(
                /\w\S*/g,
                function (txt: any) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }
    return (
        <div className="lab-reaserch">
            {pathname === "/research" &&
                <>
                    <Row>
                        {sectionWeb3Data &&
                            sectionWeb3Data?.length == 0 &&
                            <h4 className='text-center my-3 heading-4'>No data available</h4>
                        }
                        {sectionWeb3Data && sectionWeb3Data.map((item: any, i: number) => (
                            <Col lg={3} md={6} xs={12} key={i}>
                                <div className="crypto-card" role='button' onClick={() => { item?.source === "article" ? item?.slug && nav(`/article/${item?.slug}`) : item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) }}>
                                    <div className="card-image">
                                        <img src={item?.source && item?.image || HeroImg} alt="" className='img-fluid' />
                                    </div>
                                    <div className="card-content">
                                        <div className="content-heading justify-content-end">
                                            <div className='d-flex '>
                                                { item?.source === "article" ? item?.categories?.length != 0 && 
                                                    item?.categories.map((category: any, i: number) => (
                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name}</Button>
                                                    )) : item?.attributes?.categories?.length != 0 ? 
                                                    item?.attributes?.categories.map((category: any, i: number) => (
                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name}</Button>
                                                    )) :
                                                    <Button key={i} className='default-button bg-color-primary small'>No categories available</Button>
                                                }
                                            </div>
                                        </div>
                                        <hr className='' />
                                        <h6 className="heading-6">{item?.title && item?.title || "No title available"}</h6>
                                        {/* <p className='fw-500 small mt-3'>{item?.attributes?.source && item?.attributes?.source === "article" ? item?.attributes?.subHeading && item?.attributes?.subHeading || "No sub heading available" : item?.attributes?.subtitle && item?.attributes?.subtitle || "No sub title available"}</p> */}
                                        <div className="by-date">
                                            <p className='by-them small'>by <span className='fw-600'>{item?.authors && toTitleCase(item?.authors) || "Unknown"}</span></p>
                                            <p className='article-date small fw-500'>{item?.source && item?.source === "article" ? item?.date && moment(item?.date).format("MMM DD, YYYY") || "Mar 30, 2023" : item?.date && moment.unix(Number(item?.date)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}

                    </Row>

                </>
            }
            {pathname === "/news" &&
                <>
                    <Row>
                        {sectionWeb3Data &&
                            sectionWeb3Data?.length == 0 &&
                            <h4 className='text-center my-3 heading-4'>No data available</h4>
                        }
                        {sectionWeb3Data && sectionWeb3Data.map((item: any, i: number) => (
                            <Col lg={3} md={6} xs={12} key={i}>
                                <div className="crypto-card" role='button' onClick={() => {
                                    item.type == "cms" ?
                                    item?.slug && nav(`/news-post/${item?.slug}`) : item.link && window.open(item.link, "_blank")
                                }}>
                                    <div className="card-image">
                                        <img src={item?.image || HeroImg} alt="" className='img-fluid' />
                                    </div>
                                    <div className="card-content">
                                        <div className="content-heading justify-content-end">
                                            <div className='d-flex'>
                                                {Array.isArray(item?.categories) ?
                                                    item?.categories.map((category: any, i: number) => (
                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name || "No categories available"}</Button>
                                                    )) :
                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.categories || "No categories available"}</Button>
                                                }
                                            </div>
                                        </div>
                                        <hr className='' />
                                        {item?.title &&
                                            <h6 className="heading-6">{item?.title && item?.title || "No title available"}</h6>
                                        }
                                        <div className="by-date">
                                            <p className='by-them small'>by <span className='fw-600'>{item?.authors && item?.authors || "Unknown"}</span></p>
                                            <p className='article-date small fw-500'>{item?.date &&
                                                item.type == "cms" ?
                                                moment.unix(Number(item?.date)).format("MMM DD, YYYY") || "Mar 30, 2023" : moment(item?.date).format("MMM DD, YYYY") || "Mar 30, 2023"
                                            }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            }
            {pathname === "/podcasts" &&
                <>
                    <Row>
                        {sectionWeb3Data &&
                            sectionWeb3Data?.length == 0 &&
                            <h4 className='text-center my-3 heading-4'>No data available</h4>
                        }
                        {sectionWeb3Data && sectionWeb3Data.map((item: any, i: number) => (
                            <Col lg={3} md={6} xs={12} key={i} role='button' onClick={() => {
                                item.type == "cms" ?
                                item?.slug && nav(`/podcastsdetails/${item?.slug}`) : item.link && window.open(item.link, "_blank")
                            }}>
                                <div className="crypto-card">
                                    <div className="card-image">
                                        <img src={item?.image || HeroImg} alt="" className='img-fluid' />
                                    </div>
                                    <div className="card-content">
                                        <div className="content-heading justify-content-end">
                                            <div className='d-flex'>
                                                {Array.isArray(item?.categories) && item?.categories.length > 0 ?
                                                    item?.categories && item?.categories.map((category: any, i: number) => (
                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name ? category?.name : "No categories available"}</Button>
                                                    )) : item?.categories ?
                                                        <Button key={i} className='default-button bg-color-primary small'>{item?.categories.length > 0 ? item?.categories : "No categories available"}</Button> :
                                                        <Button key={i} className='default-button bg-color-primary small'>No categories available</Button>
                                                }
                                            </div>
                                        </div>
                                        <hr className='' />
                                        {item?.title && <h6 className="heading-6">{item?.title && item?.title || "No title available"}</h6>}
                                        <div className="by-date">
                                            <p className='by-them small'>by <span className='fw-600'>{item?.authors && item?.authors || "Unknown"}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            }

            {pathname === "/education" &&
                <>
                    <Row>
                        {sectionWeb3Data &&
                            sectionWeb3Data?.length == 0 &&
                            <h4 className='text-center my-3 heading-4'>No data available</h4>
                        }
                        {sectionWeb3Data && sectionWeb3Data.map((item: any, i: number) => (
                            <Col lg={3} md={6} xs={12} key={i} role='button' onClick={() => { item.link && window.open(item.link, "_blank") }}>
                                <div className="crypto-card">
                                    <div className="card-image">
                                        <img src={item?.image || HeroImg} alt="" className='img-fluid' />
                                    </div>
                                    <div className="card-content">
                                        <div className="content-heading justify-content-end">
                                            <div className='d-flex'>
                                                {Array.isArray(item?.categories) && item?.categories.length > 0 ?
                                                    item?.categories && item?.categories.map((category: any, i: number) => (
                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name ? category?.name : "No categories available"}</Button>
                                                    )) : item?.categories ?
                                                        <Button key={i} className='default-button bg-color-primary small'>{item?.categories.length > 0 ? item?.categories : "No categories available"}</Button> :
                                                        <Button key={i} className='default-button bg-color-primary small'>No categories available</Button>
                                                }
                                            </div>
                                        </div>
                                        <hr className='' />
                                        {item?.title && <h6 className="heading-6">{item?.title && item?.title || "No title available"}</h6>}
                                        <div className="by-date">
                                            <p className='by-them small'>by <span className='fw-600'>{item?.authors && item?.authors || "Unknown"}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            }
        </div>
    );
}

export default LabResearch;
