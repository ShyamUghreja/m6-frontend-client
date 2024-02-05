import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../wallets/wallets.sass";
import HeroImg from "../../assets/images/hero-img.webp";
import GridTable from "../../shared/components/grid-table/grid-table";
import { getAllWalletsData } from "../API/ApiCall";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../shared/components/loader/loader";
import LoaderComp from "../../shared/components/loader-component/loader-component";

export const Wallets = () => {

  const [walletsTableData, setWalletsTableData] = useState<any[]>([]);
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getRequest()
  }, [])

  const getRequest = async (): Promise<any> => {
    try {
      setIsLoading(true)
      await getAllWalletsData()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const apiResponseData = await res.data.data
            const getAllWalletsAPIResponseData = apiResponseData && apiResponseData?.map((item: any, index: number) => {
              return {
                "id": item.id || "",
                "name": item.attributes.name || "",
                "address": item.attributes.address || "",
                "approxAmount": item.attributes.approxAmount || "",
                "notes": item.attributes.notes || "",
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
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "approxAmount", headerName: "Approx Amount", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 }
  ];

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <div className="">
        <section className="categories-defi-section">
          <div className="padding-section">
            <Container className="default-container position-relative">
              <div className="page-info-section">
                <div className="page-info-heading">
                  <h2 className="font-bold heading-2">Wallets</h2>
                  <h5 className="font-bold heading-5">Interesting to track</h5>
                </div>
              </div>
              <div className="responsive-table-mui">
                <GridTable tableValue={walletsTableData} columns={columns} />
              </div>
            </Container>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};
