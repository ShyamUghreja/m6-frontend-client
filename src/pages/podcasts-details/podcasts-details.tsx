import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import './podcasts-details.sass'
import HeroImg from '../../assets/images/hero-img.webp';
import AudioPlayer from "react-h5-audio-player";
import { getPodcastsData } from '../API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../shared/components/loader/loader';
import parse, {
    attributesToProps,
    HTMLReactParserOptions
} from "html-react-parser";
import { Element } from "domhandler/lib/node";
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader from 'react-content-loader';

function PodcastsDetails() {
    const [singlePodcastsData, setSinglePodcastsData] = useState<any>()
    console.log(singlePodcastsData)
    const [podcastsCallNotes, setPodcastsCallNotes] = useState<any>()
    const [jsonData, setJsonData] = useState<any>()
    const location = useLocation()
    const pathname = location.pathname;
    const splitLocation = pathname.split("/");
    const podcastsId = splitLocation[2]
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
            await getPodcastsData(0, 1, "Details", false, false, "", "", podcastsId)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setSinglePodcastsData(allArticle)
                        setPodcastsCallNotes(allArticle?.attributes?.callNotes)
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
    }, [podcastsId])

    useEffect(() => {
        if (podcastsCallNotes) {
            let validJson = JSON?.parse(podcastsCallNotes)
            setJsonData(validJson?.blocks[0]?.data?.text)
        }
    }, [podcastsCallNotes])

    const CleoOne = () => (
        <div className='podcasts-details-page'>
            <ContentLoader height="500" width="100%" >
                <rect x="3" y="0" rx="10" ry="10" width="100%" height="180" />
                <rect x="6" y="200" rx="0" ry="0" width="292" height="20" />
                <rect x="4" y="225" rx="0" ry="0" width="239" height="15" />
                <rect x="4" y="240" rx="0" ry="0" width="274" height="10" />
                <rect x="15" y="260" rx="4" ry="4" width="100%" height="10" />
                <rect x="15" y="290" rx="2" ry="2" width="80%" height="15" />
                <rect x="90%" y="310" rx="16" ry="16" width="55" height="20" />
                <rect x="15" y="330" rx="3" ry="3" width="215" height="15" />
                <rect x="15" y="360" rx="3" ry="3" width="50" height="15" />
                <rect x="75" y="380" rx="3" ry="3" width="50" height="15" />
                <rect x="135" y="400" rx="3" ry="3" width="50" height="15" />
                <rect x="15" y="400" rx="16" ry="16" width="55" height="22" />
                <rect x="15" y="430" rx="2" ry="2" width="80%" height="50" />
                <rect x="90%" y="450" rx="2" ry="2" width="40" height="20" />
            </ContentLoader>
        </div>
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
                CleoOne() :
                <>
                    <div className="podcasts-details-page primary-bg-background">
                        <section className='podcastsDetails-section'>
                            <div className='padding-section pb-0'>
                                <Container>

                                    <h3 className='heading-3'>{singlePodcastsData?.attributes?.title}</h3>
                                    <div className='large fw-500 mt-3'>{singlePodcastsData?.attributes?.description ? parse(singlePodcastsData?.attributes?.description, options) : ""}</div>
                                    <div className='mt-md-4 mt-3 d-flex'>
                                        <div className=''>
                                            <p className='normal'>{moment(singlePodcastsData?.attributes?.publishDate).format("MMM DD, YYYY")} || {singlePodcastsData?.attributes?.duration}</p>
                                        </div>
                                    </div>
                                    <hr className='my-md-3 my-2' />
                                </Container>
                            </div>
                        </section>
                        <ToastContainer />
                        <section className='player-section'>
                            <div className=''>
                                <Container >
                                    <div className='player-name mb-lg-4 mb-md-4 mb-3'>
                                        <div>
                                            <p className='medium color-secondary'>Hosted by</p>
                                            <p className='large fw-500'>{toTitleCase(singlePodcastsData?.attributes?.author) || "Unknown"}</p>
                                        </div>
                                        <div>
                                            <p className='medium color-secondary'>Guests</p>
                                            <p className='large fw-500'>{singlePodcastsData?.attributes?.guests || "Unknown"}</p>
                                        </div>
                                    </div>
                                    <div className='top-img mb-lg-4 mb-3'>
                                        {singlePodcastsData?.attributes?.imageLink ?
                                            <img src={singlePodcastsData?.attributes?.imageLink} alt="" /> :
                                            <img src={HeroImg} alt="" />
                                        }
                                    </div>
                                    <div className='audio-player'>
                                        <AudioPlayer
                                            style={{ border: "0" }}
                                            src={singlePodcastsData?.attributes?.fileUrl}
                                            showFilledVolume={false}
                                            loop={false}
                                            layout="horizontal-reverse"
                                            progressJumpStep={10000}
                                        />
                                    </div>
                                </Container>
                            </div>
                        </section>

                        <section className='player-section'>
                            <div className='padding-section'>
                                <Container>
                                    <div className="section-heading">
                                        <h2 className='color-primary heading-2'>Call Notes</h2>
                                        <hr className='mt-2' />
                                    </div>
                                    <p className='large'>{jsonData || "No content available"}</p>
                                </Container>
                            </div>
                        </section>
                    </div>
                </>
            }
        </>
    )
}

export default PodcastsDetails