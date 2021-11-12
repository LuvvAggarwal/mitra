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
import users from "../api/users"
// import follower_following from "../api/follow"
import useFetch from "../hooks/useFetch";
import InfoCard from "../components/InfoCard";
// import InfiniteScroll from "react-infinite-scroller"
import AlertComp from "../components/Alert";
import InfiniteScroll from 'react-infinite-scroll-component';
// import { required } from "joi";
// import AlertDiv from "../components/Alert";+
// const alertDiv = require("../components/Alert")
const access_token = localStorage.getItem("access_token");
const AuthStr = 'Bearer '.concat(access_token);

const User = () => {
    const [data, setData] = useState([])
    // const { User } = useContext(UserContext);
    // const listInnerRef = useRef()
    // const [id, setId] = useState("");

    // const [items, setItems] = useState([])
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
            type: "USER",
            problem: problemCategory,
            keyword: search,
        });
        // console.log("teszt");
        if ((hasMore || triggerSearch) && !showAlert) {
            setIsLoading(true)
            // alert("data");

            await users.get("/users/" + stringifiedQuery,
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
                setIsLoading(false)
            }).catch((e) => {
                setShowAlert(true)
                setAlertConfig({ variant: "danger", text: "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }


    useEffect(() => {
        // setId(User.then((res) => {return res.id})) ;
        // console.log("user>>>>>> " + id);
        getData()
        // document.getElementById("data-displayer").addEventListener("scroll", scrollHandler)
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

                                <Pagetitle title="USER" showlink={false} problemState={setProblemCategory} searchState={setSearch} searchVal={search} triggerSearch={setTriggerSearch} setLastNumber={setLastNumber} dataSet={setData} hasMore={setHasMore} />

                                <InfiniteScroll className="row infinite-scroll"
                                    dataLength={data.length}
                                    next={getData}
                                    hasMore={hasMore}
                                    loader={<Load />}
                                >
                                    {data.map((value, index) => {
                                        return <InfoCard key={index} value={value} AuthStr={AuthStr} variant="USER" showAlert={setShowAlert} alertConfig={setAlertConfig}></InfoCard>
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

export default User