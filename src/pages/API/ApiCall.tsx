import axios from "axios";
import { log } from "console";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const getbestToolApiUrl = `${BASE_URL}/api/best-tools`
const getAllWalletsDataUrl = `${BASE_URL}/api/interesting-wallets`
const getTopPublicationsUrl = `${BASE_URL}/api/top-blogs`
const getAllPeoplesDataUrl = `${BASE_URL}/api/people-to-follows`
const postRegisterUserUrl = `${BASE_URL}/api/auth/local/register`
const postLoginUserUrl = `${BASE_URL}/api/auth/local`
const getTwitterLoginUrl = `${BASE_URL}/api/platform-link/request-twitter-token`
const postTwitterVerifyLoginUrl = `${BASE_URL}/api/platform-link/verify-twitter-token`
const getLoginUserUrl = `${BASE_URL}/api/users/me`
const postSocialUnlinkUrl = `${BASE_URL}/api/platform-unlink/`
const postSocialLinkUrl = `${BASE_URL}/api/platform-link/`
const getUserSocialMediumUrl = `${BASE_URL}/api/web-mediums`
const getUserLinkedPlatformUrl = `${BASE_URL}/api/platform-link/get/`
const postAddUserLinkToProfileUrl = `${BASE_URL}/api/user-links/add`
const getAllCategorysUrl = `${BASE_URL}/api/categories`
const getAllWebSectionsUrl = `${BASE_URL}/api/web-sections`
const getUserCategoriesURL = `${BASE_URL}/api/user-categories`
const getAllUserLinksUrl = `${BASE_URL}/api/user-links`
const getTopCreatorsUrl = `${BASE_URL}/api/creators/top`
const getAllCreatorsUrl = `${BASE_URL}/api/creators`
const getAllArticleUrl = `${BASE_URL}/api/articles`
const upateAllApiURL = `${BASE_URL}/api/`
const getAndSendToAllCommunityLinkUrl = `${BASE_URL}/api/community-links`
const postUserSetFeatureTrueUrl = `${BASE_URL}/api/user-links/featured/add/`
const postUserSetFeatureFalseUrl = `${BASE_URL}/api/user-links/featured/remove/`
const removeFeaturedArticleURL = `${BASE_URL}/api/user-links/`
const getAllPodcastsUrl = `${BASE_URL}/api/podcasts`
const getnewspostUrl = `${BASE_URL}/api/beehiiv-posts`
const getAllNewsPublicationUrl = `${BASE_URL}/api/beehiiv-publications`
const getTwitterDataURL = `${BASE_URL}/api/twitter`
const userprofileupdateURL = `${BASE_URL}/api/creators/update`
const getCreatorProfileDataURL = `${BASE_URL}/api/creators/profile`
const uploadProfilePicDataURL = `${BASE_URL}/api/upload`
const getHomeContentDataURL = `${BASE_URL}/api/home/content`
const getSearchDataURL = `${BASE_URL}/api/search`
const getNextNewsDataURL = `${BASE_URL}/api/beehiiv-posts/next`

const getAuthorizationAccessToken = () => {
    const authorization = JSON.parse(localStorage.getItem("authorization") as any)
    console.log(authorization)
    if (authorization && authorization) {
        return authorization
    }
    return ""
}

const postBodyHeaders = () => {
    return {
        Authorization: `Bearer ${getAuthorizationAccessToken()}`
    };
}

const getAllBestToolsData = async (): Promise<any> => {
    const res = await axios.get(getbestToolApiUrl + "?populate=*");
    console.log("getAllBestToolsData", res)
    return res;
};

const getAllWalletsData = async (): Promise<any> => {
    const res = await axios.get(getAllWalletsDataUrl);
    console.log("getAllWalletsData", res)
    return res;
};

const getTopPublicationsData = async (): Promise<any> => {
    const res = await axios.get(getTopPublicationsUrl);
    console.log("getTopPublicationsData", res)
    return res;
};

