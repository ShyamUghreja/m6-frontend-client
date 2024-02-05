import React, { useEffect, useState } from "react";
import { Button, Navbar, ToastContainer } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "../../../assets/images/logo.svg";
import "../header/header.sass";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import menuOpenIcon from "../../../assets/images/menu-open.svg";
import { toast } from "react-toastify";
import e from "express";

const Header = () => {
  const [isActive, setActive] = useState(false);
  const [showA, setShowA] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [scroll, setScroll] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLogoutMenu, setIsLogoutMenu] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    if (userId !== null) {
      setIsLoggedin(true)
    }
  }, [userId])

  const nav = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, []);

  const openLogoutMenu = () => {
    setIsLogoutMenu(!isLogoutMenu);
  }

  const logOut = () => {
    localStorage.clear();
    setIsLoggedin(false)
    nav("/")
  }
  const [message, setMessage] = useState('');

  const handleChange = (event: any) => {

    setMessage(event.target.value);
  };
  const handleClick = () => {
    setMessage('');
  };
  const handelSubmitSearch = (event:any) => {
    event.preventDefault();
    if(message?.length > 1) {
      nav(`/search-page/${message}`)
    } else{
      toast.error("Please enter any text to search any articles")
    }
  }

  return (
    <>
    <ToastContainer/>
      <header className={scroll ? "scrolled" : ""}>
        <Navbar>
          <Container fluid>

            <Navbar.Brand className="d-lg-flex" onClick={() => { nav("/") }}>
              <img src={Logo} alt="logo" />
            </Navbar.Brand>
            <Navbar
              className={
                isActive
                  ? "justify-content-end menu logo active"
                  : "justify-content-end menu logo"
              }
            >
              <Nav className="header-navigation">
                <Navbar.Brand onClick={() => { nav("/") }}>
                  <img src={Logo} alt="logo" />
                </Navbar.Brand>

                <div className="mobile-search">
                  <form className="mobile-search-input" onSubmit={handelSubmitSearch}>
                      <input type="text" placeholder="Search..." onChange={(event:any)=> { handleChange(event)}} autoFocus />
                      <i className="ri-search-line search-icon"></i>
                  </form>
                  {isLoggedin &&
                    <div className="position-relative users-default d-lg-none d-flex" onClick={openLogoutMenu}>
                      <i className="ri-user-3-line"></i>
                      {
                        isLogoutMenu ?
                          <ul className="users-login">
                            <li role="button" onClick={() => { nav(`/creatorprofile/${userId}`, { state: { id: userId } }); setActive(false); setSearchBox(false) }}>View Profile</li>
                            <li role="button" onClick={() => { nav("/creator"); setActive(false); setSearchBox(false) }}>Edit Profile</li>
                            <li role="button" onClick={() => { logOut(); setActive(false); setSearchBox(false) }}>Logout</li>
                          </ul>
                          : ""
                      }
                    </div>
                  }
                </div>

                <div className="close-menu-icon" onClick={() => { setActive(false); setSearchBox(false) }}>
                  <i className="ri-close-line"></i>
                </div>
                <Link
                  to="/"
                  className={splitLocation[1] === "" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Home
                </Link>
                <Link
                  to="/research"
                  className={splitLocation[1] === "research" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Research
                </Link>
                <Link
                  to="/education"
                  className={splitLocation[1] === "education" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Education
                </Link>
                <Link
                  to="/news"
                  className={splitLocation[1] === "news" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  News
                </Link>
                <Link
                  to="/podcasts"
                  className={splitLocation[1] === "podcasts" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Podcasts
                </Link>
                <Link
                  to="/allcreator"
                  className={splitLocation[1] === "allcreator" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Community
                </Link>
                <Link
                  to="/calendar"
                  className={splitLocation[1] === "calendar" ? "active" : ""}
                  onClick={() => { setActive(false); setSearchBox(false) }}
                >
                  Events
                </Link>
                {!isLoggedin &&
                  <Button
                    type="button"
                    className="sign-in-btn btn btn-primary d-lg-none d-block w-50 m-2" onClick={() => { nav("/login"); setActive(false); setSearchBox(false) }}
                  >
                    Sign In
                  </Button>
                }
              </Nav>
            </Navbar>
            <div className="left-part desk-search ">
              <div className="d-lg-inline d-md-inline d-none">
                {!searchBox &&
                  <span className="custom-search " onClick={() => setSearchBox(true)}>
                    <i className="ri-search-line search-icon"></i>
                  </span>
                }
                {searchBox &&
                  <form onSubmit={handelSubmitSearch} onBlur={(e) => { setSearchBox(false) }}>
                    <div className="me-4">
                      <div className="input-box">
                        <span className="search ms-2 d-flex">
                          <i className="ri-search-line search-icon"></i>
                        </span>
                        <input type="text" placeholder="Search..." onChange={(event:any)=> {handleChange(event)}} autoFocus />
                      </div>
                    </div>
                  </form>
                }
              </div>
              {isLoggedin ?
                <div className="position-relative user-default d-lg-flex d-none">
                  <i className="ri-user-3-line"></i>
                  <ul className="user-login">
                    <li role="button" onClick={() => { nav(`/creatorprofile/${userId}`, { state: { id: userId } }); setActive(false) }}>View Profile</li>
                    <li role="button" onClick={() => { nav("/creator"); setActive(false) }}>Edit Profile</li>
                    <li role="button" onClick={() => { logOut() }}>Logout</li>
                  </ul>
                </div> :
                <Button
                  type="button"
                  className="sign-in-btn btn btn-primary d-lg-flex d-none" onClick={() => { nav("/login"); setActive(false) }}
                >
                  <span style={{ marginTop: '-2px', marginBottom: '1px' }}>Sign In</span>
                </Button>
              }
              <a className="open-menu-icon" onClick={() => setActive(true)}>
                <img src={menuOpenIcon} alt="" className="img-fluid" />
              </a>
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
