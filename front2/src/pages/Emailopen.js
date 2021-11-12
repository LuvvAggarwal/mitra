import React, { Component , Fragment } from "react";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';

class Emailopen extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0" style={{maxWidth:`100%`}}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="chat-wrapper p-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                        <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar">
                                            <div className="chat-body p-lg-4 p-3 mt-lg-3 mt-0">
                                                <div className="card dark-bg-transparent border-0 w-100 p-0 mb-3 shadow-none">
                                                    <div className="card-body p-0">
                                                        <h6 className="fw-600 text-grey-500 font-xsssss">Today, 16th September 2020, 11:45 </h6>
                                                        <h2 className="font-sm text-grey-900 fw-600">Meeting World</h2>
                                                    </div>
                                                </div>

                                                <Accordion className="accodion-style--1 accordion" preExpanded={'0'}>
                                                    <AccordionItem className="shadow-none mb-0 p-0 bg-transparent">
                                                        <AccordionItemHeading className="card-header ps-0 pt-0 pb-2 pe-0 bg-transparent">
                                                            <AccordionItemButton className="d-flex">
                                                                <figure class="avatar me-2 mb-0 w35 mt-1 pt-1"><img src="assets/images/user.png" alt="avater" class="float-right shadow-sm rounded-circle w-100" /></figure>
                                                                <span class="font-xssss text-grey-700 pt-2 mt-1 ps-2 fw-700 mb-0 me-auto text-dark">Aenni Mirenda </span>
                                                                <span class="font-xssss text-grey-500 pt-2 mt-1 ps-2 fw-600 mb-0 ms-auto">14.09.2020 12:23</span>
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel className="card-body p-0">
                                                            <p class="text-grey-600 mb-4 font-xsss lh-28 fw-500 mt-3 text-dark">Hi Aenni, <br /> <br /> All individual Framer subscriptions have been grandfathered into a Pro plan at your existing rate. If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate. <br /><br /> Regards,<br />Jessica </p>
                                                            <textarea class="form-control mb-5 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message..."></textarea>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                    <AccordionItem className="shadow-none mb-0 p-0 bg-transparent">
                                                        <AccordionItemHeading className="card-header ps-0 pt-0 pb-2 pe-0 bg-transparent">
                                                            <AccordionItemButton className="d-flex">
                                                                <figure class="avatar me-2 mb-0 w35 mt-1 pt-1"><img src="assets/images/user.png" alt="avater" class="float-right shadow-none rounded-circle w-75" /></figure>
                                                                <span class="font-xssss text-grey-700 pt-2 mt-1 ps-2 fw-700 mb-0 me-auto text-dark">Aenni Mirenda </span>
                                                                <span class="font-xssss text-grey-500 pt-2 mt-1 ps-2 fw-600 mb-0 ms-auto">14.09.2020 12:23</span>
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel className="card-body p-0">
                                                            <p class="text-grey-600 mb-4 font-xsss lh-28 fw-500 mt-3 text-dark">Hi Aenni, <br /> <br /> All individual Framer subscriptions have been grandfathered into a Pro plan at your existing rate. If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate. <br /><br /> Regards,<br />Jessica </p>
                                                            <textarea class="form-control mb-5 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message..."></textarea>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                    <AccordionItem className="shadow-none mb-0 p-0 bg-transparent">
                                                        <AccordionItemHeading className="card-header ps-0 pt-0 pb-2 pe-0 bg-transparent">
                                                            <AccordionItemButton className="d-flex">
                                                                <figure class="avatar me-2 mb-0 w35 mt-1 pt-1"><img src="assets/images/user.png" alt="avater" class="float-right shadow-sm rounded-circle w-100" /></figure>
                                                                <span class="font-xssss text-grey-700 pt-2 mt-1 ps-2 fw-700 mb-0 me-auto text-dark">Aenni Mirenda </span>
                                                                <span class="font-xssss text-grey-500 pt-2 mt-1 ps-2 fw-600 mb-0 ms-auto">14.09.2020 12:23</span>
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel className="card-body p-0">
                                                            <p class="text-grey-600 mb-4 font-xsss lh-28 fw-500 mt-3 text-dark">Hi Aenni, <br /> <br /> All individual Framer subscriptions have been grandfathered into a Pro plan at your existing rate. If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate. <br /><br /> Regards,<br />Jessica </p>
                                                            <textarea class="form-control mb-5 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message..."></textarea>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>

                                        <div className="chat-bottom dark-bg p-3 mb-3 border-top border-bottom bor-0 theme-dark-bg" style={{width: '98%'}}>
                                            <form className="chat-form d-block overflow-hidden">
                                                <button className="bg-dark border-0 btn-round-md float-left d-lg-block d-none"><i className="ti-microphone text-white lh-4 font-xs"></i></button>
                                                <button className="bg-dark border-0 btn-round-md ms-1 float-left"><i className="ti-clip text-white lh-4 font-xs"></i></button>
                                                <button className="bg-dark border-0 btn-round-md ms-1 float-left"><i className="ti-image text-white lh-4 font-xs"></i></button>
                                                <button className="bg-current border-0 p-0 float-right w200 text-white fw-600 font-xssss text-uppercase">Send</button>
                                            </form>
                                        </div>
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

export default Emailopen;