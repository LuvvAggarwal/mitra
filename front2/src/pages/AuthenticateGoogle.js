import React, { useState, Fragment, useContext, useEffect } from 'react';
import * as queryString from 'query-string';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import auth from "../api/auth"
import { UserContext } from "../context/UserContext";
import AlertComp from "../components/Alert";
const AuthenticateGoogle = () => {

    // const [code,setCode] = useState("")
    // const [access_token, setAccessToken] = useState("")
    const { setCurrentUser, User } = useContext(UserContext)
    // const [showError, setShowError] = useState(false);
    // const [error, setError] = useState("");
    const [redirect,setRedirect] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})

    if(User) {User.then((res)=>{
    //    console.log("user");
    //    console.log(res.problem_category);
        if(res.problem_category && res.problem_category != "" && res.problem_category != null && res.problem_category != undefined){
            // console.log("iffffffff");
            setRedirect("/home")
        }
            
        else 
            setRedirect("/updateProfile")
    })}
    // const [data, setData] = useState({})
    let access_token = "";
    useEffect(() => {
        const urlParams = queryString.parse(window.location.search);

        if (urlParams.error) {
            // console.log(`An error occurred: ${urlParams.error}`);
        } else {
            // console.log(`The code is: ${urlParams.code}`);
        }
        const code = urlParams.code;
        // console.log(code);

        const ssoGoogle = async(name,email,user_id,profile_photo)=>{
            const data = await auth.post("/ssoGoogle", {
                name, email, user_id, profile_photo
            }).then((res) => {
                // console.log("res");
                // console.log(res);
                // console.log(res.data.data.access_token);
                setCurrentUser(res.data.data.access_token)
                localStorage.setItem("access_token", res.data.data.access_token)
                // console.log(User);
            }).catch((e) => {
               setShowAlert(true)
                    setAlertConfig({ variant: "danger", text: "Problem in signing in", icon: "alert-octagon", strongText: "Error:" })
                // setError(e.response)
            })
        }
  

        const getGoogleUserInfo = async (access_token) => {
            const data = await axios({
                url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then(async(res) => {
                // console.log(res);
                const { name, email, picture, id } = res.data;
                const user_id = name + "_" + id;
                ssoGoogle(name, email,user_id, picture)
                // setData(res.data)
            }).catch((e) => {
                setShowAlert(true)
              setAlertConfig({ variant: "danger", text: "Problem in signing in", icon: "alert-octagon", strongText: "Error:" })
            })
            // console.log(data); // { id, email, given_name, family_name }
            // setData(data)
        };

        const getAccessTokenFromCode = async (code) => {
            const data = await axios({
                url: `https://oauth2.googleapis.com/token`,
                method: 'post',
                data: {
                    client_id: process.env.REACT_APP_GOOGLE_0AUTH_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_0AUTH_CLIENT_SECRET,
                    redirect_uri: 'http://localhost:3000/authenticate/google',
                    grant_type: 'authorization_code',
                    code,
                },
            }).then((res) => {
                access_token = res.data.access_token;
                getGoogleUserInfo(access_token);
            }).catch((e) => {
                setShowAlert(true)
                    setAlertConfig({ variant: "danger", text: "Problem in signing in", icon: "alert-octagon", strongText: "Error:" })
            });
            // return data.access_token ;
            // console.log(data); // { access_token, expires_in, token_type, refresh_token }
            // setAccessToken(data.access_token)

        }
        getAccessTokenFromCode(code)

        //   access_token = getAccessTokenFromCode(code)
        //   console.log(access_token);

        //   setData(getGoogleUserInfo(access_token))
        //   getGoogleUserInfo(access_token)


    }, [])



    return (
        <div>
           {showAlert && <AlertComp config={alertConfig}  show={true}></AlertComp>}
            {redirect && <Redirect to={redirect}/>}
            <h1>Signing in<span className="animate__animated animate__heartBeat animate__infinite infinite animate__slower	3s">.......</span></h1>
        </div>
    )
}

export default AuthenticateGoogle
