import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const eventList = [
    {
        imageUrl: 'hotel.png',
        title: 'Right here Right Now -  Comedy ',
        location: 'Goa, Mumbai',
        date: '22',
        month: 'FEB',
    },
    {
        imageUrl: 'hotel.png',
        title: 'Open Mic-Stand up Comedy and Poetry',
        location: 'Goa, Mumbai',
        date: '22',
        month: 'FEB',
    },
    {
        imageUrl: 'hotel.png',
        title: 'Mohd Suhels Guide to the Galaxy',
        location: 'Goa, Mumbai',
        date: '22',
        month: 'FEB',
    },
    {
        imageUrl: 'hotel.png',
        title: 'Charlotte De Witte India Tour',
        location: 'Goa, Mumbai',
        date: '31',
        month: 'APR',
    },
    {
        imageUrl: 'hotel.png',
        title: 'A Stand-up Comedy Show by Rahul',
        location: 'Goa, Mumbai',
        date: '04',
        month: 'MAR',
    },
    {
        imageUrl: 'hotel.png',
        title: 'Sunburn Holi Weekend 2021  ',
        location: 'Goa, Mumbai',
        date: '22',
        month: 'FEB',
    },
]

class Event extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card w-100 border-0 shadow-none rounded-xxl border-0 mb-3 overflow-hidden ">
                                        <div style={{ height: '400px', width: '100%' }}>
                                            <GoogleMapReact
                                            defaultCenter={this.props.center}
                                            defaultZoom={this.props.zoom}
                                            >
                                            <AnyReactComponent
                                                lat={59.955413}
                                                lng={30.337844}
                                                text="My Marker"
                                            />
                                            </GoogleMapReact>
                                        </div>
                                    </div>
                                </div>

                                {eventList.map((value , index) => (
                                <div key={index} className="col-lg-4 col-md-6 pe-2 ps-2">
                                    <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                                        <div className="card-image w-100">
                                            <img src={`assets/images/${value.imageUrl}`} alt="event" className="w-100 rounded-3" />
                                        </div>
                                        <div className="card-body d-flex ps-0 pe-0 pb-0">
                                            <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg"><h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0"><span className="ls-3 d-block font-xsss text-grey-500 fw-500">{value.month}</span>{value.date}</h4></div>
                                            <h2 className="fw-700 lh-3 font-xss">{value.title}
                                                <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i className="ti-location-pin me-1"></i>{value.location} </span>
                                            </h2>
                                        </div>
                                        <div className="card-body p-0">
                                            <ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                <li className="last-member"><a href="/defaultevent" className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center">+2</a></li>
                                            </ul>
                                            <a href="/defaultevent" className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1">APPLY</a>
                                        </div>
                                    </div>
                                </div>
                                ))}


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

export default Event;