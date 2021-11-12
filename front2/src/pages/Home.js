import React, { Fragment, useContext, useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import posts from "../api/posts";
import users from "../api/users";
import groups from "../api/groups";

import socket from '../utils/socket';
import SuggestedFriends from '../components/SuggestedFriends';
import SuggestedGroups from '../components/SuggestedGroups';
import Advertisement from '../components/Advertisement';
import Events from '../components/Events';
import Createpost from '../components/Createpost';
import Groupslider from '../components/sliders/GroupSlider';
import UserSlider from '../components/sliders/UserSlider';
import AdvertisementSlider from '../components/sliders/AdvertisementSlider';
import Storyslider from '../components/Storyslider';
import Postview from '../components/Postview';
import Load from '../components/Load';
import { UserContext } from "../context/UserContext";
// import Profilephoto from '../components/Profilephoto';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as queryString from 'query-string';
import AlertComp from "../components/Alert";
const access_token = localStorage.getItem("access_token");
const AuthStr = 'Bearer '.concat(access_token);
const errorSetter = require("../utils/errorSetter")
// 

const Home = () => {
    const { User } = useContext(UserContext);
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    const [user, setUser] = useState({});
    const [socketState, setSocketState] = useState(socket)
    const [profilePhoto, setProfilePhoto] = useState("")
    const [postLastRank, setPostLastRank] = useState(-1)
    const [postHasMore, setPostHasMore] = useState(true);
    const [postData, setPostData] = useState([]);
    // const [groupLast, setgroupLast] = useState(initialState)
    const [userData, setUserData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [newPostData, setNewPostData] = useState([]);
    let newPostDataCache = []
    // Advertisement
    // Alert
    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})
    // Loader
    const [isLoading, setIsLoading] = useState(false)
    const getFeed = async () => {
        if (postHasMore) {
            setIsLoading(true)
            await posts.get(`/feed/${postLastRank}/-1`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        // console.log(payload);
                        if (Array.isArray(payload)) {
                            setPostData(postData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastRank = payload[payload.length - 1].rank;
                        // console.log(">>>>>>> " + newLastRank);
                        setPostLastRank(newLastRank)
                        setPostHasMore(true)
                    }
                    else {
                        setPostHasMore(false)
                    }
                    setIsLoading(false)
                }).catch(e => {
                    // console.log(e.request);
                    // console.log(e.response);
                    setIsLoading(false)
                    setShowAlert(true)
                    setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }

    const getGroups = async () => {

        const stringifiedQuery = queryString.stringify({
            lastNumber: -1,
            problem: user.problem_category,
            take: 25
            // keyword: search,
        });

        await groups.get("/groups/" + stringifiedQuery,
            { headers: { 'Authorization': AuthStr } }
        ).then((res) => {
            const payload = res.data.data.payload
            if (payload.length > 0) {
                // console.log(payload);
                if (Array.isArray(payload)) {
                    setGroupData(groupData.concat(payload))
                }
                // else if (Array.isArray(payload)) {
                //     setData(data.concat(payload));
                // }
            }
        }).catch((e) => {
            setShowAlert(true)
            setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
        })
    }

    const getUsers = async () => {

        const stringifiedQuery = queryString.stringify({
            lastNumber: -1,
            problem: user.problem_category,
            take: 25,
            type: JSON.stringify({ in: ["USER", "NGO", "COUNSALER"] }),
            // keyword: "",
        });

        await users.get("/users/" + stringifiedQuery,
            { headers: { 'Authorization': AuthStr } }
        ).then((res) => {
            const payload = res.data.data.payload
            if (payload.length > 0) {
                // console.log(payload);
                if (Array.isArray(payload)) {
                    setUserData(userData.concat(payload))
                }
                // else if (Array.isArray(payload)) {
                //     setData(data.concat(payload));
                // }
            }
        }).catch((e) => {
            setShowAlert(true)
            setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
        })
    }

    useEffect(() => {
        User.then((res) => {
            setUser(res)
            setProfilePhoto(res.profile_photo)
        })
        getGroups();
        getUsers();
        getFeed();
    }, [])
    useEffect(() => {
        socket.on("followers",async (list) => {
            if (list.indexOf(user.id)) {
                // (async () => {
                    await posts.get(`/feed/-1/1`, { headers: { 'Authorization': AuthStr } })
                        .then((res) => {
                            const payload = res.data.data.payload;
                            const data = payload[0]
                            if (payload.length > 0) {
                                newPostDataCache = [...payload, ...newPostDataCache];
                                setNewPostData(newPostDataCache)
                            }
                        }).catch(e => {
                            console.error(e);
                            setShowAlert(true)
                            setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
                        })
                // })()
            }
        });
        return ()=>{ 
            socket.off("Unmounting");
            socket.disconnect();
        }

    }, [socket])

    return (
        <Fragment>
            {showAlert && <AlertComp config={alertConfig} show={true}></AlertComp>}
            <Header />
            <Leftnav navClass="re" />
            <Rightchat />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                {/* <Storyslider /> */}
                                <Createpost showAlert={() => setShowAlert(true)} alertConfig={setAlertConfig} profile_photo={profilePhoto} />
                                <InfiniteScroll id="post-list" className="row infinite-scroll"
                                    dataLength={postData.length}
                                    next={getFeed}
                                    hasMore={postHasMore}
                                    loader={<Load />}
                                // scrollableTarget="post-cont"
                                >

                                    {newPostData.map((e, index) => {
                                        // const e = newPostData[key];
                                        return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user_id={e.users.user_id} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={() => setShowAlert(true)} alertConfig={setAlertConfig} group={e.groups ? e.groups.name : ""} />

                                    })}
                                    {postData.map((e, index) => {
                                        if (index % 3 == 0 && index % 6 != 0) {
                                            return <UserSlider data={userData} showAlert={setShowAlert} alertConfig={setAlertConfig} />
                                        } else if (index % 6 == 0 && index != 0) {
                                            return <Groupslider data={groupData} showAlert={setShowAlert} alertConfig={setAlertConfig} />
                                        }
                                        else {
                                            return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user_id={e.users.user_id} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={() => setShowAlert(true)} alertConfig={setAlertConfig} group={e.groups ? e.groups.name : ""} />
                                        }
                                    })}

                                </InfiniteScroll>
                            </div>
                            <div
                                className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                                <SuggestedFriends data={userData.slice(0, 4)} />
                                <SuggestedGroups data={groupData.slice(0, 4)} />
                                {/* <Advertisement /> */}
                                {/* <Events />
                                    <Profilephoto /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popupchat />
            <Appfooter />
        </Fragment>
    );
}

export default Home;