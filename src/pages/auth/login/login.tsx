import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import TwitterIcon from "../../../assets/images/twitter-icon.svg"
import FacebookIcon from "../../../assets/images/facebook-icon.svg"
import './login.sass'
// import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {
    IResolveParams,
    LoginSocialFacebook,
} from 'reactjs-social-login'
import { toast } from 'react-toastify'
import { postLoginUser } from '../../API/ApiCall'
import Loader from '../../../shared/components/loader/loader'
import LoaderComp from '../../../shared/components/loader-component/loader-component'

export const Login = () => {
    // const [value, setValue] = useState<any>()
    // const [numberInput, setNumberInput] = useState(false)
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState<any>()
    const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

    const REDIRECT_URI = 'http://localhost:3000/news'
    const nav = useNavigate();

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
    }, [])

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const [userLogin, setUserLogin] = useState({
        identifier: "",
        password: "",
    });

    const handleChange = (event: any) => {
        if (event.target.name) {
            setUserLogin({
                ...userLogin,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var checkErrorFlag = false
        if (userLogin.identifier.length <= 0) {
            checkErrorFlag = true
            toast.error("Email is required");
        }
        else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userLogin.identifier)) {
            checkErrorFlag = true
            toast.error("Please enter valid email ");
        }
        else if (userLogin.password.length <= 0) {
            checkErrorFlag = true
            toast.error("Password is required");
        }
        else if (userLogin.password.length <= 4) {
            checkErrorFlag = true
            toast.error("Password length should be at least 4 characters");
        }
        try {
            setIsLoading(true)
            if (!checkErrorFlag) {
                await postLoginUser(userLogin.identifier, userLogin.password,)
                    .then(async (res: any) => {
                        if (res?.status === 200) {
                            const user = res.data
                            console.log(user)
                            localStorage.setItem('authorization', JSON.stringify(res.data.jwt));
                            localStorage.setItem('user_id', JSON.stringify(res.data.user.id));
                            nav("/creator")
                            setIsLoading(false)
                        }
                    }).catch((err: any) => {
                        console.log(err)
                        toast.error("User not created");
                        setIsLoading(false)
                    })
            }
        } catch (error: any) {
            console.log(error || 'Error while validate check of creating NFT Listing data ')
            setIsLoading(false)
        }
    }

    return (
        <>
        {/* <LoaderComp msg={msg} isOpen={isLoading} onClose={() => { }} /> */}
            <section className='login-page'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={7} md={10} xs={12}>
                            <div className="form">
                                <Form onSubmit={handleSubmit}>
                                    <h2 className='mb-4 heading-2'>Login to Renoded</h2>
                                    <hr className='mb-4' />
                                    {/* {numberInput ? */}
                                    {/* <Form.Group className="mb-lg-3 mb-2" controlId="login">
                                            <Form.Label className='mb-lg-4 mb-2'>Password</Form.Label>
                                            <PhoneInput
                                                country={'in'}
                                                value={value}
                                                onChange={setValue}
                                            />
                                        </Form.Group> */}
                                    {/* : */}
                                    <Form.Group className="mb-lg-3 mb-2" controlId="loginUsername">
                                        <Form.Label className='mb-lg-3 mb-2'>Email</Form.Label>
                                        <Form.Control type="email" name='identifier' placeholder="Enter email" onChange={handleChange} />
                                    </Form.Group>
                                    {/* } */}
                                    {/* <Form.Group className="mb-lg-3 mb-2" controlId="login">
                                        <Form.Label className='mb-lg-4 mb-2'>Password</Form.Label>
                                        <PhoneInput
                                            country={'in'}
                                            value={value}
                                            onChange={setValue}
                                        />
                                    </Form.Group> */}
                                    <Form.Group className="" controlId="loginPassword">
                                        <Form.Label className='mb-lg-3 mb-2'>Password</Form.Label>
                                        <Form.Control type="password" name='password' placeholder="Enter password" onChange={handleChange} />
                                    </Form.Group>
                                    {/* {numberInput ? */}
                                    {/* <div className='username-number mt-3'>Login with user name</div> */}
                                    {/* <div className='username-number mt-3' onClick={() => { setNumberInput(true) }}>Login with phone number</div> */}
                                    {/* } */}
                                    <Button type='submit' className='second-btn w-100 mt-lg-4 mt-md-3 mt-2 mb-2'>Login</Button>
                                    <div className="d-lg-flex d-md-flex d-block justify-content-between align-items-center">
                                        <Link to=''>Forgot password?</Link>
                                        <p className='mt-lg-0 mb-md-0 mt-2'>Don't have an account? <Link to='/register'> Sign up</Link></p>
                                    </div>
                                    <div className='social-or my-lg-4 my-3'>
                                        <hr />
                                        <p className="normal">OR</p>
                                    </div>
                                    <div className="social-link-login">
                                        <LoginSocialFacebook
                                            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                                            // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
                                            redirect_uri={REDIRECT_URI}
                                            onLoginStart={onLoginStart}
                                            onLogoutSuccess={onLogoutSuccess}
                                            onResolve={({ provider, data }: IResolveParams) => {
                                                setProvider(provider)
                                                setProfile(data)
                                                nav("/")
                                            }}
                                            onReject={(err: any) => {
                                                console.log(err)
                                            }}>
                                            <div className="social-login facebook">
                                                <p className="normal">Login with Facebook</p>
                                                <img src={FacebookIcon} className="icon img-fluid" alt="" />
                                            </div>
                                        </LoginSocialFacebook>
                                        <div className="social-login twitter">
                                            <p className="normal">Login with Twitter</p>
                                            <img src={TwitterIcon} className="icon img-fluid" alt="" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section>
        </>
    )
}
