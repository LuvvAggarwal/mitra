import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";


const LikeModal = ({like}) => {
    const [show, setShow] = useState(false);
    const [liked, setLiked] = useState(false);
    const likeClass = liked ? " text-white bg-primary-gradiant" : " text-current bg-grey"
    return (
        <span>
            <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                <i className={`feather-thumbs-up cursor-pointer me-1 ${likeClass} btn-round-xs font-xss`} onClick={() => { setLiked(!liked)}}></i>
                <span onClick={() => { setShow(true) }}>2,400,000 </span></div>

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
                        <div className="max-h400 oy-auto scroll-bar">
                            {like != undefined ? like.map((e, i) => {
                                // {console.log(e)}
                                return (<div className="card-body d-flex align-items-center justify-content-between pt-1 ps-4 pe-4 pb-1 border-bottom-grey">
                                    <div className="d-flex align-items-center">
                                        <figure className="avatar me-2 mb-0"><img src={`assets/images/${e.img}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{e.user_name} </h4>
                                    </div>
                                    <Button variant="primary" className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Follow</Button>
                                </div>)
                            }) : ""}
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal >
        </span >
    )
}

export default LikeModal

