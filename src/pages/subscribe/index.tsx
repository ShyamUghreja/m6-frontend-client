import React from 'react'
import "./style.sass"
import SubscribeModal from '../../shared/components/creator-model/subscribe-modal'

function Subscribe() {

  const iframe = <iframe src="https://embeds.beehiiv.com/76d850d6-6148-40d3-bbca-102a02cee2b3?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{margin: 0, width: "100%", borderRadius: "0px!important", backgroundColor: "transparent"}}></iframe>

  return (
    <div className="subscribe-container">
        <SubscribeModal isOpen={true} toggle={() => {}} setRefreshData={() => {}} iframe={iframe} removeCross/>
    </div>
  )
}

export default Subscribe