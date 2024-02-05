import React, { useEffect, useState } from 'react';
import '../research/research.sass';
import Hero from '../../shared/components/hero/hero';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AllTags from '../../shared/components/all-tags/all-tags';
import LabResearch from '../../shared/components/lab-research/lab-research';
import { toast, ToastContainer } from 'react-toastify';
import { getAllCategorys, getcommunitydata, getNewsData } from '../API/ApiCall';
import ContentLoader from 'react-content-loader';

const Research = () => {
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const [allCategorySectionsData, setAllCategorySectionsData] = useState<any>()
  console.log("allCategorySectionsData", allCategorySectionsData)
  const location = useLocation()
  const pathname = location.pathname;

  const getNewsDataFromBackend = async (sectionName: string, type: string) => {
    try {
      setIsLoading(true)
      return await getNewsData(0, 4, "Category", false, false, "", "", sectionName, type)
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

  const getcommunitydataFromBackend = async (start: number, limit: number, categoryName: string) => {
    try {
      setIsLoading(true)
      return await getcommunitydata(start, limit, categoryName, "research")
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

            const getAllSectionsAPIResponseData = result?.true && result?.true?.map(async (item: any, index: any) => {
              let responseDataFromResearchAPI: any = []
              console.log("responseDataFromResearchAPI",responseDataFromResearchAPI)
              let responseDataFromResearchAPIArray = await getNewsDataFromBackend(item?.attributes?.slug, "research")
              console.log("responseDataFromResearchAPIArray",responseDataFromResearchAPIArray)
              // responseDataFromResearchAPI = Array.isArray(responseDataFromResearchAPIArray) ? responseDataFromResearchAPIArray : []
              if (Array.isArray(responseDataFromResearchAPIArray)) {
                const getAllToolsAPIRedsdfsponseData = responseDataFromResearchAPIArray && responseDataFromResearchAPIArray?.map((item: any, index: number) => {
                  try{
                  return {
                    "type": "cms",
                    "id": item?.attributes?.id || "",
                    "slug": item?.attributes?.slug || "",
                    "source": item?.attributes?.source || "",
                    "image": item?.attributes?.source && item?.attributes?.source == "research" ? item?.attributes?.thumbnailUrl && item?.attributes?.thumbnailUrl : item?.attributes?.bannerImage && item?.attributes?.bannerImage[0]?.url || "",
                    "title": item?.attributes?.source && item?.attributes?.source == "research" ? item?.attributes?.title : item?.attributes?.heading || "",
                    "categories": item?.attributes?.categories || [],
                    "date": item?.attributes?.source && item?.attributes?.source == "research" ? item?.attributes?.created : item?.attributes?.publishedAt || "",
                    "link": "",
                    "authors": item?.attributes?.source && item?.attributes?.source == "research" ? item?.attributes?.authors && item?.attributes?.authors[0] : item?.attributes?.author || "",
                  };
                }catch(errr : any)  {
                  return {
                    "type": "cms",
                    "id": "",
                    "slug": "",
                    "source": "",
                    "image":"",
                    "title": "",
                    "categories":  [],
                    "date": "",
                    "link": "",
                    "authors": "",
                  };
                }
                }) || []
                responseDataFromResearchAPI = await Promise.all(getAllToolsAPIRedsdfsponseData)
                console.log("getAllToolsAPIRedsdfsponseData", responseDataFromResearchAPI)
              }
              let responseDataFromCommunitiyAPI: any = []
              if (Array.isArray(responseDataFromResearchAPI) && responseDataFromResearchAPI.length < 4) {
                let responseDataFromCommunitiyAPIArray = await getcommunitydataFromBackend(0, 4 - Number(responseDataFromResearchAPI.length), item?.attributes?.slug)
                // responseDataFromCommunitiyAPI = Array.isArray(responseDataFromCommunitiyAPIArray) ? responseDataFromCommunitiyAPIArray : []
                if (Array.isArray(responseDataFromCommunitiyAPIArray)) {
                  const getAllToolsAPIResponseData = responseDataFromCommunitiyAPIArray && responseDataFromCommunitiyAPIArray?.map((item: any, index: number) => {
                    return {
                      "type": "community",
                      "id": item?.attributes?.id || "",
                      "slug": "",
                      "source": "",
                      "image": item?.attributes?.link?.image || "",
                      "title": item?.attributes?.link?.title || "",
                      "categories": item?.attributes?.link?.category?.name || "",
                      "date": item?.attributes?.link?.updatedAt || "",
                      "link": item?.attributes?.link?.link || "",
                      "authors": item?.attributes?.link?.user && item?.attributes?.link?.user?.name || ""
                    };
                  }) || []
                  responseDataFromCommunitiyAPI = await Promise.all(getAllToolsAPIResponseData)
                }
              }
              let mergeDataArray = [...responseDataFromResearchAPI, ...responseDataFromCommunitiyAPI]
              console.log("mergeDataArray", mergeDataArray)

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

  const nav = useNavigate();

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
      <ToastContainer />
      <div className="research-page ">
        <Container>
          <div className="mt-3 text-center">
            <h1 className='heading-1'>Research</h1>
            <p className='large-height page-description'>The best research from all corners of Web3, where brilliant minds come together to <br /> further our understanding of this developing sector</p>
          </div>
        </Container>
        <AllTags />
        <Hero />
        
        {allCategorySectionsData && allCategorySectionsData.map((item: any, i: number) => (
          <section className='lab-research-section position-relative last-lab-research-section' key={i} id={item?.keyName.toLowerCase()}>
            <div className="padding-section pb-0">
              <Container className='default-container'>
                <div className="section-heading ">
                  <div className='d-flex align-item-center'>
                    <h2 className='mb-3 color-primary heading-2'>{item?.fullName} Research</h2>
                  </div>
                  <hr />
                </div>
                {isLoading ?
                  MyLoader() :
                  <LabResearch sectionWeb3Data={item?.data} />
                }
                <Row>
                  <Col lg={12} md={12} className="text-center mt-4">
                    <button type="button" className="view-all-btn position-relative btn btn-primary" onClick={() => { { item?.keyName && nav(`/allcategory/research/${item?.keyName}`) } }}>View All</button>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        ))}

        {/* <section className='lab-research-section padding-100'>
          <Container>
            <div className="section-heading">
              <h2 className='text-center heading-2'>M6 Labs Research</h2>
            </div>
            <Row>
              <Trending />
            </Row>
          </Container>
        </section> */}
      </div>
    </>
  )
}

export default Research
