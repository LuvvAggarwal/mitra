import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom"
import FileViewer from './FileViewer';
import Slider from "react-slick";
class Createpost extends Component {
    state = {
        isOpen: false,
        showModal: false
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    attachmentController = (e) => {
        const title = document.getElementById("title").value; 
        // console.log(title);
        const files = e.target.files;
        let attachments = [] ;
        const settings = {
            asNavFor:null,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        console.log(files);
        if (files.length > 5) {
            alert("You can only upload 5 files")
            e.target.value = "";
            return;
        }
        else {
            Array.from(files).forEach((file,i) => {
                let extension = file.name.toLowerCase().split('.').pop();
                const filetypes = /jpeg|jpg|png|gif|mkv|mp4|pdf|xlsx|docx/;
                if (!filetypes.test(extension)) {
                    alert("Attachment file type supported - .jpeg,.jpg,.png,.gif,.mkv,..mp4,.pdf,.xlsx,.docs")
                    e.target.value = "";
                    return;
                }else{
                    var obj = {} ;
                    obj.id = i ;
                    obj.url = URL.createObjectURL(file);
                    obj.mime_type = file.type ;
                    // console.log(obj);
                    attachments.push(obj)
                }
            });

        }
        const FileViewerWrapper = document.getElementById("display-files");
        const FileView = attachments ?
            <Slider {...settings} className="mb-3" ref={slider => (this.slider1 = slider)}>
                {attachments.map(e => {
                    // console.log(e);s
                    return (<div key={e.id}><FileViewer viewtype="createPost" attachment={e} title={title} /></div>)

                })}
            </Slider>

            : '' ;
        ReactDOM.render(FileView,FileViewerWrapper)
        // console.log(e);

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
                    <figure className="avatar position-absolute ms-2 mt-1 top-8"><img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" /></figure>
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
                                <input id="title" className="bor-0 w-100 rounded-xxl mb-2 p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" name="title" placeholder="Title of post" />
                                <textarea id="description" name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
                            </div>
                            <div className="card-body d-flex flex-column p-0 mt-1">
                                <div><label className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-file-text me-2"></i><span className="d-none-xs">Attachments</span>
                                    <input id="file-upload" type="file" multiple onChange={this.attachmentController} />
                                </label>
                                {/* <input type="file" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo/Video</span></input> */}
                                </div>
                                <div id="display-files" className="w100per mx-3">

                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="py-1 d-flex justify-content-center">
                            <div>
                                <Button variant="primary" className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Post</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
        );
    }
}

export default Createpost;