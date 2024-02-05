import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "./all-category.sass"
import HeroImg from "../../assets/images/hero-img.webp";
import { toast } from 'react-toastify';
import { getAllCommunityLink, getHomeData, getNewsData, getPodcastsData, getcommunitydata } from '../API/ApiCall';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import parse, { attributesToProps, HTMLReactParserOptions } from "html-react-parser";
import { Element } from "domhandler/lib/node";

const Allcategory = () => {
    const [allArtilcles, setAllArtilcles] = useState<any>()
    const [totalBlogLength, setTotalBlogLength] = useState(0)
    // const [startingCounter, setStartingCounter] = useState(0)
    const startingCounter = useRef(0);
    const [totalArticle, setTotalArticle] = useState<any>(0)
    const totalArticleCounter = useRef(0);  // null is initial value
    const [isRegularDataOver, setIsRegularDataOver] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const nav = useNavigate();
    const params = useParams<{ id: any }>();

    let apiRequestDataSetLimit = 25

    const pathname = location.pathname;
    const splitLocation = pathname.split("/");

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

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (
                domNode instanceof Element &&
                domNode.attribs &&
                domNode.name === "main"
            ) {
                const props = attributesToProps(domNode.attribs);
                return <div {...props} />;
            }
        }
    };

    const getAllNewsData = async (skipDataValue: number, opType: string, category: string, type: string) => {
        try {
            setIsLoading(true)
            await getNewsData(skipDataValue, apiRequestDataSetLimit, (opType === "All") ? "Latest" : "Category", false, false, "" , "", (opType === "All") ? "" : category, type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        setTotalBlogLength(Number(totalDataSet));
                        setAllArtilcles((prev: any) => [...prev, ...allArticle])
                        setTotalArticle(totalArticle + allArticle.length)
                        totalArticleCounter.current = Number(totalArticleCounter.current) + Number(allArticle.length)
                        if (Number(totalArticleCounter.current) == Number(totalDataSet)) {
                            console.log("Call Community API")
                            setIsRegularDataOver(true)
                            startingCounter.current = 0
                            await getcommunitydataFromBackend(startingCounter.current, opType, category, type)
                        }
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
            return { error: err?.res?.data };
        }
    };

    const getAllHomeData = async (skipDataValue: number, type: string) => {
        try {
            setIsLoading(true)
            await getHomeData(skipDataValue, apiRequestDataSetLimit, "Latest", false, false, "", "", type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        setTotalBlogLength(Number(totalDataSet));
                        setIsLoading(false)

                        setAllArtilcles((prev: any) => [...prev, ...allArticle])
                        setTotalArticle(totalArticle + allArticle.length)
                        totalArticleCounter.current = Number(totalArticleCounter.current) + Number(allArticle.length)
                    }
                }).catch((err: any) => {
                    toast.error(err?.response?.data?.error?.message)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            return { error: err?.res?.data };
        }
    };

    const getAllPodcastsData = async (skipDataValue: number, opType: string, wbSection: string) => {
        try {
            setIsLoading(true)
            await getPodcastsData(skipDataValue, apiRequestDataSetLimit, (opType === "All") ? "Latest" : "Category", false, false, "", (opType === "All") ? "" : wbSection, "")
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        console.log("allArticle.lengthallArticle.length", allArticle.length)
                        setTotalBlogLength(Number(totalDataSet));
                        setAllArtilcles((prev: any) => [...prev, ...allArticle])
                        setTotalArticle(totalArticle + allArticle.length)
                        totalArticleCounter.current = Number(totalArticleCounter.current) + Number(allArticle.length)
                        if (Number(totalArticleCounter.current) == Number(totalDataSet)) {
                            console.log("Call Community API")
                            setIsRegularDataOver(true)
                            startingCounter.current = 0
                            await getcommunitydataFromBackend(startingCounter.current, opType, wbSection, "podcasts")
                        }
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
            return { error: err?.res?.data };
        }
    };

    const getAllCommunitiesData = async (skipDataValue: number) => {
        try {
            setIsLoading(true)
            await getAllCommunityLink(skipDataValue, apiRequestDataSetLimit)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        setTotalBlogLength(Number(totalDataSet));
                        setAllArtilcles((prev: any) => [...prev, ...allArticle])
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
            return { error: err?.res?.data };
        }
    };

    const getcommunitydataFromBackend = async (skipDataValue: number, opType: string, category: string, type: string) => {
        try {
            setIsLoading(true)
            await getcommunitydata(skipDataValue, apiRequestDataSetLimit, (opType === "All") ? "" : category, type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || [];
                        setAllArtilcles((prev: any) => [...prev, ...allArticle])
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        setTotalBlogLength(totalBlogLength + Number(totalDataSet))
                        setTotalArticle(totalArticle + allArticle.length)
                        totalArticleCounter.current = Number(totalArticleCounter.current) + Number(allArticle.length)
                        console.log("totalArticleCounter API Community", totalArticleCounter.current)
                    }
                }).catch((err: any) => {
                    toast.error(err?.response?.data?.error?.message)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            return { error: err?.res?.data };
        }
    };

    useEffect(() => {
        setAllArtilcles([])
        if (pathname === "/allcategory/article") {
            getAllHomeData(Number(startingCounter.current), "home")
        }
        else if (pathname === "/allcategory/research") {
            getAllNewsData(Number(startingCounter.current), "All", "", "research")
        } else if (pathname === `/allcategory/research/${params.id}`) {
            getAllNewsData(Number(startingCounter.current), "Category", params.id, "research")
        }
        else if (pathname === "/allcategory/news") {
            getAllNewsData(Number(startingCounter.current), "All", "", "news")
        } else if (pathname === `/allcategory/news/${params.id}`) {
            getAllNewsData(Number(startingCounter.current), "Category", params.id, "news")
        }
        else if (pathname === "/allcategory/podcasts") {
            getAllPodcastsData(Number(startingCounter.current), "All", "")
        } else if (pathname === `/allcategory/podcasts/${params.id}`) {
            getAllPodcastsData(Number(startingCounter.current), "Category", params.id)
        }
        else if (pathname === "/allcategory/communities") {
            getAllCommunitiesData(Number(startingCounter.current))
        }
    }, [location])

    const fetchdata = () => {
        setTimeout(async () => {
            //  home
            if (pathname === "/allcategory/article") {
                getAllHomeData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "home")
            }
            // research
            else if (pathname === "/allcategory/research") {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "", "research")
                } else {
                    getAllNewsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "", "research")
                }
            } else if (pathname === `/allcategory/research/${params.id}`) {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id, "research")
                } else {
                    getAllNewsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id, "research")
                }
            }
            // news
            else if (pathname === "/allcategory/news") {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "", "news")
                } else {
                    getAllNewsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "", "news")
                }
            } else if (pathname === `/allcategory/news/${params.id}`) {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id, "news")
                } else {
                    getAllNewsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id, "news")
                }
            }
            // podcasts
            else if (pathname === "/allcategory/podcasts") {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "", "podcasts")
                } else {
                    getAllPodcastsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "")
                }
                getAllPodcastsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "All", "")
            } else if (pathname === `/allcategory/podcasts/${params.id}`) {
                if (isRegularDataOver) {
                    console.log("Call Community API")
                    await getcommunitydataFromBackend(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id, "podcasts")
                } else {
                    getAllPodcastsData(Number(startingCounter.current) + Number(apiRequestDataSetLimit), "Category", params.id)
                }
            }
            // communities
            else if (pathname === "/allcategory/communities") {
                getAllCommunitiesData(Number(startingCounter.current) + Number(apiRequestDataSetLimit))
            }
            startingCounter.current = startingCounter.current + Number(apiRequestDataSetLimit)
        }, 1000);
    }

    return (
        <>
            <div>
                <Container>
                    <div className="padding-100">
                        <h2 className='mb-5 text-center heading-2'>
                            All {pathname === "/allcategory/article" ? "Article" :
                                pathname === "/allcategory/research" ? "Research" :
                                    pathname === "/allcategory/news" ? "News" :
                                        pathname === "/allcategory/podcasts" ? "Podcasts" :
                                            pathname === `/allcategory/research/${params.id}` ? toTitleCase(params.id) + " Research" :
                                                pathname === `/allcategory/news/${params.id}` ? toTitleCase(params.id) + " News" :
                                                    pathname === `/allcategory/podcasts/${params.id}` ? toTitleCase(params.id) + " Podcasts" :
                                                        pathname === "/allcategory/communities" ? "Communities" : ""
                            }
                        </h2>

                        {pathname === "/allcategory/article" &&
                            <Row>
                                {allArtilcles && allArtilcles.map((item: any, i: number) => (
                                    <Col lg={3} md={6} xs={12} key={i} className='mb-3'>
                                        <div className="crypto-card" role='button' onClick={() => { item?.attributes?.slug && nav(`/article/${item?.attributes?.slug}`) }}>
                                            <div className="card-image">
                                                <img src={item?.attributes?.bannerImage && item?.attributes?.bannerImage[0]?.url && item?.attributes?.bannerImage[0]?.url || HeroImg} alt="" className='img-fluid' />
                                            </div>
                                            <div className="card-content">
                                                <div className="content-heading justify-content-end">
                                                    <div className='d-flex'>
                                                        {item?.attributes?.categories?.length != 0 ? item?.attributes?.categories.map((item: any, i: number) => (
                                                            <Button key={i} className='default-button bg-color-primary small'>{item.name}</Button>
                                                        )) : <Button className='default-button bg-color-primary small'>No tag available</Button>}
                                                    </div>
                                                </div>
                                                <hr className='' />
                                                <h6 className="heading-6">{item?.attributes?.heading && item?.attributes?.heading || "No heading available"}</h6>
                                                {/* <p className='fw-500 mt-2'>{item?.attributes?.subHeading && item?.attributes?.subHeading || "No sub heading available"}</p> */}
                                                <div className="by-date">
                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.author && toTitleCase(item?.attributes?.author) || "Unknown"}</span></p>
                                                    <p className='article-date small fw-500'>{item?.attributes?.publishedAt && moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }

                        {(pathname === "/allcategory/research" || pathname === "/allcategory/research/web3" || pathname === "/allcategory/research/crypto" || pathname === "/allcategory/research/degen") &&
                            <Row>
                                {allArtilcles && allArtilcles.map((item: any, i: number) => (
                                    <Col lg={3} md={6} xs={12} key={i} className='mb-3'>
                                        <div className="crypto-card" role='button' onClick={() => {
                                            item?.attributes?.source ?
                                                item?.attributes?.source === "article" ? item?.attributes?.slug && nav(`/article/${item?.attributes?.slug}`) : item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) :
                                                window.open(item?.attributes?.link?.link, "_blank")
                                        }}>
                                            <div className="card-image">
                                                {item?.attributes?.source ?
                                                    <img src={item?.attributes?.bannerImage ? item?.attributes?.bannerImage[0]?.url : HeroImg} alt="" className='img-fluid' /> :
                                                    <img src={item?.attributes?.link?.image && item?.attributes?.link?.image || HeroImg} alt="" className='img-fluid' />
                                                }
                                            </div>
                                            <div className="card-content ">
                                                <div className="content-heading justify-content-end">
                                                    <div className='d-flex'>
                                                        {item?.attributes?.source ?
                                                            <>
                                                                {Array.isArray(item?.attributes?.categories) && item?.attributes?.categories?.length != 0 ?
                                                                    item?.attributes?.categories.map((category: any, i: number) => (
                                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name || "No categories available"}</Button>
                                                                    )) :
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.categories || "No categories available"}</Button>
                                                                }
                                                            </> :
                                                            <>
                                                                {item?.attributes?.link.category &&
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.attributes?.link.category?.name || "No categories available"}</Button>
                                                                }
                                                            </>
                                                        }
                                                        {/* {item?.attributes?.categories?.length != 0 ? item?.attributes?.categories.map((item: any, i: number) => (
                                                            <Button key={i} className='default-button bg-color-primary small'>{item.name}</Button>
                                                        )) : <Button className='default-button bg-color-primary small'>No categories available</Button>} */}
                                                    </div>
                                                </div>
                                                <hr className='' />
                                                {item?.attributes?.source ?
                                                    <h6 className="heading-6">{item?.attributes?.source === "article" ? item?.attributes?.heading && item?.attributes?.heading || "No heading available" : item?.attributes?.title && item?.attributes?.title || "No title available"}</h6> :
                                                    <h6 className="heading-6">{item?.attributes?.link?.title && item?.attributes?.link?.title || "No title available"}</h6>
                                                }
                                                {/* <p className='fw-500 mt-2'>{item?.attributes?.source === "article" ? item?.attributes?.subHeading && item?.attributes?.subHeading || "No sub heading available" : item?.attributes?.subtitle && item?.attributes?.subtitle || "No sub title available"}</p> */}
                                                <div className="by-date">
                                                    {item?.attributes?.source ?
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.source === "article" ? toTitleCase(item?.attributes?.author) || "Unknown" : item?.attributes?.authors && toTitleCase(item?.attributes?.authors[0]) || "Unknown"}</span></p> :
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user?.name && toTitleCase(item?.attributes?.link?.user?.name) || "Unknown"}</span></p>
                                                    }
                                                    {item?.attributes?.source ?
                                                        <p className='article-date small fw-500'>{item?.attributes?.source === "article" ? item?.attributes?.publishedAt && moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023" : item?.attributes?.created && moment.unix(Number(item?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p> :
                                                        <p className='article-date small fw-500'>{item?.attributes?.link?.createdAt && moment(item?.attributes?.link?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }

                        {(pathname === "/allcategory/news" || pathname === "/allcategory/news/web3" || pathname === "/allcategory/news/crypto" || pathname === "/allcategory/news/degen") &&
                            <Row>
                                {allArtilcles && allArtilcles.map((item: any, i: number) => (
                                    <Col lg={3} md={6} xs={12} key={i} className='mb-3'>
                                        <div className="crypto-card" role='button' onClick={() => {
                                            item?.attributes?.source ? item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) : item?.attributes?.link?.link && window.open(item?.attributes?.link?.link, "_blank")
                                        }}>
                                            <div className="card-image">
                                                {item?.attributes?.source ?
                                                    <img src={item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' /> :
                                                    <img src={item?.attributes?.link?.image && item?.attributes?.link?.image || HeroImg} alt="" className='img-fluid' />
                                                }
                                            </div>
                                            <div className="card-content">
                                                <div className="content-heading justify-content-end">
                                                    <div className='d-flex'>
                                                        {item?.attributes?.source ?
                                                            <>
                                                                {Array.isArray(item?.attributes?.categories) && item?.attributes?.categories?.length != 0 ?
                                                                    item?.attributes?.categories.map((category: any, i: number) => (
                                                                        <Button key={i} className='default-button bg-color-primary small'>{category?.name || "No categories available"}</Button>
                                                                    )) :
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.categories || "No categories available"}</Button>
                                                                }
                                                            </> :
                                                            <>
                                                                {item?.attributes?.link.category &&
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.attributes?.link.category?.name || "No categories available"}</Button>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <hr className='' />
                                                {item?.attributes?.source ?
                                                    <h6 className="heading-6">{item?.attributes?.title && item?.attributes?.title || "No title available"}</h6> :
                                                    <h6 className="heading-6">{item?.attributes?.link?.title && item?.attributes?.link?.title || "No title available"}</h6>
                                                }
                                                <div className="by-date">
                                                    {item?.attributes?.source ?
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.authors && toTitleCase(item?.attributes?.authors[0]) || "Unknown"}</span></p> :
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user?.name && toTitleCase(item?.attributes?.link?.user?.name) || "Unknown"}</span></p>
                                                    }
                                                    {item?.attributes?.source ?
                                                        <p className='article-date small fw-500'>{item?.attributes?.publishDate && moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p> :
                                                        <p className='article-date small fw-500'>{item?.attributes?.link?.createdAt && moment(item?.attributes?.link?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }
                        {(pathname === "/allcategory/podcasts" || pathname === "/allcategory/podcasts/web3" || pathname === "/allcategory/podcasts/crypto" || pathname === "/allcategory/podcasts/degen") &&
                            <Row>
                                {allArtilcles && allArtilcles.map((item: any, i: number) => (
                                    <Col lg={3} md={6} xs={12} key={i} className='mb-3'>
                                        <div className="crypto-card" role='button' onClick={() => {
                                            item?.attributes?.author ?
                                            item?.attributes?.slug && nav(`/podcastsdetails/${item?.attributes?.slug}`) :
                                            item?.attributes?.link?.link && window.open(item?.attributes?.link?.link, "_blank")
                                        }}>
                                            <div className="card-image">
                                                {item?.attributes?.author ?
                                                    <img src={item?.attributes?.imageLink && item?.attributes?.imageLink || HeroImg} alt="" className='img-fluid' /> :
                                                    <img src={item?.attributes?.link?.image && item?.attributes?.link?.image || HeroImg} alt="" className='img-fluid' />
                                                }
                                            </div>
                                            <div className="card-content">
                                                <div className="content-heading justify-content-end">
                                                    <div className='d-flex'>
                                                        {item?.attributes?.author ?
                                                            <>
                                                                {item?.attributes?.categories?.length != 0 ? item?.attributes?.categories.map((item: any, i: number) => (
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item.name}</Button>
                                                                )) : <Button className='default-button bg-color-primary small'>No categories available</Button>}
                                                            </> :
                                                            <>
                                                                {item?.attributes?.link.category &&
                                                                    <Button key={i} className='default-button bg-color-primary small'>{item?.attributes?.link.category?.name || "No categories available"}</Button>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <hr className='' />
                                                {item?.attributes?.author ?
                                                    <h6 className="heading-6">{item?.attributes?.title && item?.attributes?.title || "No title available"}</h6> :
                                                    <h6 className="heading-6">{item?.attributes?.link?.title && item?.attributes?.link?.title || "No title available"}</h6>
                                                }
                                                <div className="by-date">
                                                    {item?.attributes?.author ?
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.author && toTitleCase(item?.attributes?.author) || "Unknown"}</span></p> :
                                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user?.name && toTitleCase(item?.attributes?.link?.user?.name) || "Unknown"}</span></p>
                                                    }
                                                    {item?.attributes?.author ? "" :
                                                        <p className='article-date small fw-500'>{item?.attributes?.link?.createdAt && moment(item?.attributes?.link?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                    }
                                                </div>
                                                {/* <div className='desctiption small fw-500 mt-2'>{item?.attributes?.description ? parse(item?.attributes?.description, options) : "No description available"}</div> */}
                                                {/* 
                                                <p className='fw-500 mt-2'>{ }</p>
                                                <div className="by-date"> */}
                                                {/* <p className='by-them small'>by <span className='fw-600'>Russian Defi</span></p>
                                                    <p className='date small fw-500'>{moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY")}</p> */}
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }
                        {(pathname === "/allcategory/communities") &&
                            <Row>
                                {allArtilcles && allArtilcles.map((item: any, i: number) => (
                                    <Col lg={3} md={6} xs={12} key={i} className='mb-3'>
                                        <div className="crypto-card" role='button' onClick={() => item?.attributes?.link?.link && window.open(item?.attributes?.link?.link, "_blank")}>
                                            <div className="card-image">
                                                <img src={item?.attributes?.link?.image && item?.attributes?.link?.image || HeroImg} alt="" className='img-fluid' />
                                            </div>
                                            <div className="card-content">
                                                <h6 className="heading-6">{item?.attributes?.link?.title || "No title available"}</h6>
                                                <div className="by-date">
                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user && toTitleCase(item?.attributes?.link?.user?.name) || "Unknown"}</span></p>
                                                    <p className='article-date small fw-500'>{item?.attributes?.link?.createdAt ? moment(item?.attributes?.link?.createdAt).format("MMM DD, YYYY") : "Mar 30, 2023"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }

                        {allArtilcles &&
                            <InfiniteScroll
                                dataLength={allArtilcles?.length}
                                next={fetchdata}
                                hasMore={Number(allArtilcles?.length) >= Number(totalBlogLength) ? false : true}
                                loader={
                                    allArtilcles?.length < totalBlogLength ?
                                        <div className="text-center">
                                            Please Wait ...
                                        </div> :
                                        allArtilcles.length == 0 ?
                                            <div className="text-center">
                                                <h4 className='heading-4'>No data available</h4>
                                            </div>
                                            : ""
                                }
                                endMessage={
                                    allArtilcles?.length == 0 ?
                                        <div className="text-center">
                                            <h4 className='heading-4'>No data dvailable</h4>
                                        </div> :
                                        <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                }
                            >
                            </InfiniteScroll>
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Allcategory