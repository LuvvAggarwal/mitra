import React, { Component , Fragment } from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

const emailList = [
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: '',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: '',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: '',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Seary Victor',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Ana Seary',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: '',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: '',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        status: 'bg-success',
        subject: 'Mobile App Design',
        des: 'Hey Cak, Could you free now? Can you look and read the brief first before.',
        attach: 'attach',
        time: '12:45 PM',
        read: 'bg-lightblue theme-light-bg'
    },
]

class Email extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0" style={{maxWidth:`100%`}}>
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                        <ul className="email-message">
                                            {emailList.map((value , index) => (
                                                
                                            <li key={index} >
                                                
                                                <Link to="/defaultemailopen" className={`rounded-3 ${value.read}`} >
                                                    <div className="form-check mt-1">
                                                        <input className="form-check-input" type="checkbox" id="blankCheckbox1" value="option1" />
                                                        <label className="text-grey-500 font-xssss" htmlFor="blankCheckbox1"></label>
                                                    </div>
                                                    <div className="email-user">
                                                        <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                        <img src={`assets/images/${value.imageUrl}`} alt="user" className="w35 me-2" />  
                                                        <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">{value.name}</h6>
                                                    </div>
                                                    <div className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                        <i className="feather-star font-xss text-warning me-2"></i>
                                                        {value.subject}
                                                    </div>
                                                    <div className="email-text text-grey-500 fw-600 font-xssss">{value.des}</div>
                                                    {value.attach ?  <span className="email-file"><i className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span> : ''}
                                                    <div className="email-time text-grey-500 fw-600">{value.time}</div>
                                                </Link>
                                            </li>

                                            ))}
                                                

                                        </ul>                                 
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

export default Email;