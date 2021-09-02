import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import Load from '../components/Load';

const groupList = [
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'group.png',
    },    
    
]

class Badge extends Component {
    
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    
                                    <Pagetitle title="Group"/>
                                    
                                    <div className="row ps-2 pe-1">
                                        {groupList.map((value , index) => (
                                        
                                        <div key={index} className="col-md-6 col-sm-6 pe-2 ps-2">
                                            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                                                <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{backgroundImage: `url("assets/images/${value.bgImage}")`}}></div>
                                                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                                                    <figure className="avatar position-absolute w75 z-index-1 left-15" style={{marginTop: `-40px` }}><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " /></figure>
                                                    <div className="clearfix"></div>
                                                    <h4 className="fw-700 font-xsss mt-3 mb-1">{value.name}</h4>
                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{value.email}</p>
                                                    <span className="position-absolute right-15 top-0 d-flex align-items-center">
                                                        <a href="/defaultgroup" className="d-lg-block d-none"><i className="feather-video btn-round-md font-md bg-primary-gradiant text-white"></i></a>
                                                        <a href="/defaultgroup" className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        ))}

                                        <Load />
                                        

                                        
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

export default Badge;