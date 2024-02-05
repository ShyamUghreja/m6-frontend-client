import React, { useEffect, useState } from 'react';
import '../creator/creator.sass';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Creatorprofile from '../../shared/components/creator-profile/creator-profile';
import CreatorModel from '../../shared/components/creator-model/creator-model';
import { getAllUserFeaturedContentLinks, getAllUserLinks, getCreatorProfileData, getLoginUserdata } from '../API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import LabResearch from '../../shared/components/lab-research/lab-research';
import HeroImg from '../../assets/images/hero-img.webp';
import moment from 'moment';
import Loader from '../../shared/components/loader/loader';
import { useNavigate, useParams } from 'react-router-dom';
import Twitter from '../../assets/images/twitter.svg';
import Telegram from '../../assets/images/telegram.svg';
import Medium from '../../assets/images/medium.svg';
import Network from '../../assets/images/network.svg';
import ShareModal from '../../shared/components/shareModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';


const CreatorProfile = () => {
  const nav = useNavigate();
  const [userLoginData, setUserLoginData] = useState<any>({})
  const [allUserFeaturedContentLinkdata, setAllUserFeaturedContentLinkData] = useState<any>()
  const [allUserLinkdata, setAllUserLinkData] = useState<any>([])
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem("user_id")
  const [shareModal, setShareModal] = useState<boolean>(false)
  const shareModalToggle = () => setShareModal(!shareModal)
  const params = useParams<{ id: any }>();
  let paginationStart = 0;
  let paginationLimit = 25;
  const [totalBlogLength, setTotalBlogLength] = useState(0)
  const [startingCounter, setStartingCounter] = useState(0)
  let apiRequestDataSetLimit = 25

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

  const getAllUserFeaturedContentLinkData = async (userId: string) => {
    try {
      setIsLoading(true)
      await getAllUserFeaturedContentLinks(paginationStart, paginationLimit, true, userId)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setAllUserFeaturedContentLinkData(res?.data?.data || [])
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

  const getAllUserLinksData = async (skipDataValue: number, userId: string) => {
    try {
      setIsLoading(true)
      await getAllUserLinks(skipDataValue, apiRequestDataSetLimit, userId)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            setAllUserLinkData((prev: any) => [...prev, ...allArticle])
            const totalDataSet = res?.data?.meta?.pagination?.total || 0
            setTotalBlogLength(Number(totalDataSet));
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

  const getLoginUserDataFromAPI = async () => {
    try {
      setIsLoading(true)
      await getLoginUserdata()
        .then(async (res: any) => {
          if (res?.status === 200) {
            setUserLoginData(res.data)
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

  const getCreatorProfileDataFromAPI = async () => {
    try {
      setIsLoading(true)
      await getCreatorProfileData(params.id)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setUserLoginData(res.data)
            toast.error(res?.data?.message)
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
    setAllUserLinkData([])
    if (Number(params.id) === Number(userId)) {
      getLoginUserDataFromAPI()
    } else {
      getCreatorProfileDataFromAPI()
    }
    getAllUserFeaturedContentLinkData(params.id)
    getAllUserLinksData(startingCounter, params.id)
  }, [params])

  const fetchdata = () => {
    setTimeout(() => {
      getAllUserLinksData(startingCounter + apiRequestDataSetLimit, params.id)
      setStartingCounter(startingCounter + apiRequestDataSetLimit)
    }, 1000);
  }

  const MyLoader = () => (
    <Row>
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
    </Row>
  )
  const MyLoadersecond = () => (
    <ContentLoader height={180} width={"100%"} >
      <rect x="20" y="15" rx="20" ry="20" width="150" height="150" />
      <rect x="15%" y="17" rx="10" ry="10" width="420" height="20" />
      <rect x="15%" y="71" rx="10" ry="10" width="315" height="20" />
      <rect x="15%" y="125" rx="10" ry="10" width="233" height="20" />
    </ContentLoader>
  )

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <div className="creator-page">
        <section className="creat-profile-section primary-bg-background">
          <div className="creat-profile padding-section">
            <Container>
              {isLoading ?
                MyLoadersecond() :
                <div className="creat-profile">
                  <div className="profile-img">
                    <img src={userLoginData?.profilePic?.formats?.thumbnail?.url.length > 0 ? userLoginData?.profilePic?.formats?.thumbnail?.url : HeroImg} alt="" className='img-fluid' />
                  </div>
                  <div className='w-100'>
                    <div className='d-flex justify-content-between'>
                      <div className="mx-lg-4 mx-3">
                        <h3 className='heading-3'>{toTitleCase(userLoginData && userLoginData?.name) || "No name available"}</h3>
                        <p className='fw-400 large'>{toTitleCase(userLoginData && userLoginData?.title) || "No title available"} </p>
                      </div>
                      <div>
                        <Button onClick={() => { shareModalToggle() }} className='default-button shareand-save'><i className="ri-share-line" /> Share</Button>
                      </div>
                    </div>
                    <div className="share-profile"></div>
                    <div className='social-icon'>
                      {userLoginData?.twitterLink ? <Link to="" onClick={() => { userLoginData?.twitterLink && window.open(userLoginData?.twitterLink, '_blank') }}><img src={Twitter} alt="" /></Link> : null}
                      {userLoginData?.telegramLink ? <Link to="" onClick={() => { userLoginData?.telegramLink && window.open(userLoginData?.telegramLink, '_blank') }}><img src={Telegram} alt="" /></Link> : null}
                      {userLoginData?.mediumLink ? <Link to="" onClick={() => { userLoginData?.mediumLink && window.open(userLoginData?.mediumLink, '_blank') }}><img src={Medium} alt="" /></Link> : null}
                      {userLoginData?.linkedinLink ? <Link to="" onClick={() => { userLoginData?.linkedinLink && window.open(userLoginData?.linkedinLink, '_blank') }}><img src={Network} alt="" /></Link> : null}
                    </div>
                  </div>
                </div>
              }
            </Container>
          </div>
        </section>
        <section className='creator-section position-relative'>
          <div className="padding-section">
            <Container className='default-container ' style={{ background: "#F4F4F499" }}>
              <Row>
                <Col lg={12} md={12} className="p-lg-5 p-md-4 p-3">
                  {isLoading ?
                    <ContentLoader width={"100%"} >
                      <rect x="48" y="8" width="88" height="6" rx="3" />
                      <rect x="48" y="26" width="52" height="6" rx="3" />
                      <rect x="0" y="56" width="410" height="6" rx="3" />
                      <rect x="0" y="72" width="380" height="6" rx="3" />
                      <rect x="0" y="88" width="178" height="6" rx="3" />
                      <circle cx="20" cy="20" r="20" />
                    </ContentLoader> :
                    <>
                      <h3 className='heading-3'>About</h3>
                      <p className='fw-500 mt-3 large'>{userLoginData.about || "No About Data Available"}</p>
                    </>
                  }
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <div>
          {/* <section className='creator-section position-relative'>
            <div className="padding-section">
              <Container className='default-container ' style={{ background: "#F4F4F499" }}>
                <Row>
                  <Col lg={12} md={12} className="p-lg-5 p-4">
                    <h3 className='heading-3'>About</h3>
                    <p className='fw-500 mt-3 large'>Eu consequat ac felis donec et odio pellentesque. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Massa vitae tortor condimentum lacinia. Massa tempor nec feugiat nisl pretium fusce id.  Eu consequat ac felis donec et odio pellentesque. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Massa vitae tortor condimentum lacinia. Massa tempor nec feugiat nisl pretium fusce id. </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </section> */}

          <section className='lab-research-section position-relative'>
            <div className="padding-section pt-0">
              <Container className='default-container'>
                <div className="section-heading ">
                  <div className='d-flex align-item-center'>
                    <h2 className='mb-3 color-primary heading-2'>Featured Content</h2>
                  </div>
                  <hr />
                </div>
                <div className="lab-reaserch">
                  {isLoading ?
                    MyLoader() :
                    <Row>
                      {allUserFeaturedContentLinkdata && allUserFeaturedContentLinkdata.map((item: any, i: any) => (
                        <Col lg={3} md={6} xs={12} key={i}>
                          <div className="crypto-card" role='button' onClick={() => item?.attributes?.link && window.open(item?.attributes?.link, "_blank")}>
                            <div className="card-image">
                              <img src={item?.attributes?.image && item?.attributes?.image || HeroImg} alt="" className='img-fluid' />
                            </div>
                            <div className="card-content">
                              <h6 className="heading-6">{item?.attributes?.title && item?.attributes?.title || "No title available"}</h6>
                              <div className="by-date">
                                <p className='by-them small'>by <span className='fw-600'>{userLoginData?.name}</span></p>
                                <p className='article-date small fw-500'>{item?.attributes?.createdAt && moment(item?.attributes?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  }
                </div>
              </Container>
            </div>
          </section>

          <section className='lab-research-section lab-research-black-bg position-relative padding-100'>
            <Container className='default-container'>
              <div className="section-heading">
                <div className='d-flex align-item-center'>
                  <h2 className='mb-3 color-primary heading-2'>All Content</h2>
                </div>
                <hr className='color-white' />
              </div>
              <div className="lab-reaserch">
                {isLoading ?
                  MyLoader() :
                  <Row>
                    {allUserLinkdata && allUserLinkdata?.map((item: any, i: any) => (
                      <Col lg={3} md={6} xs={12} key={i}>
                        <div className="crypto-card" role='button' onClick={() => item?.attributes?.link && window.open(item?.attributes?.link, "_blank")}>
                          <div className="card-image">
                            <img src={item?.attributes?.image && item?.attributes?.image || HeroImg} alt="" className='img-fluid' />
                          </div>
                          <div className="card-content">
                            <h6 className="heading-6">{item?.attributes?.title && item?.attributes?.title || "No title available"}</h6>
                            <div className="by-date">
                              <p className='by-them small'>by <span className='fw-600'>{userLoginData?.name}</span></p>
                              <p className='article-date small fw-500'>{item?.attributes?.createdAt && moment(item?.attributes?.createdAt).format("MMM DD, YYYY") || "Mar 30, 2023"}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                }
              </div>
              <InfiniteScroll
                dataLength={allUserLinkdata?.length}
                next={fetchdata}
                hasMore={Number(allUserLinkdata?.length) >= Number(totalBlogLength) ? false : true}
                loader={
                  allUserLinkdata?.length < totalBlogLength ?
                    <div className="text-center">
                      Please Wait ...
                    </div> :
                    allUserLinkdata.length == 0 ?
                      <div className="text-center">
                        <h4 className='heading-4'>No data available</h4>
                      </div>
                      : ""
                }
                endMessage={
                  allUserLinkdata?.length == 0 ?
                    <div className="text-center">
                      <h4 className='heading-4'>No data available</h4>
                    </div> :
                    <p className='normal text-center'>
                      <b>Yay! You have seen it all</b>
                    </p>}>
              </InfiniteScroll>
            </Container>
          </section>

        </div>
        <ShareModal isOpen={shareModal} toggle={shareModalToggle} slug={params.id} operationType={"shareProfile"} />

      </div>
      <ToastContainer />
    </>
  )
}

export default CreatorProfile
