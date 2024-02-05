import React, { useEffect, useState } from 'react';
import '../creator/creator.sass';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Creatorprofile from '../../shared/components/creator-profile/creator-profile';
import CreatorModel from '../../shared/components/creator-model/creator-model';
import { getAllUserLinks, getLoginUserdata, postTwitterVerifyLoginData, postUpdateFeaturedCardOperation } from '../API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../shared/components/loader/loader';
import ListModel from '../../shared/components/creator-model/list-model';
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader from 'react-content-loader';

const Creator = () => {
  const [createModals, setCreateModals] = useState<boolean>(false)
  const [featured, setFeatured] = useState<boolean>(false)
  const createModalToggle = () => setCreateModals(!createModals)
  const [userLoginData, setUserLoginData] = useState<any>({})
  const [allUserLinkdata, setAllUserLinkData] = useState<any>([])
  const [refreshData, setRefreshData] = useState<boolean>(false)
  const refreshLoginDatamodalToggle = () => setRefreshData(!refreshData)
  const queryParams = new URLSearchParams(window.location.search);
  const oauth_token = queryParams.get("oauth_token")
  const oauth_verifier = queryParams.get("oauth_verifier")
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem("user_id")
  const [listModals, setListModals] = useState<boolean>(false)
  const ListModalToggle = () => setListModals(!listModals)

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

  const postTwitterVerifyLoginDetails = async () => {
    try {
      setIsLoading(true)
      await postTwitterVerifyLoginData(oauth_token, oauth_verifier)
        .then(async (res: any) => {
          if (res?.status === 200) {
            const IsLogin = await res.data
            await getLoginUserDataFromAPI()
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

  const verifyAPICallBack = async () => {
    await postTwitterVerifyLoginDetails()
    ListModalToggle();
  }

  const isEmpty = (obj: any) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  let paginationStart = 0;
  let paginationLimit = 25;

  const getAllUserLinksData = async () => {
    try {
      setIsLoading(true)
      await getAllUserLinks(paginationStart, paginationLimit)
        .then(async (res: any) => {
          if (res?.status === 200) {
            console.log('res?.data?.data', res?.data?.data);
            setAllUserLinkData(res?.data?.data || [])
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
    if (oauth_token && oauth_token.length > 0 && !isEmpty(userLoginData) && !userLoginData.isTwitterLogin) {
      verifyAPICallBack()
    }
  }, [oauth_token, userLoginData])

  useEffect(() => {
    if (userId !== null) {
      getLoginUserDataFromAPI();
      getAllUserLinksData()
    } else {
      setUserLoginData({})
    }
  }, [refreshData, userId])

  const updateSetFeaturedCardStatus = async (itemId: any, switchType: boolean, opType: string) => {
    try {
      setIsLoading(true)
      await postUpdateFeaturedCardOperation(itemId, switchType, opType)
        .then(async (res: any) => {
          if (res?.status === 200) {
            const data = await res.data
            refreshLoginDatamodalToggle()
            if (opType === "SubmitCommunity") {
              toast.success("Article successfully submitted in community")
            }
            // if (opType === "Featured") {
            //   toast.success(res?.data?.message)
            // }
            if (opType === "Remove") {
              toast.success("Article remove successfully")
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
  }

  const FormContent = () => {
    return (
      <Row>
        <Col lg={6} md={6}>
          <ContentLoader
            height={200}
            width={"100%"}
            backgroundColor="#d9d9d9"
            foregroundColor="#ecebeb"
          >
            <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
            <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
            <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
            <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
            <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
            <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
            <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
            <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
            <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
            <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
            <rect x="160" y="130" rx="3" ry="3" width="225" height="10" />
          </ContentLoader>
        </Col>
        <Col lg={6} md={6}>
          <ContentLoader
            height={200}
            width={"100%"}
            backgroundColor="#d9d9d9"
            foregroundColor="#ecebeb"
          >
            <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
            <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
            <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
            <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
            <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
            <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
            <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
            <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
            <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
            <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
            <rect x="160" y="130" rx="3" ry="3" width="225" height="10" />
          </ContentLoader>
        </Col>
      </Row>
    )
  }

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <div className="creator-page">
        <Creatorprofile />
        <div>
          <section className='creator-section'>
            <div className="padding-section">
              <Container className='default-container' style={{ background: "#F4F4F499" }}>

                <div className="p-lg-5 p-md-4 p-2">
                  {isLoading ?
                    FormContent() :
                    <>
                      <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h4 className='heading-4'>Add content</h4>
                        {userId &&
                          <Button className='view-all-btn d-flex view-all-btn-primary' onClick={createModalToggle}><i className="ri-add-line me-2"></i> Content</Button>
                        }
                      </div>
                      <hr className='mb-lg-4 mb-3' />
                      <Row>
                        {allUserLinkdata && allUserLinkdata.map((item: any, i: any) => (
                          <Col lg={6} md={6} key={i}>
                            <div className="creator-link-card">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <h5 className='fw-500 heading-5'>{item?.attributes?.title}</h5>
                                  {/* <i className="ri-pencil-line ml-10" ></i> */}
                                </div>
                                {userId &&
                                  <Form.Check type="switch" id="disabled-custom-switch" onClick={(e: any) => { updateSetFeaturedCardStatus(item.id, e.target.checked, "Featured") }
                                  } defaultChecked={item?.attributes?.isFeatured} />
                                }
                              </div>
                              <div className="d-flex align-items-center my-lg-3 my-2">
                                <p className='large'>{item?.attributes?.link}</p>
                                {/* <i className="ri-pencil-line ml-10" ></i> */}
                              </div>
                              <div className="card-icon-btn d-flex justify-content-between align-items-center">
                                <Button className='view-all-btn d-flex view-all-btn-secondary py-2 px-3 rounded' onClick={(e: any) => { updateSetFeaturedCardStatus(item.id, false, "SubmitCommunity") }}>SUBMIT TO RENODED</Button>
                                {/*<div className="left-icon d-flex align-items-center">
                            <i className="ri-restart-line"></i>
                            <i className="ri-image-line"></i>
                            <i className="ri-star-line"></i>
                            <i className="ri-calendar-line"></i>
                            <i className="ri-lock-line"></i>
                          </div>
                          <div>
                          </div> */}
                                <i className="ri-delete-bin-7-line" role="button" onClick={(e: any) => { updateSetFeaturedCardStatus(item.id, false, "Remove") }}></i>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </>
                  }
                </div>
              </Container>
            </div>
          </section>
        </div>
      </div>
      <CreatorModel isOpen={createModals} toggle={createModalToggle} getUserLoginData={userLoginData} setRefreshData={refreshLoginDatamodalToggle} />
      <ListModel listModelOpen={listModals} ListModelToggle={ListModalToggle} userItemNameValue={"Twitter"} setRefreshData={refreshLoginDatamodalToggle} />
      <ToastContainer />
    </>
  )
}

export default Creator
