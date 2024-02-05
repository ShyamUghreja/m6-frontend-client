import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../feature/feature.sass'
import HeroImg from '../../../assets/images/hero-img.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getAllArticle, getPodcastsData, getNewsData, getHomeData } from '../../../pages/API/ApiCall';
import moment from 'moment';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import parse, { attributesToProps, HTMLReactParserOptions } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import LoaderComp from '../loader-component/loader-component';
import ContentLoader, { BulletList, Code } from 'react-content-loader';
const BASE_URL = process.env.REACT_APP_API_BASE_URL
function Feature() {
    const nav = useNavigate();
    const [academy, setAcademy] = useState<any>({})
    const [allArtilcles, setAllArtilcles] = useState<any>()
    const [featured, setFeatured] = useState(true)
    const [trending, setTrending] = useState(true)
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const pathname = location.pathname;

    console.log("allArtilclesallArtilcles", allArtilcles)
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

    const getFeaturedNewsData = async (type: string) => {
        try {
            setIsLoading(true)
            await getNewsData(0, 1, "Featured", true, false, "", "", "", type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setAllArtilcles(allArticle[0])
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

    const getFeaturedHomeData = async (type: string) => {
        try {
            setIsLoading(true)
            await getHomeData(0, 1, "Featured", true, false, "", "", type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        if (allArticle?.length > 0) {
                            setAllArtilcles(allArticle[0])
                        } else {
                            getFeaturedNewsData("research")
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

    const getFeaturedPodcastData = async () => {
        try {
            setIsLoading(true)
            await getPodcastsData(0, 1, "Featured", true, false, "")
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        console.log("allArticleallArticle", allArticle)
                        setAllArtilcles(allArticle[0])
                        setAcademy(allArticle[0]?.attributes)
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
        if (pathname === "/") {
            // getFeaturedHomeData("home")
            getFeaturedNewsData("research")
        } else if (pathname === "/research") {
            getFeaturedNewsData("research")
        } else if (pathname === "/news") {
            getFeaturedNewsData("news")
        } else if (pathname === "/podcasts") {
            getFeaturedPodcastData()
        }
    }, [pathname])

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
            {isLoading ?
                <>
                    <ContentLoader height={50} width={"100%"}>
                        <rect y="0" ry="3" width="200" height="25" />
                    </ContentLoader>
                    <ContentLoader
                        width={"100%"}
                        viewBox="0 0 450 320"
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
                        <rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
                        <rect x="0" y="0" rx="10" ry="10" width="100%" height="217" />
                    </ContentLoader>
                    <BulletList />
                </> :
                <>
                    {pathname === "/" &&
                        <>
                            {/* <div className="section-heading">
                                <h2 className='color-primary heading-2'>Featured</h2>
                            </div>
                            <div className="hero-section-content" role="button" onClick={() => { nav(`/article/${allArtilcles?.attributes?.slug}`) }}>
                                <div className="hero-section-img">
                                    <img src={allArtilcles?.attributes?.bannerImage && allArtilcles?.attributes?.bannerImage[0]?.url || HeroImg} alt="" className='img-fluid' />
                                </div>
                                <div className="text-part">
                                    <div className="hero-heading">
                                        <div className='d-flex'>
                                            {allArtilcles?.attributes?.categories?.length != 0 ?
                                                allArtilcles?.attributes?.categories?.map((item: any, i: any) => (
                                                    <Button key={i} className='default-button medium bg-color-primary'>{item.name}</Button>
                                                )) :
                                                <Button className='default-button medium bg-color-primary'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className='heading-3'>{allArtilcles?.attributes?.heading && allArtilcles?.attributes?.heading || "No heading available"}</h3>
                                    <p className='normal'>{allArtilcles?.attributes?.subHeading && allArtilcles?.attributes?.subHeading || "No sub heading available"}</p>
                                    <div className="by-date">
                                        <p className='by-them normal'>by <span>{allArtilcles?.attributes?.author && toTitleCase(allArtilcles?.attributes?.author) || "Unknown"}</span></p>
                                        {allArtilcles?.attributes?.createdAt &&
                                            <p className='article-date normal'>{allArtilcles?.attributes?.createdAt && moment(allArtilcles?.attributes?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                        }
                                    </div>
                                    <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                                        <div className='news-heading color-white mb-3'>Sign up for our Web3 newsletter</div>
                                        <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                    </div>
                                </div>
                            </div> */}
                            <div className="section-heading">
                                <h2 className='color-primary heading-2'>Featured</h2>
                            </div>
                            <div className="hero-section-content" role="button" onClick={() => { allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.slug && nav(`/article/${allArtilcles?.attributes?.slug}`) : allArtilcles?.attributes?.slug && nav(`/news-post/${allArtilcles?.attributes?.slug}`) }}>
                                <div className="hero-section-img">
                                    <img src={allArtilcles?.attributes?.thumbnailUrl && allArtilcles?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                </div>
                                <div className="text-part">
                                    <div className="hero-heading">
                                        {/* <div className='sub-heading'>{allArtilcles?.attributes?.subHeading}</div> */}
                                        <div className='d-flex'>
                                            {allArtilcles?.attributes?.categories?.length != 0 || [] ?
                                                allArtilcles?.attributes?.categories.map((item: any, i: any) => (
                                                    <Button key={i} className='default-button medium bg-color-primary'>{item.name}</Button>
                                                )) :
                                                <Button className='default-button medium bg-color-primary'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className='heading-3'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.heading && allArtilcles?.attributes?.heading || "No heading available" : allArtilcles?.attributes?.title && allArtilcles?.attributes?.title || "No title available"}</h3>
                                    <p className='mt-3 normal'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.subHeading && allArtilcles?.attributes?.subHeading || "No sub heading available" : allArtilcles?.attributes?.subtitle && allArtilcles?.attributes?.subtitle || "No sub title available"}</p>
                                    <div className="by-date">
                                        <p className='by-them normal'>by <span>{allArtilcles?.attributes?.source === "article" ? toTitleCase(allArtilcles?.attributes?.author) : allArtilcles?.attributes?.authors && toTitleCase(allArtilcles?.attributes?.authors[0]) || "Unknown"}</span></p>
                                        <p className='article-date normal'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.publishedAt && moment(allArtilcles?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023" : allArtilcles?.attributes?.created && moment.unix(Number(allArtilcles?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                    </div>
                                    <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                                        <div className='news-heading color-white mb-3'>Sign up for our Web3 newsletter</div>
                                        <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {pathname === "/research" &&
                        <>
                            <div className="section-heading">
                                <h2 className='color-primary heading-2'>Featured</h2>
                            </div>
                            <div className="hero-section-content" role="button" onClick={() => { allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.slug && nav(`/article/${allArtilcles?.attributes?.slug}`) : allArtilcles?.attributes?.slug && nav(`/news-post/${allArtilcles?.attributes?.slug}`) }}>
                                <div className="hero-section-img">
                                    <img src={allArtilcles?.attributes?.thumbnailUrl && allArtilcles?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                </div>
                                <div className="text-part">
                                    <div className="hero-heading">
                                        {/* <div className='sub-heading'>{allArtilcles?.attributes?.subHeading}</div> */}
                                        <div className='d-flex'>
                                            {allArtilcles?.attributes?.categories?.length != 0 || [] ?
                                                allArtilcles?.attributes?.categories.map((item: any, i: any) => (
                                                    <Button key={i} className='default-button medium bg-color-primary'>{item.name}</Button>
                                                )) :
                                                <Button className='default-button medium bg-color-primary'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className='heading-3'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.heading && allArtilcles?.attributes?.heading || "No heading available" : allArtilcles?.attributes?.title && allArtilcles?.attributes?.title || "No title available"}</h3>
                                    <p className='mt-3 normal'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.subHeading && allArtilcles?.attributes?.subHeading || "No sub-heading available" : allArtilcles?.attributes?.subtitle && allArtilcles?.attributes?.subtitle || "No sub title available"}</p>
                                    <div className="by-date">
                                        <p className='by-them normal'>by <span>{allArtilcles?.attributes?.source === "article" ? toTitleCase(allArtilcles?.attributes?.author) : allArtilcles?.attributes?.authors && toTitleCase(allArtilcles?.attributes?.authors[0]) || "Unknown"}</span></p>
                                        <p className='article-date normal'>{allArtilcles?.attributes?.source === "article" ? allArtilcles?.attributes?.publishedAt && moment(allArtilcles?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023" : allArtilcles?.attributes?.created && moment.unix(Number(allArtilcles?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                    </div>
                                    <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                                        <div className='news-heading color-white mb-3'>Sign up for our Web3 newsletter</div>
                                        <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {pathname === "/news" &&
                        <>
                            <div className="section-heading">
                                <h2 className='color-primary heading-2'>Featured</h2>
                            </div>
                            <div className="hero-section-content" role="button" onClick={() => { allArtilcles?.attributes?.slug && nav(`/news-post/${allArtilcles?.attributes?.slug}`) }}>
                                <div className="hero-section-img">
                                    <img src={allArtilcles?.attributes?.thumbnailUrl && allArtilcles?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                </div>
                                <div className="text-part">
                                    <div className="hero-heading">
                                        <div className='d-flex'>
                                            {allArtilcles?.attributes?.categories ?
                                                allArtilcles?.attributes?.categories?.map((item: any, i: any) => (
                                                    <Button key={i} className='default-button medium bg-color-primary'>{item.name}</Button>
                                                )) :
                                                <Button className='default-button medium bg-color-primary'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className='heading-3'>{allArtilcles?.attributes?.title && allArtilcles?.attributes?.title || "No title available"}</h3>
                                    <p className="normal">{allArtilcles?.attributes?.subtitle && allArtilcles?.attributes?.subtitle || "No sub title available"}</p>
                                    <div className="by-date">
                                        <p className='by-them normal'>by <span>{allArtilcles?.attributes?.authors && toTitleCase(allArtilcles?.attributes?.authors[0]) || "Unknown"}</span></p>
                                        <p className='article-date normal'>{allArtilcles?.attributes?.created && moment.unix(Number(allArtilcles?.attributes?.created)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                    </div>
                                    <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                                        <div className='news-heading color-white mb-3'>Sign up for our Web3 newsletter</div>
                                        <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {pathname === "/podcasts" &&
                        <>
                            <div className="section-heading">
                                <h2 className='color-primary heading-2'>Featured</h2>
                            </div>
                            <div className="hero-section-content" role="button" onClick={() => { allArtilcles?.attributes?.slug && nav(`/podcastsdetails/${allArtilcles?.attributes?.slug}`) }}>
                                <div className="hero-section-img">
                                    <img src={allArtilcles?.attributes?.imageLink} alt="" className='img-fluid' />
                                </div>
                                <div className="text-part">
                                    <div className="hero-heading">
                                        <div className='d-flex'>
                                            {allArtilcles?.attributes?.categories?.length != 0 ?
                                                <>
                                                    {allArtilcles?.attributes?.categories?.map((item: any, i: any) => (
                                                        <Button key={i} className='default-button medium bg-color-primary'>{item.name}</Button>
                                                    ))}
                                                </>
                                                : <Button className='default-button medium'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className='heading-3'>{allArtilcles?.attributes?.title && allArtilcles?.attributes?.title || "No title available"}</h3>
                                    <div className='desctiption small fw-500'>{allArtilcles?.attributes?.description ? parse(allArtilcles?.attributes?.description, options) : "No description available"}</div>
                                    <div className="by-date">
                                        <p className='by-them normal'>by <span>Russian Defi</span></p>
                                        {allArtilcles?.attributes?.publishDate &&
                                            <p className='article-date normal'>{moment.unix(Number(allArtilcles?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                        }
                                        <p className='article-date normal'>{!allArtilcles?.attributes?.publishDate &&
                                            "Jan 30 2023"
                                        }</p>
                                    </div>
                                    <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                                        <div className='news-heading color-white mb-3'>Sign up for our Web3 newsletter</div>
                                        <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <ToastContainer />
                </>
            }
        </>

    );
}

export default Feature;
