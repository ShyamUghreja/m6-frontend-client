import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import './creator-model.sass'
import MediumIcon from '../../../assets/images/medium-icon.svg';
import SpotifyIcon from '../../../assets/images/spotify-icon.svg';
import TwitterIcon from '../../../assets/images/twitter-icon.svg';
import YoutubeIcon from '../../../assets/images/youtube-icon.svg';
import SoundcloudIcon from '../../../assets/images/soundcloud-icon.svg';
import NotionIcon from '../../../assets/images/notion-icon.svg';
import SubstrackIcon from '../../../assets/images/substrack-icon.svg';
import AppleProdcastIcon from '../../../assets/images/apple-prodcast-icon.svg';
import GoogleProdcastIcon from '../../../assets/images/google-prodcast-icon.svg';
import SubstackModel from './substrack-model';
import { postTwitterVerifyLoginData, getTwitterLoginUrlData, postUnlinkSocialAccountData } from '../../../pages/API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
import LoaderComp from '../loader-component/loader-component';
import ListModel from './list-model';
import ContentLoader from 'react-content-loader';

const cardData = [
  {
    id: 1,
    name: "Medium",
    title: "Enter your Medium Token",
    image: MediumIcon,

  },
  {
    id: 2,
    name: "Spotify",
    image: SpotifyIcon,
    title: "Enter your Spotify RSS",
  },
  {
    id: 3,
    name: "Twitter",
    image: TwitterIcon,
  },
  {
    id: 4,
    name: "Youtube",
    title: "Enter your Youtube Channel Id",
    image: YoutubeIcon,
  },
  {
    id: 5,
    name: "Soundcloud",
    title: "Enter your Soundcloud RSS",
    image: SoundcloudIcon,
  },
  // {
  //   id: 6,
  //   name: "Notion",
  //   title: "Enter your Notion Url",
  //   image: NotionIcon,
  // },
  {
    id: 7,
    name: "Substack",
    title: "Enter your Substack RSS",
    image: SubstrackIcon,
  },
  // {
  //   id: 8,
  //   name: "Apple Podcasts",
  //   title: "Enter your Apple Podcasts RSS",
  //   image: AppleProdcastIcon,
  // },
  // {
  //   id: 9,
  //   name: "Google Podcasts",
  //   title: "Enter your Google Podcasts RSS",
  //   image: GoogleProdcastIcon,
  // },
]
interface createModalProps {
  isOpen: boolean,
  toggle: () => void,
  getUserLoginData: any,
  setRefreshData: () => void
}

