import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./modal.min.css"
import "./accordion.min.css"
import "./style.sass";
import { getEventDetailsById } from "../API/ApiCall";
import eventIcon from "../assert/images/dropDownIcon.svg"
import moment from "moment";

interface DetailsModalProps {
  open: boolean,
  toggle: () => void,
  eventProjectData: any
}

const Modals = ({ open, toggle, eventProjectData }: DetailsModalProps) => {
  // const [modaldata, setData] = useState<any>()
  const [eventData, setEventData] = useState([]);
  // const [accordionOpen, setaccordionOpen] = useState<string>(`${eventData.length}`)
  const [accordionOpen, setaccordionOpen] = useState<string>(`1`)

  const accordionToggle = (id: any) => {

    // setaccordionOpen(!accordionOpen)
    // accordionOpen !== id ? id : null
    if (accordionOpen === id) {
      setaccordionOpen("")
    }
    else {
      setaccordionOpen(id)
    }
  }

  useEffect(() => {


    if (open) {
      console.log("asdadsaasas");
      // setData(eventProjectData)
      setEventData(eventProjectData)
      // getEventDetailsById(detailId).then(res =>
      //   setData(res.data)
      // )
    }
  }, [eventProjectData, open])

  return (
    <div>
      <Modal centered show={open} onHide={toggle} className="calender-modal">
        <ModalHeader className="p-0 pb-2"><h3>Events</h3> <i onClick={toggle} className="ri-close-fill " role="button"></i></ModalHeader>
        <ModalBody className="p-0 pt-2">
          <Accordion
            //@ts-ignore
            open={accordionOpen}
            //@ts-ignore
            toggle={(targetId) => accordionToggle(targetId)}
          >
            {
              eventData.map((modaldata: any, index: number) =>
                <Accordion.Item
                  key={index}
                  //@ts-ignore
                  className={accordionOpen === `${index + 1}` && "activeItem"}>
                  {/* <Accordion.Header
                    //@ts-ignore
                    targetId={`${index + 1}`}>
                    <div className="event-icon"> {modaldata?.title}</div>
                  </Accordion.Header> */}
                  <Accordion.Body
                    //@ts-ignore
                    cordionid={`${index + 1}`}>
                    <h5 className="ido-name heading-5 fw-400">{modaldata?.title}</h5>
                    <p>{modaldata?.resources?.projectDescription || ""}</p>

                    <div className="eventsInfo">
                      <div className="d-flex modaltext">
                        <div className="resInfo">
                          <span className="title">Start : </span>
                          <span className="detail">{modaldata && modaldata?.resources?.attributes?.startDate && new Date(Number(moment(modaldata?.resources?.attributes?.startDate).format('X')) * 1000)?.toString()?.slice(0, 24)}</span>
                        </div>
                        <div className="resInfo">
                          <span className="title">End : </span>
                          <span className="detail">{modaldata && modaldata?.resources?.attributes?.endDate && new Date(Number(moment(modaldata?.resources?.attributes?.endDate).format('X')) * 1000)?.toString()?.slice(0, 24)}</span>
                        </div>
                      </div>
                      <div className="d-flex modaltext mt-3">
                        <div className="resInfo">
                          <span className="title">Location : </span>
                          <span className="detail">{(modaldata && modaldata?.resources?.attributes?.location) ? modaldata?.resources?.attributes?.location : "No Location"}</span>
                        </div>
                        <div className="socialMedia">
                          <i className="ri-twitter-fill bg-color-secondary me-1" onClick={() => modaldata?.resources?.attributes?.twitterLink && window.open(modaldata?.resources?.attributes?.twitterLink, "_blank")} ></i>
                          <i className="ri-global-line bg-color-primary" onClick={() => modaldata?.resources?.attributes?.websiteLink && window.open(modaldata?.resources?.attributes?.websiteLink, "_blank")}></i>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button className='bg-color-primary fw-600 rounded-0 border-0 mt-2' size="lg">
                        <a href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${modaldata?.title}&dates=${String(modaldata?.resources?.attributes?.startDate).replace(/-|:|\.\d\d\d/g,"")}/${String(modaldata?.resources?.attributes?.endDate).replace(/-|:|\.\d\d\d/g,"")}&details=Link: ${modaldata?.resources?.attributes?.websiteLink || "NA"} \n Twitter Link: ${modaldata?.resources?.attributes?.twitterLink || "NA"}&location=${modaldata?.resources?.attributes?.location}&sf=true&output=xml`}
                          target="_blank"
                          style={{ textDecoration: "none", color: '#fff' }}
                        >
                          Add To Calendar
                        </a>
                      </Button>
                      <Button className='bg-transparent text-dark fw-600 rounded-0 border-0 mt-2 ms-2' onClick={toggle} size="lg">Close</Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>)
            }
          </Accordion>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Modals;
