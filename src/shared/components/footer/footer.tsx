import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../footer/footer.sass';
import Logo from '../../../assets/images/footer-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCategorys, getNewsData } from '../../../pages/API/ApiCall';
import { HashLink } from 'react-router-hash-link';

function Footer() {
    const nav = useNavigate()
    const [allArtilcles, setAllArtilcles] = useState([])
    const [allCategory, setAllCategory] = useState<any>([])

    useEffect(() => {
        getAllNewsData()
        getAllCategorysData()
    }, [])

    const getAllCategorysData = async () => {
        try {
            await getAllCategorys()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        const data = res?.data?.data || []
                        setAllCategory(data)
                    }
                }).catch((err: any) => {
                    console.log(err?.response?.data?.error?.message)
                })
        }
        catch (err: any) {
            console.log(err?.response?.data?.error?.message)
            return { error: err?.response?.data };
        }
    };

    const getAllNewsData = async () => {
        await getNewsData(0, 5, "Trending", false, true, "", "", "", "news")
            .then(async (res: any) => {
                if (res?.status === 200) {
                    let allArticle = res?.data?.data || []
                    setAllArtilcles(allArticle)
                }
            }).catch((err: any) => {
            })
    };

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg={12} className="text-center">
                        <div className="logo" role="button" onClick={() => { nav("/") }}>
                            <img src={Logo} alt="" className='img-fluid' />
                        </div>
                        <hr className='mt-lg-4 mt-3 mb-lg-5 mb-md-4 mb-3' />
                    </Col>
                </Row>
                <div className="footer-content">
                    <div className="footer-link">
                        <Row>
                            <Col lg={3} md={4} xs={12}>
                                <h4 className='heading-4'>Most popular</h4>
                                <ul>
                                    {
                                        allArtilcles && allArtilcles.map((item: any, index: number) => {
                                            return <li key={index}>
                                                <Link to={`/article/${item?.attributes?.slug}`}>
                                                    <span
                                                        title={item?.attributes.title}
                                                        style={{ display: "block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "200px" }}
                                                    >
                                                        {item?.attributes?.title || ""}
                                                    </span>
                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </Col>
                            <Col lg={3} md={4} xs={6}>
                                <h4 className='heading-4'>Categories</h4>
                                <ul>
                                    {allCategory && allCategory.map((item: any, i: number) => (
                                        <li key={i}>
                                            <Link to={`/categoriesdetails/research/${item?.id}`}>{item?.attributes?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                            <Col lg={3} md={4} xs={6}>
                                <h4 className='heading-4'>Resources</h4>
                                <ul>
                                    <li>
                                        <HashLink smooth to="education#actionGauide" style={{ textDecoration: "none" }}>Actionable guides</HashLink>
                                    </li>
                                    <li>
                                        <Link to="/topblogs">Top Publications</Link>
                                    </li>
                                    <li>
                                        <Link to="/people">People to Follow</Link>
                                    </li>
                                    <li>
                                        <Link to="/besttools">Best tools</Link>
                                    </li>
                                    <li>
                                        <Link to="/walletapps">Wallet apps</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={3} md={4} xs={6}>
                                <h4 className='heading-4'>Quick Links</h4>
                                <ul>
                                    <li>
                                        <Link to="/aboutus">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/research">Research</Link>
                                    </li>
                                    <li>
                                        <Link to="/news">News</Link>
                                    </li>
                                    <li>
                                        <Link to="/podcasts">Podcasts</Link>
                                    </li>
                                    <li>
                                        <Link to="/advertise">Advertise with us</Link>
                                    </li>
                                    <li>
                                        <Link to="" onClick={() => { window.open("mailto:info@renoded.com") }}>Contact</Link>
                                    </li>
                                    <li>
                                        <Link to="/cross-promotion" >Cross Promotion</Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <hr className='mb-lg-4 mb-3 mt-lg-5 mt-md-4 mt-3' />
                        <div className='social-media-links'>
                            <h6 className='fw-500 heading-6'>@ 2023 Renoded.com. All rights reserved</h6>
                            <ul>
                                {/* <li>
                                    <h6 className='fw-500 heading-6'>Social Media :</h6>
                                </li> */}
                                <li>
                                    <a href="https://twitter.com/RenodedMedia" target='_blank'><i className="ri-twitter-fill"></i></a>
                                </li>
                                {/* <li>
                                    <Link to="https://twitter.com/RenodedMedia" target='_blank'><i className="ri-facebook-fill"></i></Link>
                                </li> */}
                                <li>
                                    <a href="https://www.linkedin.com/company/renoded" target='_blank'><i className="ri-linkedin-fill"></i></a>
                                </li>
                                {/* <li>
                                    <Link to=""><i className="ri-pinterest-line"></i></Link>
                                </li> */}
                                <li>
                                    <a href="https://instagram.com/renodedmedia" target='_blank'><i className="ri-instagram-fill"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
