import React, { Component } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import ReactDOM from "react-dom"
import FileViewer from './FileViewer';
import Slider from "react-slick";
import img_url from '../utils/imgURL';
import dl from "../api/dl";
import post from "../api/posts"
import posts from '../api/posts';
import socket from '../utils/socket';
const errorSetter = require("../utils/errorSetter")
class Createpost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            showModal: false,
            cat: [],
            cat_value: "",
            attachments: '',
            title: "",
            description: "",
            disable: false,
            visiblity: "PUBLIC",
            profile_photo: this.props.profile_photo ? img_url(this.props.profile_photo) : "/files/user.png"
        };
    }

    // files = '';

    post_cat = async () => {
        const cat = await dl.get("/model/post_category")
        this.setState({ cat: cat.data.data.payload });
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    // this.setState({profile_photo = this.state.profile_photo ? img_url(this.state.profile_photo) : "/files/user.png"}) ;
    // const profile_photo= this.props.profile_photo ? img_url(this.props.profile_photo) : "/files/user.png";
    createPost = async (e) => {
        e.preventDefault();
        this.setState({ disable: true })
        // console.log(this.files)
        // alert(">>>>>>>>")
        let type = this.state.attachments.length > 0 ? 'MULTIMEDIA' : 'TEXT';
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        for (const key of Object.keys(this.state.attachments)) {
            formData.append('attachments', this.state.attachments[key])
        }
        formData.append("visibility", this.state.visiblity);
        formData.append("category", this.state.cat_value);
        formData.append("type", type);
        if (this.props.group) formData.append("group_id", this.props.group)

        const access_token = localStorage.getItem("access_token");
        const AuthStr = 'Bearer '.concat(access_token);

        await posts.post('/create', formData,
            { headers: { 'Authorization': AuthStr, 'Content-Type': 'multipart/form-data' } }
        ).then((res) => {
            const message = res.data.message;
            this.props.showAlert()
            this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
            this.setState({ disable: false })
            socket.emit("post-created", res.data.data.payload.user_id)
            window.location.reload()
        }).catch((e) => {
            this.props.showAlert()
            this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            this.setState({ disable: false })
        })
    }

    componentDidMount(prev) {
        this._isMounted = true;
        if (this._isMounted)
            this.post_cat()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    attachmentController = (e) => {
        const title = document.getElementById("title").value;
        // console.log(title);
        const files = e.target.files;
        let attachments = [];
        const settings = {
            asNavFor: null,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        // console.log(files);
        if (files.length > 5) {
            alert("You can only upload 5 files")
            e.target.value = "";
            return;
        }
        else {
            Array.from(files).forEach((file, i) => {
                let extension = file.name.toLowerCase().split('.').pop();
                const filetypes = /jpeg|jpg|png|gif|mkv|mp4|pdf|xlsx|docx/;
                if (!filetypes.test(extension)) {
                    alert("Attachment file type supported - .jpeg,.jpg,.png,.gif,.mkv,..mp4,.pdf,.xlsx,.docs")
                    e.target.value = "";
                    return;
                } else {
                    var obj = {};
                    obj.id = i;
                    obj.url = URL.createObjectURL(file);
                    obj.mime_type = file.type;
                    // console.log(obj);
                    attachments.push(obj)
                }
            });

        }
        this.setState({ attachments: files });
        // console.log("attt>>>>>>>>>>>>>>>>>>>>>>>");
        // console.log(this.state.attachments);
        const FileViewerWrapper = document.getElementById("display-files");
        const FileView = attachments ?
            <Slider {...settings} className="mb-3  max-h200" ref={slider => (this.slider1 = slider)}>
                {attachments.map(e => {
                    // console.log(e);s
                    return (<div key={e.id}><FileViewer css="max-h200 w-100" viewtype="createPost" attachment={e} title={title} /></div>)

                })}
            </Slider>

            : '';
        ReactDOM.render(FileView, FileViewerWrapper)
        // console.log(e);
        // this.setState({ attachments: attachments })
    }

    render() {
        const menuClass = `${this.state.isOpen ? " show" : ""}`;

        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-3 pe-4 pb-3 mb-3">
                {/* <div className="card-body p-0">
                    <a href="/" className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"><figure className="avatar position-relative ms-2 me-2 mt-1 top-8"><img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" /></figure>Create Post</a>
                </div> */}
                <div className="card-body p-0 mt-3 position-relative rounded-xxl border-auto-md">
                    {/* <figure className="avatar position-relative ms-2 me-2 mt-1 top-8"></figure> */}
                    <figure className="avatar position-absolute ms-2 mt-1 top-8"><img src={this.props.profile_photo ? img_url(this.props.profile_photo) : "/files/user.png"} alt="icon" className="shadow-sm rounded-circle w30 h30" /></figure>
                    <Button
                        variant="none"
                        className="d-flex bor-0 mb-2 h55 w-100 rounded-xxl text-left p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                        onClick={() => this.setState({ showModal: true })}
                    >What's on your mind, Buddy?</Button>
                </div>

                <div className="card-body d-flex p-0 mt-2">
                    <div className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-file-text me-2"></i><span className="d-none-xs">Attachments</span></div>
                </div>
                <Modal
                    show={this.state.showModal}
                    animation={true}
                    size="lg"
                    onHide={() => { this.setState({ showModal: false }) }}
                    centered
                    contentClassName="bg-transparent rounded-xxl"
                >
                    <Modal.Dialog
                        contentClassName="auto-bg rounded-xxl"
                        className="mb-0 mt-0 modal-custom"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className="fw-500">
                                Create Post
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="card-body p-0 mt-0 position-relative">
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <select value={this.state.visiblity} className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" onChange={(e) => {
                                            this.setState({ visiblity: e.target.value })
                                        }} aria-label="Default select example">
                                            {/* <option className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value="" disabled>Visibility</option> */}
                                            <option className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value="PUBLIC" >Public</option>
                                            <option className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value="FRIENDS" >Friends</option>
                                            <option className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value="PRIVATE" >Private</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <select value={this.state.cat_value} className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" onChange={(e) => {
                                            this.setState({ cat_value: e.target.value })
                                        }} aria-label="Default select example">
                                            <option className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value="" disabled>Select Post Category</option>
                                            {this.state.cat.map((e, i) => {
                                                return <option key={i} className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" value={e.id}>{e.name}</option>
                                            })}

                                        </select>
                                    </div>
                                </div>
                                <input id="title" className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" name="title" value={this.state.title} onChange={(e) => {
                                    this.setState({ title: e.target.value })
                                }} placeholder="Title of post" />
                                <textarea id="description" name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?" value={this.state.description} onChange={(e) => {
                                    this.setState({ description: e.target.value })
                                }}></textarea>
                            </div>
                            <div className="card-body d-flex flex-column p-0 mt-1">
                                <div><label className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-file-text me-2"></i><span className="d-none-xs">Attachments</span>
                                    <input id="file-upload" type="file" multiple onChange={this.attachmentController} />
                                </label>
                                </div>

                                {/* <input type="file" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo/Video</span></input> */}

                                <div id="display-files" className="w100per mx-3">

                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="py-1 d-flex justify-content-center bg-white border-top-xs z-index-1">
                            <div>
                                <Button variant="primary" className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl" disabled={this.state.disable} onClick={this.createPost}>Post</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div >
        );
    }
}

export default Createpost;