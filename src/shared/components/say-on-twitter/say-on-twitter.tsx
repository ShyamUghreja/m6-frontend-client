import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import TwitterIcon from '../../../assets/images/twitter-icon.svg';
import { getTwitterData } from '../../../pages/API/ApiCall';
import LoaderComp from '../loader-component/loader-component';
import '../say-on-twitter/say-on-twitter.sass'
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
export const SayOnTwitter = () => {
    const [twitterData, setTwitterData] = useState([])
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)

    const getAllTwitterData = async () => {
        try {
            setIsLoading(true)
            await getTwitterData()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setTwitterData(res?.data?.data || [])
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

    useEffect(() => {
        getAllTwitterData()
    }, []);

    return (
        <>
            {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
            {isLoading ?
                <>
                    <Row>
                        <Col lg={4} md={6} xs={12}>
                            <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                                foregroundColor={'#999'} >
                                <rect x="-16" y="20" rx="4" ry="4" width="200" height="10" />
                                <rect x="0" y="50" rx="3" ry="3" width="113" height="6" />
                                <rect x="0" y="79" rx="3" ry="3" width="424" height="7" />
                                <rect x="0" y="99" rx="3" ry="3" width="422" height="7" />
                                <rect x="0" y="120" rx="3" ry="3" width="424" height="7" />
                                <circle cx="528" cy="48" r="20" />
                            </ContentLoader>
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                                foregroundColor={'#999'}>
                                <rect x="-16" y="20" rx="4" ry="4" width="200" height="10" />
                                <rect x="0" y="50" rx="3" ry="3" width="113" height="6" />
                                <rect x="0" y="79" rx="3" ry="3" width="424" height="7" />
                                <rect x="0" y="99" rx="3" ry="3" width="422" height="7" />
                                <rect x="0" y="120" rx="3" ry="3" width="424" height="7" />
                                <circle cx="528" cy="48" r="20" />
                            </ContentLoader>
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <ContentLoader viewBox="0 0 600 200" height={200} width={"100%"} backgroundColor={'#333'}
                                foregroundColor={'#999'}>
                                <rect x="-16" y="20" rx="4" ry="4" width="200" height="10" />
                                <rect x="0" y="50" rx="3" ry="3" width="113" height="6" />
                                <rect x="0" y="79" rx="3" ry="3" width="424" height="7" />
                                <rect x="0" y="99" rx="3" ry="3" width="422" height="7" />
                                <rect x="0" y="120" rx="3" ry="3" width="424" height="7" />
                                <circle cx="528" cy="48" r="20" />
                            </ContentLoader>
                        </Col>
                    </Row>
                </> :
                <div className="pb-5">
                    <div className="section-heading">
                        <h2 className='text-center mb-4 heading-2'>What’s poppin on Twitter</h2>
                    </div>
                    <Row>
                        {twitterData && twitterData.map((item: any, i: number) => (
                            <Col lg={4} md={6} xs={12} key={i} >
                                <div role='button' className="say-on-twitter-card" onClick={e => { item?.tweetUrl && window.open(item?.tweetUrl, "_blank") }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <h3 className='heading-3'>{item?.name}</h3>
                                            <Link to="" target="_blank" onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(item?.profileUrl, "_blank") }}>@{item?.username}</Link>
                                        </div>
                                        <div className="twitter-icon">
                                            <img src={TwitterIcon} className="img-fluid" alt="" />
                                        </div>
                                    </div>
                                    <p className='large-height'>{item?.tweet}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            }
        </>
    )
}
