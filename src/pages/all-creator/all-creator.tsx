import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import AllTags from '../../shared/components/all-tags/all-tags'
import HeroImg from '../../assets/images/hero-img.webp';
import '../all-creator/all-creator.sass'
import { getAllCategorys, getAllCreators, getUserCategories } from '../API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../shared/components/loader/loader';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import web3 from '../../assets/icons/categories/web-3.svg';
import degen from '../../assets/icons/categories/degen.svg';
import crypto from '../../assets/icons/categories/cpu 1.svg';
import cat1 from '../../assets/icons/categories/cpu 1.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader from 'react-content-loader';

// const sectionIcons = [web3, degen, crypto, degen, crypto]

export const AllCreator = () => {
    const [allCreators, setAllCreators] = useState<any>()
    const [msg, setMsg] = useState('Please Wait')
    const [selectedState, setSelectedState] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [allCategory, setAllCategory] = useState<any>([])
    // const [totalBlogLength, setTotalBlogLength] = useState(0)
    const totalBlogLength = useRef(0);
    const startingCounter = useRef(0);
    let apiRequestDataSetLimit = 25
    console.log("allCategory allCategory",allCategory)

    const nav = useNavigate()

    const getAllCreatorsData = async (skipDataValue : any, user_categories: string) => {
        try {
            setIsLoading(true)
            await getAllCreators(skipDataValue, apiRequestDataSetLimit, user_categories)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        const totalDataSet = res?.data?.meta?.pagination?.total || 0
                        console.log(totalDataSet)
                        totalBlogLength.current = Number(totalDataSet)
                        // setTotalBlogLength(Number(totalDataSet));
                        setAllCreators((prev: any) => [...prev, ...allArticle])
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

    const getAllCategorysData = async () => {
        try {
            setIsLoading(true)
            await getAllCategorys()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        const data = res?.data?.data || []
                        setAllCategory(data)
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
        setAllCreators([])
        startingCounter.current = 0
        getAllCategorysData()
    }, [])

    useEffect(() => {
        setAllCreators([])
        startingCounter.current = 0
        console.log("A");
        getAllCreatorsData(startingCounter.current, selectedState)
    }, [selectedState])

    const fetchdata = () => {
        setTimeout(() => {
            getAllCreatorsData(startingCounter.current + apiRequestDataSetLimit, selectedState)
            console.log("B");
            startingCounter.current = startingCounter.current + apiRequestDataSetLimit
        }, 1000);
    }

    const CleoOne = () => (
        <div className="all-tags-buttons">
            <ContentLoader width={"100%"} backgroundColor={'#333'} foregroundColor={'#999'} >
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
            </ContentLoader>
            <ContentLoader width={"100%"} backgroundColor={'#333'} foregroundColor={'#999'} >
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
            </ContentLoader>
            <ContentLoader width={"100%"} backgroundColor={'#333'} foregroundColor={'#999'} >
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
            </ContentLoader>
            <ContentLoader width={"100%"} backgroundColor={'#333'} foregroundColor={'#999'} >
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
            </ContentLoader>
            <ContentLoader width={"100%"} backgroundColor={'#333'} foregroundColor={'#999'} >
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
            </ContentLoader>
        </div>
    )

    return (
        <>
            <Container>
                <div className="my-4 text-center">
                    <h1 className='heading-1'>All Creators</h1>
                </div>
            </Container>
            <ToastContainer />
            <div className="all-tags-buttons justify-content-center">
                {allCategory && allCategory?.map((item: any, i: any) => (
                    <Button className='mx-1' key={i} active={item?.attributes?.name === selectedState} onClick={() => setSelectedState(item?.attributes?.slug)}>
                        <span><img src={item?.attributes?.icon?.data ? item?.attributes?.icon?.data?.attributes?.url : crypto} alt="" /></span>
                        <HashLink key={i} smooth to="">{item?.attributes?.name}</HashLink>
                    </Button>
                ))}
            </div>

            <section className="all-creator-section mt-4">
                <div className="padding-100">
                    <Container>
                        {isLoading ?
                            CleoOne() :
                            <div className="all-creator-part">
                                {allCreators && allCreators.map((item: any, i: number) => (
                                    <div className="ecosystem-card" role='button' key={i} onClick={() => { item.id && nav(`/creatorprofile/${item.id}`) }}>
                                        <div className="card-image text-center">
                                            <img src={item?.attributes?.profilePic && item?.attributes?.profilePic?.url || HeroImg} alt="Card" className='img-fluid mx-auto' />
                                        </div>
                                        <div className="card-content">
                                            <h5 className='text-center mt-lg-4 mt-md-3 mt-2 heading-5'>{item?.attributes?.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </Container>

                    {allCreators &&
                        <InfiniteScroll
                            dataLength={allCreators?.length}
                            next={fetchdata}
                            hasMore={Number(allCreators?.length) >= Number(totalBlogLength.current) ? false : true}
                            loader={
                                allCreators?.length < Number(totalBlogLength.current) ?
                                    <div className="text-center">
                                        Please Wait ...
                                    </div> :
                                    allCreators.length == 0 ?
                                        <div className="text-center">
                                            <h4 className='heading-4'>No data available</h4>
                                        </div>
                                        : ""
                            }
                            endMessage={
                                allCreators?.length == 0 ?
                                    <div className="text-center">
                                        <h4 className='heading-4'>No data available</h4>
                                    </div> :
                                    <p style={{ textAlign: 'center' }}>
                                        {/* <b>Yay! You have seen it all</b> */}
                                    </p>
                            }
                        >
                        </InfiniteScroll>
                    }
                </div>
            </section>
        </>
    )
}
