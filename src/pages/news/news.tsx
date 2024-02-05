import React, { useEffect, useState } from 'react';
import '../news/news.sass';
import { Button, Col, Container, Row } from 'react-bootstrap';
import LabResearch from '../../shared/components/lab-research/lab-research';
import AllTags from '../../shared/components/all-tags/all-tags';
import TrendingNews from '../../shared/components/trending-news/trending-news';
import Hero from '../../shared/components/hero/hero';
import { toast, ToastContainer } from 'react-toastify';
import { getAllCategorys, getAllNewsPublicationData, getNewsData, getcommunitydata } from '../API/ApiCall';
import Loader from '../../shared/components/loader/loader';
import { useLocation, useNavigate } from 'react-router-dom';
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader, { BulletList } from 'react-content-loader';

const News = () => {
  const [sectionWeb3Data, setSectionWeb3Data] = useState<any>()
  const [sectionDegenData, setSetionDegenData] = useState<any>()
  const [sectionCryptoData, setSetionCryptoData] = useState<any>()
  const [publicationsData, setPublicationsData] = useState<any>([])
  const [allCategorySectionsData, setAllCategorySectionsData] = useState<any>()
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const pathname = location.pathname;
  const nav = useNavigate()

  const getSectionNewsData = async (sectionName: string, publicationName?: string) => {
    try {
      setIsLoading(true)
      return await getNewsData(0, 4, sectionName === "publication" ? "Publication" : "Category", false, false, "", sectionName === "publication" ? publicationName : "",  sectionName != "publication" ? sectionName : "", "news")
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
          return { error: err?.res?.data }
        })
      return {}
    }
    catch (err: any) {
      toast.error(err?.response?.data?.error?.message)
      setIsLoading(false)
      return { error: err?.res?.data };
    }
  };

  const getSinglePublicationData = async (publicationName: string) => {
    try {
      setIsLoading(true)
      return await getNewsData(0, 1, "Publication", false, false, "", publicationName, "", "news")
        .then(async function (res: any) {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || [];
            setIsLoading(false)
            return allArticle
          } else {
            setIsLoading(false)
            return []
          }
        }).catch((err: any) => {
          toast.error(err?.response?.data?.error?.message)
          setIsLoading(false)
          return [{ error: err?.res?.data }];
        })
    }
    catch (err: any) {
      toast.error(err?.response?.data?.error?.message)
      setIsLoading(false)
      return [{ error: err?.res?.data }];
    }
    return []
  };

  const getAllSectionPublicationData = async () => {
    try {
      setIsLoading(true)
      await getAllNewsPublicationData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || [];
            const topSellingFinalDataArray = allArticle && allArticle?.map(async (item: any, i: any) => {
              let getSinglePublicationDataObj = await getSinglePublicationData(item?.attributes?.slug)
              let getSinglePublicationDataObject = await Promise.resolve(getSinglePublicationDataObj)
              console.log('getSinglePublicationDataObject', getSinglePublicationDataObject);
              let publicationDetailsObj = { "pubName": item?.attributes?.name, "publicaitonName": item?.attributes?.slug, "publicationObj": getSinglePublicationDataObject[0], "publicaitonDescription": item?.attributes?.slug === "m6-labs" ? "Daily crypto news and industry analysis" : item?.attributes?.slug === "renoded" ? "Distributing the best Web3 content and resources" : item?.attributes?.slug === "the-crypto-illuminati" ? "Curating the best content in crypto" : "" }
              setPublicationsData((prev: any) => [...prev, publicationDetailsObj])
            }) || []
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

  const getcommunitydataFromBackend = async (start: number, limit: number, categoryName: string) => {
    try {
      setIsLoading(true)
      return await getcommunitydata(start, limit, categoryName, "news")
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
              let responseDataFromResearchAPIArray = await getSectionNewsData(item?.attributes?.slug, "news")
              // responseDataFromResearchAPI = Array.isArray(responseDataFromResearchAPIArray) ? responseDataFromResearchAPIArray : []
              if (Array.isArray(responseDataFromResearchAPIArray)) {
                const getAllToolsAPIRedsdfsponseData = responseDataFromResearchAPIArray && responseDataFromResearchAPIArray?.map((item: any, index: number) => {
                  return {
                    "type": "cms",
                    "id": item?.id || "",
                    "slug": item?.attributes?.slug || "",
                    "source": item?.attributes?.source || "",
                    "image": item?.attributes?.thumbnailUrl || "",
                    "title": item?.attributes?.title || "",
                    "categories": item?.attributes?.categories || "",
                    "date": item?.attributes?.created || "",
                    "link": "",
                    "authors": item?.attributes?.authors[0] || ""
                  };
                }) || []
                responseDataFromResearchAPI = await Promise.all(getAllToolsAPIRedsdfsponseData)
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

  useEffect(() => {
    setPublicationsData([])
    getAllSectionPublicationData()
  }, [])

  const MyLoaderSecond = () => (
    <>
      <Row>
        <Col lg={4} md={6} xs={12}>
          <ContentLoader height={50} width={"100%"}>
            <rect y="0" ry="3" width="200" height="25" />
          </ContentLoader>
          <ContentLoader
            width={"100%"}
            viewBox="0 0 450 320"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
          >
            <rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
            <rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="217" />
          </ContentLoader>
          <BulletList />
        </Col>
        <Col lg={4} md={6} xs={12}>
          <ContentLoader height={50} width={"100%"}>
            <rect y="0" ry="3" width="200" height="25" />
          </ContentLoader>
          <ContentLoader
            width={"100%"}
            viewBox="0 0 450 320"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
          >
            <rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
            <rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="217" />
          </ContentLoader>
          <BulletList />
        </Col>
        <Col lg={4} md={6} xs={12}>
          <ContentLoader height={50} width={"100%"}>
            <rect y="0" ry="3" width="200" height="25" />
          </ContentLoader>
          <ContentLoader
            width={"100%"}
            viewBox="0 0 450 320"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
          >
            <rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
            <rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="217" />
          </ContentLoader>
          <BulletList />
        </Col>
      </Row>
    </>
  )
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
      <div className="news-page">
        <Container>
          <div className="mt-3 text-center">
            <h1 className='heading-1'>Stay up to date <br /> with our favorite newsletters</h1>
            <p className='large-height page-description'>Stay up-to-date on everything happening in Web3 with <br /> a curated collection of news articles, newsletters, and news publications</p>
          </div>
        </Container>
        <AllTags />
        <Hero />

        <section className='padding-100 pt-0'>
          <div className="padding-section pb-0">
            <Container>
              <Row>
                {isLoading ?
                  MyLoaderSecond() :
                  <TrendingNews publicationsData={publicationsData} />
                }
              </Row>
            </Container>
          </div>
        </section>

        {allCategorySectionsData && allCategorySectionsData.map((item: any, i: number) => (
          <section className='lab-research-section position-relative' key={i} id={item?.keyName.toLowerCase()}>
            <div className="padding-section pt-0">
              <Container className='default-container'>
                <div className="section-heading ">
                  <div className='d-flex align-item-center'>
                    <h2 className='mb-3 color-primary heading-2'>{item?.fullName} News</h2>
                  </div>
                  <hr />
                </div>
                {isLoading ?
                  MyLoader() :
                  <LabResearch sectionWeb3Data={item?.data} />
                }
                <Row>
                  <Col lg={12} md={12} className="text-center mt-4">
                    <button type="button" className="view-all-btn position-relative btn btn-primary" onClick={() => { { item?.keyName && nav(`/allcategory/news/${item?.keyName}`) } }}>View All</button>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        ))}

      </div>
    </>
  )
}

export default News
