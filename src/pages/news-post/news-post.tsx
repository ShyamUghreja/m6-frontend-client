import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import HeroImg from '../../assets/images/hero-img.webp';
import Scrolcon from '../../assets/icons/newsletters/infinite-scroll-icon.svg';
import { Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import ShareModal from '../../shared/components/shareModal';
import { toast, ToastContainer } from 'react-toastify';
import { getAllNewsArticle, getAllComments, getIsUserLikeArticle, postAddArticleComment, UpdateArticleLikeData, deleteRemoveArticleComment, getAllArticleLikes, getNextNewsArticle } from '../API/ApiCall';
import { getArticleById } from '../API/ApiCall';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import moment from 'moment';
import Loader from '../../shared/components/loader/loader';
import parse, {
  attributesToProps,
  HTMLReactParserOptions
} from "html-react-parser";
import { Element } from "domhandler/lib/node";
import LoaderComp from '../../shared/components/loader-component/loader-component';
import ContentLoader from 'react-content-loader';


function getScrollPercent() {
  // e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  var h: any = document.documentElement,
    b: any = document.body,
    st: any = "scrollTop",
    sh: any = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

export default function NewsPost() {
  const [shareModal, setShareModal] = useState<boolean>(false)
  const shareModalToggle = () => setShareModal(!shareModal)
  const [articleLike, setArticleLike] = useState<any>();
  const [articlecomment, setArticlecomment] = useState<any>();
  const [addComment, setAddComment] = useState<any>();
  const [articleById, setArticleById] = useState<any>();
  const [isArticleLiked, setIsArticleLiked] = useState<boolean>();
  const [isRefreshLikedData, setIsRefreshLikedData] = useState<boolean>(false);
  const [isRefreshCommentData, setIsRefreshCommentData] = useState<boolean>(false);
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)
  const [openScrollModel, setOpenScrollModel] = useState(false)

  const [academy, setAcademy] = useState<any>({})
  const params = useParams<{ id: any }>();
  const nav = useNavigate();
  const location = useLocation();

  const nextPostLoaderRef = useRef(false)
  // const openScrollModel = useRef(false)
  const excludeSlugRef = useRef('')
  const categorySlugRef = useRef('')

  const userId = localStorage.getItem("user_id") || 0

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

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.name === "main"
      ) {
        const props = attributesToProps(domNode.attribs);
        return <div {...props} />;
      }
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
            setTimeout(() => {
              const elm = window.document.getElementById("initial-news-post")
              if (elm) {
                elm.innerHTML = data?.attributes?.contentFree || ''
                excludeSlugRef.current = data?.attributes?.slug || ''
                categorySlugRef.current = data?.attributes?.categories ? data?.attributes?.categories[0]?.slug : ""
                setOpenScrollModel(false)
              }
            })
            setAcademy(data?.attributes)
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
          toast.error(err)
          setIsLoading(false)
        })
    }
    catch (err: any) {
      toast.error(err)
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
          toast.error(err)
          setIsLoading(false)
        })
    }
    catch (err: any) {
      toast.error(err)
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
    console.log("adasd", params);
    if (params) {
      console.log("adasd", params);

      if (location?.state?.route === "/news" && userId != 0) {
        getIsUserLikeArticleData("beehiiv-posts", location?.state?.id)
      }
    }
    getAllArticleByIdData("beehiiv-posts")
  }, [params])

  useEffect(() => {
    if (location?.state?.route === "/news") {
      getArticleLikesData("beehiiv-posts")
    }
  }, [isRefreshLikedData])

  useEffect(() => {
    if (location?.state?.route === "/news") {
      getAllCommentsData("beehiiv-posts")
    }
  }, [isRefreshCommentData])

  useEffect(() => {
    window.addEventListener("scroll", onHandleScroll)
    return () => {
      window.removeEventListener("scroll", onHandleScroll)
    }
  }, [])

  const onHandleScroll = () => {
    if (!nextPostLoaderRef.current && getScrollPercent() > 90) {
      getNextPostBy()
      setOpenScrollModel(true)
    }
    if (!nextPostLoaderRef.current && getScrollPercent() > 80) {
      setOpenScrollModel(true)
    }
  }

  const getNextPostBy = () => {
    nextPostLoaderRef.current = true
    setIsLoading(prev => !prev)
    getNextNewsArticle(categorySlugRef.current, excludeSlugRef.current).then(res => {
      setOpenScrollModel(false)
      setIsLoading(prev => !prev)
      const nextDiv = document.createElement("div");
      const divider = document.createElement("hr");
      const postContainerElm = document.getElementById("news-post-container")
      const data = res.data.data || {}
      if (Object.keys(data).length && postContainerElm) {
        nextPostLoaderRef.current = false
        nextDiv.innerHTML = data.attributes.contentFree || ''
        excludeSlugRef.current = excludeSlugRef.current + "," + data.attributes.slug
        postContainerElm?.appendChild(divider);
        postContainerElm?.appendChild(nextDiv);
      } else {
        window.removeEventListener("scroll", onHandleScroll)
      }
    }).catch(ex => setIsLoading(prev => !prev))
  }


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

  if (window) {
    (window as any).twttr!.widgets.load()
  }

  return (
    <>
      <div className="article-page padding-section primary-bg-background">
        {openScrollModel &&
          <div className="news-post-scroll">
            <p>Scroll down to continue reading! </p>
            <img src={Scrolcon} className='img-fluid' alt="" />
          </div>
        }
        <section className='article-section'>
          <Container>
            <>
              <div className="text-end d-flex justify-content-between mb-3">
                <button className='default-button' data-back="Back" onClick={() => { nav(-1) }}><i className="ri-arrow-left-line"></i><span className='margin-span'>Back</span></button>
                <div className="d-flex">
                  {articleById && articleById?.attributes?.categories.map((item: any, i: number) => (
                    <Button key={i} className='default-button mx-1'><span className='margin-span'>{item?.name}</span></Button>
                  ))}
                </div>
              </div>
              {/* <h3 className='mt-2 heading-3'>{articleById?.attributes?.heading}</h3> */}
              <div id="news-post-container">
                <div id="initial-news-post" />
              </div>
              {isLoading && CleoOne()}

            </>
            {/* <div className='mt-md-4 mt-3 d-block d-lg-flex d-md-flex user-footer'>
              <div className='user'>
                <img src={HeroImg} alt="" />
                <p className=''>{articleById?.attributes?.authors[0] ? articleById?.attributes?.authors[0] : "Unknown"}</p>
              </div>
              <div className='d-flex justify-content-lg-right justify-content-md-right justify-content-between user-btn mt-3 mt-lg-0 mt-md-0'>
                <Button className='default-button shareand-save' onClick={() => { shareModalToggle() }}><i className="ri-share-line" /></Button>
              </div>
            </div> */}
            {/* <div className="p-lg-5 p-4 my-4" style={{ background: "#F4F4F499" }}>
              <h3 className='heading-3'>TL;DR</h3>
              <p className='fw-500 mt-3 large'>Eu consequat ac felis donec et odio pellentesque. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. condimentum lacinia. Massa tempor nec feugiat nisl pretium fusce id. Sagittis vitae et leo duis ut diam. Dui id ornare arcu odio ut sem nulla. Vel turpis nunc eget lorem dolor sed viverra. Pharetra convallis posuere morbi leo urna molestie at elementum eu. </p>
            </div> */}
          </Container>
        </section>

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
                                if (location?.state?.route === "/news") {
                                  deleteRemoveArticleCommentData("beehiiv-posts", location.state.id, item?.id)
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
                    if (location?.state?.route === "/news") {
                      postAddArticleCommentdata("beehiiv-posts", location.state.id)
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
