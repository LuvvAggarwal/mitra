import React, { useState, useEffect, Fragment } from 'react';
import Postview from '../components/Postview';
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import posts from '../api/posts';
import groups from '../api/groups'
import users from '../api/users';
import InfoCard from '../components/InfoCard';
import InfoCardGroup from '../components/InfoCardGroup'
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';
import AlertComp from '../components/Alert';
import Load from '../components/Load';
import Popupchat from '../components/Popupchat';
const img_url = require("../utils/imgURL");
const errorSetter = require("../utils/errorSetter")
const Search = () => {
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    let { q } = useParams()
    q = q.replaceAll("%D", " ")
    const [user, setUser] = useState(true);
    const [group, setGroup] = useState(false);
    const [post, setPost] = useState(false);

    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})
    // Last number states
    const [userLastNumber, setUserLastNumber] = useState(-1);
    const [postLastNumber, setPostLastNumber] = useState(-1);
    const [groupLastNumber, setGroupLastNumber] = useState(-1);
    // HasMore states
    const [userHasMore, setUserHasMore] = useState(true);
    const [postHasMore, setPostHasMore] = useState(true);
    const [groupHasMore, setGroupHasMore] = useState(true);
    // Data States
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [groupData, setGroupData] = useState([]);

    const showUser = () => {
        setUser(true);
        setGroup(false);
        setPost(false)
    }
    const showGroup = () => {
        setUser(false);
        setGroup(true);
        setPost(false)
    }
    const showPost = () => {
        setUser(false);
        setGroup(false);
        setPost(true)
    }

    const getUserData = async () => {

        const stringifiedQuery = queryString.stringify({
            lastNumber: userLastNumber,
            type: JSON.stringify({ in: ["USER", "NGO", "COUNSALER"] }),
            problem: '',
            keyword: q,
        });
        if (userHasMore && !showAlert) {
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
                    const newLastNumber = payload[payload.length - 1].number;
                    // console.log(">>>>>>> " + newLastNumber);
                    setUserLastNumber(newLastNumber)
                    setUserHasMore(true)
                }
                else {
                    setUserHasMore(false)
                }
            }).catch((e) => {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    const getGroupData = async () => {
        const stringifiedQuery = queryString.stringify({
            lastNumber: groupLastNumber,
            problem: '',
            keyword: q,
        });

        if (groupHasMore && !showAlert) {

            await groups.get("/groups/" + stringifiedQuery,
                { headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload
                if (payload.length > 0) {
                    if (Array.isArray(payload)) {
                        setGroupData(groupData.concat(payload))
                    }
                    const newLastNumber = payload[payload.length - 1].number;
                    // console.log(">>>>>>> " + newLastNumber);
                    setGroupLastNumber(newLastNumber)
                    setGroupHasMore(true)
                }
                else {
                    setGroupHasMore(false)
                }
                // setIsLoading(false)
            }).catch((e) => {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    const getPostData = async () => {
        if (postHasMore && !showAlert) {

            await posts.get("/search/" + q + "/" + postLastNumber,
                { headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload
                if (payload.length > 0) {
                    if (Array.isArray(payload)) {
                        setPostData(postData.concat(payload))
                    }
                    const newLastNumber = payload[payload.length - 1].rank;
                    // console.log(">>>>>>> " + newLastNumber);
                    setPostLastNumber(newLastNumber)
                    setPostHasMore(true)
                }
                else {
                    setPostHasMore(false)
                }
                // setIsLoading(false)
            }).catch((e) => {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    useEffect(() => {
        getUserData()
    }, [user])

    useEffect(()=>{
        getGroupData()
    }, [group])

    useEffect(()=>{
        getPostData()
    },[post])

    return (
        <Fragment>
            {showAlert && <AlertComp config={alertConfig} show={true}></AlertComp>}
            <Header />
            <Leftnav />
            <Rightchat />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <div>
                                    <div className="card-body d-block w-100 shadow-none mb-0 p-0">
                                        <ul className="nav nav-tabs h55 d-flex theme-dark-bg product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist" style={{ overflowX: "auto", flexWrap: "nowrap" }}>
                                            <li className={`cursor-pointer list-inline-item me-5 fw-700 text-grey-500 pt-3 mb-3 ls-1 ${user ? "border-bottom-auto" : ""}`} onClick={showUser}>Users</li>
                                            <li className={`cursor-pointer list-inline-item me-5 fw-700 text-grey-500 pt-3 mb-3 ls-1 ${group ? "border-bottom-auto" : ""}`} onClick={showGroup}>Groups</li>
                                            <li className={`cursor-pointer list-inline-item me-5 fw-700 text-grey-500 pt-3 mb-3 ls-1 ${post ? "border-bottom-auto" : ""}`} onClick={showPost}>Posts</li>
                                        </ul>
                                    </div>
                                    {user && <div id="users" className={user ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="user-tab-1">
                                        <div className="row ps-2 pe-1">
                                            <InfiniteScroll className="row infinite-scroll"
                                                dataLength={userData.length}
                                                next={getUserData}
                                                hasMore={userHasMore}
                                                loader={<Load />}
                                            >
                                                {userData.map((value, index) => {
                                                    return <InfoCard key={index} value={value} AuthStr={AuthStr} variant="USER" showAlert={setShowAlert} alertConfig={setAlertConfig}></InfoCard>
                                                })
                                                }
                                                {/* {isLoading && <Load />} */}
                                            </InfiniteScroll>
                                            {userData.length == 0 && <h2 className="col-xl-8 col-xxl-9 col-lg-8 text-grey-700">No Users Available</h2>}
                                        </div>
                                    </div>}
                                    {group && <div id="group" className={group ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="group-tab-1">
                                        <div className="row ps-2 pe-1">
                                            <InfiniteScroll className="row infinite-scroll"
                                                dataLength={groupData.length}
                                                next={getGroupData}
                                                hasMore={groupHasMore}
                                                loader={<Load />}
                                            >
                                                {groupData.map((value, index) => {
                                                    return <InfoCardGroup key={index} value={value} showAlert={setShowAlert} alertConfig={setAlertConfig}></InfoCardGroup>
                                                })
                                                }
                                                {/* {isLoading && <Load />} */}
                                            </InfiniteScroll>
                                            {groupData.length == 0 && <h2 className="col-xl-8 col-xxl-9 col-lg-8 text-grey-700">No Users Available</h2>}
                                        </div>
                                    </div>}
                                    {post && <div id="post" className={post ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="post-tab-1">
                                        <div className="row ps-2 pe-1">
                                            <InfiniteScroll className="row infinite-scroll"
                                                dataLength={postData.length}
                                                next={getPostData}
                                                hasMore={postHasMore}
                                                loader={<Load />}
                                            >
                                                {postData.map((e, index) => {
                                                    return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user_id={e.users.user_id} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={() => setShowAlert(true)} alertConfig={setAlertConfig} group={e.groups ? e.groups.name : ""} />
                                                })
                                                }
                                                {/* {isLoading && <Load />} */}
                                            </InfiniteScroll>
                                            {postData.length == 0 && <h2 className="col-xl-8 col-xxl-9 col-lg-8 text-grey-700">No Posts Available</h2>}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Popupchat />
            <Appfooter />
        </Fragment>
    )
}

export default Search