const getAllPeoplesData = async (): Promise<any> => {
    const res = await axios.get(getAllPeoplesDataUrl);
    console.log("getAllPeoplesData", res)
    return res;
};

const postRegisterUser = async (username: any, email: any, password: any): Promise<any> => {
    const bodyParams = {
        "username": username,
        "email": email,
        "password": password,
    }
    const res: any = await axios.post(postRegisterUserUrl, bodyParams, { headers: postBodyHeaders() })
    console.log("postRegisterUser",res)
    return res;
};

const postLoginUser = async (identifier?: any, password?: any): Promise<any> => {
    const bodyParams = {
        "identifier": identifier,
        "password": password,
    }
    const res: any = await axios.post(postLoginUserUrl, bodyParams, { headers: postBodyHeaders() })
    console.log("postLoginUser",res)
    return res;
};

const getTwitterLoginUrlData = async (): Promise<any> => {
    const res = await axios.get(getTwitterLoginUrl, { headers: postBodyHeaders() });
    console.log("getTwitterLoginUrlData",res)
    return res;
};

// const getSpotifyLoginUrlData = async (): Promise<any> => {
//     const res = await axios.get(getSpotifyLoginUrl, { headers: postBodyHeaders() });
//     console.log(res)
//     return res;
// };

const getLoginUserdata = async (): Promise<any> => {
    const res = await axios.get(getLoginUserUrl, { headers: postBodyHeaders() });
    console.log("getLoginUserdata",res)
    return res;
};

const getCreatorProfileData = async (userId:any): Promise<any> => {
    let urlstring = getCreatorProfileDataURL
    if(Number(userId)>0){
        urlstring = urlstring + `/${userId}`
    }
    const res = await axios.get(urlstring, { headers: Number(userId)>0 ? {} : postBodyHeaders() });
    console.log("getCreatorProfileData",res)
    return res;
};

const postUnlinkSocialAccountData = async (platformName: string): Promise<any> => {
    const res = await axios.post(postSocialUnlinkUrl + platformName, {}, { headers: postBodyHeaders() });
    console.log("postUnlinkSocialAccountData",res)
    if (res?.status === 200) {
        toast.success(res?.data?.message || "")
    }
    return res;
};

const postlinkSocialAccountData = async (platformName: string, integrationToken?: string, channelId?: string, feedUrl?: string): Promise<any> => {
    let bodyParams: any = {}
    console.log("Hello");
    console.log("adsaaa", integrationToken, channelId, feedUrl);
    if (integrationToken != "") {
        bodyParams["integrationToken"] = integrationToken
    }
    else if (channelId != "") {
        bodyParams["channelId"] = channelId
    }
    else if (feedUrl != "") {
        bodyParams["feedUrl"] = feedUrl
    }
    const res = await axios.post(postSocialLinkUrl + platformName, bodyParams, { headers: postBodyHeaders() });
    console.log("postlinkSocialAccountData",res)
    if (res?.status === 200) {
        toast.success(res?.data?.message)
    }
    return res;
};

const postTwitterVerifyLoginData = async (oauth_token: any, oauth_verifier: any): Promise<any> => {
    const bodyParams = {
        "oauth_token": oauth_token,
        "oauth_verifier": oauth_verifier,
    }
    const res = await axios.post(postTwitterVerifyLoginUrl, bodyParams, { headers: postBodyHeaders() });
    console.log("postTwitterVerifyLoginData",res)
    return res;
};

const getUserSocialMedium = async (): Promise<any> => {
    const res = await axios.get(getUserSocialMediumUrl);
    console.log("getUserSocialMedium",res)
    return res;
};

const getUserLinkedPlatformData = async (platform: string,): Promise<any> => {
    const res = await axios.get(getUserLinkedPlatformUrl + platform, { headers: postBodyHeaders() });
    console.log("getUserLinkedPlatformData",res)
    return res;
};

const getAllCategorys = async (): Promise<any> => {
    const res = await axios.get(getAllCategorysUrl);
    console.log("getAllCategorys",res)
    return res;
};

