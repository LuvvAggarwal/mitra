import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Profiledetail from './Profiledetail';
import Createpost from './Createpost';
import Postview from './Postview';
import Load from './Load';
import InfoCard from "./InfoCard";
import { UserContext } from '../context/UserContext';
import { useParams } from "react-router-dom";
import posts from '../api/posts';
import follow from '../api/follow';
import group from '../api/groups'
import users from '../api/users';
import InfoCardMultiBtn from './InfoCardMultiBtn';
import InfiniteScroll from 'react-infinite-scroll-component';
const img_url = require("../utils/imgURL");
const groupList = [
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },

]
const ProfileCardUser = (props) => {
    const { showAlert, alertConfig } = props;

    const { User } = useContext(UserContext);
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [data, setData] = useState({});
    const [about, setAbout] = useState("show")
    const [post, setPost] = useState("hide")
    const [follower, setFollower] = useState("hide")
    const [following, setFollowing] = useState("hide")
    const [groups, setGroups] = useState("hide")
    // const [alertConfig, alertConfig] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    // Last number states
    const [followerLastNumber, setFollowerLastNumber] = useState(-1);
    const [postLastNumber, setPostLastNumber] = useState(-1);
    const [followingLastNumber, setFollowingLastNumber] = useState(-1);
    const [groupLastNumber, setGroupLastNumber] = useState(-1);
    // HasMore states
    const [followerHasMore, setFollowerHasMore] = useState(true);
    const [postHasMore, setPostHasMore] = useState(true);
    const [followingHasMore, setFollowingHasMore] = useState(true);
    const [groupHasMore, setGroupHasMore] = useState(true);
    // Data States
    const [followerData, setFollowerData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [groupData, setGroupData] = useState([]);

    const btnTextCtrl = (data) => {
        if (data.following)
            return data.following.length > 0 ? "Unfollow" : "Follow"
    }

    const btnCSSCtrl = (data) => {
        if (data.following)
            return data.following.length > 0 ? "btn-danger" : "btn-primary"
    }
    const [btnText, setBtnText] = useState("");
    const [btnCSS, setBtnCSS] = useState("")

    // if(data != {}){
    const profile_photo = data.profile_photo ? img_url(data.profile_photo) : "user.png"
    const cover_photo = data.cover_photo ? img_url(data.cover_photo) : "group.png"
    // }

    const showAbout = () => {
        setAbout("show");
        setPost("hide");
        setFollower("hide");
        setFollowing("hide");
        setGroups("hide")
    }
    const showPost = () => {
        setAbout("hide");
        setPost("show");
        setFollower("hide");
        setFollowing("hide");
        setGroups("hide")
    }
    const showFollower = () => {
        setAbout("hide");
        setPost("hide");
        setFollower("show");
        setFollowing("hide");
        setGroups("hide")
    }
    const showFollowing = () => {
        setAbout("hide");
        setPost("hide");
        setFollower("hide");
        setFollowing("show");
        setGroups("hide")
    }
    const showGroup = () => {
        setAbout("hide");
        setPost("hide");
        setFollower("hide");
        setFollowing("hide");
        setGroups("show")
    }

    const getUser = async () => {
        setIsLoading(true)
        await users.get("/profile/" + id.replaceAll("%20"), { headers: { 'Authorization': AuthStr } }
        ).then(res => {
            setIsLoading(false)
            const payload = res.data.data.payload;
            setData(payload)
            setBtnCSS(btnCSSCtrl(payload))
            setBtnText(btnTextCtrl(payload))
        }).catch(e => {
            setIsLoading(false)
            showAlert()
            alertConfig({ variant: "danger", text: "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
        })
    }

    const btnFunc = async (i) => {
        const following = data.following
        if (following.length > 0) {
            console.log(following);
            await follow.delete("/" + following[0].id, { headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                let obj = data;
                obj.following.pop();
                setData(obj)
                setBtnText("Follow");
                setBtnCSS("btn-primary");
            }).catch((e) => {
                showAlert()
                alertConfig({ variant: "danger", text: e.data.data.message, icon: "alert-octagon", strongText: "Error:" })
            })
        } else {
            await follow.post("/" + data.id, {}, { headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.following.push(payload);
                setData(obj)
                setBtnText("Unfollow")
                setBtnCSS("btn-danger");
            }).catch((e) => {
                console.log(e.request);
                showAlert()
                alertConfig({ variant: "danger", text: e.response.data.message, icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    const getPosts = async () => {
        if (postHasMore) {
            // setIsLoading(true)
            await posts.get(`/user/id=${data.id}/ln=${postLastNumber}`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setPostData(postData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setPostLastNumber(newLastNumber)
                        setPostHasMore(true)
                    }
                    else {
                        setPostHasMore(false)
                    }
                    setIsLoading(false)
                }).catch(e => {
                    console.log(e.request);
                    console.log(e.response);
                    setIsLoading(false)
                    showAlert()
                    alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }

    const getFollowers = async () => {
        if (followerHasMore) {
            // setIsLoading(true)
            await follow.get(`/getFollower/${data.id}/${followerLastNumber}`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setFollowerData(followerData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setFollowerLastNumber(newLastNumber)
                        setFollowerHasMore(true)
                    }
                    else {
                        setFollowerHasMore(false)
                    }
                    setIsLoading(false)
                }).catch(e => {
                    console.log(e.request);
                    console.log(e.response);
                    setIsLoading(false)
                    showAlert()
                    alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }

    const getFollowing = async () => {
        if (followingHasMore) {
            // setIsLoading(true)
            await follow.get(`/getFollowing/${data.id}/${followingLastNumber}`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setFollowingData(followingData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setFollowingLastNumber(newLastNumber)
                        setFollowingHasMore(true)
                    }
                    else {
                        setFollowingHasMore(false)
                    }
                    setIsLoading(false)
                }).catch(e => {
                    console.log(e.request);
                    console.log(e.response);
                    setIsLoading(false)
                    showAlert()
                    alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }

    const getGroups = async () => {
        if (groupHasMore) {
            // setIsLoading(true)
            await group.get(`/user/${data.id}/`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setGroupData(followingData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setGroupLastNumber(newLastNumber)
                        setGroupHasMore(true)
                    }
                    else {
                        setGroupHasMore(false)
                    }
                    setIsLoading(false)
                }).catch(e => {
                    console.log(e.request);
                    console.log(e.response);
                    setIsLoading(false)
                    showAlert()
                    alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }

    const viewProfile = (url)=>{
        window.location.href = `${process.env.PUBLIC_URL}/${url}`
    }



    useEffect(() => {
        getUser();
        User.then((res) => {
            setUser(res)
        })
        console.log(user);
    }, [])

    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h240 p-0 rounded-xxl overflow-hidden m-3"><img src={`${cover_photo}`} alt="avater" /></div>
            <div className="card-body p-0 position-relative">
                <figure className="avatar position-absolute w100 h100 z-index-1" style={{ top: '-40px', left: '30px' }}><img src={`${profile_photo}`} alt="avater" className="float-right p-1 bg-white h100 rounded-circle w-100" /></figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{data.name}<span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{data.email}</span></h4>
                <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                    {data.id !== user.id && <button className={`btn d-none d-lg-block ${btnCSS} p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3`} onClick={btnFunc}>{btnText}</button>}
                    {/* https://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript?rq=1  SEND MAIL*/}
                    <a href={`mailto:${data.email}`} className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i className="feather-mail font-md"></i></a>
                </div>
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul className="nav nav-tabs h55 d-flex theme-dark-bg product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                    <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${about == "show" ? "border-bottom-auto" : ""}`} onClick={showAbout}>About</li>
                    <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${post == "show" ? "border-bottom-auto" : ""}`} onClick={showPost}>Posts</li>
                    <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${follower == "show" ? "border-bottom-auto" : ""}`} onClick={showFollower}>Followers</li>
                    <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${following == "show" ? "border-bottom-auto" : ""}`} onClick={showFollowing}>Following</li>
                    <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${groups == "show" ? "border-bottom-auto" : ""}`} onClick={showGroup}>Groups</li>
                </ul>
            </div>
            <div class="tab-content theme-dark-bg" id="detail-section">
                {about == "show" && <div id="about" className={about == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="about-tab-1">
                    <div className="row">
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                            <Profiledetail bio={data.bio} problem={data.problem ? data.problem.name : ""} email={data.email} address={data.address} ph_number={data.ph_number} />
                            {/* <Profilephoto /> */}
                            {/* <Events /> */}
                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">
                            {data.id === user.id && <Createpost showAlert={showAlert} alertConfig={alertConfig} profile_photo={data.profile_photo} />}
                            {data.posts && data.posts.length > 0 && data.posts.map((e) => {
                                return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={showAlert} alertConfig={alertConfig} group={e.groups ? e.groups.name : ""} />
                            })}
                            {data.posts && data.posts.length == 0 ?
                                <h2 className="col-xl-8 col-xxl-9 col-lg-8 text-grey-500">No Posts Available</h2> :
                                <Button variant="outline-primary" className="w-100 mb-2" size="lg" onClick={showPost}>See All</Button>
                            }
                            {isLoading && <Load />}
                        </div>
                    </div>

                </div>}
                {post == "show" && <div id="post" className={post == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="post-tab-1">
                    <div className="row ps-2 pe-1" id="post-cont" style={{ overflowX: 'hidden' }}>
                        <InfiniteScroll className="row infinite-scroll"
                            dataLength={postData.length}
                            next={getPosts}
                            hasMore={postHasMore}
                            loader={<Load />}
                        // scrollableTarget="post-cont"
                        >
                            {postData.map((e, index) => {
                                return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={showAlert} alertConfig={alertConfig} group={e.groups ? e.groups.name : ""} />
                            })}

                        </InfiniteScroll>



                    </div>
                </div>}
                {follower == "show" && <div id="followers" className={follower == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="follower-tab-1">
                    <div className="row ps-2 pe-1">
                        <InfiniteScroll className="row infinite-scroll"
                            dataLength={followerData.length}
                            next={getFollowers}
                            hasMore={followerHasMore}
                            loader={<Load />}
                        // scrollableTarget="post-cont"
                        >
                            {followerData.map((value, index) => {
                                return <InfoCardMultiBtn key={index} value={value.follower_user} page={`userProfile/${value.follower_user.user_id}`} btns={[
                                    {
                                        css: 'bg-grey',
                                        func: viewProfile(`userProfile/${value.follower_user.user_id}`),
                                        text: "View Profile"
                                    }
                                ]} showAlert={showAlert} alertConfig={alertConfig}></InfoCardMultiBtn>
                            })}
                        </InfiniteScroll>



                    </div>
                </div>}
                {following == "show" && <div id="following" className={following == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="following-tab-1">
                    <div className="row ps-2 pe-1">
                        <InfiniteScroll className="row infinite-scroll"
                            dataLength={followingData.length}
                            next={getFollowing}
                            hasMore={followingHasMore}
                            loader={<Load />}
                        // scrollableTarget="post-cont"
                        >
                            {followingData.map((value, index) => {
                                return <InfoCardMultiBtn key={index} value={value.following_user} page={`userProfile/${value.following_user.user_id}`} btns={[
                                    {
                                        css: 'bg-grey',
                                        func: viewProfile(`userProfile/${value.following_user.user_id}`),
                                        text: "View Profile"
                                    }
                                ]} showAlert={showAlert} alertConfig={alertConfig}></InfoCardMultiBtn>
                            })}
                        </InfiniteScroll>

                    </div>
                </div>}
                {groups == "show" && <div id="group" className={groups == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="group-tab-1">
                <div className="row ps-2 pe-1">
                    <InfiniteScroll className="row infinite-scroll"
                        dataLength={groupData.length}
                        next={getGroups}
                        hasMore={groupHasMore}
                        loader={<Load />}
                    // scrollableTarget="post-cont"
                    >
                        {followingData.map((value, index) => {
                            return <InfoCardMultiBtn key={index} value={value.groups} page={`groupProfile/${value.groups.group_id}`} btns={[
                                {
                                    css: 'bg-grey',
                                    func: viewProfile(`groupProfile/${value.groups.group_id}`),
                                    text: "View Profile"
                                }
                            ]} showAlert={showAlert} alertConfig={alertConfig}></InfoCardMultiBtn>
                        })}
                    </InfiniteScroll>
                </div>
                </div>}
        </div>

        </div >

    );
}

export default ProfileCardUser;