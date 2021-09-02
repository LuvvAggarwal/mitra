import React, { Component , Fragment } from "react";
import Header from '../components/Header';

class Comingsoon extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <div className="main-content pt-0 bg-white ps-0 pe-0">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 d-none d-xl-block p-0 vh-100 bg-image-contain bg-image-center bg-no-repeat" 
                            style={{backgroundImage: `url("https://via.placeholder.com/1200x950.png")`}}></div>
                            <div className="col-xl-6 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                                <div className="card shadow-none border-0 ps-lg--5 me-auto coming-soon-card">
                                    <div className="card-body rounded-0 text-left pt-md-5  ps-0 pe-0">
                                        <div className="timer w-100 mb-3 bg-grey-time"><div className="time-count"><span className="text-time">04</span> <span className="text-day">Day</span></div> <div className="time-count"><span className="text-time">04</span> <span className="text-day">Hours</span> </div> <div className="time-count"><span className="text-time">39</span> <span className="text-day">Min</span> </div> <div className="time-count"><span className="text-time">13</span> <span className="text-day">Sec</span> </div> </div>
                                        <h2 className="fw-700 text-grey-900 display3-size display4-md-size lh-2">We're under <span className="text-primary">construction.</span> Check back for an update soon.</h2>
                                        <div className="form-group mt-4 p-1 border p-2 bg-white rounded-3">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <div className="form-group icon-input mb-0">
                                                        <i className="ti-email font-xs text-grey-400"></i>
                                                        <input type="text" className="style1-input bg-transparent border-0 ps-5 font-xsss mb-0 text-grey-500 fw-500" placeholder="Email Address" />
                                                    </div>
                                                </div>

                                                
                                                <div className="col-lg-5">
                                                    <a href="/comingsoon" className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase ">Notify</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>  
            </Fragment>    
        );
    }
}

export default Comingsoon;