const getAllWebSections = async (): Promise<any> => {
    const res = await axios.get(getAllWebSectionsUrl);
    console.log("getAllWebSections",res)
    return res;
};

const getUserCategories = async (): Promise<any> => {
    const res = await axios.get(getUserCategoriesURL);
    console.log("getUserCategories",res)
    return res;
};

const getAllUserFeaturedContentLinks = async (paginationStart: number, paginationLimit: number, featured: boolean, userId?: string): Promise<any> => {
    let urlstring = getAllUserLinksUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&featured=${featured}`
    if(Number(userId)>0){
        urlstring = urlstring + `&userId=${userId}`
    }
    const res = await axios.get(urlstring , {  headers: Number(userId)>0 ? {} : postBodyHeaders() });
    console.log("getAllUserFeaturedContentLinks",res)
    return res;
};

const getAllUserLinks = async (paginationStart: number, paginationLimit: number, userId?: string): Promise<any> => {
    let UserLink = getAllUserLinksUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`
    if(Number(userId)>0){
        UserLink = UserLink + `&userId=${userId}`
    }
    const res = await axios.get(UserLink, { headers: Number(userId)>0 ? {} : postBodyHeaders() });
    console.log("getAllUserLinks",res)
    return res;
};

const getTopCreators = async (): Promise<any> => {
    const res = await axios.get(getTopCreatorsUrl);
    console.log("getTopCreators",res)
    return res;
};

const getAllCreators = async (paginationStart: number, paginationLimit: number, user_categories? : string): Promise<any> => {
    let strURL = "";
    if(user_categories == undefined || user_categories == "" ) {
        strURL =  getAllCreatorsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`
    } else {
        strURL = getAllCreatorsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}` + `&category=${user_categories.toLowerCase() || ""}`
    }
    const res = await axios.get(strURL);
    console.log("getAllCreators",res)
    return res;
};

const getcommunitydata = async (paginationStart: number, paginationLimit: number, category? : string, web_medium?: string): Promise<any> => {
    let strURL = "";
    if(category == undefined || category == "" ) {
        strURL = getAndSendToAllCommunityLinkUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&web_medium=${web_medium}`
    } else {
        strURL = getAndSendToAllCommunityLinkUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&category=${category}&web_medium=${web_medium}`
    }
    const res = await axios.get(strURL);
    console.log("getcommunitydata",res)
    return res;
};


const postAddUserLinkToProfile = async (link: any, category: any, webMedium: any, webSection: any): Promise<any> => {
    const bodyParams = {
        "link": link,
        "category": category,
        "webMedium": webMedium,
        // "webSection": webSection,
    }
    const res = await axios.post(postAddUserLinkToProfileUrl, bodyParams, { headers: postBodyHeaders() });
    console.log("postAddUserLinkToProfile",res)
    return res;
};

