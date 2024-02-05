import React from 'react'
import { Button, Container } from 'react-bootstrap'
import "../cross-promotion/cross-promotion.sass"

export const CrossPromotion = () => {
    return (
        <>
            <div className="advertise-page mb-5">
                <Container>
                    <div className="mb-3 mt-3 text-center">
                        <h1 className='heading-1'>Newsletter Cross-Promotion <br /> on Renoded</h1>
                        {/* <p className='large-height page-description'>Renoded is a fast-growing new media company focused on Web3. Our readership includes executives, investors, founders, and crypto enthusiasts.</p> */}
                    </div>
                    <div className="p-lg-5 mt-md-4 p-3 mb-3 mt-lg-4 mt-4 mt-3 d-flex " style={{ background: "#F4F4F499" }}>
                        <ul className='cross-ul'>
                            <li className='mb-3'>
                                <h5 className='heading-5 fw-500'>Promote your newsletter to our community of Web3 enthusiasts</h5>
                            </li>
                            <li className='mb-3'>
                                <h5 className='heading-5 fw-500'>Renoded is a fast-growing new media company focused on Web3. Our readership includes executives, investors, founders, and crypto enthusiasts.</h5>
                            </li>
                            <li>
                                <h5 className='heading-5 fw-500'>Cross-promotions are a simple but effective growth strategy. You give a shout-out to your partner. In return, they give a shout-out to you. Simple. And free.</h5>
                            </li>
                        </ul>
                        <div className="text-center align-self-end">
                            <Button type='submit' onClick={() => { window.open("https://o7fat38478c.typeform.com/to/LnlsfkHA", "_blank") }} className='second-btn fw-500 ms-5'><h5 className='heading-5 mb-0 fw-400'>Cross-Promo</h5></Button>
                        </div>
                    </div>
                </Container>
            </div>

        </>
    )
}
