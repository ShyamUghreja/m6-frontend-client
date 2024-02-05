import React, { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "../wallets/wallets.sass";
import "../topblogs/topblogs.sass";
import HeroImg from "../../assets/images/hero-img.webp";
import Pagination from "../../shared/components/pagination/pagination";
import GridTable from "../../shared/components/grid-table/grid-table";
import { getAllWalletsData, getTopPublicationsData } from "../API/ApiCall";
import { toast } from "react-toastify";
import Loader from "../../shared/components/loader/loader";
import LoaderComp from "../../shared/components/loader-component/loader-component";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";

export const TopBlogs = () => {
  const [walletsTableData, setWalletsTableData] = useState<any[]>([]);
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getRequest()
  }, [])

  const getRequest = async (): Promise<any> => {
    try {
      setIsLoading(true)
      await getTopPublicationsData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const apiResponseData = await res.data.data
            const getAllWalletsAPIResponseData = apiResponseData && apiResponseData?.map((item: any, index: number) => {
              return {
                "id": item.id || "",
                "name": item.attributes.name || "",
                "platform": item.attributes.platform || "",
                "description": item.attributes.description || "",
                "link": item.attributes.link || ""
              };
            }) || []
            const fetchAllWalletsDataArray = await Promise.all(getAllWalletsAPIResponseData)
            setWalletsTableData(fetchAllWalletsDataArray || [])
            setIsLoading(false)
          }
        }).catch((err: any) => {
          toast.error(err?.response?.data?.error?.message)
          setIsLoading(false)
        })
    } catch (err: any) {
      setIsLoading(false)
      return { error: err?.response?.data };
    }
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1, renderCell: (params: any) => (<Link to="" onClick={() => { params.row.link && window.open(params.row.link, '_blank') }}>{params.row.name}</Link>) },
    // { field: "platform", headerName: "Platform", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 }
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

      <div className="">
        <section className="categories-defi-section">
          <div className="padding-section">
            <Container className="default-container position-relative">
              <div className="page-info-section top-blog-page">
                <div className="page-info-heading">
                  <h2 className="font-bold heading-2">Top Publications</h2>
                  <h5 className="font-bold heading-5">To Follow</h5>
                </div>
              </div>
              <div className="responsive-table-mui">
                {isLoading ?
                  TableLoader() :
                  <GridTable tableValue={walletsTableData} columns={columns} />
                }
              </div>
            </Container>
          </div>
        </section>
      </div>
    </>
  );
};
