import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import ReadMore from '../ReadMore';
const CommentModal = ({comment}) => {
    const [show, setShow] = useState(false);
    return (
        
        <span>
            <div onClick={() => { setShow(true)}} className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-message-circle text-dark text-grey-900 btn-round-sm cursor-pointer font-lg"></i><span className="d-none-xss" >22 Comment</span></div>

            {/* COMMENT MODAL */}
            <Modal
                show={show}
                animation={true}
                size="lg"
                onHide={() => { setShow(false )}}
                centered
                contentClassName="bg-transparent rounded-xxl"
            >
                <Modal.Dialog
                    contentClassName="auto-bg rounded-xxl"
                    className="mb-0 mt-0 modal-custom w100per"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-500">
                            Comments
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-0 pe-0 pt-0">
                        <div className="position-relative pt-1 ps-1 pe-1 pb-2 border-bottom-grey">
                            <textarea name="comment" className="h75 scroll-bar bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="Comment"></textarea>
                            <i className="position-absolute top-10 right-15 z-index-1 feather-send text-dark theme-dark-bg text-grey-900 btn-round-sm font-lg shadow-md"></i>
                        </div>
                        <div className="max-h400 oy-auto scroll-bar">
                            {comment != undefined ? comment.map((e, i) => {
                                // {console.log(e)}
                                return (<div className="card-body d-flex flex-column justify-content-start  pt-1 ps-4 pe-4 pb-1 border-bottom-grey">
                                    <div className="d-flex align-items-center mb-1">
                                        <figure className="avatar me-2 mb-0"><img src={`assets/images/${e.img}`} alt="avater" className="shadow-xsss rounded-circle w30" /></figure>
                                        <a href="" className="text-dark font-xssss text-grey-900">{e.user_name}</a>
                                    </div>
                                    <div className="font-xssss">

                                        <ReadMore style="lh-3 font-xssss" children={e.comment} length="250"></ReadMore>
                                    </div>
                                </div>)
                            }) : ""}
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        </span>
    )
}

export default CommentModal
