import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";
import './style.css';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  // PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  // FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  // PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  // WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

interface shareModalProps {
  isOpen: boolean,
  toggle: () => void,
  slug?: any,
  operationType: any
}

const ShareModal = ({ isOpen, toggle, slug, operationType }: shareModalProps) => {

  // const [modal, setModal] = React.useState(false);
  const [sharedUrl, setSharedUrl] = React.useState<any>({})
  const [modalShow, setModalShow] = React.useState(false);
  const title = operationType === "shareProfile" ? "View my profile on Renoded! : " : 'Please visit on this blogs and share with your networks : '

  useEffect(() => {
    if(isOpen){
      setModalShow(true)
    }
    let opType = (operationType === "shareProfile") ? "creatorprofile" : "article"
    setSharedUrl(`http://${new URL(window.location.href).host}/${opType}/${slug}`)
  }, [slug, isOpen])

  return (
    <>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Share on Social Media
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="share-button">
            <FacebookShareButton
              url={sharedUrl}
              quote={title}
              className="shareButton"
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <TelegramShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>

            <WhatsappShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <RedditShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>

            <EmailShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <HatenaShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <HatenaIcon size={32} round={true} />
            </HatenaShareButton>
            <InstapaperShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <InstapaperIcon size={32} round={true} />
            </InstapaperShareButton>
            <LineShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <LineIcon size={32} round={true} />
            </LineShareButton>
            <LivejournalShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <LivejournalIcon size={32} round={true} />
            </LivejournalShareButton>
            <MailruShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <MailruIcon size={32} round={true} />
            </MailruShareButton>
            <OKShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <OKIcon size={32} round={true} />
            </OKShareButton>
            <PocketShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <PocketIcon size={32} round={true} />
            </PocketShareButton>
            <RedditShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
            <TumblrShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <TumblrIcon size={32} round={true} />
            </TumblrShareButton>
            <ViberShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <ViberIcon size={32} round={true} />
            </ViberShareButton>
            <VKShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <VKIcon size={32} round={true} />
            </VKShareButton>
            <WorkplaceShareButton
              url={sharedUrl}
              title={title}
              className="shareButton"
            >
              <WorkplaceIcon size={32} round={true} />
            </WorkplaceShareButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShareModal;
