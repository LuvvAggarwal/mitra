import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Slider from "react-slick";

const productList = [
    {
        imageUrl: 'product.png',
        name: 'Textured Sleeveless Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Adjustable Shoulder Straps',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Neck Strappy Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Scoop-Neck Strappy',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Textured Sleeveless Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Adjustable Shoulder Straps',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Neck Strappy Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Scoop-Neck Strappy',
        price:'449'
    },
]

class ShopTwo extends Component {
    render() {
        const sliderstyle = {
            paddingRight:20+'!important',
        }
        const shopsettings = {
            arrows: true,
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
        };
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-white right-chat-active">
            
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="banner-wrapper bg-greylight overflow-hidden rounded-3 shop-slider">
                                                <Slider {...shopsettings}>
                                                    <div className="style1 d-flex align-items-center bg-lightblue">
                                                        <div className="row">
                                                            <div className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4" style={sliderstyle}>
                                                                <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                                                    <h4 className="font-xssss text-danger ls-3 fw-700 ms-0 mt-4 mb-3">TRENDING</h4>
                                                                    <h2 className="fw-300 display1-size display2-md-size lh-2 text-grey-900">New Arrival Buds <br /> <b className="fw-700">Collection</b></h2>
                                                                    <p className="fw-500 text-grey-500 lh-26 font-xssss pe-lg-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra.</p>
                                                                    <a href="/singleproduct" className="fw-700 text-white rounded-xl bg-primary-gradiant font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150">Shop Now</a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6"><img src="assets/images/product.png" alt="product" className="img-fluid p-md-5 p-4" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="style1 d-flex align-items-center bg-cyan">
                                                        <div className="row">
                                                            <div className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4" style={sliderstyle}>
                                                                <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                                                    <h4 className="font-xssss text-white ls-3 fw-700 ms-0 mt-4 mb-3">TRENDING</h4>
                                                                    <h2 className="fw-300 display1-size display2-md-size lh-2 text-white">New Arrival Buds <br /> <b className="fw-700">Collection</b></h2>
                                                                    <p className="fw-500 text-grey-100 lh-26 font-xssss pe-lg-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra.</p>
                                                                    <a href="/singleproduct" className="fw-700 text-grey-900 rounded-xl bg-white font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150">Shop Now</a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6"><img src="assets/images/product.png" alt="product" className="img-fluid p-md-5 p-4" /></div>
                                                        </div>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>

                                        {productList.map((value , index) => (

                                        <div key={index} className="col-lg-4 col-md-6" >
                                            <div className="card w-100 border-0 mt-4">
                                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                                    <a href="/singleproduct"><img src={`assets/images/${value.imageUrl}`} alt="product" className="w-100 mt-0 mb-0 p-5" /></a>
                                                </div>
                                                <div className="card-body w-100 p-0 text-center">
                                                    <h2 className="mt-2 mb-1"><a href="/singleproduct" className="text-black fw-700 font-xsss lh-26">{value.name}</a></h2>
                                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">${value.price}</h6>
                                                </div>                                
                                            </div>
                                        </div>

                                        ))}

                                        
                                        <div className="col-lg-12 mt-3 mb-5 text-center"><a href="/shop2" className="fw-700 text-white font-xssss text-uppercase ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bg-current w150">Load More</a></div>
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

export default ShopTwo;