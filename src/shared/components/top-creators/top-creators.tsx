import React, { useEffect, useState } from 'react';
import '../crypto-card/crypto-card.sass';
import HeroImg from '../../../assets/images/hero-img.webp';
import '../top-creators/top-creators.sass'
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getTopCreators } from '../../../pages/API/ApiCall';
import ContentLoader from 'react-content-loader';

function TopCreators() {
  const [topCreator, setTopCreator] = useState([])
  const location = useLocation();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [totalNumberOfLatestRecords, setTotalNumberOfLatestRecords] = useState(0)

  const getTopCreatorsData = async () => {
    try {
      setIsLoading(true)
      await getTopCreators()
        .then(async (res: any) => {
          if (res?.status === 200) {
            setTopCreator(res?.data?.data || [])
            setTotalNumberOfLatestRecords(res?.data?.meta?.pagination?.total || 0)
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
    getTopCreatorsData()
  }, [])

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      {isLoading ?
        <>
          <ContentLoader height={50} width={"100%"}>
            <rect y="0" ry="3" width="200" height="25" />
          </ContentLoader>
          <Row>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <ContentLoader width={"100%"}>
                <circle cx="70" cy="50" r="30" />
                <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />
              </ContentLoader>
            </Col>
          </Row>
        </> :
        <>
          <div className="section-heading">
            <h2 className='heading-2'>Top Creators</h2>
          </div>
          <div className="creator-cards top-creators">
            <Row>
              {topCreator.map((item: any, i: any) => (
                <Col lg={6} md={6} xs={6} key={i}>
                  <div className="ecosystem-card" role="button" onClick={() => { item.id && nav(`/creatorprofile/${item.id}`, { state: { id: item?.id } }) }}>
                    <div className="card-image text-center">
                      <img src={item?.attributes?.profilePic && item?.attributes?.profilePic?.url || HeroImg} alt="Card" className='img-fluid mx-auto' />
                    </div>
                    <div className="card-content">
                      <h5 className='text-center mt-lg-4 mt-md-3 mt-2 heading-5'>{item?.attributes?.name}</h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            {totalNumberOfLatestRecords && totalNumberOfLatestRecords > 6 ?
              <div className="creator-all-btn">
                <Button onClick={() => { nav("/allcreator") }}><div className='btn-div'>View All Creators</div></Button>
              </div> : ""
            }
          </div>
          <ToastContainer />
        </>
      }
    </>
  );
}

export default TopCreators;