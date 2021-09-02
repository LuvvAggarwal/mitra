import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const hotelList = [
    {
        imageUrl: 'product.png',
        title: 'Montana Hotel',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'320',
        feature:'feature',
    },
    {
        imageUrl: 'product.png',
        title: 'Himalayan Wind Horse',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'140',
        feature:'',
    },
    {
        imageUrl: 'product.png',
        title: 'Hotel Sonar Bangla',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'160',
        feature:'feature',
    },
    {
        imageUrl: 'product.png',
        title: 'House Pool Party',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'350',
        feature:'feature',
    },
    {
        imageUrl: 'product.png',
        title: 'Silver Star Boutique',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'520',
        feature:'',
    },
    {
        imageUrl: 'product.png',
        title: 'Crown Retreat Hotel',
        location: '323 Geldenfe Ave Park, Flodia City',
        price:'99',
        feature:'feature',
    },
]


class Hotel extends Component {
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
                        <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                            <div className="row">
                                <div className="col-xl-6 chat-left scroll-bar">
                                    <Pagetitle title="Hotels" />
                                    <div className="row ps-2 pe-2">
                                        {hotelList.map((value , index) => (

                                            <div key={index} className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                                <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                                    {value.feature ? <span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span> : ''}
                                                    <div className="card-image w-100 mb-3">
                                                        <a href="/defaulthoteldetails" className="position-relative d-block"><img src={`assets/images/${value.imageUrl}`} alt="hotel" className="w-100" /></a>
                                                    </div>
                                                    <div className="card-body pt-0">
                                                        <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                                        <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><a href="default-hotel-details.html" className="text-dark text-grey-900">{value.title}</a></h4>
                                                        <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> {value.location}</h6>
                                                        <div className="star d-block w-100 text-left mt-0">
                                                            <img src="assets/images/star.png" alt="star" className="w15 me-1 float-left" />
                                                            <img src="assets/images/star.png" alt="star" className="w15 me-1 float-left" />
                                                            <img src="assets/images/star.png" alt="star" className="w15 me-1 float-left" />
                                                            <img src="assets/images/star.png" alt="star" className="w15 me-1 float-left" />
                                                            <img src="assets/images/star-disable.png" alt="star" className="w15 me-1 float-left me-2" />
                                                        </div>
                                                        <div className="mt-4 w-100"></div>
                                                        <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200 sq</h5>
                                                        <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi</h5>
                                                        <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card</h5>
                                                        <div className="clearfix"></div>
                                                        <span className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span className="font-xsssss">$</span> {value.price} <span className="font-xsssss text-grey-500">/ mo</span> </span>
                                                        <a href="/defaulthoteldetails" className="position-absolute bottom-15 mb-2 right-15"><i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></a>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>

                                    
                                </div>

                                <div className="col-xl-6 ps-0 d-none d-xl-block">
                                    <div className="card w-100 border-0 shadow-none rounded-3 border-0 mb-4 overflow-hidden ">
                                        <div style={{ height: '86vh', width: '100%' }}>
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

export default Hotel;