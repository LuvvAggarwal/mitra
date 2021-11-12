import React, { Component } from 'react';
import Slider from "react-slick";

// SLIDER FOR ALL USERS - SPECIALS, NGO, COUNSALERS
const memberList = [
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'Aliqa Macale ',
        type: 'Counsaler',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'Seary Victor ',
        type: 'NGO',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'John Steere ',
        type: 'Counsaler',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'Mohannad Zitoun ',
        type: 'NGO',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'Studio Express ',
        type: 'Counsaler',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'story.png',
        name: 'Hendrix Stamp ',
        type: 'User',
    },
]

class AdvertisementSlider extends Component {
    render() {
        const settings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
        };
        return (
            <div className="mb-3 mt-3">
            <div className="border-bottom-light mb-2">
                <h4 className="fw-400 font-xss mb-1">Advertisements</h4>
            </div>
            <Slider {...settings}>
                {memberList.map((value, index) => (
                    <div key={index} className="card w200 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                        <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                            <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 overflow-hidden  bor-0">
                                <img src={`assets/images/${value.imageUrl}`} alt="group" className="img-fluid rounded-xxl mb-2" />
                            </div>
                            <div className="clearfix"></div>
                            {/* <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.name} </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.type}</p> */}
                            <a href="/defaultgroup" className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> See more</a>
                        </div>
                    </div>
                ))}
            </Slider>
            </div>
        );
    }
}

export default AdvertisementSlider;