const getAllArticle = async (paginationStart: number, paginationLimit: number, featured: boolean): Promise<any> => {
    const res = await axios.get(getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&featured=${featured}`);
    console.log("getAllArticle",res)
    return res;
};

const getAllNewsArticle = async (pageName: string, slug: string): Promise<any> => {
    const res = await axios.get(upateAllApiURL + pageName + "/" + slug);
    console.log("getAllNewsArticle",res)
    return res;
};

const getNextNewsArticle = async (categoryName: string, excludeSlugString: string): Promise<any> => {
    const res = await axios.get(getNextNewsDataURL + `?category=${categoryName}&exclude=${excludeSlugString}`);
    console.log("getNextNewsArticle",res)
    return res;
};


const getAllCommunityLink = async (paginationStart: number, paginationLimit: number, categorySlug?: string): Promise<any> => {
    let strURL = "";
    if(categorySlug == undefined) {
        strURL = getAndSendToAllCommunityLinkUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`
    } else {
        strURL = getAndSendToAllCommunityLinkUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}` + `&category=${categorySlug || ""}`
    }
    const res = await axios.get(strURL);
    console.log("getAllCommunityLink", res)
    return res;
};

const getAllArticleLikes = async (pageName: string, articleId: number): Promise<any> => {
    let strURL = "";
    if(pageName === "beehiiv-posts") {
        strURL = upateAllApiURL + pageName + "/" + articleId + "/likes"
    } else {
        strURL = upateAllApiURL + "likes/" + pageName +"/" + articleId
    }
    const res = await axios.get(strURL);
    console.log("getAllArticleLikes",res)
    return res;
};

// const postAddArticleComment = async (pageName: string, articleId: number, comment: string): Promise<any> => {
//     console.log("pagename ===========", pageName)
//     let strURL = "";
//     let bodyParams: any = { "comment": comment }
//     if(pageName === "beehiiv-posts") {
//         strURL = UpdateAndAddComment + pageName + "/" + articleId + "/comments"
//     } else {
//         strURL = UpdateAndAddComment + "comment/" + "article/" + articleId + "/add"
//     }
//     const res = await axios.post(strURL, bodyParams, { headers: postBodyHeaders() });
//     console.log(res)
//     return res;
// };

const getIsUserLikeArticle = async (pageName:string, articleId: number): Promise<any> => {
    let strURL = "";
    if(pageName === "beehiiv-posts") {
        strURL = upateAllApiURL + pageName + "/" + articleId + "/likes/check"
    } else {
        strURL = upateAllApiURL + "likes/" + pageName +"/" + articleId + "/userliked"
    }
    const res = await axios.get(strURL, { headers: postBodyHeaders() });
    console.log("getIsUserLikeArticle",res)
    return res;
};

const getAllComments = async (pageName: string, id: string): Promise<any> => {
    let strURL = ""
    const comment = "comments"
    if(pageName === "beehiiv-posts") {
        strURL = upateAllApiURL + pageName + "/" + id + "/" + comment
    } else {
        strURL = upateAllApiURL + "comment" + "/" + pageName + "/" + id
    }
    const res = await axios.get(strURL);
    console.log("getAllComments",res)
    return res;
};

// const getLatestArticles = async (paginationStart: number, paginationLimit: number, trending: boolean): Promise<any> => {
//     const res = await axios.get(getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}`);
//     console.log(res)
//     return res;
// };

const getArticleById = async (slug: string): Promise<any> => {
    const res = await axios.get(getAllArticleUrl + "/" + slug);
    console.log("getArticleById",res)
    return res;
};

const getTwitterData = async (): Promise<any> => {
    const res = await axios.get(getTwitterDataURL);
    console.log("getTwitterData", res)
    return res;
};

const postUpdateFeaturedCardOperation = async (itemId: any, switchType: boolean, operationType: string): Promise<any> => {
    let setFeaturedUrl = ""
    if (operationType === "Featured") {
        setFeaturedUrl = (switchType ? postUserSetFeatureTrueUrl : postUserSetFeatureFalseUrl) + itemId
    } else if (operationType === "Remove") {
        setFeaturedUrl = removeFeaturedArticleURL + itemId
    } else if (operationType === "SubmitCommunity") {
        setFeaturedUrl = getAndSendToAllCommunityLinkUrl
    }
    let res: any = {}
    let bodyParams: any = { "data": { "link": itemId } }
    if (operationType === "Remove") {
        res = await axios.delete(setFeaturedUrl, { headers: postBodyHeaders() });
    }
    else {
        res = await axios.post(setFeaturedUrl, operationType === "SubmitCommunity" ? bodyParams : {}, { headers: postBodyHeaders() });
    }
    console.log("postUpdateFeaturedCardOperation", res)
    return res;
}

