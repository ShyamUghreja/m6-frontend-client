import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../podcasts/podcasts.sass'
import "../../shared/components/listening-card/listening-card.sass";
import Hero from '../../shared/components/hero/hero';
import AllTags from '../../shared/components/all-tags/all-tags';
import { toast } from 'react-toastify';
import { getAllCategorys, getPodcastsData, getcommunitydata } from '../API/ApiCall';
import LabResearch from '../../shared/components/lab-research/lab-research';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

const Podcasts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allCategorySectionsData, setAllCategorySectionsData] = useState<any>()
  const nav = useNavigate();
  const location = useLocation()
  const pathname = location.pathname;

  const getSectionPodcastsData = async (sectionName: string) => {
    try {
      setIsLoading(true)
      return await getPodcastsData(0, 4, "Category", false, false, "", sectionName, "")
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || [];
            setIsLoading(false)
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

  const getcommunitydataFromBackend = async (start: number, limit: number, keyName: string) => {
    try {
      setIsLoading(true)
      return await getcommunitydata(start, limit, keyName, "podcast")
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
            console.log("asdasdasdasda", result);

            const getAllSectionsAPIResponseData = result?.true && result?.true?.map(async (item: any, index: any) => {
              let responseDataFromResearchAPI: any = []
              let responseDataFromResearchAPIArray = await getSectionPodcastsData(item?.attributes?.slug)
              // responseDataFromResearchAPI = Array.isArray(responseDataFromResearchAPIArray) ? responseDataFromResearchAPIArray : []
              console.log("asdadasdsadasdasdada", responseDataFromResearchAPIArray);

              if (Array.isArray(responseDataFromResearchAPIArray)) {
                const getAllToolsAPIRedsdfsponseData = responseDataFromResearchAPIArray && responseDataFromResearchAPIArray?.map((item: any, index: number) => {
                  return {
                    "type": "cms",
                    "id": item?.id || "",
                    "slug": item?.attributes?.slug || "",
                    "image": item?.attributes?.imageLink || "",
                    "title": item?.attributes?.title || "",
                    "categories": item?.attributes?.categories || "",
                    "date": item?.attributes?.created || "",
                    "link": "",
                    "description": item?.attributes?.description || "",
                    "duration": item?.attributes?.duration || "",
                    "filelength": item?.attributes?.fileLength || "",
                    "authors": item?.attributes?.author || ""
                  };
                }) || []
                responseDataFromResearchAPI = await Promise.all(getAllToolsAPIRedsdfsponseData)
              }
              let slugName = responseDataFromResearchAPI?.attributes?.slug
              console.log("slugName0",slugName)
              let responseDataFromCommunitiyAPI: any = []
              if (Array.isArray(responseDataFromResearchAPI) && responseDataFromResearchAPI.length < 4) {
                let responseDataFromCommunitiyAPIArray = await getcommunitydataFromBackend(0, 4 - Number(responseDataFromResearchAPI.length), item?.attributes?.slug)
                if (Array.isArray(responseDataFromCommunitiyAPIArray)) {
                  const getAllToolsAPIResponseData = responseDataFromCommunitiyAPIArray && responseDataFromCommunitiyAPIArray?.map((item: any, index: number) => {
                    console.log("itemitem", item);

                    return {
                      "type": "community",
                      "id": item?.attributes?.id || "",
                      "slug": "",
                      "image": item?.attributes?.link?.image || "",
                      "title": item?.attributes?.link?.title || "",
                      "categories": item?.attributes?.link?.category?.name || "",
                      "date": item?.attributes?.link?.updatedAt || "",
                      "link": item?.attributes?.link?.link || "",
                      "description": "",
                      "duration": "",
                      "authors": "",
                      "filelength": "",
                    };
                  }) || []
                  responseDataFromCommunitiyAPI = await Promise.all(getAllToolsAPIResponseData)
                }
              }
              let mergeDataArray = [...responseDataFromResearchAPI, ...responseDataFromCommunitiyAPI]
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
            <h1 className='heading-1'>Podcasts</h1>
            <p className='large-height page-description'>Collection of podcasts that feature Web3 news, research, and education, <br /> as well as interviews with the top experts in Web3</p>
          </div>
        </Container>
        <AllTags />
        <Hero />
        {/* <div className="mt-5">
        <OurPodcasts />
        </div> */}
        {/* <section className='padding-100 pt-0'>
          <div className="padding-section pb-0">
            <Container>
              <Row>
                <TrendingNews publicationsData={publicationsData}/>
              </Row>
            </Container>
          </div>
        </section> */}

        {allCategorySectionsData && allCategorySectionsData.map((item: any, i: number) => (
          <section className='lab-research-section position-relative last-lab-research-section' key={i} id={item?.keyName.toLowerCase()}>
            <div className="padding-section pb-0">
              <Container className='default-container'>
                <div className="section-heading">
                  <div className='d-flex align-item-center'>
                    <h2 className='mb-3 color-primary heading-2'>{item?.fullName} Podcasts</h2>
                  </div>
                  <hr />
                </div>
                {isLoading ?
                  MyLoader() :
                  <LabResearch sectionWeb3Data={item?.data} />
                }
                <Row>
                  <Col lg={12} md={12} className="text-center mt-4">
                    <button type="button" onClick={() => { { item?.keyName && nav(`/allcategory/podcasts/${item?.keyName}`) } }} className="view-all-btn position-relative btn btn-primary">View All</button>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        ))}


        {/* <section className='first-section pt-0'>
          <div className="padding-section pt-0">
            <Container>
              <Row>
                <Col lg={12} md={12} >
                  <div className="page-info-heading mb-4">
                    <h2 className="font-bold heading-2">The Illuminati Round Table</h2>
                  </div>
                </Col>
              </Row>
              <Row>
                <PodcastsCard />
              </Row>
              <div className="d-flex mt-3 justify-content-center">
                <button type="button" className="view-all-btn position-relative btn btn-primary search-box-btn">View All</button>
              </div>
            </Container>
          </div>
        </section> */}

        {/* podcasts listing */}

        {/* <section className='second-section'>
          <div className="padding-section">
            <Container>
              <Row>
                <Col lg={12} md={12} >
                  <div className="section-heading">
                    <h2 className='heading-2'>The Illuminati Round Table</h2>
                    <hr />
                  </div>
                </Col>
              </Row>
              <Row>
                <ListeningCard />
              </Row>
            </Container>
          </div>
        </section> */}
      </div>
    </>
  )
}

export default Podcasts
