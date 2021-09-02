import React, { Component } from 'react';
import ReadMore from './ReadMore';
import FileViewer from './FileViewer';
// import { CustomErrorComponent } from 'custom-error';
import LikeModal from './modals/LikeModal';
import CommentModal from './modals/CommentModal';
import ShareModal from './modals/ShareModal';
import Slider from "react-slick";
class Postview extends Component {
    // state = {
    //     isOpen: false,
    //     likeModal: false,
    //     commentModal: false,
    //     isLiked: false
    // };

    // toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    // toggleActive = () => this.setState({ isActive: !this.state.isActive });

    render() {

        const { user, time, title, des, avater, attachment, id, like, comment } = this.props;
        const settings = {
            asNavFor:null,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        // const getType = (e)=>{return e.split('.').pop()}
        // const type = attachment? getType(attachment.url) : '' ;
        // const menuClass = `${this.state.isOpen ? " show" : ""}`;
        // const emojiClass = `${this.state.isActive ? " active" : ""}`;
        // const likeClass = this.state.isLiked ? " text-white bg-primary-gradiant" : " text-current bg-grey"

        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3"><img src={`assets/images/${avater}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {user} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {time}</span></h4>
                    <div className="ms-auto pointer"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div>

                </div>
                <div className="card-body p-0 me-lg-5">
                    <h3 className="lh-26 font-xss">{title}</h3>
                    <ReadMore style="lh-26 font-xssss" children={des} length="250"></ReadMore>
                    {/* <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{des} <a href="/defaultvideo" className="fw-600 text-primary ms-2">See more</a></p> */}
                </div>
                {attachment ?
                    <Slider {...settings} className="mb-3" ref={slider => (this.slider1 = slider)}>
                        {attachment.map(e => {
                            // console.log(e);s
                            return (<div key={e.id}><FileViewer viewtype="postView" attachment={e} title={title} /></div>)

                        })}
                    </Slider>

                    : ''}
                <div className="card-body d-flex align-items-center p-0">
                    <LikeModal like={like} ></LikeModal>
                    <CommentModal comment={comment}></CommentModal>
                    <ShareModal id={id} title={title} des={des}></ShareModal>
                </div>
            </div>
        );
    }
}

export default Postview;