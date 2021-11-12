import React, { useState, Fragment, useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";
import auth from "../api/auth"
import * as queryString from 'query-string';
import AlertComp from "../components/Alert";

const Joi = require("joi")
const data_type = require("../validation/dataTypes");
const errorSetter = require("../utils/errorSetter")


const Login = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: "",
    //         password: "",
    //         showError: false,
    //         error: "",
    //         user: JSON.parse(localStorage.getItem('user')),
    //         // showSuccess: false,
    //         // success: ,
    //     }
    // }
    const { setCurrentUser, User } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})


    if (User) {
        User.then((res) => {
            if (res.problem_category)
                setRedirect("/home")
            else
                setRedirect("/updateProfile")
        })
    }
    // const [userResolved, setUserResolved] = useState(null)


    // useEffect(() => {
    //     if (User) {
    //         User.then((res) => {
    //             console.log(res);
    //             setUserResolved(res)
    //         })
    //     }
    // }, [])

    const login = async (e) => {
        // const { email, password } = this.state;

        const schema = Joi.object({
            email: data_type.email,
            password: data_type.password,
        })
        const validate = {
            email: email,
            password: password,
        }
        const { error } = schema.validate(validate)
        // console.log(JSON.stringify(error));
        if (error) {
            // setShowError(true)
            // setError(error.details[0].message)
            setShowAlert(true)
            setAlertConfig({ variant: "danger", text: error.details[0].message, icon: "alert-octagon", strongText: "Error:" })

        } else {
            try {
                const response = await auth.post("/login",
                    { email, password }
                ).then((res) => {
                    // console.log(res);
                    localStorage.setItem("access_token", res.data.data.payload.access_token)
                    setCurrentUser(res.data.data.payload.access_token)
                }).catch((e) => {
                    // setShowError(true)
                    // setError(error.details[0].message)
                    setShowAlert(true)
                    setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
                })

            } catch (e) {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            }

        }
    }
    // console.log(process.env);
    const stringifiedParams = queryString.stringify({
        client_id: process.env.REACT_APP_GOOGLE_0AUTH_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/authenticate/google',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;



    return (
        <Fragment>
            <div className="main-wrap" style={{ overflow: 'hidden' }}>
            {showAlert && <AlertComp config={alertConfig}  show={true}></AlertComp>}
                {redirect && <Redirect to={redirect} />}
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Mitra </span> </a>
                        <button className="nav-menu me-0 ms-auto"></button>

                        <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</a>
                        <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</a>
                    </div>
                </div>
                <div className="row" style={{ marginTop: `55px` }}>
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("assets/images/bg-login.png")` }}></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">Login into <br />your account</h2>
                                <form>

                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input type="text" value={email} className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" onChange={(e) => { setEmail(e.target.value) }} placeholder="Your Email Address" />
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        <input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                                        <label className="form-check-label font-xsss text-grey-500">Remember me</label>
                                        <a href="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your Password?</a>
                                    </div>
                                </form>

                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1"><button className="form-control text-center style1-input text-white fw-600 bg-dark border-0 p-0 " disabled={User != undefined ? true : false} onClick={login}>Login</button></div>
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Dont have account <a href="/register" className="fw-700 ms-1">Register</a></h6>
                                </div>
                                <div className="col-sm-12 p-0 text-center mt-2">

                                    <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">Or, Sign in with your social account </h6>
                                    <div className="form-group mb-1"><a href={googleLoginUrl} className="form-control text-left style1-input text-white fw-600 bg-facebook border-0 p-0 mb-2"><img src="assets/images/icon-1.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Google</a></div>
                                    {/* <div className="form-group mb-1"><a href="/register" className="form-control text-left style1-input text-white fw-600 bg-twiiter border-0 p-0 "><img src="assets/images/icon-3.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Facebook</a></div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );

}

export default Login;