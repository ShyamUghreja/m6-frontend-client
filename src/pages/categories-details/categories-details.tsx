import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../categories-details/categories-details.sass";
import CryptoCard from "../../shared/components/crypto-card/crypto-card";
import { getAllCategorys } from "../API/ApiCall";
import { toast } from "react-toastify";
import Loader from "../../shared/components/loader/loader";
import LoaderComp from "../../shared/components/loader-component/loader-component";

export const CategoriesDetails = () => {
  const [allCategory, setAllCategory] = useState([])
  const [categoryName, setCategoryName] = useState<any>()
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  
  const nav = useNavigate()
  const params = useParams<{ subid: any }>();
  
  useEffect(() => {
    var categorie = allCategory.find((item:any)  => item.id == params.subid);
    setCategoryName(categorie || "")
  }, [allCategory]);

  useEffect(() => {
    getAllCategorysData()
  },[ params]);

  const getAllCategorysData = async () => {
    try {
      setIsLoading(true)
      await getAllCategorys()
        .then(async (res: any) => {
          if (res?.status === 200) {
            setAllCategory(res?.data?.data || [])
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

  return (
    <>
    {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <div className="">
        <section className="categories-defi-section primary-bg-background">
          <div className="padding-section py-3">
            <Container className="default-container  position-relative mb-lg-3 mb-md-3 mb-2">
              <Button className='default-button back-btn bg-color-primary d-lg-flex d-md-flex d-none btn-flip-primary position-absolute mt-3' data-back="Back" onClick={() => { nav(-1) }}><i className="ri-arrow-left-line" ></i>Back</Button>
              <Button className='default-button back-btn bg-color-primary d-lg-none d-md-none d-flex btn-flip-primary position-relative mt-3' data-back="Back" onClick={() => { nav(-1) }}><i className="ri-arrow-left-line" ></i>Back</Button>
              <h2 className="section-header text-center heading-2">
                  <span>{categoryName?.attributes?.name}</span>
              </h2>
            </Container>
            <Container>
              {/* <p className="large">{categoryName?.attributes?.description ? categoryName?.attributes?.description : "No text available"}</p> */}
              {/* <p className="mt-2 large">
                Vel quam elementum pulvinar etiam non quam lacus. Congue quisque
                egestas diam in arcu cursus euismod quis. Mauris nunc congue
                nisi vitae. Turpis massa tincidunt dui ut ornare lectus sit
                amet. Erat imperdiet sed euismod nisi porta lorem mollis aliquam
                ut.
              </p> */}
            </Container>
          </div>
        </section>
        <div className="padding-section pt-0">
          <CryptoCard />
        </div>
      </div>
    </>
  );
};
