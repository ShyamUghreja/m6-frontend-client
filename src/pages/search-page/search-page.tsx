import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import HeroImg from "../../assets/images/hero-img.webp";
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { getSearchData } from '../API/ApiCall';
import { toast } from 'react-toastify';
import ContentLoader from 'react-content-loader';


const Searchpage = () => {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    let params = useParams<{ id: any }>();

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

    const [allSearchArticles, setallSearchArticles] = useState<any>({})

    console.log("allSearchArticlesallSearchArticles", allSearchArticles)
    const getAllSearchData = async (searchtext: string) => {
        try {
            await getSearchData(searchtext)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        let arrayOfObjectsData : any = {}
                        allArticle && Object.keys(allArticle).map((key: any, i: any) => {
                            if(key === "articles" || key === "news") {
                                arrayOfObjectsData["articles"] = [...allArticle["articles"], ...allArticle["news"]]
                            }else{
                                arrayOfObjectsData[key] = allSearchArticles[key] || []
                            }
                        })
                        console.log("arrayOfObjectsData", arrayOfObjectsData);
                        
                        setallSearchArticles(arrayOfObjectsData)
                    }
                }).catch((err: any) => {
                    toast.error(err?.response?.data?.error?.message)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            return { error: err?.res?.data };
        }
    };

    useEffect(() => {
        if (params.id) {
            getAllSearchData(params.id)
        }
    }, [params])

    const MyLoader = () => (
        <Row>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
        </Row>
    )

    return (
        <div>
            {allSearchArticles && Object.keys(allSearchArticles).map((key: any, i: any) => (
                <section className='lab-research-section position-relative pt-lg-0 pt-md-4 pt-4' key={i} id={key?.toLowerCase()}>
                    <div className="padding-section pt-0">
                        <Container className='default-container'>
                            <div className="section-heading ">
                                <div className='d-flex align-item-center'>
                                    <h2 className='mb-3 color-primary heading-2'>All {toTitleCase(key)} </h2>
                                </div>
                                <hr />
                            </div>
                            {isLoading ?
                                MyLoader() :
                                <Row>
                                    {allSearchArticles &&
                                        allSearchArticles[key]?.length == 0 &&
                                        <h4 className='text-center my-3 heading-4'>No data available</h4>
                                    }
                                    {allSearchArticles && allSearchArticles[key].map((item: any, i: number) => (
                                        key?.toLowerCase() === "articles" ?
                                            <Col lg={3} md={6} xs={12} key={i} role='button' onClick={() => { item?.heading ? nav(`/article/${item?.slug}`) : nav(`/news-post/${item?.slug}`) }}>
                                                <div className="crypto-card">
                                                    <div className="card-image">
                                                        <img src={item?.bannerImage ? item?.bannerImage[0]?.url : item?.thumbnailUrl && item?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="content-heading justify-content-end">
                                                            <div className='d-flex'>
                                                                {item?.categories && item?.categories.length != 0 ? item?.categories.map((item: any, i: number) => (
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item.name}</Button>
                                                                )) : <Button className='default-button bg-color-primary small'>No categories available</Button>}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <h6 className='mb-2 heading-6'>{item?.heading ? item?.heading : item?.title ? item?.title : "No heading available"}</h6>
                                                        {/* <p className='medium fw-500'>{item??.subHeading && item??.subHeading || "No Sub-Heading Available"}</p> */}
                                                        <div className="by-date">
                                                            <p className='by-them small'>by <span className='fw-600'>{item?.author ? toTitleCase(item?.author) : item?.authors ? toTitleCase(item?.authors[0]) : item?.publication ? item?.publication?.name : "Unknown"}</span></p>
                                                            <p className='article-date small fw-500'>{item?.publishedAt ? moment(item?.publishedAt).format("MMM DD, YYYY") : item?.created ? moment.unix(Number(item?.created)).format("MMM DD, YYYY") : "Mar 30, 2023"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col> :
                                            key?.toLowerCase() === "news" ?
                                                <Col lg={3} md={6} xs={12} key={i} role='button' onClick={() => { item?.slug && nav(`/news-post/${item?.slug}`) }}>
                                                    <div className="crypto-card">
                                                        <div className="card-image">
                                                            <img src={item?.thumbnailUrl && item?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="content-heading">

                                                                <div className='d-flex'>
                                                                    {item?.categories && item?.categories.map((item: any, i: number) => (
                                                                        <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h6 className='mb-2 heading-6'>{item?.title || "No title available"}</h6>
                                                            {/* <p className='medium fw-500'>{item?.subtitle || "No sub title available"}</p> */}
                                                            {/* <p className="normal">{item?.previewText}</p> */}
                                                            <div className="by-date">
                                                                <p className='by-them small'>by <span className='fw-600'>{item?.authors && toTitleCase(item?.authors[0]) || "Unknown"}</span></p>
                                                                <p className='article-date small fw-500'>{item?.created && moment.unix(Number(item?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col> :
                                                key?.toLowerCase() === "podcasts" ?
                                                    <Col lg={3} md={6} xs={12} key={i} role='button' onClick={() => { item?.slug && nav(`/podcastsdetails/${item?.slug}`) }}>
                                                        <div className="crypto-card">
                                                            <div className="card-image">
                                                                <img src={item?.imageLink && item?.imageLink || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading">
                                                                    {/* <p className='medium fw-500'>{item?.subtitle}</p> */}
                                                                    <div className='d-flex'>
                                                                        {item?.categories && item?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className='mb-2 heading-6'>{item?.title}</h6>
                                                                {/* <div className='desctiption small fw-500 mt-2'>{item?.description ? parse(item?.description, options) : "No description available"}</div> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{toTitleCase(item?.author && item?.author || "Unknown")}</span></p>

                                                                    <p className='article-date small fw-500'>{item?.publishDate && moment.unix(Number(item?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>

                                                                    {/* <p className='date small fw-500'>{!item?.publishDate &&
                                                                "Jan 30 2023"
                                                            }</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col> : ""
                                    ))}
                                </Row>
                            }

                        </Container>
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Searchpage