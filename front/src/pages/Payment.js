import React, { Component , Fragment } from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';


class Payment extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
            
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="middle-wrap">
                                
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                    <Link to="/defaultsettings" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                        <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Payment Method</h4>
                                    </div>
                                    <div className="card-body p-lg-5 p-4 w-100 border-0">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="col-lg-12 ps-0">
                                                    <h4 className="mb-4 font-lg fw-700 mont-font mb-5">Saved Card </h4>
                                                </div>
                                                <div className="cleafrfix"></div>
                                                <div className="card border-0 shadow-none mb-4 mt-3">
                                                    <div className="card-body d-block text-left p-0">
                                                        <div className="item w-100 h150 bg-white rounded-xxl overflow-hidden text-left shadow-md ps-3 pt-2 align-items-end flex-column d-flex">
                                                            <div className="card border-0 shadow-none p-0 bg-transparent-card text-left w-100">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <img src="assets/images/b-9.png" alt="icon" className="w40 float-left d-inline-block" />
                                                                    </div>
                                                                    <div className="col-6 text-right pe-4">
                                                                        <img src="assets/images/chip.png" alt="icon" className="w30 float-right d-inline-block mt-2 me-2" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card border-0 shadow-none p-0 bg-transparent-card text-left w-100 mt-auto">
                                                                <h4 className="text-grey-900 font-sm fw-700 mont-font mb-3 text-dark-color">$ 5960.00 <span className="d-block fw-500 text-grey-500 font-xssss mt-1 text-dark-color">Debit Card</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card border-0 shadow-none mb-4">
                                                    <div className="card-bod6 d-block text-left 2 fw-600-0">
                                                        <div className="item w-100 h150 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md ps-3 pt-2 align-items-end flex-column d-flex">
                                                            <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <img src="assets/images/b-14.png" alt="icon" className="w90 float-left d-inline-block" />
                                                                    </div>
                                                                    <div className="col-6 text-right pe-4">
                                                                        <img src="assets/images/chip.png" alt="icon" className="w30 float-right d-inline-block mt-2 me-2 rounded-xxl" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                                                <h4 className="text-white font-sm fw-700 mont-font mb-3">$ 5960.00 <span className="d-block fw-500 text-white font-xssss mt-1">Debit Card</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card border-0 mb-4 shadow-none">
                                                    <div className="card-body d-block text-left p-0">
                                                        <div className="item w-100 h150 bg-primary rounded-xxl text-left shadow-md ps-3 pt-2 align-items-end flex-column d-flex">
                                                            <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        
                                                                        <img src="assets/images/b-10.png" alt="icon" className="w40 float-left d-inline-block" />
                                                                    </div>
                                                                    <div className="col-6 text-right pe-4">
                                                                        <img src="assets/images/chip.png" alt="icon" className="w30 float-right d-inline-block mt-2 me-2 rounded-3" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                                                <h4 className="text-white mb-3 font-sm fw-700 mont-font">$ 2260.00 <span className="d-block fw-500 text-grey-300 font-xssss mt-1">Debit Card</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <a href="/payment" className="rounded-xxl border-dashed mb-2 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-grey-900 d-block  text-dark">Add Card</a>

                                            </div>
                                            <div className="col-lg-6 offset-lg-1">
                                                <div className="rounded-xxl bg-greylight h-100 p-3">
                                                    <div className="col-lg-12 ps-0">
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="item ms-auto me-auto mt-3 w-100 h150 bg-white rounded-xxl text-left shadow-lg ps-3 pt-2 align-items-end flex-column d-flex">
                                                            <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                                                <div className="row">
                                                                    <div className="col-6 ps-2">
                                                                        <img src="assets/images/b-17.png" alt="icon" className="w60 float-left d-inline-block" />
                                                                    </div>
                                                                    <div className="col-6 text-right pe-4">
                                                                        <img src="assets/images/chip.png" alt="icon" className="w30 float-right d-inline-block mt-2 me-2" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                                                <h4 className="text-grey-900 font-sm fw-700 mont-font text-dark-color">****  ****  ****  2234 <span className="d-block fw-500 text-grey-500 font-xssss mt-0 mb-3 text-dark-color">Credit Card</span></h4>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div className="col-lg-12 mt-5">
                                                        <form>
                                                            <div className="form-group mb-1">
                                                                <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">Card Number</label>
                                                                <div className="form-group icon-tab">
                                                                    <input type="text" className="bg-white font-xsss border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900" placeholder="1234 1234 1234 1234" />                        
                                                                </div>
                                                            </div>
                                                            <div className="form-group mb-1">
                                                                <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">Card Holder Name</label>
                                                                <div className="form-group icon-tab">
                                                                    <input type="text" className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900" placeholder="Name" />                        
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <div className="form-group mb-1">
                                                                        <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">Month</label>
                                                                        <div className="form-group icon-tab">
                                                                            <input type="text" className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900" placeholder="03" />                         
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="form-group mb-1">
                                                                        <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">Year</label>
                                                                        <div className="form-group icon-tab">
                                                                            <input type="text" className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900" placeholder="2021" />                         
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <a href="/payment" className="rounded-3 bg-current mb-2 mt-4 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-white d-block">Add Card</a>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>       
                                                </div>
                                            </div>
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

export default Payment;