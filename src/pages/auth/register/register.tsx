import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import TwitterIcon from "../../../assets/images/twitter-icon.svg"
import FacebookIcon from "../../../assets/images/facebook-icon.svg"
import '../login/login.sass'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postRegisterUser } from '../../API/ApiCall'
import Loader from '../../../shared/components/loader/loader'
import LoaderComp from '../../../shared/components/loader-component/loader-component'

export const Register = () => {
    const [userRegister, setUserRegister] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [msg, setMsg] = useState('Please Wait')
  const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event: any) => {
        if (event.target.name) {
            setUserRegister({
                ...userRegister,
                [event.target.name]: event.target.value
            });
        }
    }

    const nav = useNavigate()

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var checkErrorFlag = false
        if (userRegister.username.length <= 4) {
            checkErrorFlag = true
            toast.error("Name should be at least 4 characters");
        }
        else if (userRegister.email.length <= 0) {
            checkErrorFlag = true
            toast.error("Email is required");
        }
        else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userRegister.email)) {
            checkErrorFlag = true
            toast.error("Please enter valid email ");
        }
        else if (userRegister.password.length <= 0) {
            checkErrorFlag = true
            toast.error("Password is required");
        }
        else if (userRegister.password.length <= 4) {
            checkErrorFlag = true
            toast.error("Password length should be at least 4 characters");
        }
        else if (userRegister.confirmPassword !== userRegister.password) {
            checkErrorFlag = true
            toast.error("Password and Confirm Password does not match");
        }
        try {
            setIsLoading(true)
            if (!checkErrorFlag) {
                await postRegisterUser(userRegister.username, userRegister.email, userRegister.password,)
                    .then(async (res: any) => {
                        if (res?.status === 200) {
                            setTimeout(() => {
                                nav("/")
                            }, 1000);
                            setIsLoading(false)
                        }
                    }).catch(err => {
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
                                    <h2 className='mb-4 heading-2'>Sign up</h2>
                                    <hr className='mb-4' />
                                    <Form.Group className="mb-lg-3 mb-2" controlId="registerUsername">
                                        <Form.Label className='mb-lg-4 mb-2'>Username</Form.Label>
                                        <Form.Control type="text" name='username' placeholder="Set username" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-lg-3 mb-2" controlId="registerEmail">
                                        <Form.Label className='mb-lg-4 mb-2'>Email</Form.Label>
                                        <Form.Control type="email" name='email' placeholder="Enter your email" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-lg-3 mb-2" controlId="registerPassword">
                                        <Form.Label className='mb-lg-4 mb-2'>Password</Form.Label>
                                        <Form.Control type="password" name='password' placeholder="Set a strong password" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-lg-3 mb-2" controlId="registerCPassword">
                                        <Form.Label className='mb-lg-4 mb-2'>Confirm Password</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" placeholder="Re-enter password" onChange={handleChange} />
                                    </Form.Group>
                                    {/* <Link to='' className='mt-3'>Login with phone number</Link> */}
                                    <Button type='submit' className='second-btn w-100 mt-lg-5 mt-md-4 mt-3 mb-3'>Sign up</Button>
                                    <div className="d-flex justify-content-end align-items-center">
                                        {/* <Link to=''>Forgot password?</Link> */}
                                        <p className="normal">Already have an account? <Link to='/login'> Log in</Link></p>
                                    </div>
                                    <div className='social-or my-lg-5 my-4'>
                                        <hr />
                                        <p className="normal">OR</p>
                                    </div>
                                    <div className="social-link-login">
                                        <div className="social-login facebook">
                                            <p className="normal">Login with Facebook</p>
                                            <img src={FacebookIcon} className="icon img-fluid" alt="" />
                                        </div>
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
            <ToastContainer />
        </>
    )
}
