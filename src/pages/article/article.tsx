import React, { useEffect, useState } from 'react'
import './article.sass';
import { Button, Container, Form } from 'react-bootstrap'
import HeroImg from '../../assets/images/hero-img.webp';
import { Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import ShareModal from '../../shared/components/shareModal';
import { toast, ToastContainer } from 'react-toastify';
import { getAllNewsArticle, getAllComments, getIsUserLikeArticle, postAddArticleComment, UpdateArticleLikeData, deleteRemoveArticleComment, getAllArticleLikes } from '../API/ApiCall';
import { getArticleById } from '../API/ApiCall';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import moment from 'moment';
import Loader from '../../shared/components/loader/loader';
import EditorJS from '@editorjs/editorjs';
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader from 'react-content-loader';

export default function Article() {
  const [shareModal, setShareModal] = useState<boolean>(false)
  const shareModalToggle = () => setShareModal(!shareModal)
  const [articleLike, setArticleLike] = useState<any>();
  const [articlecomment, setArticlecomment] = useState<any>();
  const [addComment, setAddComment] = useState<any>();
  const [articleById, setArticleById] = useState<any>();
  const [isArticleLiked, setIsArticleLiked] = useState<boolean>();
  const [isRefreshLikedData, setIsRefreshLikedData] = useState<boolean>(false);
  const [isRefreshCommentData, setIsRefreshCommentData] = useState<boolean>(false);
  const [podcastsCallNotes, setPodcastsCallNotes] = useState<any>()
  console.log(podcastsCallNotes)
  const [jsonData, setJsonData] = useState<any>()
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem("user_id") || 0

  const [academy, setAcademy] = useState<any>()

  const params = useParams<{ id: any }>();
  const nav = useNavigate();
  const location = useLocation();

  const getAllCommentsData = async (route: string) => {
    try {
      setIsLoading(true)
      await getAllComments(route, location?.state?.id)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setArticlecomment(res?.data?.data || [])
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

  const getArticleLikesData = async (route: string) => {
    try {
      setIsLoading(true)
      await getAllArticleLikes(route, location.state.id)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setArticleLike(res?.data || [])
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

  const getIsUserLikeArticleData = async (route: string, articleId: any) => {
    try {
      setIsLoading(true)
      await getIsUserLikeArticle(route, articleId)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setIsArticleLiked(res?.data?.isLiked)
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

  const getAllArticleByIdData = async (articleRoute: string) => {
    let slug = params.id;
    try {
      setIsLoading(true)
      await getAllNewsArticle(articleRoute, slug)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let data = res?.data?.data || [];
            setArticleById(data)
            setPodcastsCallNotes(data?.attributes?.content)
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

  const UpdateArticleLikeDatas = async (route: string, articleId: number) => {
    try {
      setIsLoading(true)
      await UpdateArticleLikeData(route, articleId, isArticleLiked)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let data = res?.data?.data;
            setIsArticleLiked(!isArticleLiked)
            setIsRefreshLikedData(!isRefreshLikedData)
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

  const postAddArticleCommentdata = async (route: string, articleId: number) => {
    try {
      setIsLoading(true)
      await postAddArticleComment(route, articleId, addComment)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let data = res?.data?.data || [];
            console.log(data)
            setIsRefreshCommentData(!isRefreshCommentData)
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

  const deleteRemoveArticleCommentData = async (route: string, articleId: number, itemId: number) => {
    try {
      setIsLoading(true)
      await deleteRemoveArticleComment(route, articleId, itemId)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let data = res?.data?.data || [];
            console.log(data)
            setIsRefreshCommentData(!isRefreshCommentData)
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
    // if (params) {
    //   if (location?.state?.route === "/" && userId != 0) {
    //     getIsUserLikeArticleData("article", location?.state?.id)
    //   } else if (location?.state?.route === "/research" && userId != 0) {
    //     getIsUserLikeArticleData("article", location?.state?.id)
    //   } 
    // }
    getAllArticleByIdData("articles")
    // if (location?.state?.route === "/") {
    //   getAllArticleByIdData("articles")
    // } else if (location?.state?.route === "/research") {
    //   getAllArticleByIdData("articles")
    // }
  }, [params])

  // useEffect(() => {
  //   if (location?.state?.route === "/") {
  //     getArticleLikesData("article")
  //   } else if (location?.state?.route === "/research") {
  //     getArticleLikesData("article")
  //   } 
  // }, [isRefreshLikedData])

  // useEffect(() => {
  //   if (location?.state?.route === "/") {
  //     getAllCommentsData("article")
  //   } else if (location?.state?.route === "/research") {
  //     getAllCommentsData("article")
  //   } 
  // }, [isRefreshCommentData])

  useEffect(() => {
    if (podcastsCallNotes) {
      let validJson = JSON?.parse(podcastsCallNotes)
      setJsonData(validJson?.blocks[0]?.data?.text)
    }
  }, [podcastsCallNotes])

  const CleoOne = () => (
    <ContentLoader height="230" width="100%" >
      <rect x="15" y="15" rx="4" ry="4" width="100%" height="25" />
      <rect x="15" y="50" rx="2" ry="2" width="80%" height="15" />
      <rect x="90%" y="45" rx="16" ry="16" width="55" height="22" />
      <rect x="15" y="75" rx="3" ry="3" width="215" height="15" />
      <rect x="15" y="105" rx="3" ry="3" width="50" height="15" />
      <rect x="75" y="105" rx="3" ry="3" width="50" height="15" />
      <rect x="135" y="105" rx="3" ry="3" width="50" height="15" />
      <rect x="15" y="135" rx="16" ry="16" width="55" height="22" />
      <rect x="15" y="165" rx="2" ry="2" width="80%" height="50" />
      <rect x="90%" y="180" rx="2" ry="2" width="40" height="20" />
    </ContentLoader>
  )

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

  return (
    <>
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}

      <div className="article-page padding-section primary-bg-background">
        <section className='article-section'>
          <Container>
            {isLoading ?
              CleoOne() :
              <>
                <div className="text-end d-flex justify-content-between mb-3">
                  <button className='default-button' data-back="Back" onClick={() => { nav(-1) }}><i className="ri-arrow-left-line"></i><span className='margin-span'>Back</span></button>
                  <div className="d-flex">
                    {articleById ?
                      articleById?.attributes?.categories.map((item: any, i: number) => (
                        <Button key={i} className='default-button mx-1'><span className='margin-span'>{item?.name}</span></Button>
                      )) : <Button className='default-button mx-1'><span className='margin-span'>No categories available</span></Button>}
                  </div>
                </div>
                <h3 className='mt-2 heading-3'>{articleById?.attributes?.heading && articleById?.attributes?.heading || "No heading available"}</h3>
                <h5 className='mt-2 fw-400 heading-5'>{articleById?.attributes?.subHeading && articleById?.attributes?.subHeading || "No sub heading available"}</h5>
                {/* {(content && typeof content === "object") ? <Editor
                readOnly
                toolbarHidden
                editorState={EditorState.createWithContent(convertFromRaw(content))}
                editorClassName="editor-editorClassName"
              /> : <p className="normal">{content || description}</p>} */}
                <p className='mt-3'>{jsonData || "No content available"}</p>

                {/* <p className='large fw-500 mt-3'>Type design legend Erik Spiekermann has teamed up with Google Fonts to make the new edition of his book “Stop Stealing Sheep” available to all under a Creative Commons license. Erik Spiekermann has just returned from Italy, where he was picking up the first print run of his latest book from the printers.</p> */}
                <div className='mt-md-4 mt-3 d-block d-flex user-footer'>
                  <div className='user'>
                    {/* <img src={articleById?.attributes?.bannerImage && articleById?.attributes?.bannerImage[0].url || HeroImg  } alt="" /> */}
                    <p className='fw-600 color-primary'>{toTitleCase(articleById?.attributes?.author) || "Unknown"}</p>
                  </div>
                  <div className='d-flex justify-content-lg-right justify-content-md-right justify-content-between user-btn mt-3 mt-lg-0 mt-md-0'>
                    {/* <Button className='default-button bg-color-primary btn-flip-primary' data-back={articleLike?.totalLikes || 0} onClick={(e: any) => { 
                  if (location?.state?.route === "/") {
                    UpdateArticleLikeDatas("article", location?.state?.id)
                  } else if (location?.state?.route === "/research") {
                    UpdateArticleLikeDatas("article", location?.state?.id)
                  } else if (location?.state?.route === "/news") {
                    UpdateArticleLikeDatas("beehiiv-posts", location?.state?.id)
                  } else if (location?.state?.route === "/podcasts") {
                    UpdateArticleLikeDatas("podcasts", location?.state?.id)
                  }
                  // UpdateArticleLikeDatas(location.state.id) 
                  }}><i className={isArticleLiked ? "ri-heart-fill" : "ri-heart-line"} />{articleLike?.totalLikes || 0}</Button>
                <Button className='default-button secondary'><i className="ri-chat-3-fill" />{articlecomment?.length || 0}</Button>
                <Button className='default-button shareand-save'><i className="ri-bookmark-fill"></i></Button> */}
                    <Button className='default-button shareand-save' onClick={() => { shareModalToggle() }}><i className="ri-share-line" /></Button>
                  </div>
                </div>
                {/* <div className="p-lg-5 p-4 my-4" style={{ background: "#F4F4F499" }}>
              <h3 className='heading-3'>TL;DR</h3>
              <p className='fw-500 mt-3 large'>Eu consequat ac felis donec et odio pellentesque. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. condimentum lacinia. Massa tempor nec feugiat nisl pretium fusce id. Sagittis vitae et leo duis ut diam. Dui id ornare arcu odio ut sem nulla. Vel turpis nunc eget lorem dolor sed viverra. Pharetra convallis posuere morbi leo urna molestie at elementum eu. </p>
            </div> */}
              </>
            }
          </Container>
        </section>

        {/* <section>
          <div className='mb-4 article-img-content'>
            <Container>
              <h3 className='mt-2 mb-3 heading-3'>{articleById?.attributes?.subHeading}</h3>
              
            </Container>
          </div>
        </section> */}

        {/* <section>
          <div >
            <Container>
              <div className='comment-box p-4 square border border-1 '>
                <h3 className='heading-3'>{articlecomment?.length} Comments:</h3>
                {articlecomment?.map && articlecomment?.map((item: any, i: any) => (
                  <div key={i}>
                    <div className='d-flex my-4'>
                      <div className='comment-profile'></div>
                      <div className='comment-content w-100'>
                        <p className='fw-400 large-height'>{item?.comment}</p>
                        <div className='d-flex comment-person justify-content-between'>
                          <div className='mt-3 '>
                            <p className='medium fw-600'>{item?.user?.username}</p>
                            <p className='small mt-2'>{moment(item?.attributes?.comments?.updatedAt).format("MMM DD, YYYY")}</p>
                          </div>
                          <div>

                            {item?.user?.id == userId ?
                              <div role="button" className='fw-600' onClick={(e) => {
                                if (location?.state?.route === "/") {
                                  deleteRemoveArticleCommentData("article", location.state.id, item?.id)
                                } else if (location?.state?.route === "/research") {
                                  deleteRemoveArticleCommentData("article", location.state.id, item?.id)
                                } else if (location?.state?.route === "/news") {
                                  deleteRemoveArticleCommentData("beehiiv-posts", location.state.id, item?.id)
                                } else if (location?.state?.route === "/podcasts") {
                                  deleteRemoveArticleCommentData("podcasts", location.state.id, item?.id)
                                }
                                // deleteRemoveArticleCommentData(location.state.id, item?.id)
                              }}><i className="ri-delete-bin-7-line"></i></div> : ""
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='' />
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>

        <section className='mt-3'>
          <div>
            <Container>
              <div className='leave-box p-4'>
                <h3 className='heading-3'>Leave a comment</h3>
                <p className='large mt-1'>Your email address will not be published*</p>
                <form>
                  <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control placeholder='Write your comment' onChange={(e: any) => { setAddComment(e.target.value) }} as="textarea" rows={3} />
                  </Form.Group>
                  <button type='button' className='bg-color-secondary color-white border-0 rounded py-2 px-4' onClick={(e: any) => {
                    if (location?.state?.route === "/") {
                      postAddArticleCommentdata("article", location.state.id)
                    } else if (location?.state?.route === "/research") {
                      postAddArticleCommentdata("article", location.state.id)
                    } else if (location?.state?.route === "/news") {
                      postAddArticleCommentdata("beehiiv-posts", location.state.id)
                    } else if (location?.state?.route === "/podcasts") {
                      postAddArticleCommentdata("podcasts", location.state.id)
                    }
                  }}><h5 className="heading-5">Submit</h5></button>
                </form>
              </div>
            </Container>
          </div>
        </section> */}

        <ShareModal isOpen={shareModal} toggle={shareModalToggle} slug={params.id} operationType={"shareArticle"} />
      </div>
      <ToastContainer />
    </>
  )
}