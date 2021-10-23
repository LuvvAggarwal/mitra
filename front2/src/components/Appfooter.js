import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { Link } from 'react-router-dom';
const img_url = require("../utils/imgURL") ;

const Appfooter = (params) => {
    const { User } = useContext(UserContext);
    const [imgURL, setImgURL] = useState("")
    if (User) {
        User.then((res)=>{
            console.log(res);
            console.log(res.profile_photo);
            setImgURL(res.profile_photo) ;
        });
    }

        return (
            <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
                <Link to="/home" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
                <Link to="/popular" className="nav-content-bttn"><i className="feather-package"></i></Link>
                <Link to="/groups" className="nav-content-bttn" data-tab="chats"><i className="feather-layout"></i></Link>           
                <Link to="/users" className="nav-content-bttn"><i className="feather-layers"></i></Link>
                <Link to="/userProfile" className="nav-content-bttn"><img src={imgURL ? img_url(imgURL) : "assets/images/user.png"} alt="user" className="w40 h40 mt--1 rounded-circle" /></Link>
            </div>        
        );
    }


export default Appfooter;