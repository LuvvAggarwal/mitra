import React, { Component , Fragment } from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Socialaccount extends Component {
    render() {
        return (
            <Fragment> 
                <div className="main-wrapper">
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
                                            <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Social Network</h4>
                                        </div>
                                        <div className="card-body p-lg-5 p-4 w-100 border-0">
                                            <form action="#">
                                                    

                                                <div className="row">
                                                    
                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Facebook</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Twitter</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Linkedin</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Instagram</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Flickr</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Github</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Skype</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Google</label>
                                                            <input type="text" name="comment-name" className="form-control" />
                                                        </div>        
                                                    </div>




                                                    <div className="col-lg-12 mb-0 mt-2">
                                                        <a href="/socialaccount" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</a>
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

                <Popupchat />
                <Appfooter /> 
            
            </Fragment>
        );
    }
}

export default Socialaccount;