const getPodcastsData = async (paginationStart: number, paginationLimit: number, operationType: string, featured?: boolean, trending?: boolean, webSection?: any, category?: string, podcastsId?: string): Promise<any> => {
    let strUrl = "";
    if (operationType === "Featured") {
        strUrl = getAllPodcastsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&featured=${featured}`
    } else if (operationType === "Trending"){
        strUrl = getAllPodcastsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}`
    } else if (operationType === "Latest"){
        strUrl = getAllPodcastsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`
    } else if (operationType === "Category"){
        strUrl = getAllPodcastsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&category=${category}`
    } else if (operationType === "Details"){
        strUrl = getAllPodcastsUrl + `/${podcastsId}`
    } 
    // else if (operationType === "WebSection"){
    //     strUrl = getAllPodcastsUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&web_section=${webSection}`
    // }
    const res = await axios.get(strUrl);
    console.log("getPodcastsData", res)
    return res;
};

const getAllNewsPublicationData = async (): Promise<any> => {
    const res = await axios.get(getAllNewsPublicationUrl);
    console.log("getAllNewsPublicationData",res)
    return res;
};

const getNewsData = async (paginationStart: number, paginationLimit: number, operationType: string, featured?: boolean, trending?: boolean, webSection?: any, publication?: string, category?: string, type?: string): Promise<any> => {
    let strUrl = "";
    if (operationType === "Featured") {
        strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&featured=${featured}&type=${type}`
    } else if (operationType === "Trending"){
        strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}&type=${type}`
    } else if (operationType === "Latest"){
        strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}`
    } else if (operationType === "Publication"){
        strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&publication=${publication}&type=${type}`
    } else if (operationType === "Category"){
        strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&category=${category}&type=${type}`
    } 
    // else if (operationType === "WebSection"){
    //     strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&web_section=${webSection}&type=${type}`
    // } 
    const res = await axios.get(strUrl);
    console.log("getNewsData",res)
    return res;
};

const getHomeData = async (paginationStart: number, paginationLimit: number, operationType: string, featured?: boolean, trending?: boolean, webSection?: any, category?: string, type?: string,): Promise<any> => {
    let strUrl = "";
    if (operationType === "Featured") {
        strUrl = getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&featured=${featured}&type=${type}`
    } else if (operationType === "Trending"){
        strUrl = getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}&type=${type}`
    } else if (operationType === "Latest"){
        strUrl = getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}`
    } else if (operationType === "Category"){
        strUrl = getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&category=${category}&type=${type}`
    } 
    // else if (operationType === "WebSection"){
    //     strUrl = getAllArticleUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&web_section=${webSection}&type=${type}`
    // } 
    const res = await axios.get(strUrl);
    console.log("getHomeData", res)
    return res;
};

