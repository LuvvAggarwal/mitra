import React,{Component} from 'react';
import Slider from "react-slick";

const memberList = [
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Aliqa Macale ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Seary Victor ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'John Steere ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Studio Express ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Hendrix Stamp ',
        email: 'support@gmail.com',
    },
    {   
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun ',
        email: 'support@gmail.com',
    },
]

class GroupSlider extends Component {
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
                    <h4 className="fw-400 font-xss mb-1">Groups</h4>
                </div>
            <Slider {...settings}>
                {memberList.map((value , index) => (
                <div key={index} className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-3">
                    <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{backgroundImage: `url("assets/images/${value.bgUrl}")`}}></div>
                    <div className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                        <figure className="avatar overflow-hidden ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100" /></figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xsss mt-2 mb-1">{value.name} </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">{value.email}</p>
                        <span className="live-tag mt-2 mb-0 bg-success p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">Join</span>
                        <div className="clearfix mb-2"></div>
                    </div>
                </div>
                ))}
            </Slider>
            </div>
        );
    }
}

export default GroupSlider;