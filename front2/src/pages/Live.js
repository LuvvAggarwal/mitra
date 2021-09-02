import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Live extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                            <div className="row">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    <div className="card border-0 mb-0 rounded-3 overflow-hidden chat-wrapper bg-image-center bg-image-cover" 
                                    style={{backgroundImage: `url("https://via.placeholder.com/975x700.png")`}}>
                                        <div className="card-body position-absolute mt-0 ms-0 left-0">
                                            <img src="https://via.placeholder.com/75x100.png" alt="video-bg" className="w150 h200 rounded-3 position-relative z-index-1 shadow-xss" />
                                        </div>
                                        <div className="card-body text-center p-2 position-absolute w-100 bottom-0 bg-gradiant-bottom">
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 me-0 z-index-1"><i className="feather-grid text-white font-md"></i></a>
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 z-index-1"><i className="feather-mic-off text-white font-md"></i></a>       
                                            <a href="/defaultlivestream" className="btn-round-xxl bg-danger z-index-1"><i className="feather-phone-off text-white font-md"></i></a>   
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 z-index-1"><i className="ti-video-camera text-white font-md"></i></a>   
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 ms-0 z-index-1"><i className="ti-settings text-white font-md"></i></a>  
                                            <span className="p-2 bg-blur z-index-1 text-white fw-700 font-xssss rounded-3 right-15 position-absolute mb-4 bottom-0">44:00</span>    
                                            <span className="live-tag position-absolute left-15 mt-2 bottom-0 mb-4 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                    <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                                        <div className="messages-content chat-wrapper scroll-bar p-3">
                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I'm fine, how are you</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I want those files for you. I want you to send 1 PDF and 1 image file.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I've found some cool photos for our travel app.</div>
                                            </div>

                                            <div className="message-item outgoing-message">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>You</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap">Hey mate! How are things going ?</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I'm fine, how are you.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I want those files for you. I want you to send 1 PDF and 1 image file.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I've found some cool photos for our travel app.</div>
                                            </div>

                                        </div>
                                        <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                            <button className="bg-grey float-left"><i className="ti-microphone text-white"></i></button>
                                            <div className="form-group"><input type="text" placeholder="Start typing.." /></div>          
                                            <button className="bg-current"><i className="ti-arrow-right text-white"></i></button>
                                        </form>
                                    </div>
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
}

export default Live;