const getHomeContentData = async (paginationStart: number, paginationLimit: number): Promise<any> => {
    const res = await axios.get(getHomeContentDataURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`);
    console.log("getHomeContentData", res)
    return res;
};



const UpdateArticleLikeData = async (pageName: string, articleId: number, isArticleLiked: any): Promise<any> => {
    let setFeaturedUrl = ""
    let res: any = []
    let bodyParams: any = { "articleId": articleId }
    console.log(isArticleLiked)

    if (!isArticleLiked === true) {
        if(pageName === "beehiiv-posts") {
            setFeaturedUrl = upateAllApiURL + pageName + "/" + articleId + "/likes"
        } else {
            setFeaturedUrl = upateAllApiURL + "likes/" + pageName + "/add"
        }
        res = await axios.post(setFeaturedUrl, bodyParams, { headers: postBodyHeaders() });
    } else {
        if(pageName === "beehiiv-posts") {
            setFeaturedUrl = upateAllApiURL + pageName + "/" + articleId + "/likes"
            res = await axios.delete(setFeaturedUrl, { headers: postBodyHeaders() });
        } else {
            setFeaturedUrl = upateAllApiURL + "likes/" + pageName + "/remove"
            res = await axios.post(setFeaturedUrl, bodyParams, { headers: postBodyHeaders() });
        }
    }
    console.log("UpdateArticleLikeData", res)
    return res;
};

const postAddArticleComment = async (pageName: string, articleId: number, comment: string): Promise<any> => {
    console.log("pagename ===========", pageName)
    let strURL = "";
    let bodyParams: any = { "comment": comment }
    if(pageName === "beehiiv-posts") {
        strURL = upateAllApiURL + pageName + "/" + articleId + "/comments"
    } else {
        strURL = upateAllApiURL + "comment/" + "article/" + articleId + "/add"
    }
    const res = await axios.post(strURL, bodyParams, { headers: postBodyHeaders() });
    console.log("postAddArticleComment", res)
    return res;
};

const deleteRemoveArticleComment = async (pageName: string, articleId: number, itemId: number): Promise<any> => {
    let strURL = "";
    let res: any = []
    if(pageName === "beehiiv-posts") {
        strURL = upateAllApiURL + pageName + "/" + articleId + "/comments/" + itemId
        res = await axios.delete(strURL, { headers: postBodyHeaders() });
    } else {
        strURL = upateAllApiURL + "comments/" + itemId + "/article/" + articleId + "/remove"
        res = await axios.delete(strURL, { headers: postBodyHeaders() });
    }
    console.log("deleteRemoveArticleComment", res)
    return res;
};

const updateUserRegisterData = async (name: any, title: any, medium: any, category:any, about:any, twitterLink?:any, telegramLink?:any, mediumLink?:any, linkedinLink?:any, userCategories?: any): Promise<any> => {
    const bodyParams = {
        "name": name,
        "title": title,
        "webMedium": medium,
        "webSection": category,
        "about": about,
        "twitterLink": twitterLink,
        "telegramLink": telegramLink,
        "mediumLink": mediumLink,
        "linkedinLink": linkedinLink,
        "categories": userCategories,
    }
    const res: any = await axios.put(userprofileupdateURL, bodyParams, { headers: postBodyHeaders() })
    console.log("updateUserRegisterData", res)
    return res;
};

const postUploadProfilePicCallBack = async (userId: string, profilePicImg: any) => {
    
    console.log('profilePicImg', profilePicImg);
    
    let bodyFormData = new FormData();
    bodyFormData.append("refId", userId);
    bodyFormData.append("path", `users/${userId}`)
    bodyFormData.append("ref", "plugin::users-permissions.user");
    bodyFormData.append("field", "profilePic");

    if (profilePicImg != undefined) {
      bodyFormData.append("files", profilePicImg || '');
    }
    const res: any = await axios({
      method: "post",
      url: uploadProfilePicDataURL,
      data: bodyFormData,
      headers: postBodyHeaders(),
    })
    console.log('postUploadProfilePicCallBack', bodyFormData, res);
    return res;
  };

  const getSearchData = async (term: string): Promise<any> => {
    const res = await axios.get(getSearchDataURL + `?term=${term}`);
    console.log("getSearchData", res)
    return res;
};

  
export {
    getAllBestToolsData,
    getAllWalletsData,
    getAllPeoplesData,
    postRegisterUser,
    postLoginUser,
    getTwitterLoginUrlData,
    // getSpotifyLoginUrlData,
    postTwitterVerifyLoginData,
    getLoginUserdata,
    postUnlinkSocialAccountData,
    postlinkSocialAccountData,
    getUserSocialMedium,
    getUserLinkedPlatformData,
    postAddUserLinkToProfile,
    getAllCategorys,
    getAllWebSections,
    getAllUserFeaturedContentLinks,
    getAllUserLinks,
    getTopCreators,
    getAllArticle,
    getAllCommunityLink,
    getAllArticleLikes,
    getAllComments,
    getAllNewsArticle,
    getArticleById,
    UpdateArticleLikeData,
    postUpdateFeaturedCardOperation,
    postAddArticleComment,
    getIsUserLikeArticle,
    deleteRemoveArticleComment,
    getPodcastsData,
    getNewsData,
    getAllNewsPublicationData,
    getHomeData,
    getAllCreators,
    getTwitterData,
    updateUserRegisterData,
    getCreatorProfileData,
    getTopPublicationsData,
    postUploadProfilePicCallBack,
    getUserCategories,
    getHomeContentData,
    getcommunitydata,
    getSearchData,
    getNextNewsArticle
};