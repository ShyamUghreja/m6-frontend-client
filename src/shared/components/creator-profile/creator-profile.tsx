import React, { useEffect, useState } from 'react'
import './creator-profile.sass';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategorys, getLoginUserdata, getUserCategories, getUserSocialMedium, postUploadProfilePicCallBack, updateUserRegisterData } from '../../../pages/API/ApiCall';
import { toast, ToastContainer } from 'react-toastify';
// import LoaderComp from '../loader-component/loader-component';
import ImageUploading from "react-images-uploading";
import UploadIcon from '../../../assets/images/upload.svg';
import { Autocomplete, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import LoaderComp from '../loader-component/loader-component';
import ContentLoader from 'react-content-loader';
// import LoaderModal from '../loader-modal/loader-model';
// import LoaderComp from '../loader-modal/loader-model';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Creatorprofile = () => {
    const [allCategory, setAllCategory] = useState<any>([])
    const [userSocialMediumData, setUserSocialMediumData] = useState([])
    const [userCategories, setUserCategories] = React.useState<string[]>([]);
    const [msg, setMsg] = useState('Please Wait')
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshData, setIsRefreshData] = useState(false)
    const [images, setImages] = React.useState<any>([]);
    const maxNumber = 69;
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

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

    const [userLoginData, setUserLoginData] = useState<any>({})
    const [updatedUser, setUpdatedUser] = useState<any>({
        "name": "",
        "title": "",
        "webMedium": "",
        "webSection": "",
        "about": "",
        "twitterLink": "",
        "telegramLink": "",
        "mediumLink": "",
        "linkedinLink": "",
        "profilePictureLink": ""
    });

    const handleChange = (event: any) => {
        console.log('event', event);
        if (event.target.name) {
            console.log('event', event);
            setUpdatedUser({
                ...updatedUser,
                [event.target.name]: event.target.value
            });
        } else {
            setUserLoginData({
                ...updatedUser,
                [event.target.name]: event.target.value,
            });
        }
    };

    const [inputList, setInputList] = useState<any>([]);

    const handleRemoveClick = (index: any) => {
        console.log("ASda", index);
        const list = [...inputList];
        console.log("ASda11", list);
        list.splice(index, 1);
        console.log("ASda12", list);
        setInputList(list);
    };

    const handleUpdateKey = (index: any, targetKey: any) => {
        let list = [...inputList];
        list[index] = { socialmedia: targetKey, socialmediaurl: list[index].socialmediaurl };
        setInputList(list);
    };

    const handleUpdateValue = (index: any, targetValue: any) => {
        let list = [...inputList];
        list[index] = { socialmedia: list[index].socialmedia, socialmediaurl: targetValue };
        setInputList(list);
    };

    const handleAddClick = () => {
        if (inputList.length < 4) {
            setInputList([...inputList, { socialmedia: "", socialmediaurl: "" }]);
        }
    };

    useEffect(() => {
        getUserCategoriesData()
        // getUserSocialMediumData()
    }, []);

    useEffect(() => {
        getLoginUserDataFromAPI()
    }, [isRefreshData]);

    const getUserCategoriesData = async () => {
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

    const getUserSocialMediumData = async () => {
        try {
            setIsLoading(true)
            await getUserSocialMedium()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setUserSocialMediumData(res.data.data)
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log('updatedUserupdatedUser', updatedUser)
        var checkErrorFlag = false
        if (updatedUser.name <= 0) {
            checkErrorFlag = true
            toast.error("Name is required");
            setIsLoading(false)
        }
        try {
            if (!checkErrorFlag) {
                setIsLoading(true)

                let arrayOfIdsUserCategories: any = userCategories && userCategories.map((name) => allCategory && allCategory.find((el: any) => el?.attributes?.name == name).id) || [];
                await updateUserRegisterData(updatedUser.name, updatedUser.title, updatedUser.webMedium, updatedUser.webSection, updatedUser.about, updatedUser?.twitterLink, updatedUser?.telegramLink, updatedUser?.mediumLink, updatedUser?.linkedinLink, arrayOfIdsUserCategories)
                    .then(async (res: any) => {
                        if (res?.status === 200) {
                            setIsLoading(false)
                            setTimeout(async () => {
                                await postProfileImageUpload()
                                setIsRefreshData(!isRefreshData)
                            }, 1000);
                        }
                    }).catch(err => {
                        setIsLoading(false)
                    })
            }
        } catch (error: any) {
            setIsLoading(false)
        }
    }

    const getLoginUserDataFromAPI = async () => {
        try {
            setIsLoading(true)
            await getLoginUserdata()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        setUserLoginData(res?.data)
                        setUpdatedUser({
                            "name": res?.data?.name,
                            "title": res?.data?.title,
                            "webMedium": res?.data?.webMedium.id,
                            "webSection": res?.data?.webSection.id,
                            "about": res?.data?.about,
                            "twitterLink": res?.data?.twitterLink,
                            "telegramLink": res?.data?.telegramLink,
                            "mediumLink": res?.data?.mediumLink,
                            "linkedinLink": res?.data?.linkedinLink,
                            "profilePictureLink": res?.data?.profilePic ? res?.data?.profilePic?.formats?.thumbnail?.url : "",
                            // "userCategory":  res?.data?.webSection ? res?.data?.webSection.map(function(item : any) { return item["name"] }) : []
                        })
                        console.log("sadad22");
                        let arr = res?.data?.categories
                        console.log("sadad", res?.data);
                        setUserCategories(arr ? arr.map(function (item: any, i: number) { return item["name"] }) : [])
                        setInputList([])
                        res?.data?.twitterLink && res?.data?.twitterLink.length > 0 && setInputList([...inputList, { socialmedia: "twitterLink", socialmediaurl: res?.data?.twitterLink }]);
                        res?.data?.telegramLink && res?.data?.telegramLink.length > 0 && setInputList([...inputList, { socialmedia: "telegramLink", socialmediaurl: res?.data?.telegramLink }]);
                        res?.data?.mediumLink && res?.data?.mediumLink.length > 0 && setInputList([...inputList, { socialmedia: "mediumLink", socialmediaurl: res?.data?.mediumLink }]);
                        res?.data?.linkedinLink && res?.data?.linkedinLink.length > 0 && setInputList([...inputList, { socialmedia: "linkedinLink", socialmediaurl: res?.data?.linkedinLink }]);
                        if (res?.data?.twitterLink && res?.data?.twitterLink.length > 0 && res?.data?.telegramLink && res?.data?.telegramLink.length > 0 && res?.data?.mediumLink && res?.data?.mediumLink.length > 0 && res?.data?.linkedinLink && res?.data?.linkedinLink.length > 0) {
                            setInputList([...inputList, { socialmedia: "", socialmediaurl: "" }]);
                        }
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

    const postProfileImageUpload = async () => {
        try {
            const userId = localStorage.getItem("user_id")
            await postUploadProfilePicCallBack(userId + '', images.at(-1).file)
                .then(async (res: any) => {
                    if (res?.status === 200) {
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

    const handleChangeSelect = (event: SelectChangeEvent<typeof userCategories>) => {
        const {
            target: { value },
        } = event;
        setUserCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const Invoice = () => {
        return (
            <ContentLoader height={550} width={"100%"}>
                <rect x="11" y="16" rx="5" ry="5" width="160" height="160" />
                <rect x="240" y="36" rx="5" ry="5" width="100%" height="6" />
                <rect x="240" y="17" rx="5" ry="5" width="100%" height="12" />
                <rect x="240" y="69" rx="5" ry="5" width="100%" height="14" />
                <rect x="240" y="47" rx="5" ry="5" width="100%" height="6" />
                <rect x="11" y="127" rx="5" ry="5" width="141" height="11" />
                <rect x="11" y="191" rx="5" ry="5" width="198" height="12" />
                <rect x="11" y="207" rx="5" ry="5" width="214" height="14" />
                <rect x="11" y="225" rx="5" ry="5" width="193" height="14" />
                <rect x="90%" y="214" rx="5" ry="5" width="76" height="19" />
                <rect x="14" y="274" rx="5" ry="5" width="231" height="6" />
                <rect x="14" y="288" rx="5" ry="5" width="180" height="5" />
                <rect x="11" y="331" rx="5" ry="5" width="194" height="18" />
                <rect x="11" y="358" rx="5" ry="5" width="155" height="18" />
                <rect x="40%" y="359" rx="5" ry="5" width="100%" height="18" />
                <rect x="40%" y="335" rx="5" ry="5" width="100%" height="18" />
                <rect x="11" y="359" rx="5" ry="5" width="20%" height="18" />
                <rect x="11" y="335" rx="5" ry="5" width="20%" height="18" />
                <rect x="15" y="424" rx="5" ry="5" width="86" height="4" />
                <rect x="15" y="435" rx="5" ry="5" width="133" height="5" />
                <rect x="11" y="496" rx="5" ry="5" width="20%" height="18" />
                <rect x="40%" y="496" rx="5" ry="5" width="100%" height="18" />
                <rect x="40%" y="482" rx="5" ry="5" width="100%" height="3" />
                <rect x="40%" y="482" rx="5" ry="5" width="100%" height="3" />
            </ContentLoader>
        )
    }

    return (
        <>
            <section className='profile-edit-sec mt-5'>
                <div>
                    <Container>
                        {isLoading ?
                            Invoice() :
                            <div className='' style={{ background: "#F4F4F499" }}>
                                <div className='p-4'>
                                    <Form >
                                        <Row>
                                            <Col lg={2}>
                                                <div className=''>
                                                    <h5 className='fw-500 mb-2 heading-5'>Avatar</h5>
                                                    <div className='upload-btn'>
                                                        <ImageUploading
                                                            multiple
                                                            value={images}
                                                            onChange={onChange}
                                                            maxNumber={maxNumber}
                                                            dataURLKey="data_url"
                                                            acceptType={["jpg", "jpeg", "JPG"]}
                                                        >
                                                            {({
                                                                imageList,
                                                                onImageUpload,
                                                                onImageRemoveAll,
                                                                onImageUpdate,
                                                                onImageRemove,
                                                                isDragging,
                                                                dragProps
                                                            }) => (
                                                                <div className="upload__image-wrapper">
                                                                    <button
                                                                        type='button'
                                                                        className='position-relative'
                                                                        onClick={onImageUpload}
                                                                        {...dragProps}
                                                                    >
                                                                        <button className="edite-icon border-0" type='button' onClick={onImageUpload}>
                                                                            <i className="ri-pencil-fill"></i>
                                                                        </button>
                                                                        <img
                                                                            alt="demo"
                                                                            src={
                                                                                images && images.length > 0
                                                                                    ? images.at(-1).data_url
                                                                                    : updatedUser && updatedUser?.profilePictureLink.length > 0 ? updatedUser?.profilePictureLink : UploadIcon
                                                                            }
                                                                        />
                                                                    </button>
                                                                    &nbsp;
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={5}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label><h5 className='fw-500 heading-5'>Name <span style={{ color: "red" }}>*</span></h5></Form.Label>
                                                    <Form.Control onChange={handleChange} name='name' type="text" placeholder="Enter your name" value={toTitleCase(updatedUser.name)} />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='d-block'><h5 className='fw-500 heading-5'>Category</h5></Form.Label>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <Select
                                                            multiple
                                                            displayEmpty
                                                            value={userCategories}
                                                            onChange={handleChangeSelect}
                                                            input={<OutlinedInput />}
                                                            renderValue={(selected) => {
                                                                if (selected.length === 0) {
                                                                    return <p className="normal">Choose the categories of your content</p>;
                                                                }
                                                                return selected.join(', ');
                                                            }}
                                                            MenuProps={MenuProps}
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            {allCategory && allCategory.map((item: any, i: number) => (
                                                                <MenuItem key={i} value={item?.attributes?.name}>
                                                                    <Checkbox checked={userCategories.indexOf(item?.attributes?.name) > -1} />
                                                                    <ListItemText primary={item?.attributes?.name} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={5}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label><h5 className='fw-500 heading-5'>Title</h5></Form.Label>
                                                    <Form.Control onChange={handleChange} name='title' type="text" placeholder="Add a title" value={toTitleCase(updatedUser.title)} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label><h5 className='fw-500 heading-5'>About</h5></Form.Label>
                                                    <textarea onChange={handleChange} name='about' placeholder="Say something about yourself!" rows={3} id="exampleForm.ControlTextarea1" className="form-control rounded-0" value={updatedUser.about || ''}></textarea>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Label><h5 className='fw-500 heading-5'>Social media</h5></Form.Label>
                                                <InputGroup className="mb-3 social-input">
                                                    <Form.Control className='social-name' value="Twitter Link" placeholder="TwitterLink" />
                                                    <Form.Control onChange={handleChange} name="twitterLink" placeholder='Enter URL' aria-label="Text input with dropdown button" value={updatedUser.twitterLink ?? ""} />
                                                </InputGroup>
                                                <InputGroup className="mb-3 social-input">
                                                    <Form.Control className='social-name' value="Telegram Link" placeholder="TelegramLink" />
                                                    <Form.Control onChange={handleChange} name="telegramLink" placeholder='Enter URL' aria-label="Text input with dropdown button" value={updatedUser.telegramLink ?? ""} />
                                                </InputGroup>
                                                <InputGroup className="mb-3 social-input">
                                                    <Form.Control className='social-name' value="Medium Link" placeholder="MediumLink" />
                                                    <Form.Control onChange={handleChange} name="mediumLink" placeholder='Enter URL' aria-label="Text input with dropdown button" value={updatedUser.mediumLink ?? ""} />
                                                </InputGroup>
                                                <InputGroup className="mb-3 social-input">
                                                    <Form.Control className='social-name' value="Linkedin Link" placeholder="LinkedinLink" />
                                                    <Form.Control onChange={handleChange} name="linkedinLink" placeholder='Enter URL' aria-label="Text input with dropdown button" value={updatedUser.linkedinLink ?? ""} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Button onClick={handleSubmit} className='view-all-btn d-flex view-all-btn-primary bg-color-primary border-0'>Submit</Button>
                                    </Form>
                                </div>
                            </div>
                        }
                    </Container>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Creatorprofile