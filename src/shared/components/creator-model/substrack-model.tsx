import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { postlinkSocialAccountData } from '../../../pages/API/ApiCall'
import Loader from '../loader/loader'
import './creator-model.sass'
import ListModel from './list-model'
import LoaderComp from '../loader-component/loader-component'

interface createModalProps {
  substrackisOpen: boolean,
  substrackToggle: () => void,
  itemNameValue: any,
  itemTitleValue: any,
  setRefreshData: () => void
}

export default function SubstackModel({ substrackisOpen, substrackToggle, itemNameValue, itemTitleValue, setRefreshData }: createModalProps) {
  const [listModals, setListModals] = useState<boolean>(false)

  const [userItemNameValue, setUserItemNameValue] = useState<any>()
  const [userIntegratinToken, setUserIntegratinToken] = useState({
    integrationToken: "",
    channelId: "",
    feedUrl: "",
  })
  const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

  const ListModalToggle = () => setListModals(!listModals)

  const postAddSocialPlatformLink = async (platformData: string) => {
    substrackToggle()
    var checkErrorFlag = false;
    console.log("userIntegratinToken", userIntegratinToken, platformData)

    if (platformData == "add-medium-token" && userIntegratinToken?.integrationToken.length <= 0) {
      checkErrorFlag = true
      toast.error("Please provide valid medium token.");
    }
    else if (platformData == "youtube" && userIntegratinToken?.channelId.length <= 0) {
      checkErrorFlag = true
      toast.error("Please provide valid youtube channel Id.");
    }
    else if ((platformData == "soundcloud" || platformData == "substack" || platformData == "applepodcast" || platformData == "googlepodcast" || platformData == "spotify") && userIntegratinToken?.feedUrl.length <= 0) {
      checkErrorFlag = true
      toast.error("Please provide valid rss feed url.");
    }
    console.log("checkErrorFlagcheckErrorFlag", checkErrorFlag)

    try {
      if (!checkErrorFlag) {
        setIsLoading(true)

        await postlinkSocialAccountData(platformData, userIntegratinToken?.integrationToken, userIntegratinToken?.channelId, userIntegratinToken?.feedUrl,)
          .then(async (res: any) => {
            if (res?.status === 200) {
              const IsLogin = await res.data
              console.log(IsLogin)
              ListModalToggle();
              setRefreshData()
              setIsLoading(false)
            }
          }).catch((err: any) => {
            toast.error(err?.response?.data?.error?.message)
            setIsLoading(false)
            console.log(err)
          })
      }
    }
    catch (err: any) {
      toast.error(err?.response?.data?.error?.message)
      console.log(err)
      return { error: err?.res?.data };
    }
  };

  const handleChange = (event: any) => {
    if (event.target.name) {
      setUserIntegratinToken({
        ...userIntegratinToken,
        [event.target.name]: event.target.value
      });
    }
  }

  useEffect(() => {
    setUserItemNameValue(itemNameValue)
  }, [itemNameValue])

  return (
    <>
      <ToastContainer />
      {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
      <Modal
        show={substrackisOpen}
        size="lg"
        onHide={substrackToggle}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton={substrackisOpen} className='p-0'>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className='heading-4 mb-2 '>{itemTitleValue}</div>
            <hr className='mb-3 w-50'/>
            {itemNameValue === "Medium" &&
              <ul className='creator-model-ul'>
                <li className=''>Sign in to your Medium account.</li>
                <li>Check your Medium settings page's "Integration tokens" section to generate your token.
                </li>
                <li>Please paste the token below.</li>
              </ul>
            }
            {itemNameValue === "Spotify" &&
              <ul className='creator-model-ul'>
                <li>Click Settings in the top right of your Spotify for Podcasters dashboard.</li>
                <li>Select Podcast Availability.</li>
                <li>Scroll down to RSS Distribution to see your RSS feed.</li>
                <li>Please paste the link below.</li>
              </ul>
            }
            {itemNameValue === "Youtube" &&
              <ul className='creator-model-ul'>
                <li>Sign in to YouTube.</li>
                <li>Click on your profile picture and then Settings.</li>
                <li>From the menu, select Advanced Settings.</li>
                <li>You’ll see your channel ID, please paste that below.</li>
              </ul>
            }
            {itemNameValue === "Soundcloud" &&
              <ul className='creator-model-ul'>
                <li>Go to the three dots on the top right corner of your header and click “Settings”.</li>
                <li>You can find your account’s RSS feed URL in the Content tab of the Settings page.</li>
                <li>Please paste the link below.</li>
              </ul>
            }
            {itemNameValue === "Substack" &&
              <ul className='creator-model-ul'>
                <li>You can find the RSS feed for your publication at <a href="https://your.substack.com/feed" target='_blank'>https://your.substack.com/feed.</a></li>
                <li>Replace "your" with the name of your Substack publication.</li>
                <li>Please paste the link below.</li>
              </ul>
            }
          </Modal.Title>


        </Modal.Header>
        <Modal.Body className='p-0 pt-3'>
          <div className="add-url">
            <Form.Control type="text" name={
              itemNameValue === "Medium" ? "integrationToken"
                : itemNameValue === "Youtube" ? "channelId" : "feedUrl"
            }
              onChange={handleChange} placeholder={itemTitleValue} />
            {
              itemNameValue === "Medium" ?
                <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("add-medium-token") }}>Add</Button> :
                itemNameValue === "Spotify" ?
                  <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("spotify") }}>Add</Button> :
                  itemNameValue === "Youtube" ?
                    <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("youtube") }}>Add</Button> :
                    itemNameValue === "Soundcloud" ?
                      <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("soundcloud") }}>Add</Button> :
                      // itemNameValue === "Notion" ?
                      // <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("notion") }}>Add</Button> :
                      itemNameValue === "Substack" ?
                        <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("substack") }}>Add</Button> :
                        // itemNameValue === "Apple Podcasts" ?
                        //   <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("applepodcast") }}>Add</Button> :
                        //   itemNameValue === "Google Podcasts" ?
                        //     <Button className='view-all-btn d-flex view-all-btn-primary' onClick={() => { postAddSocialPlatformLink("googlepodcast") }}>Add</Button>:
                             ""
            }
          </div>
        </Modal.Body>
      </Modal>
      <ListModel listModelOpen={listModals} ListModelToggle={ListModalToggle} userItemNameValue={userItemNameValue} setRefreshData={setRefreshData} />
      <ToastContainer />
    </>
  )
}
