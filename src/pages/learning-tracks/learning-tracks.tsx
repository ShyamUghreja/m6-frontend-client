import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./learning-tracks.sass";
// import HeroImg from "../../assets/images/hero-img.webp";
import { bigginerCardDetails } from '../../shared/json/data'
import HeroImg from '../../assets/icons/educators/bannerImage.jpg';
import milesIcon from "../../assets/icons/educators/miles_deutscher.svg"
import route2FIIcon from "../../assets/icons/educators/route2fi.svg"
import deFiEdgeIcon from "../../assets/icons/educators/defiEdge.svg"
import dynamoDefiIcon from "../../assets/icons/educators/dynamo_defi.svg"
import ignasIcon from "../../assets/icons/educators/ignas.svg"
import shivsakIcon from "../../assets/icons/educators/shivsak.svg"
import CuratedContent from "../../shared/components/curated-content/curated-content";
import { getAllCategorys, getcommunitydata } from "../API/ApiCall";
import { toast } from "react-toastify";
import LabResearch from "../../shared/components/lab-research/lab-research";
import ContentLoader from "react-content-loader";
import AllTags from "../../shared/components/all-tags/all-tags";

const ResourcesCardDetails = [
  {
    id: 1,
    title: "Be a Sleuth, Not a Victim! (0→100 On-Chain Analysis Guide)",
    tag: "Metaverse",
    author: 'Russian DeFi',
    publishDate: '29 Mar 2023'
  },
];
const CreatorName = [
  {
    id: 1,
    title: "Miles Deutscher",
    image: milesIcon,
    link: 'https://twitter.com/milesdeutscher'
  },
  {
    id: 2,
    title: "Route2FI",
    image: route2FIIcon,
    link: 'https://twitter.com/Route2FI'
  },
  {
    id: 3,
    title: "DeFiEdge",
    image: deFiEdgeIcon,
    link: 'https://twitter.com/thedefiedge'
  },
  {
    id: 4,
    title: "Dynamo DeFi",
    image: dynamoDefiIcon,
    link: 'https://twitter.com/Dynamo_Patrick/photo'
  },
  {
    id: 5,
    title: "Ignas",
    image: ignasIcon,
    link: 'https://twitter.com/DefiIgnas'
  },
  {
    id: 6,
    title: "Shivsak",
    image: shivsakIcon,
    link: 'https://twitter.com/shivsakhuja'
  },
];

