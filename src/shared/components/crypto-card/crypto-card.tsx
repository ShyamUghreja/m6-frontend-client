import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import '../crypto-card/crypto-card.sass';
import HeroImg from '../../../assets/images/hero-img.webp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllCategorys, getAllCommunityLink, getHomeData, getNewsData, getPodcastsData, getcommunitydata } from '../../../pages/API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import newsIcon from '../../../assets/icons/categories/page/news.svg';
import podcastsIcon from '../../../assets/icons/categories/page/podcasts.svg';
import researchIcon from '../../../assets/icons/categories/page/research.svg';
import communityIcon from '../../../assets/icons/categories/page/community.svg';
import parse, { attributesToProps, HTMLReactParserOptions } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import ContentLoader from 'react-content-loader';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

function CryptoCard() {
    const [allCategory, setAllCategory] = useState([])
    const [categoryArticles, setCategoryArticles] = useState<any>([])
    const [categoryName, setCategoryName] = useState<any>()
    const params = useParams<{ subid: any }>();
    const location = useLocation();
    const pathname = location.pathname;
    const splitLocation = pathname.split("/");

    const nav = useNavigate();
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)
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


    const getAllCategorysData = async () => {
        try {
            setIsLoading(true)
            await getAllCategorys()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setAllCategory(res?.data?.data || [])
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

    const getLatestNewsData = async (category: string, type: string) => {
        try {
            setIsLoading(true)
            await getNewsData(0, 6, "Category", false, false, "", "", category, type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setCategoryArticles(allArticle)
                        setIsLoading(false)
                    }
                }).catch((err: any) => {
                    toast.error(err)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            return { error: err?.res?.data };
        }
    };

    const getLatestHomeData = async (category: string, type: string) => {
        try {
            setIsLoading(true)
            await getHomeData(0, 6, "Category", false, false, "", category, type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setCategoryArticles(allArticle)
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

    const getLatestPodcastData = async (category: string) => {
        try {
            setIsLoading(true)
            await getPodcastsData(0, 6, "Category", false, false, "", category)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setCategoryArticles(allArticle)
                        setIsLoading(false)
                    }
                }).catch((err: any) => {
                    toast.error(err?.response?.data?.error?.messagerr)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            return { error: err?.res?.data };
        }
    };

    const getAllCommunityLinkData = async (categorySlug: string) => {
        try {
            setIsLoading(true)
            await getAllCommunityLink(0, 4, categorySlug)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let data = res?.data?.data || [];
                        setCategoryArticles(data)
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

    const getcommunitydataFromBackend = async (categoryName: string, webMedium: string) => {
        try {
            setIsLoading(true)
            await getcommunitydata(0, 5, categoryName, webMedium)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || [];
                        setCategoryArticles(allArticle)
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

    useEffect(() => {
        getAllCategorysData()
    }, []);

    useEffect(() => {
        var categorie = allCategory.find((item: any) => item.id == params.subid);
        setCategoryName(categorie || "")
    });

    useEffect(() => {
        if (categoryName) {
            if (splitLocation[2] === "home") {
                getLatestHomeData(categoryName?.attributes?.slug, "home")
            } else if (splitLocation[2] === "research") {
                getLatestNewsData(categoryName?.attributes?.slug, "research")
            } else if (splitLocation[2] === "education") {
                getcommunitydataFromBackend(categoryName?.attributes?.slug, "education")
            } else if (splitLocation[2] === "news") {
                getLatestNewsData(categoryName?.attributes?.slug, "news")
            } else if (splitLocation[2] === "podcasts") {
                getLatestPodcastData(categoryName?.attributes?.slug)
            } else if (splitLocation[2] === "community") {
                getAllCommunityLinkData(categoryName?.attributes?.slug)
            }
        }
    }, [categoryName])


    const MyLoader = () => (
        <Row>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} backgroundColor="#f0f0f0"
                    foregroundColor="#dedede" >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} backgroundColor="#f0f0f0"
                    foregroundColor="#dedede" >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} backgroundColor="#f0f0f0"
                    foregroundColor="#dedede" >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
            <Col lg={3} md={6} xs={12}>
                <ContentLoader height={300} width={"100%"} backgroundColor="#f0f0f0"
                    foregroundColor="#dedede" >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
                    <rect x="0" y="169" rx="0" ry="0" width="100%" height="15" />
                    <rect x="0" y="201" rx="0" ry="0" width="140" height="15" />
                </ContentLoader>
            </Col>
        </Row>
    )

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
        <>
            {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
            <section className='treding-month'>
                <Container>
                    <div className="color-trending">
                        <Tab.Container id="left-tabs-example1" defaultActiveKey={
                            splitLocation[2] === "home" ? "research" :
                                splitLocation[2] === "research" ? "research" :
                                    splitLocation[2] === "education" ? "education" :
                                        splitLocation[2] === "news" ? "news" :
                                            splitLocation[2] === "podcasts" ? "podcasts" :
                                                splitLocation[2] === "community" ? "community" : ""
                        }>
                            {/* <div className="section-heading">
                                <div className="text-center d-block">
                                    <h2 className="heading-2">{categoryName?.attributes?.name} Related Articles</h2>
                                </div>
                            </div> */}
                            <Nav variant="pills" className="curated-buttons justify-content-lg-center mb-3 mb-lg-5 mb-md-4">
                                {/* <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getLatestHomeData(categoryName?.attributes?.slug, "home");
                                }}>
                                    <Nav.Link eventKey="articles"><img src={researchIcon} className="img-fluid" alt="" /><span className='button-name'>Articles</span></Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getLatestNewsData(categoryName?.attributes?.slug, "research");
                                }}>
                                    <Nav.Link eventKey="research"><img src={researchIcon} className="img-fluid" alt="" /><span className='button-name'>Research</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getcommunitydataFromBackend(categoryName?.attributes?.slug, "education");
                                }}>
                                    <Nav.Link eventKey="education"><img src={researchIcon} className="img-fluid" alt="" /><span className='button-name'>Education</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getLatestNewsData(categoryName?.attributes?.slug, "news")
                                }}>
                                    <Nav.Link eventKey="news"><img src={newsIcon} className="img-fluid" alt="" /><span className='button-name'>News</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getLatestPodcastData(categoryName?.attributes?.slug)
                                }} >
                                    <Nav.Link eventKey="podcasts"><img src={podcastsIcon} className="img-fluid" alt="" /> <span className='button-name'>Podcast</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => {
                                    setCategoryArticles([]);
                                    getAllCommunityLinkData(categoryName?.attributes?.slug)
                                }} >
                                    <Nav.Link eventKey="community"><img src={communityIcon} className="img-fluid" alt="" /> <span className='button-name'>Community</span></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="articles">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button" onClick={() => { nav(`/article/${item?.attributes?.slug}`) }}>
                                                        <div className="crypto-card">
                                                            <div className="card-image">
                                                                <img src={item?.attributes.bannerImage && item?.attributes.bannerImage[0]?.url || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading justify-content-end">
                                                                    <div className='d-flex'>
                                                                        {item?.attributes?.categories ? item?.attributes?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary small'>{item.name}</Button>
                                                                        )) : <Button className='default-button bg-color-primary small'>No categories available</Button>}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className='mb-2 heading-6'>{item?.attributes?.heading && item?.attributes?.heading || "No heading available"}</h6>
                                                                {/* <p className='medium fw-500'>{item?.attributes?.subHeading && item?.attributes?.subHeading || "No Sub-Heading Available"}</p> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{toTitleCase(item?.attributes?.author) || "Unknown"}</span></p>
                                                                    <p className='article-date small fw-500'>{moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="research">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button" onClick={() => { item?.attributes?.source && item?.attributes?.source === "article" ? nav(`/article/${item?.attributes?.slug}`) : nav(`/news-post/${item?.attributes?.slug}`) }}>
                                                        <div className="crypto-card trending-crypto">
                                                            <div className="card-image">
                                                                <img src={item?.attributes?.source && item?.attributes?.source === "article" ? item?.attributes?.bannerImage && item?.attributes?.bannerImage[0]?.url || HeroImg : item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading justify-content-end">
                                                                    <div className='d-flex'>
                                                                        {item?.attributes?.categories ? item?.attributes?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                        )) :
                                                                            <Button key={i} className='default-button bg-color-primary medium'>No tag available</Button>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className="heading-6">{item?.attributes?.source && item?.attributes?.source === "article" ? item?.attributes?.heading || "No heading available" : item?.attributes?.title || "No title available"}</h6>
                                                                {/* <p className='medium fw-500 mt-2'>{item?.attributes?.source && item?.attributes?.source === "article" ? item?.attributes?.subHeading || "No sub heading available" : item?.attributes?.subtitle || "No sub title available"}</p> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.source && item?.attributes?.source === "article" ? toTitleCase(item?.attributes?.author) || "Unknown" : item?.attributes?.authors && toTitleCase(item?.attributes?.authors[0]) || "Unknown"}</span></p>
                                                                    <p className='article-date small fw-500'>{item?.attributes?.source && item?.attributes?.source === "article" ? moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") : moment.unix(Number(item?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="education">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button" onClick={() => { nav(`/news-post/${item?.attributes?.slug}`) }}>
                                                        <div className="crypto-card trending-crypto">
                                                            <div className="card-image">
                                                                <img src={item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading">

                                                                    <div className='d-flex'>
                                                                        {item?.attributes?.categories && item?.attributes?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className='mb-2 heading-6'>{item?.attributes?.title || "No title available"}</h6>
                                                                {/* <p className='medium fw-500'>{item?.attributes?.subtitle || "No sub title available"}</p> */}
                                                                {/* <p className="normal">{item?.attributes?.previewText}</p> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.authors && toTitleCase(item?.attributes?.authors[0]) || "Unknown"}</span></p>
                                                                    <p className='article-date small fw-500'>{moment.unix(Number(item?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="news">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button" onClick={() => { nav(`/news-post/${item?.attributes?.slug}`) }}>
                                                        <div className="crypto-card trending-crypto">
                                                            <div className="card-image">
                                                                <img src={item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading">

                                                                    <div className='d-flex'>
                                                                        {item?.attributes?.categories && item?.attributes?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className='mb-2 heading-6'>{item?.attributes?.title || "No title available"}</h6>
                                                                {/* <p className='medium fw-500'>{item?.attributes?.subtitle || "No sub title available"}</p> */}
                                                                {/* <p className="normal">{item?.attributes?.previewText}</p> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.authors && toTitleCase(item?.attributes?.authors[0]) || "Unknown"}</span></p>
                                                                    <p className='article-date small fw-500'>{moment.unix(Number(item?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="podcasts">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button" onClick={() => { nav(`/podcastsdetails/${item?.attributes?.slug}`) }}>
                                                        <div className="crypto-card trending-crypto">
                                                            <div className="card-image">
                                                                <img src={item?.attributes?.imageLink && item?.attributes?.imageLink || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="content-heading justify-content-end">
                                                                    {/* <p className='medium fw-500'>{item?.attributes?.subtitle}</p> */}
                                                                    <div className='d-flex'>
                                                                        {item?.attributes?.categories && item?.attributes?.categories.map((item: any, i: number) => (
                                                                            <Button key={i} className='default-button bg-color-primary medium'>{item.name}</Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h6 className='mb-2 heading-6'>{item?.attributes?.title}</h6>
                                                                {/* <div className='desctiption small fw-500 mt-2'>{item?.attributes?.description ? parse(item?.attributes?.description, options) : "No description available"}</div> */}
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{toTitleCase(item?.attributes?.author)}</span></p>
                                                                    {item?.attributes?.publishDate &&
                                                                        <p className='article-date small fw-500'>{moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                                                    }
                                                                    {/* <p className='date small fw-500'>{!item?.attributes?.publishDate &&
                                                                "Jan 30 2023"
                                                            }</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="community">
                                    <Row>
                                        {isLoading ?
                                            MyLoader() :
                                            <>
                                                {categoryArticles &&
                                                    categoryArticles?.length <= 0 &&
                                                    <h4 className='text-center my-3 heading-4'>No data available</h4>
                                                }
                                                {categoryArticles && categoryArticles.map((item: any, i: number) => (
                                                    <Col lg={4} md={6} xs={12} key={i} role="button">
                                                        {/* <a href={item?.attributes?.link?.link} className="crypto-card trending-crypto" key={i} target="_blank">
                                                    <div className="card-image">
                                                        <img src={item?.attributes?.link?.image} alt="" className='img-fluid' />
                                                    </div>
                                                    <div className="card-content w-100">
                                                        <div className="content-heading">
                                                            <p className='medium fw-500'></p>
                                                            <div className='d-flex'>
                                                                <Button className='default-button bg-color-primary small'>Defi</Button>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <h5 className="heading-5">{item?.attributes?.link?.title}</h5>
                                                        <div className="by-date">
                                                            <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user?.name || item?.attributes?.link?.user?.username || "unknown "}</span></p>
                                                            <p className='date small fw-500'>{moment(item?.attributes?.publishedAt).format("MMM DD, YYYY")}</p>
                                                        </div>
                                                    </div>
                                                </a> */}
                                                        <div className="crypto-card trending-crypto" onClick={() => window.open(item?.attributes?.link?.link, "_blank")}>
                                                            <div className="card-image">
                                                                <img src={item?.attributes?.link?.image && item?.attributes?.link?.image || HeroImg} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="card-content">
                                                                <h6 className="heading-6">{item?.attributes?.link?.title || "No title available"}</h6>
                                                                <div className="by-date">
                                                                    <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.link?.user && item?.attributes?.link?.user?.name || "Unknown"}</span></p>
                                                                    <p className='article-date small fw-500'>{item?.attributes?.link?.createdAt ? moment(item?.attributes?.link?.createdAt).format("MMM DD, YYYY") : "Mar 30, 2023"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </>
                                        }
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Container>
            </section>
            <ToastContainer />

        </>
    );
}

export default CryptoCard;
