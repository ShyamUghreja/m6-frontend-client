import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../wallets/wallets.sass";
import "../best-tool/best-tool.sass";
import HeroImg from "../../assets/images/hero-img.webp";
import GridTable from "../../shared/components/grid-table/grid-table";
import { getAllBestToolsData } from '../API/ApiCall';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../shared/components/loader/loader";
import '../wallets-app/wallets-app.sass'
import { Link } from "react-router-dom";
import LoaderComp from "../../shared/components/loader-component/loader-component";
import ContentLoader from "react-content-loader";


export const BestTool = () => {

  const [bestToolsTableData, setBestToolsTableData] = useState<any>();
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    bestToolsGetData()
  }, [])

  const bestToolsGetData = async () => {
    try {
      setIsLoading(true)
      await getAllBestToolsData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const bestToolsData = await res.data.data
            const getAllToolsAPIResponseData = bestToolsData && bestToolsData?.map((item: any, index: number) => {
              return {
                "id": item?.id || "",
                "name": item?.attributes?.name || "",
                "description": item?.attributes?.description || "",
                "tag": item?.attributes?.tag || "",
                "link": item?.attributes?.link || "",
                "imageData": item?.attributes?.logoImage && item?.attributes?.logoImage?.data?.attributes?.url || ""
              };
            }) || []
            const fetchAllToolsDataArray = await Promise.all(getAllToolsAPIResponseData)
            console.log(fetchAllToolsDataArray)
            let result = fetchAllToolsDataArray.reduce(function (r, a) {
              console.log("asaa", a, r);
              r[a?.tag] = r[a?.tag] || [];
              r[a?.tag].push(a);
              return r;
            }, Object.create(null));
            console.log(result);
            setBestToolsTableData(result || {})
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

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "tag", headerName: "Tag", flex: 1 }
  ];

  const ProfileCard = () => {
    return (
      <Row>
        <Col lg={12}>
          <ContentLoader
            width={400}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="100" width="100%" height="36" />
          </ContentLoader>
        </Col>
        <Col lg={2}>
          <ContentLoader
            width={150}
            height={170}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50%" cy="59" r="30" />
            <rect x="0" y="120" width="100%" height="16" />
          </ContentLoader>
        </Col>
        <Col lg={2}>
          <ContentLoader
            width={150}
            height={170}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50%" cy="59" r="30" />
            <rect x="0" y="120" width="100%" height="16" />
          </ContentLoader>
        </Col>
        <Col lg={2}>
          <ContentLoader
            width={150}
            height={170}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50%" cy="59" r="30" />
            <rect x="0" y="120" width="100%" height="16" />
          </ContentLoader>
        </Col>
        <Col lg={2}>
          <ContentLoader
            width={150}
            height={170}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50%" cy="59" r="30" />
            <rect x="0" y="120" width="100%" height="16" />
          </ContentLoader>
        </Col>

      </Row>
    )
  }

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      {/* <div className="">
        <section className="categories-defi-section">
          <div className="padding-section">
            <Container className="default-container position-relative">
              <div className="page-info-section">
                <div className="page-info-heading">
                  <h2 className="font-bold heading-2">Best Tools</h2>
                  <h5 className="font-bold heading-5">Interesting to track</h5>
                </div>
              </div>
              <div className="responsive-table-mui">
                <GridTable tableValue={bestToolsTableData} columns={columns} />
              </div>
            </Container>
          </div>
        </section>
      </div> */}

      <section className="categories-defi-section">
        <div className="padding-section pb-0">
          <Container className="default-container position-relative">
            <div className="page-info-section mb-0 best-tool-page">
              <div className="page-info-heading">
                <h2 className="font-bold heading-2">Best Tools</h2>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className='curated-content-section'>
        <div className="padding-section">
          <Container>
            {isLoading ?
              ProfileCard() :
              <>
                {bestToolsTableData && Object.keys(bestToolsTableData).map((key: any, i: any) => (
                  <div key={i}>
                    <div className="section-heading">
                      <h2 className='color-primary heading-2'>{key}</h2>
                      <hr className="mt-3" />
                    </div>
                    <Row className="mb-lg-5 mb-md-4 mb-3">
                      <div className="apps-card">
                        {bestToolsTableData[key].map((item: any, i: any) => (
                          <Link to="" onClick={() => { item?.link && window.open(item?.link, "_blank") }} key={i} className="wallet-apps-card card-image">
                            <div className="card-image">
                              <img src={item?.imageData || HeroImg} alt="" className='img-fluid mx-auto' />
                            </div>
                            <div className="card-content">
                              <h5 className='heading-5'>{item.name}</h5>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Row>
                  </div>
                ))}
              </>
            }
          </Container>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
