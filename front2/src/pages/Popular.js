import React, { Component, Fragment, useState, useEffect } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Load from '../components/Load';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import posts from "../api/posts";
import Postview from '../components/Postview';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlertComp from "../components/Alert";
const access_token = localStorage.getItem("access_token");
const AuthStr = 'Bearer '.concat(access_token);
const errorSetter = require("../utils/errorSetter")

const Popular = () => {
    const [data, setData] = useState([]);
    const [lastRank, setLastRank] = useState(-1);
    const [hasMore, setHasMore] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})
    const getData = async() => {
        if (hasMore) {
            await posts.get(`/popular/${lastRank}`, { headers: { 'Authorization': AuthStr } })
                .then((res) => {
                    const payload = res.data.data.payload
                    if (payload.length > 0) {
                        // console.log(payload);
                        if (Array.isArray(payload)) {
                            setData(data.concat(payload))
                        }
                        const newLastRank = payload[payload.length - 1].rank;
                        // console.log(">>>>>>> " + newLastRank);
                        setLastRank(newLastRank)
                        setHasMore(true)
                    }
                    else {
                        setHasMore(false)
                    }
                }).catch(e => {
                    // console.log(e.request);
                    // console.log(e.response);
                    setShowAlert(true)
                    setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
                })
        }
    }
    useEffect(()=>{
        getData()
    }, [])
    return (
        <Fragment>
            {showAlert && <AlertComp config={alertConfig} show={true}></AlertComp>}
            <Header />
            <Leftnav />
            <Rightchat />


            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">

                                <InfiniteScroll className="row infinite-scroll"
                                    dataLength={data.length}
                                    next={getData}
                                    hasMore={hasMore}
                                    loader={<Load />}
                                // scrollableTarget="post-cont"
                                >
                                    {data.map((e, index) => {

                                        return <Postview key={e.id} id={e.id} attachment={e.atachments} avatar={e.users.profile_photo} user={e.users.name} time={e.created_on} des={e.description} title={e.title} count={e._count} isLiked={e.likes} showAlert={() => setShowAlert(true)} alertConfig={setAlertConfig} group={e.groups ? e.groups.name : ""} />

                                    })}

                                </InfiniteScroll>
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

export default Popular;