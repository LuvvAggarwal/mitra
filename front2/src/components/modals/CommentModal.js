import React, { useState, useContext } from 'react';
import { Button, Modal } from "react-bootstrap";
import ReadMore from '../ReadMore';
import { UserContext } from '../../context/UserContext';
import post_action from "../../api/postAction";
import Load from '../Load';
import InfiniteScroll from 'react-infinite-scroll-component';
const img_url = require("../../utils/imgURL");

const CommentModal = ({ id, count, showAlert, alertConfig }) => {
    const { User } = useContext(UserContext);
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    const [commentCounter, setCommentCounter] = useState(count)
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('')
    const [lastNumber, setLastNumber] = useState(-1)
    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const commentFunc = async () => {
        await post_action.post(`/comment/id=${id}`, { comment }, { headers: { 'Authorization': AuthStr } }).then((res) => {
            const payload = res.data.data.payload
            setComment("")
            setCommentCounter(commentCounter + 1);
            User.then(res => {
                payload.users = res;
                setData(data.concat(payload))
            })
        }).catch((e) => {
            setComment("")
            showAlert()
            alertConfig({ variant: "danger", text: e.response ? e.response.data.message : "Problem in processing", icon: "alert-octagon", strongText: "Error:" })
        })
    }

    const getComments = async () => {
        if (hasMore) {
            setLoading(true)
            await post_action.get(`/comments/id=${id}/${lastNumber}`, { headers: { 'Authorization': AuthStr } }).then((res) => {
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
                    console.log(">>>>>>> " + newLastNumber);
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
                alertConfig({ variant: "danger", text: "Problem in getting data", icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }

    return (
        <span>
            <div onClick={() => { 
                setShow(true)
                getComments()
                }} className="d-flex cursor-pointer align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-message-circle text-dark text-grey-900 btn-round-sm cursor-pointer font-lg"></i><span className="d-none-xss" >{count} comments</span></div>

            {/* COMMENT MODAL */}
            <Modal
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
                            Comments {commentCounter}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-0 pe-0 pt-0">
                        <div className="position-relative pt-1 ps-1 pe-1 pb-2 border-bottom-grey">
                            <textarea name="comment" className="h75 scroll-bar bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="Comment" value={comment} onChange={(e) => {
                                setComment(e.target.value)
                            }}></textarea>
                            <i className="position-absolute top-10 right-15 cursor-pointer z-index-1 feather-send text-dark theme-dark-bg text-grey-900 btn-round-sm font-lg shadow-md" onClick={commentFunc}></i>
                        </div>
                        <InfiniteScroll className="row infinite-scroll"
                            dataLength={data.length}
                            next={getComments}
                            hasMore={hasMore}
                            loader={loading ? <Load /> : ""}>
                            <div className="max-h400 oy-auto scroll-bar">
                                {data.map((e, i) => {
                                    // {console.log(e)}
                                    const profile_photo = e.users.profile_photo ? img_url(e.users.profile_photo) : "user.png"
                                    return (<div key={i} className="card-body d-flex flex-column justify-content-start  pt-1 ps-4 pe-4 pb-1 border-bottom-grey">
                                        <div className="d-flex align-items-center mb-1">
                                            <figure className="avatar me-2 mb-0"><img src={`${profile_photo}`} alt="avater" className="shadow-xsss rounded-circle w30 h30" /></figure>
                                            <a href={`/userProfile/${e.users.user_id}`} className="text-dark font-xssss text-grey-900">{e.users.name}</a>
                                        </div>
                                        <div className="font-xssss">

                                            <ReadMore style="lh-3 font-xssss" children={e.comment} length="250"></ReadMore>
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </InfiniteScroll>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        </span>
    )
}

export default CommentModal
