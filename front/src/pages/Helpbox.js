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


class Helpbox extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />
                
                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <div className="card w-100 border-0 p-0 rounded-3 overflow-hidden bg-image-contain bg-image-center" 
                                    style={{backgroundImage: `url("assets/images/help-bg.png")`}}>
                                        <div className="card-body p-md-5 p-4 text-center" style={{backgroundColor:'rgba(0,85,255,0.8)'}}>
                                            <h2 className="fw-700 display2-size text-white display2-md-size lh-2">Welcome to the Sociala Commuinity!</h2>
                                            <p className="font-xsss ps-lg-5 pe-lg-5 lh-28 text-grey-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus </p>
                                            <div className="form-group w-lg-75 mt-4 border-light border p-1 bg-white rounded-3 ms-auto me-auto">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="form-group icon-input mb-0">
                                                            <i className="ti-search font-xs text-grey-400"></i>
                                                            <input type="text" className="style1-input border-0 ps-5 font-xsss mb-0 text-grey-500 fw-500 bg-transparent" placeholder="Search anythings.." />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <a href="helpbox" className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase ">Search</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card w-100 border-0 shadow-none bg-transparent mt-5">
                                        <Accordion className="accodion-style--1 accordion" preExpanded={'0'}>
                                            <AccordionItem className="card shadow-xss">
                                                <AccordionItemHeading className="card-header">
                                                    <AccordionItemButton>
                                                        <h5 className="fw-600 pt-2 pb-2 mb-0">I have read and agree to the Privacy Policy and Terms & Conditions*</h5>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel className="card-body">
                                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS</p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                            <AccordionItem className="card shadow-xss">
                                                <AccordionItemHeading className="card-header">
                                                    <AccordionItemButton>
                                                        <h5 className="fw-600 pt-2 pb-2 mb-0">You can easily build a page without any design or custom coding.</h5>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel className="card-body">
                                                    <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS</p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem className="card shadow-xss">
                                                <AccordionItemHeading className="card-header">
                                                    <AccordionItemButton>
                                                        <h5 className="fw-600 pt-2 pb-2 mb-0">I have read and agree to the Privacy Policy and Terms & Conditions*</h5>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel className="card-body">
                                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS</p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                            <AccordionItem className="card shadow-xss">
                                                <AccordionItemHeading className="card-header">
                                                    <AccordionItemButton>
                                                        <h5 className="fw-600 pt-2 pb-2 mb-0">You can easily build a page without any design or custom coding.</h5>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel className="card-body">
                                                    <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS</p>
                                                </AccordionItemPanel>
                                            </AccordionItem>


                                        </Accordion>
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

export default Helpbox;