export const LearningTracks = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [allCategorySectionsData, setAllCategorySectionsData] = useState<any>()

  const nav = useNavigate();

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

  const getcommunitydataFromBackend = async (start: number, limit: number, category: string) => {
    try {
      setIsLoading(true)
      return await getcommunitydata(start, limit, category, "education")
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || [];
            return allArticle;
          }
          return []
        }).catch((err: any) => {
          toast.error(err?.response?.data?.error?.message)
          setIsLoading(false)
          return { error: err?.res?.data };
        })
      return {}
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
            let result = data.reduce(function (r: any, a: any) {
              r[a?.attributes?.scrollable] = r[a?.attributes?.scrollable] || [];
              r[a?.attributes?.scrollable].push(a);
              return r;
            }, Object.create(null));
            console.log("asdasdasdasda", result)
            const getAllSectionsAPIResponseData = result?.true && result?.true?.map(async (item: any, index: any) => {
              let responseDataFromCommunitiyAPI: any = []
              let responseDataFromCommunitiyAPIArray = await getcommunitydataFromBackend(0, 4, item?.attributes?.slug || "")
              if (Array.isArray(responseDataFromCommunitiyAPIArray)) {
                const getAllToolsAPIResponseData = responseDataFromCommunitiyAPIArray && responseDataFromCommunitiyAPIArray?.map((item: any, index: number) => {
                  console.log("itemitem", item);
                  return {
                    "id": item?.attributes?.id || "",
                    "slug": "",
                    "image": item?.attributes?.link?.image || "",
                    "title": item?.attributes?.link?.title || "",
                    "categories": item?.attributes?.link?.category?.name || "",
                    "date": item?.attributes?.link?.updatedAt || "",
                    "link": item?.attributes?.link?.link || "",
                  };
                }) || []
                responseDataFromCommunitiyAPI = await Promise.all(getAllToolsAPIResponseData)
              }

              let mergeDataArray: any = responseDataFromCommunitiyAPI
              return {
                "keyName": item?.attributes?.slug,
                "fullName": item?.attributes?.name,
                "data": mergeDataArray || []
              };
            }) || []
            const fetchSectionDataArray = await Promise.all(getAllSectionsAPIResponseData)
            console.log("fetchSectionDataArray", fetchSectionDataArray)
            setAllCategorySectionsData(fetchSectionDataArray || {})
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


  return (
    <>
      <div className="">
        <Container>
          <div className="mt-3 text-center">
            <h1 className="heading-1">Education</h1>
            <p className='large-height page-description'>Take your understanding of Web3 from 0 to 100 with <br /> our actionable education guides and curated content from all corners of the Web3 world</p>
          </div>
        </Container>

        <AllTags />

        <Container>
          <Row>
            <Col lg={4}>
              <div className="section-heading">
                <h2 className='color-primary heading-2'>Featured</h2>
              </div>
              <div className="hero-section-content" role="button" onClick={() => { nav(`/courses`) }}>
                <div className="hero-section-img">
                  {/* <img src={BASE_URL + allArtilcles?.attributes?.bannerImage[0]?.formats?.medium?.url} alt="" className='img-fluid' /> */}
                  <img src={HeroImg} alt="" className='img-fluid' />
                </div>

                <div className="text-part">
                  <div className="hero-heading justify-content-end">
                    {/* <div className='sub-heading'>The Crypto Illuminati</div> */}
                    <div className='d-flex'>
                      <Button className='default-button medium bg-color-primary'>Metaverse</Button>
                      <Button className='default-button medium bg-color-primary'>DeFi</Button>
                    </div>
                  </div>
                  <hr />
                  <h3 className='heading-3'>Be a Sleuth, Not a Victim! (0→100 On-Chain Analysis Guide)</h3>
                  <p className="normal">
                    In this guide, we cover what on-chain analysis is and provide some tips to assist you during your crypto journey.
                  </p>
                  <div className="by-date">
                    <p className='normal by-them'>by <span>Russian Defi</span></p>
                    <p className='normal article-date'>Mar 29, 2023</p>
                  </div>
                  <div className="daily-newsletters" onClick={e => e.stopPropagation()}>
                    <div className='news-heading color-white mb-3'>Sign Up For Our Daily Newsletter</div>
                    <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" width="100%" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: "0px!important", backgroundColor: "transparent" }}></iframe>
                    {/* <Form.Group className="position-relative" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Enter email address" />
                            <Button className='news-sign-button'>Submit</Button>
                        </Form.Group> */}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section-heading">
                <h2 className='heading-2'>Latest</h2>
              </div>
              {ResourcesCardDetails && ResourcesCardDetails?.map((item: any, i: any) => (
                <div key={i} className="latest-card" role="button" onClick={() => { nav(`/courses`) }}>
                  <div className="d-flex">
                    <Button className='default-button medium me-1'>{item.tag}</Button>
                  </div>
                  <h6 className="heading-6">{item.title}</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className='medium mr-5'>by <span className='fw-600'>{toTitleCase(item.author)}</span></p>
                    {/* <div className='center-dot'></div> */}
                    <p className='small article-date'>{item.publishDate}</p>
                  </div>
                </div>
              ))}
            </Col>
            <Col lg={4}>
              <div className="section-heading">
                <h2 className="heading-2">Top Creators</h2>
              </div>
              <div className="creator-cards card-before top-creators">
                <Row>
                  {CreatorName.map((item: any, i: any) => (
                    <Col lg={6} md={3} xs={6} key={i}>
                      <div className="ecosystem-card" role="button" onClick={() => { window.location.replace(item.link) }}>
                        <div className="card-image text-center">
                          <img src={item.image} alt="Card Image" className='img-fluid mx-auto' />
                        </div>
                        <div className="card-content">
                          <h6 className='text-center mt-lg-4 mt-md-3 mt-2 heading-6'>{item.title}</h6>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="home-curated" id={'actionableGuides'}>
          <CuratedContent />
        </div>

        {allCategorySectionsData && allCategorySectionsData.map((item: any, i: number) => (
          <section className='lab-research-section position-relative last-lab-research-section' key={i} id={item?.keyName.toLowerCase()}>
            <div className="padding-section pb-0">
              <Container className='default-container'>
                <div className="section-heading">
                  <div className='d-flex align-item-center'>
                    <h2 className='mb-3 color-primary heading-2'>{item?.fullName} Education</h2>
                  </div>
                  <hr />
                </div>
                {item?.data && item?.data?.length == 0 ?
                  <h4 className="heading-4 text-center">No data available</h4> :
                  <>
                    {
                      isLoading ?
                        MyLoader() :
                        <LabResearch sectionWeb3Data={item?.data} />
                    }
                    <Row>
                      <Col lg={12} md={12} className="text-center mt-4">
                        <button type="button" onClick={() => { { nav(`/allcategory/education/${item?.keyName}`) } }} className="view-all-btn position-relative btn btn-primary">View All</button>
                      </Col>
                    </Row>
                  </>
                }
              </Container>
            </div>
          </section>
        ))}

        {/* <section className="biginner-section position-relative">
          <div className="padding-section">
            <Container>
              
            </Container>
          </div>
        </section> */}

        {/* <section className='lab-research-section position-relative padding-100 pt-0'>
          <div className="padding-section pt-0">
          <Container className='default-container'>
            <div className="section-heading ">
              <div className='d-flex align-item-center'>
                <h2 className='mb-3 color-primary heading-2'>Web3 Education</h2>
              </div>
              <hr />
            </div>
            {bigginerCardDetails.map((item: any, i: any) => (
              <div className="" key={i}>
                <div className="section-heading">
                  <h2 className='heading-2'>{item.cardHeader}</h2>
                  <hr className="mt-2" />
                </div>
                <Row className="">
                  {item.content.map((contents: any, i: any) => (
                    <Col lg={4} md={6} sm={6} className="" key={i}>
                      <div className="crypto-card" role="button" onClick={() => { nav("/courses") }}>
                        <div className="card-image">
                          <img src={contents.image} alt="" className="img-fluid" />
                        </div>
                        <div className="card-content">
                          <div className="">
                            <h5 className="heading-5">{contents.title}</h5>
                            <hr />
                              <ul className="card-desctption-point">
                                {contents.point && contents.point.map((points: any, i: any) => (
                                  <li key={i}
                                  onClick={() => { nav(`/article/${item.id}/${contents.id}/${points.id}`) }}
                                  >
                                    <i className="ri-check-line"></i>
                                    <span>{points.name}</span>
                                  </li>
                                ))}
                              </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
           <Row>
          </Container>
          </div>
        </section> */}


        {/* <section className='lab-research-section position-relative'>
          <div className="padding-section pb-0">
            <Container className='default-container'>
              <div className="section-heading ">
                <div className='d-flex align-item-center'>
                  <h2 className='mb-3 color-primary heading-2'>Degen Education</h2>
                </div>
                <hr />
              </div>
              {bigginerCardDetails.map((item: any, i: any) => (
                <div className="" key={i}>
                  <Row className="">
                    {item.content.map((contents: any, i: any) => (
                      <Col lg={4} md={6} sm={6} className="" key={i}>
                        <div className="crypto-card" role="button" onClick={() => { nav("/courses") }}>
                          <div className="card-image">
                            <img src={contents.image} alt="" className="img-fluid" />
                          </div>
                          <div className="card-content">
                            <div className="">
                              <h5 className="heading-5">{contents.title}</h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Container>
          </div>
        </section> */}

        {/* <section className='lab-research-section position-relative padding-100 pt-0'>
          <div className="padding-section pb-0">
            <Container className='default-container'>
              <div className="section-heading ">
                <div className='d-flex align-item-center'>
                  <h2 className='mb-3 color-primary heading-2'>Crypto Education</h2>
                </div>
                <hr />
              </div>
              {bigginerCardDetails.map((item: any, i: any) => (
                <div className="" key={i}>
                  <Row className="">
                    {item.content.map((contents: any, i: any) => (
                      <Col lg={4} md={6} sm={6} className="" key={i}>
                        <div className="crypto-card" role="button" onClick={() => { nav("/courses") }}>
                          <div className="card-image">
                            <img src={contents.image} alt="" className="img-fluid" />
                          </div>
                          <div className="card-content">
                            <div className="">
                              <h5 className="heading-5">{contents.title}</h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Container>
          </div>
        </section> */}

      </div>
    </>
  );
};
