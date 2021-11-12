import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import post_action from "../../api/postAction";
import Load from '../Load';
import InfiniteScroll from 'react-infinite-scroll-component';
const img_url = require("../../utils/imgURL");
const errorSetter = require("../../utils/errorSetter")
const LikeModal = (props) => {
    const { id, count, showAlert, alertConfig } = props
    const isLikedProp = props.isLiked
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    const [likeCounter, setLikeCounter] = useState(count)
    const [show, setShow] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProp)
    const [liked, setLiked] = useState(isLiked.length > 0 ? true : false);
    const [lastNumber, setLastNumber] = useState(-1)
    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [disable, setDisable] = useState("false")
    const [loading, setLoading] = useState(false)

    const like = async () => {
        
            await post_action.post(`/like/id=${id}`, {}, { headers: { 'Authorization': AuthStr } }).then((res) => {
                const payload = res.data.data.payload;
                const arr = []
                arr[0] = payload
                setIsLiked(arr);
                setLiked(true)
                setLikeCounter(likeCounter + 1);
            }).catch((e) => {
                showAlert()
                alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
    
    }

    const disLike = async () => {
        
            await post_action.delete(`/unlike/id=${isLiked[0].id}`, { headers: { 'Authorization': AuthStr } }).then((res) => {
                setIsLiked([])
                setLiked(false)
                setLikeCounter(likeCounter - 1);
            }).catch((e) => {
                showAlert()
                alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        
    }

    const toggleLike = () => {
        setDisable("true")
        if (liked) disLike()
        else like()
        setDisable("false")
    }

    const getLikes = async () => {
        if (hasMore) {
            setLoading(true)
            await post_action.get(`/likes/id=${id}/${lastNumber}`, { headers: { 'Authorization': AuthStr } }).then((res) => {
                setLoading(false)
                const payload = res.data.data.payload;
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
                setLoading(false)
                showAlert()
                alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    const likeClass = liked ? " text-white bg-primary-gradiant" : " text-current bg-grey"
    return (
        <span>
            <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                <i className={`feather-thumbs-up cursor-pointer me-1 ${likeClass} btn-round-xs font-xss`} onClick={toggleLike}></i>
                <span className={"cursor-pointer"} disable={disable} onClick={(e) => {
                    setShow(true)
                    getLikes()
                }}>{likeCounter} likes</span></div>

            < Modal
                show={show}
                animation={true}
                size="lg"
                onHide={() => { setShow(false) }}
                centered
                contentClassName="bg-transparent rounded-xxl"
            >
                <Modal.Dialog
                    contentClassName="auto-bg rounded-xxl"
                    className="mb-0 mt-0 modal-custom w100per"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-500">
                            Likes
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-0 pe-0 pt-0">
                        <InfiniteScroll className="row infinite-scroll"
                            dataLength={data.length}
                            next={getLikes}
                            hasMore={hasMore}
                            loader={loading ? <Load /> : ""}>
                            <div className="max-h400 oy-auto scroll-bar">
                                {data.map((e, i) => {
                                    // {console.log(e)}
                                    const profile_photo = e.users.profile_photo ? img_url(e.users.profile_photo) : "user.png"
                                    return (<div key={i} className="card-body d-flex align-items-center justify-content-between pt-1 ps-4 pe-4 pb-1 border-bottom-grey">
                                        <div className="d-flex align-items-center">
                                            <figure className="avatar me-2 mb-0"><img src={`${profile_photo}`} alt="avater" className="shadow-sm rounded-circle w45 h45" /></figure>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">{e.users.name} </h4>
                                        </div>
                                        <a href={`/userProfile/${e.users.user_id}`} className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">View Profile</a>
                                    </div>)
                                })}
                            </div>
                        </InfiniteScroll>

                    </Modal.Body>
                </Modal.Dialog>
            </Modal >
        </span >
    )
}

export default LikeModal

