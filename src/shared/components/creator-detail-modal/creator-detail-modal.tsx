import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import { getAllCategorys, getAllWebSections, getUserSocialMedium, postAddUserLinkToProfile } from '../../../pages/API/ApiCall';
import LoaderComp from '../loader-component/loader-component';
import './creator-detail-modal.sass'

interface Creatordetailmodalprops {
    isOpen: boolean,
    toggle: () => void,
    userPlatformDatas: any,
    setRefreshData: () => void
}

function Creatordetailmodal({ isOpen, toggle, userPlatformDatas, setRefreshData }: Creatordetailmodalprops) {
    const [addLinkToProfile, setAddLinkToProfile] = useState({
        category: "",
        webMedium: "",
        webSection: "",
    });
    const [userSocialMediumData, setUserSocialMediumData] = useState<any>([])
    const [allCategory, setAllCategory] = useState<any>([])
    const [allWebSection, setAllWebSection] = useState<any>([])
    const [userSocialMediumDatas, setUserSocialMediumDatas] = useState<any>()
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            getUserSocialMediumData()
            getAllCategorysData()
            getAllWebSectionsData()
        }
        if (userPlatformDatas) {
            setUserSocialMediumDatas(userPlatformDatas)
        }
    }, [isOpen, userPlatformDatas])

    const getUserSocialMediumData = async () => {
        setIsLoading(true)
        try {
            await getUserSocialMedium()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setUserSocialMediumData(res.data.data)
                        setIsLoading(false)
                    }
                }).catch((err: any) => {
                    toast.error(err)
                    setIsLoading(false)
                })
        }
        catch (err: any) {
            toast.error(err)
            return { error: err?.response?.data };
        }
    };

    const getAllCategorysData = async () => {
        try {
            setIsLoading(true)
            await getAllCategorys()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setAllCategory(res.data.data)
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

    const getAllWebSectionsData = async () => {
        setIsLoading(true)
        try {
            await getAllWebSections()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setAllWebSection(res.data.data)
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

    const handleChange = (event: any) => {
        if (event.target.name) {
            setAddLinkToProfile({
                ...addLinkToProfile,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var checkErrorFlag = false
        if (addLinkToProfile?.webMedium.length <= 0) {
            checkErrorFlag = true
            toast.error("Please select web medium");
        } else if (addLinkToProfile?.category.length <= 0) {
            checkErrorFlag = true
            toast.error("Please select web section");
        }
        try {
            setIsLoading(true)
            if (!checkErrorFlag) {
                await postAddUserLinkToProfile(userSocialMediumDatas?.link, addLinkToProfile?.category, addLinkToProfile?.webMedium, addLinkToProfile?.webSection,)
                    .then(async (res: any) => {
                        if (res?.status === 200) {
                            toggle()
                            setRefreshData()
                            toast.success("Add link to profile successfully");
                            setIsLoading(false)
                        }
                    }).catch(error => {
                        toast.error(error.response.data)
                        setIsLoading(false)
                    })
            }
        } catch (error: any) {
            toast.success(error);
            setIsLoading(false)
            toggle()
        }
    }

    return (
        <>
            {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
            <Modal
                show={isOpen}
                size="lg"
                onHide={toggle}
                className="p-4 creator-det"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton={isOpen}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className='heading-2'>Add details</h2>
                    </Modal.Title>
                </Modal.Header>
                <hr />
                <Modal.Body className='p-2 p-lg-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* <div className='mt-lg-3 mt-2'>
                            <h5 className='fw-500 heading-5' style={{ color: '#0D0D1399' }}>Category</h5>
                            <Form.Select className='mt-lg-3 mt-2' aria-label="Default select example" name='category' onChange={handleChange}>
                                <option>Select Category</option>
                                {allWebSection.map((item: any, i: any) => (
                                    <option key={i} value={item.id}>{item.attributes.name}</option>
                                ))}
                            </Form.Select>
                        </div> */}
                        <div className=''>
                            <h5 className='fw-500 heading-5' style={{ color: '#0D0D1399' }}>Medium</h5>
                            <Form.Select className='mt-lg-3 mt-2' aria-label="Default select example" name='webMedium' onChange={handleChange}>
                                <option>Select Medium</option>
                                {userSocialMediumData.map((item: any, i: any) => (
                                    <option key={i} value={item.id}>{item.attributes.name}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className='mt-lg-3 mt-2'>
                            <h5 className='fw-500 heading-5' style={{ color: '#0D0D1399' }}>Tags</h5>
                            <Form.Select className='mt-lg-3 mt-2' aria-label="Default select example" name='category' onChange={handleChange}>
                                <option>Select Tags</option>
                                {allCategory.map((item: any, i: any) => (
                                    <option key={i} value={item.id}>{item.attributes.name}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <Button className='second-btn w-100 mt-lg-3 mt-2 rounded-0' type='submit'><h4 className='heading-4'>Submit Now</h4></Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default Creatordetailmodal