import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getHomeContentData, getNewsData, getPodcastsData } from '../../../pages/API/ApiCall';
import '../latest/latest.sass';
import moment from 'moment';
import LoaderComp from '../loader-component/loader-component';
import ContentLoader, { Facebook } from 'react-content-loader';

function Latest() {
    const [latestArticles, setLatestArticles] = useState<any>([])
    const location = useLocation();
    const pathname = location.pathname;
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)
    const [totalNumberOfLatestRecords, setTotalNumberOfLatestRecords] = useState(0)

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

    const getLatestNewsData = async (type: string) => {
        try {
            setIsLoading(true)
            await getNewsData(0, 4, "Latest", false, false, "", "", "", type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setLatestArticles(allArticle)
                        setTotalNumberOfLatestRecords(res?.data?.meta?.pagination?.total || 0)
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

    const getLatestHomeData = async () => {
        try {
            setIsLoading(true)
            await getHomeContentData(0, 4)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setLatestArticles(allArticle)
                        setTotalNumberOfLatestRecords(res?.data?.meta?.pagination?.total || 0)
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

    const getLatestPodcastData = async () => {
        try {
            setIsLoading(true)
            await getPodcastsData(0, 4, "Latest", true, false, "", "")
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setLatestArticles(allArticle)
                        setTotalNumberOfLatestRecords(res?.data?.meta?.pagination?.total || 0)
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
            getLatestHomeData()
        } else if (pathname === "/research") {
            getLatestNewsData("research")
        } else if (pathname === "/news") {
            getLatestNewsData("news")
        } else if (pathname === "/podcasts") {
            getLatestPodcastData()
        }
    }, [pathname])

    const nav = useNavigate();
    return (
        <>

            {isLoading ?
                <>
                    <ContentLoader height={50} width={"100%"}>
                        <rect y="0" ry="3" width="200" height="25" />
                    </ContentLoader>
                    <ContentLoader viewBox="0 0 600 160" height={120} width={"100%"}>
                        <rect x="0" y="40" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="60" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="80" rx="3" ry="3" width="100%" height="7" />
                        <rect y="0" width="140" height="25" />
                    </ContentLoader>
                    <ContentLoader viewBox="0 0 600 160" height={120} width={"100%"}>
                        <rect x="0" y="40" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="60" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="80" rx="3" ry="3" width="100%" height="7" />
                        <rect y="0" width="140" height="25" />
                    </ContentLoader>
                    <ContentLoader viewBox="0 0 600 160" height={120} width={"100%"}>
                        <rect x="0" y="40" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="60" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="80" rx="3" ry="3" width="100%" height="7" />
                        <rect y="0" width="140" height="25" />
                    </ContentLoader>
                    <ContentLoader viewBox="0 0 600 160" height={120} width={"100%"}>
                        <rect x="0" y="40" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="60" rx="3" ry="3" width="100%" height="7" />
                        <rect x="0" y="80" rx="3" ry="3" width="100%" height="7" />
                        <rect y="0" width="140" height="25" />
                    </ContentLoader>
                </> :
                <div>
                    <div className="section-heading">
                        <h2 className='heading-2'>Latest</h2>
                    </div>
                    {latestArticles && latestArticles?.map((item: any, i: any) => (
                        <div className="latest-card" key={i} role="button" onClick={() => {
                            pathname === "/podcasts" ? item?.attributes?.slug && nav(`/podcastsdetails/${item?.attributes?.slug}`) :
                                pathname === "/news" ? item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) :
                                    pathname === "/research" && item?.attributes?.source === "research" ? item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) :
                                        pathname === "/research" && item?.attributes?.source === "article" ? item?.attributes?.slug && nav(`/article/${item?.attributes?.slug}`) :
                                            pathname === "/" && (item?.source === "news" || item?.source === "research") ? item?.slug &&  nav(`/news-post/${item?.slug}`) : pathname === "/" && item?.source === "podcast" ? item?.slug && nav(`/podcastsdetails/${item?.slug}`) : item?.slug && nav(`/article/${item?.slug}`)
                        }}>
                            <div className="d-flex justify-content-between">
                                <div className='d-flex'>
                                    {pathname != "/" && item?.attributes?.categories?.length != 0 ?
                                        item?.attributes?.categories?.map((items: any, i: any) => (
                                            <Button key={i} className='default-button medium bg-color-primary me-1'>{items.name}</Button>
                                        )) :
                                        pathname === "/" && item?.categories?.length != 0 ?
                                            item?.categories?.map((items: any, i: any) => (
                                                <Button key={i} className='default-button medium me-1 bg-color-primary'>{items.name}</Button>
                                            )) : <Button className='default-button medium bg-color-primary'>No categories available</Button>
                                    }
                                </div>
                                <div className='d-flex'>
                                    {pathname === "/" && <Button className='default-button medium success' variant="success">{item?.source === "article" ? "Research" : toTitleCase(item?.source)}</Button>}
                                </div>
                            </div>
                            <h6 className="heading-6">{item?.attributes ?
                                pathname === "/" ? toTitleCase(item?.attributes?.heading) : pathname === "/research" && item?.attributes?.source === "article" ? toTitleCase(item?.attributes?.heading) :
                                    toTitleCase(item?.attributes?.title) : item?.heading ? toTitleCase(item?.heading) : "No data available"}</h6>
                            {/* // pathname === "/news" ? item?.attributes?.title :
                            //     pathname === "/research" ? item?.attributes?.title :
                            //         pathname === "/podcasts" ? item?.attributes?.title
                            //             : "" */}
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='medium'>by
                                    <span className='fw-600'>
                                        {item?.attributes?.author ?
                                            " " + toTitleCase(item?.attributes?.author) :
                                            item?.attributes?.authors ?
                                                " " + toTitleCase(item?.attributes?.authors[0]) : item?.author ? " " + toTitleCase(item?.author) : " Unknown"
                                        }
                                    </span>
                                </p>
                                {/* {pathname !== "/podcasts" && <div className='center-dot'></div>} */}
                                {/* <p className='medium'>{moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY")}</p> */}
                                {(pathname === "/") ?
                                    <p className='small article-date'>{moment(item?.attributes?.publishedAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p> :
                                    (pathname === "/news" || pathname === "/research") &&
                                    <p className='small article-date'>{item?.attributes?.source === "article" ? moment(item?.attributes?.createdAt).format("MMM DD, YYYY") : moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                }
                            </div>
                        </div>
                    ))}
                    {totalNumberOfLatestRecords && totalNumberOfLatestRecords > 4 ?
                        <div className="creator-cards top-creators bg-transparent">
                            <div className="creator-all-btn">
                                <Button onClick={() => {
                                    pathname === "/" ? nav("/allcategory/article") :
                                        pathname === "/research" ? nav("/allcategory/research") :
                                            pathname === "/news" ? nav("/allcategory/news") :
                                                pathname === "/podcasts" ? nav("/allcategory/podcasts") : nav("/allcategory/article")
                                }}><div className='btn-div'>View All</div></Button>
                            </div>
                        </div> : ""}
                    <ToastContainer />
                </div>
            }
        </>
    );
}

export default Latest;
