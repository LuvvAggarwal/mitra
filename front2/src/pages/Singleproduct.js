import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Slider from "react-slick";

const slideList = [
    {   
        imageUrl: 'product.png',
        name: 'product-image ',
    },
    {   
        imageUrl: 'product.png',
        name: 'product-image ',
    },
    {   
        imageUrl: 'product.png',
        name: 'product-image ',
    },
    {   
        imageUrl: 'product.png',
        name: 'product-image ',
    },
    
]


class Singleproduct extends Component {
    render() {
        const hotelsettings = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: false,
            
        };
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />
                    <div className="main-content right-chat-active">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left pe-0">
                                <div className="row">
                                    <div className="col-lg-1 p-0 d-none d-lg-block">
                                        <img src="https://via.placeholder.com/385x300.png" alt="product" className="mb-2 w-100 bg-white p-3" />
                                        <img src="https://via.placeholder.com/385x300.png" alt="product" className="mb-2 w-100 bg-white p-3" />
                                        <img src="https://via.placeholder.com/385x300.png" alt="product" className="mb-2 w-100 bg-white p-3" />
                                        <img src="https://via.placeholder.com/385x300.png" alt="product" className="mb-2 w-100 bg-white p-3" />
                                    </div>
                                    <div className="col-lg-5 mb-4 shop-slider">
                                        <Slider {...hotelsettings}>
                                            {slideList.map((value , index) => (
                                            <div key={index} className="pt-lg--10 pb-lg--10 bg-white rounded-3">
                                                <img src={`assets/images/${value.imageUrl}`} alt="avater" className="rounded-3 img-fluid" />
                                            </div>
                                            ))}
                                        </Slider>
                                    </div>

                                    <div className="col-lg-6  col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                                        <h4 className="text-danger font-xssss fw-700 ls-2">DNMX</h4>
                                        <h2 className="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size"> Camisole with Adjustable Straps</h2>
                                        <div className="star d-block w-100 text-left">
                                            <img src="assets/images/star.png" alt="star" className="w15 float-left" />
                                            <img src="assets/images/star.png" alt="star" className="w15 float-left" />
                                            <img src="assets/images/star.png" alt="star" className="w15 float-left" />
                                            <img src="assets/images/star.png" alt="star" className="w15 float-left" />
                                            <img src="assets/images/star-disable.png" alt="star" className="w15 float-left me-2" />
                                        </div>
                                        <p className="review-link font-xssss fw-500 text-grey-500 lh-3"> 2 customer review</p>
                                        <div className="clearfix"></div>
                                        <p className="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">ultrices justo eget, sodales orci. Aliquam egestas libero ac turpis pharetra, in vehicula lacus scelerisque. Vestibulum ut sem laoreet, feugiat tellus at, hendrerit arcu.</p>

                                        <h6 className="display2-size fw-700 text-current ls-2 mb-2"><span className="font-xl">$</span>449 <span className="font-xs text-grey-500" style={{textDecoration: `line-through`}}>$699</span></h6>
                                        <div className="timer bg-white mt-2 mb-0 w350 rounded-3"><div className="time-count"><span className="text-time">03</span> <span className="text-day">Day</span></div> <div className="time-count"><span className="text-time">03</span> <span className="text-day">Hours</span> </div> <div className="time-count"><span className="text-time">55</span> <span className="text-day">Min</span> </div> <div className="time-count"><span className="text-time">48</span> <span className="text-day">Sec</span> </div> </div>
                                        <div className="clearfix"></div>
                                        <form action="#" className="form--action mt-4 mb-3">
                                            <div className="product-action flex-row align-items-center">
                                                <div className="quantity me-3">
                                                    <input type="number" className="quantity-input" name="qty" id="qty"  min="1" />
                                                    <div className="dec qtybutton">-</div>
                                                    <div className="inc qtybutton">+</div>
                                                </div>
                                                
                                                <a href="/defaulthoteldetails" className="add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3">Add to cart</a>
                                                <a href="/defaulthoteldetails" className="btn-round-xl alert-dark text-white d-inline-block mt-0 ms-4 float-left"><i className="ti-heart font-sm"></i></a>
                                            </div>  
                                        </form>
                                        <div className="clearfix"></div>
                                        <ul className="product-feature-list mt-5">
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900"> Category : </b>Furniture</li>
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">Straight fit</li> 
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900">SKU : </b> REF. LA-107</li>
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">Dry clean</li>
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900">Tags : </b>Design, Toys</li>
                                            <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">Cutton shirt</li>
                                        </ul>
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

export default Singleproduct;