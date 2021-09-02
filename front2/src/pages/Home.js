import React, { Component, Fragment } from "react";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';


import SuggestedFriends from '../components/SuggestedFriends';
import SuggestedGroups from '../components/SuggestedGroups';
import Advertisement from '../components/Advertisement';
import Events from '../components/Events';
import Createpost from '../components/Createpost';
import Groupslider from '../components/sliders/GroupSlider';
import UserSlider from '../components/sliders/UserSlider';
import AdvertisementSlider from '../components/sliders/AdvertisementSlider';
import Storyslider from '../components/Storyslider';
import Postview from '../components/Postview';
import Load from '../components/Load';
import Profilephoto from '../components/Profilephoto';

// 
const like = [
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
    {
        user_name:"luv",
        img:"user.png"
    },
]

const comment = [
    {
        user_name:"luv",
        img:"user.png",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    },
    {
        user_name:"luv",
        img:"user.png",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    },
    {
        user_name:"luv",
        img:"user.png",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    },
    {
        user_name:"luv",
        img:"user.png",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    },
    {
        user_name:"luv",
        img:"user.png",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    },
]

const attachment = [
    {
        id: 1,
        mime_type: "image/png",
        url: "post.png"
    },
    {
        id: 2,
        mime_type: "video/mp4",
        url: "videoplayback.mp4"
    },
    {
        id: 3,
        mime_type: "application/pdf",
        url: "sample.pdf"
    },
    {
        id: 4,
        mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "JAI SIYARAM.docx"
    },
    {
        id: 5,
        mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "jai siyaram.xlsx"
    }
]

const attachment1 = [
    {
        id: 3,
        mime_type: "application/pdf",
        url: "sample.pdf"
    },
]

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Leftnav navClass="re" />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row feed-body">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    <Storyslider />
                                    <Createpost />
                                    <Postview id="32" attachment={attachment1} avater="user.png" user="Surfiya Zakir" time="22 min ago" title="There is something more in everything" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." like={like}
                                    comment={comment}
                                    />
                                    <Postview id="31" attachment={attachment} avater="user.png" user="David Goria" time="22 min ago" title="There is something more in everything" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." like={like}
                                    comment={comment}
                                    />
                                    <Postview id="33" attachment={attachment1} avater="user.png" user="Anthony Daugloi" time="2 hour ago" title="There is something more in everything" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." like={like}
                                    comment={comment}
                                    />
                                    <Groupslider />
                                    <Postview id="35" attachment={attachment} avater="user.png" user="Victor Exrixon" time="3 hour ago" title="There is something more in everything" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." like={like}comment={comment}
                                    />
                                    <UserSlider />
                                    <Postview id="36" attachment={attachment} avater="user.png" user="Victor Exrixon" time="12 hour ago" title="There is something more in everything" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." like={like}comment={comment}
                                    />
                                    <AdvertisementSlider />
                                    <Load />
                                </div>
                                <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                                    <SuggestedFriends />
                                    <SuggestedGroups />
                                    <Advertisement />
                                    {/* <Events />
                                    <Profilephoto /> */}
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

export default Home;