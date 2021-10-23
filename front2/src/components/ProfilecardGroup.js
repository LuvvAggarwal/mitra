import React, { useContext, useState, useEffect } from 'react';
import Profiledetail from './Profiledetail';
import Createpost from './Createpost';
import Postview from './Postview';
import Load from './Load';
import InfoCard from "./InfoCard";
import posts from '../api/posts';
import groups from '../api/groups';
import grpMember from "../api/groupMember"
import { UserContext } from '../context/UserContext';
import { useParams } from "react-router-dom";
import AlertComp from "../components/Alert";
import { Button } from 'react-bootstrap';
import InfoCardMultiBtn from './InfoCardMultiBtn';
import InfiniteScroll from 'react-infinite-scroll-component';
const img_url = require("../utils/imgURL");

const ProfileCardGroup = (props) => {

    const { showAlert, alertConfig } = props;
    const { User } = useContext(UserContext);
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    const { id } = useParams()
    const [data, setData] = useState({});
    const [about, setAbout] = useState("show")
    const [post, setPost] = useState("hide")
    const [member, setMember] = useState("hide")
    const [request, setRequest] = useState("hide")
    // const [alertConfig, alertConfig] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    // Last number states
    const [memberLastNumber, setMemberLastNumber] = useState(-1);
    const [postLastNumber, setPostLastNumber] = useState(-1);
    const [reqLastNumber, setReqLastNumber] = useState(-1)
    // HasMore states
    const [memberHasMore, setMemberHasMore] = useState(true);
    const [postHasMore, setPostHasMore] = useState(true);
    const [reqHasMore, setReqHasMore] = useState(true)
    // Data States
    const [memberData, setMemberData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [reqData, setReqData] = useState([])
    // BTN STATES
    const btnTextCtrl = (data) => {
        if (data != {}) {
            const req = data.requests;
            const mem = data.members;
            if (req.length == 0 && mem.length == 0) {
                return "Request To Join"
            }
            if (req.length > 0) {
                return "Cancel Request"
            }
            if (mem.length > 0) {
                return "Leave"
            }
        } else {
            return "Getting Data"
        }

    }
    const btnCSSCtrl = (data) => {
        if (data != {}) {
            const req = data.requests;
            const mem = data.members;
            if (req.length == 0 && mem.length == 0) {
                return "bg-success"
            }
            if (req.length > 0) {
                return "bg-light text-grey-800"
            }
            if (mem.length > 0) {
                return "bg-danger"
            }
        } else {
            return 'bg-info'
        }
    }
    const [btnText, setBtnText] = useState("");
    const [btnCSS, setBtnCSS] = useState("")

    const profile_photo = data.profile_photo ? img_url(data.profile_photo) : "user.png"
    const cover_photo = data.cover_photo ? img_url(data.cover_photo) : "group.png"


    const showAbout = () => {
        setAbout("show");
        setPost("hide");
        setMember("hide");
        setRequest("hide");
    }
    const showPost = () => {
        setAbout("hide");
        setPost("show");
        setMember("hide");
        setRequest("hide");
    }
    const showMember = () => {
        setAbout("hide");
        setPost("hide");
        setMember("show");
        setRequest("hide");
    }
    const showRequest = () => {
        setAbout("hide");
        setPost("hide");
        setMember("hide");
        setRequest("show");
    }

    const getGroup = async () => {
        setIsLoading(true)
        await groups.get("/profile/id=" + id, { headers: { 'Authorization': AuthStr } }
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

    const getMembers = async () => {
        if (memberHasMore) {
            setIsLoading(true)
            await grpMember.get(`/groupMembers/id=${data.id}/${memberLastNumber}/false`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setMemberData(memberData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setMemberLastNumber(newLastNumber)
                        setMemberHasMore(true)
                    }
                    else {
                        setMemberHasMore(false)
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

    const getPosts = async () => {
        if (postHasMore) {
            setIsLoading(true)
            await posts.get(`/group/id=${data.id}/${postLastNumber}`, { headers: { 'Authorization': AuthStr } })
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

    const getRequests = async () => {
        if (reqHasMore) {
            setIsLoading(true)
            await grpMember.get(`/groupMemberReq/id=${data.id}/ln=${reqLastNumber}`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        console.log(payload);
                        if (Array.isArray(payload)) {
                            setReqData(reqData.concat(payload))
                        }
                        // else if (Array.isArray(payload)) {
                        //     setData(data.concat(payload));
                        // }
                        const newLastNumber = payload[payload.length - 1].number;
                        console.log(">>>>>>> " + newLastNumber);
                        setReqLastNumber(newLastNumber)
                        setReqHasMore(true)
                    }
                    else {
                        setReqHasMore(false)
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

    useEffect(() => {
        getGroup()

    }, [])

    const btnFunc = async (i) => {
        const req = data.requests ;
        const mem = data.members ;
        if (req.length > 0) {
            // alert("=      = req");
            await grpMember.delete(`/req/id=${req[0].id}/rec=${req[0].request_reciever}/sen=${req[0].request_sender}`,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                let obj = data;
                // console.log(obj);
                obj.requests.pop();
                setData(obj)
                setBtnText("Request To Join");
                setBtnCSS("bg-success");
            }).catch((e) => {
                console.log("error>>>>>>>>>>>>>>>>>>");
                console.log(e);
                console.log(e.response);
                showAlert()
                alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
            })
        } else if(mem.length > 0){
            await grpMember.delete("/id=" + mem[0].id ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.members.pop();
                setData(obj)
                setBtnText("Request To Join");
                setBtnCSS("bg-success");
            }).catch((e) => {
                console.log("error>>>>>>>>>>>>>>>>>>");
                console.log(e);
                console.log(e.response);
                showAlert()
                alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
            })
        }else if(mem.length == 0 && req.length == 0){
            await grpMember.post("/addReq/" + data.id,{request_reciever: data.created_by} ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.requests.push(payload);
                setData(obj)
                setBtnText("Cancel Request");
                setBtnCSS("bg-light text-grey-800");
            }).catch((e) => {
                console.log("error>>>>>>>>>>>>>>>>>>");
                console.log(e);
                console.log(e.response);
                showAlert()
                alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    const rejectReq = async (e) => {
        await grpMember.delete(`/req/id=${e.id}/rec=${e.request_reciever_user.id}/sen=${e.request_sender_user.id}}`, { headers: { 'Authorization': AuthStr } }
        ).then((res) => {
            const message = res.data.message;
            console.log("res >>>>>>>>>>>");
            console.log(res);
            showAlert()
            alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
        }).catch((e) => {
            console.log("error>>>>>>>>>>>>>>>>>>");
            console.log(e);
            console.log(e.response);
            showAlert()
            alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
        })
    }
    const acceptReq = async (e) => {
        await grpMember.post(`/addMember/id=${e.id}`, {}, { headers: { 'Authorization': AuthStr } })
            .then((res) => {
                const message = res.data.message;
                console.log("res >>>>>>>>>>>");
                console.log(res);
                showAlert()
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
            }).catch((e) => {
                console.log("error>>>>>>>>>>>>>>>>>>");
                console.log(e);
                console.log(e.response);
                showAlert()
                alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
            })
    }

    // const btns = 

    return (
        <>

            <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                <div className="card-body h240 p-0 rounded-xxl overflow-hidden m-3"><img src={`${cover_photo}`} alt="avater" /></div>
                <div className="card-body p-0 position-relative">
                    <figure className="avatar position-absolute w100 h100 z-index-1" style={{ top: '-40px', left: '30px' }}><img src={`${profile_photo}`} alt="avater" className="float-right p-1 bg-white h100 rounded-circle w-100" /></figure>
                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{data.name}<span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{data.email}</span></h4>
                    <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                        <button className={`btn d-none d-lg-block ${btnCSS} p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3`} onClick={btnFunc}>{btnText}</button>
                        {/* https://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript?rq=1  SEND MAIL*/}
                        <a href={`mailto:${data.email}`} className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i className="feather-mail font-md"></i></a>
                        {/* https://www.callrail.com/blog/add-click-to-call-button-website-html/ */}

                    </div>
                </div>

                <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                    <ul className="nav nav-tabs h55 d-flex theme-dark-bg product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                        <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${about == "show" ? "border-bottom-auto" : ""}`} onClick={showAbout}>About</li>
                        <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${post == "show" ? "border-bottom-auto" : ""}`} onClick={showPost}>Posts</li>
                        <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${member == "show" ? "border-bottom-auto" : ""}`} onClick={(e) => {
                            showMember()
                            getMembers()
                        }}>Members</li>
                        <li className={`cursor-pointer list-inline-item me-5 fw-700 font-xssss text-grey-500 pt-3 mb-3 ls-1 ${request == "show" ? "border-bottom-auto" : ""}`} onClick={showRequest}>Requests</li>
                    </ul>
                </div>
                <div className="tab-content theme-dark-bg" id="detail-section">
                    {about == "show" && <div id="about" className={about == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="about-tab-1">
                        <div className="row">
                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                <Profiledetail bio={data.bio} problem={data.problem ? data.problem.name : ""} email={data.email} />
                                {/* <Profilephoto /> */}
                                {/* <Events /> */}
                            </div>
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                {data.members && data.members.length != 0 && <Createpost showAlert={showAlert} alertConfig={alertConfig} profile_photo={data.profile_photo} group={data.id} />}
                                {data.posts && data.posts.length > 0 && data.posts.map((e) => {
                                    return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={showAlert} alertConfig={alertConfig}/>
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
                                    return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={showAlert} alertConfig={alertConfig}/>
                                })}

                            </InfiniteScroll>



                        </div>
                    </div>}
                    {member == "show" && <div id="member" className={member == "show" ? "d-block" : "d-none"} role="tabpanel" aria-labelledby="member-tab-1">
                        <div className="row ps-2 pe-1">
                            <InfiniteScroll className="row infinite-scroll"
                                dataLength={memberData.length}
                                next={getMembers}
                                hasMore={memberHasMore}
                                loader={<Load />}
                            >
                                {memberData.map((value, index) => {
                                    // btns={{ text: "Remove", css: 'btn-danger' }} btn2={{ text: "Make Admin", css: 'btn-primary' }}
                                    return <InfoCardMultiBtn key={index} value={value.users} page={`userProfile/${value.users.user_id}`} btns={[]} showAlert={showAlert} alertConfig={alertConfig}></InfoCardMultiBtn>
                                })
                                }
                                {/* {isLoading && <Load />} */}
                            </InfiniteScroll>
                        </div>
                    </div>}
                    {request == "show" && <div id="request" className={`${request == "show" ? "d-block" : "d-none"}`} role="tabpanel" aria-labelledby="request-tab-1">
                        <div className="row ps-2 pe-1">
                            <InfiniteScroll className="row infinite-scroll"
                                dataLength={reqData.length}
                                next={getRequests}
                                hasMore={reqHasMore}
                                loader={<Load />}
                            >
                                {reqData.map((value, index) => {
                                    // btns={{ text: "Remove", css: 'btn-danger' }} btn2={{ text: "Make Admin", css: 'btn-primary' }}
                                    return <InfoCardMultiBtn key={index} page={`userProfile/${value.request_sender_user.user_id}`} value={value.request_sender_user} btns={[
                                        {
                                            text: "Reject",
                                            css: "btn-danger",
                                            func: (e) => rejectReq(value)
                                        },
                                        {
                                            text: "Accept",
                                            css: "btn-primary",
                                            func: (e) => acceptReq(value)
                                        },
                                    ]} showAlert={showAlert} rtConfig={alertConfig}></InfoCardMultiBtn>
                                })
                                }
                                {/* {isLoading && <Load />} */}
                            </InfiniteScroll>
                            {reqData.length == 0 && <h2 className="col-xl-8 col-xxl-9 col-lg-8 text-grey-500">No Requests Available</h2> }
                        </div>
                    </div>}
                </div>

            </div>
        </>
    );
}

export default ProfileCardGroup;