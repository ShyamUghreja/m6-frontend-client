import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import '../trending/trending.sass';
import HeroImg from '../../../assets/images/hero-img.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getHomeData, getNewsData } from '../../../pages/API/ApiCall';
import moment from 'moment';
import ContentLoader from 'react-content-loader';

function Trending() {
    const [trandingArticles, setTrandingArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getTrendingHomeData = async (type: string) => {
        try {
            setIsLoading(true)
            await getNewsData(0, 4, "Trending", false, true, "", "", "", type)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setTrandingArticles(allArticle)
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
    const nav = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (pathname === "/") {
            getTrendingHomeData("research")
            // getLatestHomeData("home")
        }
    }, [pathname])

    const MyLoader = () => (
        <>
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
        </>
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
            {isLoading ?
                MyLoader() :
                <>
                    {trandingArticles && trandingArticles.map((item: any, i: number) => (
                        <Col lg={3} md={6} xs={12} key={i} role="button" onClick={() => { item?.attributes?.source === "research" ? item?.attributes?.slug && nav(`/news-post/${item?.attributes?.slug}`) : item?.attributes?.slug && nav(`/article/${item?.attributes?.slug}`)}}>
                            <div className="crypto-card trending-crypto">
                                <div className="card-image">
                                    <img src={item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl || HeroImg} alt="" className='img-fluid' />
                                </div>
                                <div className="card-content">
                                    <div className="content-heading">
                                        <p className='medium fw-500'></p>
                                        <div className='d-flex'>
                                            {item?.attributes?.categories?.length != 0 ?
                                                item?.attributes?.categories.map((itemName: any, i: number) => (
                                                    <Button key={i} className='default-button small'>{itemName.name}</Button>
                                                )) :
                                                <Button key={i} className='default-button bg-color-primary small'>No categories available</Button>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className='mb-2 heading-6'>{item?.attributes?.source === "article" ? 
                                                                        toTitleCase(item?.attributes?.heading) : 
                                                                        item?.attributes?.source === "research" ? toTitleCase(item?.attributes?.title) : (item?.heading) ? toTitleCase(item?.heading) : "No data available"}</h6>
                                    <div className="by-date">
                                        <p className='by-them small'>by <span className='fw-600'>{item?.attributes?.author ?
                                            " " + toTitleCase(item?.attributes?.author) :
                                            item?.attributes?.authors ?
                                                " " + toTitleCase(item?.attributes?.authors[0]) : item?.author ? " " + toTitleCase(item?.author) : " Unknown"
                                        }</span></p>
                                        <p className='article-date small fw-500'>{item?.attributes?.source === "article" ? moment(item?.attributes?.createdAt).format("MMM DD, YYYY") : moment.unix(Number(item?.attributes?.publishDate)).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </>
            }
        </>
    );
}

export default Trending;
