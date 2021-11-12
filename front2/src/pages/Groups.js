import React, { Fragment, useState, useEffect, useRef, } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { UserContext } from "../context/UserContext";
import Load from '../components/Load';
import * as queryString from 'query-string';
import groups from "../api/groups"
// import follower_following from "../api/follow"
// import useFetch from "../hooks/useFetch";
import InfoCardGroup from "../components/InfoCardGroup";
// import InfiniteScroll from "react-infinite-scroller"
import AlertComp from "../components/Alert";
import InfiniteScroll from 'react-infinite-scroll-component';
// import { required } from "joi";
// import AlertDiv from "../components/Alert";+
// const alertDiv = require("../components/Alert")
const access_token = localStorage.getItem("access_token");
const AuthStr = 'Bearer '.concat(access_token);
const errorSetter = require("../utils/errorSetter")
const Groups = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [lastNumber, setLastNumber] = useState(-1)
    const [hasMore, setHasMore] = useState(true)
    // const [loadMore, setLoadMore] = useState(false)
    const [problemCategory, setProblemCategory] = useState("")
    const [search, setSearch] = useState("")
    const [triggerSearch, setTriggerSearch] = useState(false);
    // const { loading, error, list } = useFetch(query, page);
    const loader = useRef(null);
    const [showAlert, setShowAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({})
    // const [btnText, setBtnText] = useState("")
    // const [btnCSS, setBtnCSS] = useState("")
    // const [TriggerSearchFalse, setTriggerSearchFalse] = useState(false)// to continue flow normally
    const items = []



    const getData = async () => {
        const stringifiedQuery = queryString.stringify({
            lastNumber: lastNumber,
            problem: problemCategory,
            keyword: search,
        });

        if ((hasMore || triggerSearch) && !showAlert) {
           
            await groups.get("/groups/" + stringifiedQuery,
                { headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload
                if (payload.length > 0) {
                    // console.log(payload);
                    if (Array.isArray(payload)) {
                        setData(data.concat(payload))
                    }
                    // else if (Array.isArray(payload)) {
                    //     setData(data.concat(payload));
                    // }
                    const newLastNumber = payload[payload.length - 1].number;
                    // console.log(">>>>>>> " + newLastNumber);
                    setLastNumber(newLastNumber)
                    setHasMore(true)
                }
                else {
                    setHasMore(false)
                }
                // setIsLoading(false)
            }).catch((e) => {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (triggerSearch.toString().startsWith("true")) {
            getData()
        }
    }, [triggerSearch])

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

                                <Pagetitle title="Groups" showlink={true} link={{ url: "/createGroup", text: "New" }} problemState={setProblemCategory} searchState={setSearch} searchVal={search} triggerSearch={setTriggerSearch} setLastNumber={setLastNumber} dataSet={setData} hasMore={setHasMore} />

                                <InfiniteScroll className="row infinite-scroll"
                                    dataLength={data.length}
                                    next={getData}
                                    hasMore={hasMore}
                                    loader={<Load />}
                                >
                                    {data.map((value, index) => {
                                        return <InfoCardGroup key={index} value={value} showAlert={setShowAlert} alertConfig={setAlertConfig}></InfoCardGroup>
                                    })
                                    }
                                    {/* {isLoading && <Load />} */}
                                </InfiniteScroll>
                                {!hasMore && data.length == 0 && <h2 className="text-grey-500">No Results Found</h2>}
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

export default Groups