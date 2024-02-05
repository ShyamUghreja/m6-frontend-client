import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../wallets/wallets.sass";
import "../people/people.sass";
import HeroImg from "../../assets/images/hero-img.webp";
import GridTable from "../../shared/components/grid-table/grid-table";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllPeoplesData } from "../API/ApiCall";
import Loader from "../../shared/components/loader/loader";
import LoaderComp from "../../shared/components/loader-component/loader-component";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const peopleToFollowApiUrl = `${BASE_URL}/api/people-to-follows`

export const People = () => {
  const [peopleToFollowTableData, setPeopleToFollowTableData] = useState<any[]>([]);
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getRequest()
  }, [])

  const getRequest = async (): Promise<any> => {
    try {
      setIsLoading(true)
      await getAllPeoplesData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const apiResponseData = await res.data.data
            const getAllpeoplesAPIResponseData = apiResponseData && apiResponseData?.map((item: any, index: number) => {
              return {
                "id": item?.id || "",
                "name": item?.attributes?.name || "",
                "platform": item?.attributes?.platform || "",
                "category": item?.attributes?.category || "",
                "link": item?.attributes?.link || ""
              };

            }) || []
            const fetchAllPeoplesDataArray = await Promise.all(getAllpeoplesAPIResponseData)
            console.log("fetchAllPeoplesDataArray", fetchAllPeoplesDataArray);
            setPeopleToFollowTableData(fetchAllPeoplesDataArray || []);
            setIsLoading(false)
          }
        }).catch((err: any) => {
          toast.error(err?.response?.data?.error?.message)
          setIsLoading(false)
        })
    } catch (err: any) {
      return { error: err?.response?.data };
    }
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1, renderCell: (params: any) => (<Link to="" onClick={() => { params.row.link && window.open(params.row.link, '_blank') }}>{params.row.name}</Link>) },
    { field: "platform", headerName: "Platform", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 }
  ];


  const TableLoader = () => (
    <ContentLoader
      width={"100%"}
      height={550}
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
    >
      <rect x="51" y="45" rx="3" ry="3" width="100%" height="17" />
      <rect x="5%" y="115" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="114" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="114" rx="3" ry="3" width="20%" height="15" />
      <rect x="55" y="155" rx="3" ry="3" width="100%" height="2" />

      <rect x="5%" y="176" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="175" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="175" rx="3" ry="3" width="20%" height="15" />
      <rect x="56" y="216" rx="3" ry="3" width="100%" height="2" />

      <rect x="5%" y="234" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="233" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="233" rx="3" ry="3" width="20%" height="15" />
      <rect x="57" y="274" rx="3" ry="3" width="100%" height="2" />

      <rect x="5%" y="295" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="294" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="294" rx="3" ry="3" width="20%" height="15" />
      <rect x="58" y="335" rx="3" ry="3" width="100%" height="2" />

      <rect x="5%" y="355" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="354" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="354" rx="3" ry="3" width="20%" height="15" />
      <rect x="57" y="395" rx="3" ry="3" width="100%" height="2" />

      <rect x="5%" y="416" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="415" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="415" rx="3" ry="3" width="20%" height="15" />
      <rect x="55" y="453" rx="3" ry="3" width="100%" height="2" />

      <rect x="51" y="49" rx="3" ry="3" width="2" height="100%" />
      <rect x="100%" y="49" rx="3" ry="3" width="2" height="100%" />
      <rect x="5%" y="476" rx="3" ry="3" width="20%" height="15" />
      <rect x="30%" y="475" rx="3" ry="3" width="40%" height="15" />
      <rect x="75%" y="475" rx="3" ry="3" width="20%" height="15" />
      <rect x="55" y="513" rx="3" ry="3" width="100%" height="2" />

      <rect x="52" y="80" rx="3" ry="3" width="100%" height="17" />
      <rect x="53" y="57" rx="3" ry="3" width="7%" height="33" />
      <rect x="20%" y="54" rx="3" ry="3" width="20%" height="33" />
      <rect x="90%" y="55" rx="3" ry="3" width="20%" height="33" />
      <rect x="60%" y="56" rx="3" ry="3" width="20%" height="33" />
    </ContentLoader>
  )

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <div className="">
        <section className="categories-defi-section">
          <div className="padding-section">
            <Container className="default-container position-relative">
              <div className="page-info-section people-page">
                <div className="page-info-heading">
                  <h2 className="font-bold heading-2">People</h2>
                  <h5 className="font-bold heading-5">To Follow</h5>
                </div>
              </div>
              <div className="responsive-table-mui">
                {isLoading ?
                  TableLoader() :
                  <GridTable tableValue={peopleToFollowTableData} columns={columns} />
                }
              </div>
            </Container>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};
