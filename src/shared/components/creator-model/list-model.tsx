import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import './creator-model.sass'
import SubstrackIcon from '../../../assets/images/substrack-icon.svg';
import MediumIcon from '../../../assets/images/medium-icon.svg';
import SpotifyIcon from '../../../assets/images/spotify-icon.svg';
import TwitterIcon from '../../../assets/images/twitter-icon.svg';
import YoutubeIcon from '../../../assets/images/youtube-icon.svg';
import SoundcloudIcon from '../../../assets/images/soundcloud-icon.svg';
import Creatordetailmodal from '../../../shared/components/creator-detail-modal/creator-detail-modal';
import { toast } from 'react-toastify';
import { getUserLinkedPlatformData } from '../../../pages/API/ApiCall';
import ContentLoader from 'react-content-loader';

interface createModalProps {
  listModelOpen: boolean,
  ListModelToggle: () => void,
  userItemNameValue: any,
  setRefreshData: () => void
}
export default function ListModel({ listModelOpen, userItemNameValue, ListModelToggle, setRefreshData }: createModalProps) {
  const [creatordetailmodal, setCreatordetailmodal] = useState<boolean>(false)
  const creatordetailmodalToggle = () => setCreatordetailmodal(!creatordetailmodal)
  const userLinkData = (item: any) => {
    setUserPlatformDatas(item)
  }

  const [userPlatformDatas, setUserPlatformDatas] = useState<any>()
  const [userPlatformData, setUserPlatformData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserPlatformData = async (platform: string) => {
    try {
      setIsLoading(true)
      await getUserLinkedPlatformData(platform)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setUserPlatformData(res?.data?.data || [])
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
    if (listModelOpen) {
      getUserPlatformData(
        userItemNameValue === "Medium" ? "medium" :
          userItemNameValue === "Spotify" ? "spotify" :
            userItemNameValue === "Twitter" ? "twitter" :
              userItemNameValue === "Soundcloud" ? "soundcloud" :
                userItemNameValue === "Youtube" ? "youtube" :
                  userItemNameValue === "Substack" ? "substack" :
                    userItemNameValue === "Apple Podcasts" ? "applepodcast" :
                      userItemNameValue === "Google Podcasts" ? "googlepodcast" : "twitter"
      )
    }
  }, [listModelOpen, userItemNameValue])

  const cardDataContent = () => {
    return (
      <>
        <Col lg={12}>
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
        <Col lg={12}>
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
        <Col lg={12}>
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
        <Col lg={12}>
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
        <Col lg={12}>
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


  return (
    <>
      <Modal
        show={listModelOpen}
        size="lg"
        onHide={ListModelToggle}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton={listModelOpen}>
          <Modal.Title id="contained-modal-title-vcenter">
            Your Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="">
            {isLoading ?
              cardDataContent() :
              <>
                {userPlatformData.map((item: any, i: any) => (
                  <Col lg={12} key={i}>
                    <div className="social-link-card">
                      <div className="card-image">
                        <img src={
                          userItemNameValue === "Medium" ? MediumIcon :
                            userItemNameValue === "Spotify" ? SpotifyIcon :
                              userItemNameValue === "Twitter" ? TwitterIcon :
                                userItemNameValue === "Soundcloud" ? SoundcloudIcon :
                                  userItemNameValue === "Youtube" ? YoutubeIcon :
                                    userItemNameValue === "Substack" ? SubstrackIcon : ""
                          // userItemNameValue === "Apple Podcasts" ? "applepodcast" :
                          //   userItemNameValue === "Google Podcasts" ? "googlepodcast" : "twitter"
                        } className="img-fluid" alt="" />
                        <h6 className='heading-6'>{item.title}</h6>
                      </div>
                      {
                        item?.isAdded && item.isAdded === true ?
                          <h6 className='color-primary heading-6 text-success'>Added</h6> :
                          <h6 className='color-primary heading-6' role="button" onClick={() => { creatordetailmodalToggle(); userLinkData(item); ListModelToggle() }}>Add</h6>
                      }
                    </div>
                  </Col>
                ))
                }
              </>
            }
          </Row>
        </Modal.Body>
      </Modal>
      <Creatordetailmodal isOpen={creatordetailmodal} toggle={creatordetailmodalToggle} userPlatformDatas={userPlatformDatas} setRefreshData={setRefreshData} />
    </>
  )
}