export default function CreatorModel({ isOpen, toggle, getUserLoginData, setRefreshData }: createModalProps) {
  const [substrackModals, setSubstrackModals] = useState<boolean>(false)
  const [itemNameValue, setItemNameValue] = useState<any>()
  const [itemTitleValue, setItemTitleValue] = useState<any>()
  const substrackModalToggle = () => setSubstrackModals(!substrackModals);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [withMediumLogin, setWithMediumLogin] = useState(false);
  const [withSpotifyLogin, setWithSpotifyLogin] = useState(false);
  const [withTwitterLogin, setWithTwitterLogin] = useState(false);
  const [withYoutubeLogin, setWithYoutubeLogin] = useState(false);
  const [withSoundcloudLogin, setWithSoundcloudLogin] = useState(false);
  const [withNotionLogin, setWithNotionLogin] = useState(false);
  const [withSubstackLogin, setWithSubstackLogin] = useState(false);
  const [withApplePodcastsLogin, setWithApplePodcastsLogin] = useState(false);
  const [withGooglePodcastsLogin, setWithGooglePodcastsLogin] = useState(false);
  const [datacardDataContent, setDatacardDataContent] = useState(false);
  const [listModals, setListModals] = useState<boolean>(false)
  const ListModalToggle = () => setListModals(!listModals)

  const queryParams = new URLSearchParams(window.location.search);
  const oauth_token = queryParams.get("oauth_token")
  const oauth_verifier = queryParams.get("oauth_verifier")
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  const getTwitterLoginRedirectUrl = async () => {
    try {
      setIsLoading(true)
      await getTwitterLoginUrlData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const twitterUrl = await res.data.redirectUrl
            window.location.replace(String(twitterUrl));
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

  const unLinkSocialAccountData = async (platformData: string) => {
    try {
      setIsLoading(true)
      await postUnlinkSocialAccountData(platformData)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setRefreshData()
            toggle();
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

  const findItemNameValue = (item: any) => {
    setItemTitleValue(item.title)
    setItemNameValue(item.name)
  }

  useEffect(() => {
    setWithMediumLogin(getUserLoginData.isMediumLogin)
    setWithSpotifyLogin(getUserLoginData.isSpotifyLogin)
    setWithTwitterLogin(getUserLoginData.isTwitterLogin)
    setWithYoutubeLogin(getUserLoginData.isYoutubeLogin)
    setWithSoundcloudLogin(getUserLoginData.isSoundcloudLogin)
    // setWithNotionLogin(getUserLoginData.isTwitterLogin)
    setWithSubstackLogin(getUserLoginData.isSubstackLogin)
    setWithApplePodcastsLogin(getUserLoginData.isApplePodcastLogin)
    setWithGooglePodcastsLogin(getUserLoginData.isGooglePodcastLogin)
  }, [getUserLoginData])

  const cardDataContent = () => {
    return (
      <>
        <Col lg={6}>
          <ContentLoader width={"100%"}>
            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
            <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
            <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
            <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
          </ContentLoader>
        </Col>
        <Col lg={6}>
          <ContentLoader width={"100%"}>
            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
            <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
            <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
            <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
          </ContentLoader>
        </Col>
        <Col lg={6}>
          <ContentLoader width={"100%"}>
            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
            <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
            <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
            <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
          </ContentLoader>
        </Col>
        <Col lg={6}>
          <ContentLoader width={"100%"}>
            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
            <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
            <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
            <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
          </ContentLoader>
        </Col>
        <Col lg={6}>
          <ContentLoader width={"100%"}>
            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
            <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
            <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
            <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
            <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
          </ContentLoader>
        </Col>
      </>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setDatacardDataContent(true)
    }, 2000);
  }, [isLoading])

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <Modal
        show={isOpen}
        size="lg"
        onHide={toggle}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton={isOpen}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className='fw-600 heading-3'>Popular Platforms</h3>
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {/* <div className="add-url mb-3">
            <h3 className='fw-600 heading-3'>Popular Platforms</h3>
          </div> */}
          {/* <div className="add-url mb-3">
            <Form.Control type="text" placeholder="URL" />
            <Button className='view-all-btn d-flex view-all-btn-primary'>Add</Button>
          </div> */}
          <Row className="">
            {datacardDataContent ?
              <>
                {cardData.map((item, i) => (
                  <Col lg={6} key={i}>
                    <div className="social-link-card">
                      <div className="card-image">
                        <img src={item.image} className="img-fluid" alt="" />
                        {
                          item.name === "Medium" ?
                            withMediumLogin ?
                              <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                              <h4 className='heading-4'>{item.name}</h4> :

                            item.name === "Spotify" ?
                              withSpotifyLogin ?
                                <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                <h4 className='heading-4'>{item.name}</h4> :

                              item.name === "Twitter" ?
                                withTwitterLogin ?
                                  <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                  <h4 className='heading-4'>{item.name}</h4> :

                                item.name === "Youtube" ?
                                  withYoutubeLogin ?
                                    <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                    <h4 className='heading-4'>{item.name}</h4> :

                                  item.name === "Soundcloud" ?
                                    withSoundcloudLogin ?
                                      <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                      <h4 className='heading-4'>{item.name}</h4> :

                                    item.name === "Substack" ?
                                      withSubstackLogin ?
                                        <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                        <h4 className='heading-4'>{item.name}</h4> :

                                      // item.name === "Apple Podcasts" ?
                                      //   withApplePodcastsLogin ?
                                      //     <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                      //     <h4 className='heading-4'>{item.name}</h4> :

                                      //   item.name === "Google Podcasts" ?
                                      //     withGooglePodcastsLogin ?
                                      //       <h4 className='heading-4' role='button' onClick={() => { findItemNameValue(item); toggle(); ListModalToggle(); }}>{item.name}</h4> :
                                      //       <h4 className='heading-4'>{item.name}</h4> :

                                          ""
                        }
                      </div>
                      {
                        item.name === "Medium" ?
                          withMediumLogin ?
                            <h5 className='color-primary heading-5' role="button" onClick={() => {
                              unLinkSocialAccountData("medium")
                            }}>Unlink</h5> :
                            <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                          :
                          item.name === "Spotify" ?
                            withSpotifyLogin ?
                              <h5 className='color-primary heading-5' role="button" onClick={() => {
                                unLinkSocialAccountData("spotify")
                              }}>Unlink</h5> :
                              <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                            :
                            item.name === "Twitter" ?
                              withTwitterLogin ?
                                <h5 className='color-primary heading-5' role="button" onClick={() => {
                                  unLinkSocialAccountData("twitter")
                                }}>Unlink</h5> :
                                <h5 className='color-primary heading-5' role="button" onClick={getTwitterLoginRedirectUrl}>Link</h5>
                              :
                              item.name === "Youtube" ?
                                withYoutubeLogin ?
                                  <h5 className='color-primary heading-5' role="button" onClick={() => {
                                    unLinkSocialAccountData("youtube")
                                  }}>Unlink</h5> :
                                  <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                                :
                                item.name === "Soundcloud" ?
                                  withSoundcloudLogin ?
                                    <h5 className='color-primary heading-5' role="button" onClick={() => {
                                      unLinkSocialAccountData("soundcloud")
                                    }}>Unlink</h5> :
                                    <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                                  :
                                  // item.name === "Notion" ?
                                  //   withNotionLogin ?
                                  //     <h5 className='color-primary heading-5' onClick={() => {
                                  //       unLinkSocialAccountData("notion")
                                  //     }}>Unlink</h5> :
                                  //     <h5 className='color-primary heading-5' onClick={() => { substrackModalToggle(); toggle(); }}>Link</h5>
                                  //     :
                                  item.name === "Substack" ?
                                    withSubstackLogin ?
                                      <h5 className='color-primary heading-5' role="button" onClick={() => {
                                        unLinkSocialAccountData("substack")
                                      }}>Unlink</h5> :
                                      <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                                    :
                                    // item.name === "Apple Podcasts" ?
                                    //   withApplePodcastsLogin ?
                                    //     <h5 className='color-primary heading-5' role="button" onClick={() => {
                                    //       unLinkSocialAccountData("applepodcast")
                                    //     }}>Unlink</h5> :
                                    //     <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>
                                    //   :
                                    //   item.name === "Google Podcasts" ?
                                    //     withGooglePodcastsLogin ?
                                    //       <h5 className='color-primary heading-5' role="button" onClick={() => {
                                    //         unLinkSocialAccountData("googlepodcast")
                                    //       }}>Unlink</h5> :
                                    //       <h5 className='color-primary heading-5' role="button" onClick={() => { substrackModalToggle(); toggle(); findItemNameValue(item) }}>Link</h5>:
                                           ""
                        // :
                        // withTwitterLogin ?
                        //   <h5 className='color-primary heading-5' onClick={getSpotifyLoginRedirectUrl}>Link</h5> :
                        //   <h5 className='color-primary heading-5' onClick={() => { substrackModalToggle(); toggle(); }}>Link</h5>
                      }
                    </div>
                  </Col>
                ))}
              </> :
              cardDataContent()
            }
          </Row>
        </Modal.Body>
      </Modal>
      <ListModel listModelOpen={listModals} ListModelToggle={ListModalToggle} userItemNameValue={itemNameValue} setRefreshData={setRefreshData} />
      <SubstackModel substrackisOpen={substrackModals} substrackToggle={substrackModalToggle} itemNameValue={itemNameValue} itemTitleValue={itemTitleValue} setRefreshData={setRefreshData} />
      <ToastContainer />
    </>
  )
}
