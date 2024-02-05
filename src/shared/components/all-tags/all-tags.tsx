import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Defi from '../../../assets/images/defi.svg';
import Market from '../../../assets/images/market.svg';
import Gaming from '../../../assets/images/gaming.svg';
import NFTs from '../../../assets/images/nfts.svg';
import '../all-tags/all-tags.sass';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategorys } from '../../../pages/API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import LoaderComp from '../loader-component/loader-component';
import cat1 from '../../../assets/icons/categories/cpu 1.svg';
import cat2 from '../../../assets/icons/categories/digital-money 1.svg';
import cat3 from '../../../assets/icons/categories/game-controller 1.svg';
import cat4 from '../../../assets/icons/categories/page/community.svg';
import cat5 from '../../../assets/icons/categories/market 1.svg';
import cat6 from '../../../assets/icons/categories/metaverse 1.svg';
import { HashLink } from 'react-router-hash-link';
import ContentLoader from 'react-content-loader';

const categoriesIcons = [cat1, cat6, Defi, cat4, cat5, cat1, cat2, cat3]

function AllTags() {
    const nav = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [allCategory, setAllCategory] = useState<any>([])
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)

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
        getAllCategorysData()
    }, [])

    const MyLoader = () => (
        <div className="all-tags-buttons">
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
            <ContentLoader height={40} width={"100%"}>
                <rect x="0" y="0" rx="10" ry="10" r="20" width="180" height="40" />
            </ContentLoader>
        </div>
    )



    return (
        <>
            <section>
                <div className="all-tags-section">
                    <Container>
                        {isLoading ?
                            MyLoader() :
                            <>
                                <div className="all-tags-buttons">
                                    {allCategory && allCategory?.map((item: any, i: any) => (
                                        <div key={i}>
                                            {pathname === "/" ?
                                                <Button className='' key={i} onClick={() => { item?.id && nav(`/categoriesdetails/research/${item?.id}`)}}>
                                                    <span>
                                                        <img src={item?.attributes?.icon?.data ? item?.attributes?.icon?.data?.attributes?.url : cat6} alt="" />
                                                    </span>
                                                    <div className='button-name'>{item?.attributes?.name}</div>
                                                </Button> :
                                                item?.attributes?.scrollable && item?.attributes?.scrollable === true ?
                                                    <HashLink className='redirect-id' to={`${pathname}#${item?.attributes?.slug}`} key={i}>
                                                        <span>
                                                            <img src={item?.attributes?.icon?.data ? item?.attributes?.icon?.data?.attributes?.url : cat6} alt="" />
                                                        </span>
                                                        <div className='button-name'>{item?.attributes?.name}</div>
                                                    </HashLink> :
                                                    <Button className='' key={i} onClick={() => { item?.id && nav(`/categoriesdetails${pathname}/${item?.id}`)}}>
                                                        <span>
                                                            <img src={item?.attributes?.icon?.data ? item?.attributes?.icon?.data?.attributes?.url : cat6} alt="" />
                                                        </span>
                                                        <div className='button-name'>{item?.attributes?.name}</div>
                                                    </Button>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                    </Container>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default AllTags;
