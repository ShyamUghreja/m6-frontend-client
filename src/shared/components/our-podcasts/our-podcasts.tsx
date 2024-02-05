import React, { useEffect, useState } from 'react';
import HeroImg from '../../../assets/images/hero-img.webp';
import { Col, Container, Row, ToastContainer } from 'react-bootstrap';
import '../our-podcasts/our-podcasts.sass';
import { useNavigate } from 'react-router-dom';
import { getPodcastsData } from '../../../pages/API/ApiCall';
import { toast } from 'react-toastify';
import LoaderComp from '../loader-component/loader-component';
import parse, {
    attributesToProps,
    HTMLReactParserOptions
} from "html-react-parser";
import { Element } from "domhandler/lib/node";
import ContentLoader from 'react-content-loader';

function OurPodcasts() {
    const nav = useNavigate()
    const [latestArticles, setLatestArticles] = useState<any>([])
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

    const getLatestPodcastData = async () => {
        try {
            setIsLoading(true)
            await getPodcastsData(0, 6, "Latest", true, false, "", "")
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setLatestArticles(allArticle)
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
        getLatestPodcastData()
    }, [])

    const MyLoader = () => (
        <Row>
            <Col lg={6} md={6} xs={12}>
                <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                    foregroundColor={'#999'} >
                    <rect x="20" y="0" rx="5" ry="5" width="100" height="100" />
                    <rect x="155" y="0" rx="5" ry="5" width="100%" height="12" />
                    <rect x="155" y="35" rx="5" ry="5" width="180" height="12" />
                    <rect x="155" y="70" rx="5" ry="5" width="100%" height="12" />
                </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={12}>
                <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                    foregroundColor={'#999'}>
                    <rect x="20" y="0" rx="5" ry="5" width="100" height="100" />
                    <rect x="155" y="0" rx="5" ry="5" width="100%" height="12" />
                    <rect x="155" y="35" rx="5" ry="5" width="180" height="12" />
                    <rect x="155" y="70" rx="5" ry="5" width="100%" height="12" />
                </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={12}>
                <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                    foregroundColor={'#999'}>
                    <rect x="20" y="0" rx="5" ry="5" width="100" height="100" />
                    <rect x="155" y="0" rx="5" ry="5" width="100%" height="12" />
                    <rect x="155" y="35" rx="5" ry="5" width="180" height="12" />
                    <rect x="155" y="70" rx="5" ry="5" width="100%" height="12" />
                </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={12}>
                <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                    foregroundColor={'#999'}>
                    <rect x="20" y="0" rx="5" ry="5" width="100" height="100" />
                    <rect x="155" y="0" rx="5" ry="5" width="100%" height="12" />
                    <rect x="155" y="35" rx="5" ry="5" width="180" height="12" />
                    <rect x="155" y="70" rx="5" ry="5" width="100%" height="12" />
                </ContentLoader>
            </Col>
        </Row>
    )
    return (
        <>
            <>
                <section className="podcasts-section padding-100">
                    <Container className='default-container' >
                        {isLoading ?
                            MyLoader() :
                            <>
                                <Row className="section-heading justify-content-between">
                                    <Col lg={12} md={12} xs={12} >
                                        <h2 className='color-white text-center heading-2'>The Crypto Illuminati <br /> Illuminati Round Table</h2>
                                    </Col>
                                    <Col lg={12} md={12} xs={12} className="align-self-center">
                                        <p className='color-white large-height pt-3 mt-3 mt-lg-0 text-center'>
                                            Weekly Twitter Spaces hosted by
                                            <a className='color-white px-2' href="https://twitter.com/GarlamWON" target='_blank'>Garlam Won</a>&
                                            <a className='color-white px-2' href="https://twitter.com/Crypto_Clarke" target='_blank'>Kadeem Clarke,</a>
                                            interviewing <br /> influential builders in crypto
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    {latestArticles && latestArticles.map((item: any, i: number) => (
                                        <Col lg={6} md={6} xs={12} key={i}>
                                            <div className='d-flex podcast-card position-relative' role="button" onClick={() => { item?.attributes?.slug && nav(`/podcastsdetails/${item?.attributes?.slug}`) }}>
                                                <div className="card-image">
                                                    <img src={item?.attributes?.imageLink ? item?.attributes?.imageLink : HeroImg} alt="Categoties" className='img-fluid' />
                                                </div>
                                                <div className='card-content'>
                                                    <h4 className='color-white heading-4'>{item?.attributes?.title}</h4>
                                                    <p className='medium color-primary my-2'>{item?.attributes?.duration}</p>
                                                    <div className='desctiption small fw-500'>{item?.attributes?.description ? parse(item?.attributes?.description, options) : ""}</div>
                                                    {/* <div className="play-icon">
                                                        <i className="ri-play-fill"></i> <span>Play Now</span>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        }
                    </Container>
                </section>
                <ToastContainer />
            </>
        </>
    );
}

export default OurPodcasts;
