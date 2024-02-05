import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "../advertise/advertise.sass"

export const Advertise = () => {
    return (
        <>
            <div className="advertise-page mb-5">
                <Container>
                    <div className="mb-3 mt-3 text-center">
                        <h1 className='heading-1'>Advertise On Renoded</h1>
                    </div>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={12}>
                            <div className="p-lg-5 p-4 mb-3 mt-lg-4 mt-4 mt-3" style={{ background: "#F4F4F499" }}>
                                {/* <h3 className='heading-3'>Our Mission</h3> */}
                                <p className='large-height page-description text-center'>Renoded is a fast-growing new media company focused on Web3. Our readership includes executives, investors, founders, and crypto enthusiasts.</p>
                                {/* <ul className='mt-4'>
                            <li className='mb-3'>
                                <h5 className='fw-400 heading-5'>Over <strong>250,000</strong> newsletter subscribers</h5>
                            </li>
                            <li>
                                <h5 className='fw-400 heading-5'> <strong>50,000-100,000</strong> unique website visitors per month</h5>
                            </li>
                        </ul> */}
                                <div className="text-center">
                                    <Button type='submit' onClick={() => { window.open("https://o7fat38478c.typeform.com/to/LnlsfkHA", "_blank") }} className='second-btn mt-lg-4 mt-md-3 mt-3'><p className="large fw-600">Contact for advertising</p></Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>

        </>
    )
}
