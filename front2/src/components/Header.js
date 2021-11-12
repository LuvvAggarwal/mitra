import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Darkbutton from '../components/Darkbutton';
import Leftnav from './Leftnav';
import { UserContext } from "../context/UserContext";
// import { id_opt } from '../../../server/config/validations/dataTypes';
const img_url = require("../utils/imgURL");
const Header = () => {
    // state = {
    //     isOpen: false,
    //     isActive: false,
    //     isNoti: false
    // };
    let { q } = useParams()
    q = q == undefined ? "" : q.replaceAll("%D", " ");
    
    const { User } = useContext(UserContext);
    const [id, setId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isNoti, setIsNoti] = useState(false)
    const [redirect, setRedirect] = useState("");
    const [imgURL, setImgURL] = useState("")
    const [search, setSearch] = useState(q)
    // const url = () => {
    //     if (User) {
    //         User.then((res) => {
    //             console.log(res);
    //             console.log(res.profile_photo);
    //             setImgURL(res.profile_photo);
    //         })
    //     }

    // }
    // console.log(url);
    // console.log(imgURL);
    const toggleOpen = () => setIsOpen(!isOpen)
    const toggleActive = () => setIsActive(!isActive)
    const toggleisNoti = () => setIsNoti(!isNoti)
    // Search
    const triggerSearch = () => {
        window.location.href = "/search/" + search.replaceAll(" ", "%D")
    }

    // const { setCurrentUser, User } = useContext(UserContext);
    // render() {
    const navClass = `${isOpen ? " nav-active" : ""}`;
    const buttonClass = `${isOpen ? " active" : ""}`;
    const searchClass = `${isActive ? " show" : ""}`;
    const notiClass = `${isNoti ? " show" : ""}`;
    // console.log(navClass);

    const loc = window.location.href;


    if (User) {
        User.then((res) => {
            // console.log("user");
            setImgURL(res.profile_photo);
            setId(res.user_id)
            // console.log(res.problem_category);
            if (!res.problem_category) {
                // console.log("iffffffff");
                setRedirect("/updateProfile")
            }
        })
    }
    if (User == undefined && loc.indexOf("login") < 0)
        return <Redirect to="/login" />
    else if (redirect && loc.indexOf("updateProfile") < 0)
        return <Redirect to={redirect} />

    else
        return (
            <div className="nav-header bg-white shadow-xs border-0">
                <div className="nav-top">
                    <Link to="/home">
                        <span className="d-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Meetra </span>
                    </Link>
                    <Link to="/defaultmessage" className="mob-menu ms-auto me-2 chat-active-btn"><i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>
                    <Darkbutton screen="mobile" />
                    {/* <Link to="/defaultvideo" className="mob-menu me-2"><i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></Link> */}
                    <span onClick={toggleActive} className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span>
                    <button onClick={toggleOpen} className={`nav-menu me-0 ms-2 ${buttonClass}`}></button>
                </div>
                {/* Search */}
                <form action="#" className="float-left header-search ms-3">
                    <div className="form-group mb-0 icon-input">
                        <i onClick={triggerSearch} className="cursor-pointer feather-search font-sm text-grey-400"></i>
                        <input type="text" onChange={(e) => {
                            setSearch(e.target.value)
                        }} value={search} placeholder="Start typing to search..." className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 text-grey-500 rounded-xl w350 theme-dark-bg" />
                    </div>
                </form>
                <NavLink activeClassName="active" to="/home" className="p-2 text-center ms-3 menu-icon center-menu-icon"><i className="feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink>
                <NavLink activeClassName="active" to="/popular" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-activity font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink>
                <NavLink activeClassName="active" to="/groups" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-users font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink>
                <NavLink activeClassName="active" to="/users" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink>
                {/* <NavLink activeClassName="active" to="/shop2" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-shopping-bag font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink> */}


                <span className={`p-2 pointer text-center ms-auto menu-icon ${notiClass}`} id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleisNoti}><span className="dot-count bg-warning"></span><i className="feather-bell font-xl text-current"></i></span>
                <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg auto-bg ${notiClass}`} aria-labelledby="dropdownMenu3">
                    <h4 className="fw-700 font-xss mb-4">Notification</h4>
                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="assets/images/user.png" alt="user" className="w40 rounded-circle position-absolute left-0" />
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Hendrix Stamp <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 min</span></h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">There are many variations of pass..</h6>
                    </div>
                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="assets/images/user.png" alt="user" className="w40 rounded-circle position-absolute left-0" />
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Goria Coast <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 min</span></h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>

                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="assets/images/user.png" alt="user" className="w40 rounded-circle position-absolute left-0" />
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Surfiya Zakir <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 1 min</span></h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>
                    <div className="card bg-transparent-card w-100 border-0 ps-5">
                        <img src="assets/images/user.png" alt="user" className="w40 rounded-circle position-absolute left-0" />
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Victor Exrixon <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 30 sec</span></h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>
                </div>
                <Link to="/defaultmessage" className="p-2 text-center ms-3 menu-icon chat-active-btn"><i className="feather-message-square font-xl text-current"></i></Link>
                <Darkbutton screen="web" />
                <Link to={"/userProfile/" + id} className="p-0 ms-3 menu-icon"><img src={imgURL ? img_url(imgURL) : "assets/images/user.png"} alt="user" className="w40 h40 mt--1 rounded-circle" /></Link>

                <Leftnav navClass={`${navClass}`} />
                {/* Search */}
                <div className={`app-header-search ${searchClass}`}>
                    <form className="search-form">
                        <div className="form-group searchbox mb-0 border-0 p-1">
                            <input type="text" onChange={(e) => {
                                setSearch(e.target.value)
                            }} value={search} className="form-control border-0" placeholder="Search..." />
                            <i className="input-icon">
                                <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                            </i>
                            <span onClick={triggerSearch} className="me-2 mt-1 d-inline-block close searchbox-close">
                                <i style={{ right: "40px" }} className="ti-search font-xs"></i>
                            </span>
                            <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                                <i className="ti-close font-xs" onClick={toggleActive}></i>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        );
    // }
}

export default Header;