import React, { useState } from 'react';
// import { Button, Modal } from "react-bootstrap";
import { FacebookShareButton, WhatsappShareButton, TelegramShareButton, TwitterShareButton, LinkedinShareButton } from "react-share"
import { FacebookIcon, WhatsappIcon, TelegramIcon, TwitterIcon, LinkedinIcon } from "react-share";
const ShareModal = ({id,title,des}) => {
    const [show, setShow] = useState(false);
    const toggleOpen = () => setShow(!show);
    const menuClass = `${show ? " show" : ""}`;
    return (
            <div className={`cursor-pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`} id={`dropdownMenu${id}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleOpen}><i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span className="d-none-xs">Share</span>
            <div className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl theme-dark-bg border-0 shadow-lg right-0 ${menuClass}`} aria-labelledby={`dropdownMenu${id}`}>
                <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">Share <i className="feather-x cursor-pointer ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2" onClick={toggleOpen}></i></h4>
                <div className="card-body p-0 d-flex">
                    <ul className="d-flex align-items-center justify-content-between mt-2">
                        <li className="me-1 cursor-pointer">
                            <FacebookShareButton
                                // url={`http://localhost:3000/post/id=${id}`}
                                url="https://www.youtube.com/"
                                quote={`A friend for Everyone \n ${title} \n ${des}`}
                                hashtag="Mitra"
                            // onShareWindowClose={myDbShareUpdate}
                            >
                                <FacebookIcon iconFillColor="white" round={true}></FacebookIcon>
                            </FacebookShareButton>
                        </li>
                        <li className="me-1 cursor-pointer">
                            <TwitterShareButton
                                // url={`http://localhost:3000/post/id=${id}`}
                                url="https://www.youtube.com/"
                                title={title}
                                via="mitra"
                                hashtags={["mitra", "a_friend_for_everyone"]}
                            // onShareWindowClose={myDbShareUpdate}
                            >
                                <TwitterIcon iconFillColor="white" round={true}></TwitterIcon>
                            </TwitterShareButton>
                        </li>
                        <li className="me-1 cursor-pointer">
                            <LinkedinShareButton
                                // url={`http://localhost:3000/post/id=${id}`}
                                url="https://www.youtube.com/"
                                title={title}
                                summary={des}
                                source={"Mitra"}
                            // onShareWindowClose={myDbShareUpdate}
                            >
                                <LinkedinIcon iconFillColor="white" round={true}></LinkedinIcon>
                            </LinkedinShareButton>
                        </li>
                        <li className="me-1 cursor-pointer">
                            <WhatsappShareButton
                                // url={`http://localhost:3000/post/id=${id}`}
                                url="https://www.youtube.com/"
                                title={title}
                                separator={des}
                            // onShareWindowClose={myDbShareUpdate}
                            >
                                <WhatsappIcon iconFillColor="white" round={true}></WhatsappIcon>
                            </WhatsappShareButton>
                        </li>
                        <li className="me-1 cursor-pointer">
                            <TelegramShareButton
                                // url={`http://localhost:3000/post/id=${id}`}
                                url="https://www.youtube.com/"
                                title={title}
                            // onShareWindowClose={myDbShareUpdate}
                            >
                                <TelegramIcon iconFillColor="white" round={true}></TelegramIcon>
                            </TelegramShareButton>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
    )
}

export default ShareModal
