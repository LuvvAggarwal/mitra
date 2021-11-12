import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import ProfileCardGroup from "../components/ProfilecardGroup";
import AlertComp from "../components/Alert";
// import {useParams} from "react-router-dom"
// import { UserContext } from '../context/UserContext';

class Userpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            showAlert: false,
            alertConfig: {}
        }
    }
    render() {

        return (
            <Fragment>
                {this.state.showAlert && <AlertComp config={this.state.alertConfig} show={true}></AlertComp>}
                <Header />
                <Leftnav />
                <Rightchat />


                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12 mb-3">
                                    <ProfileCardGroup showAlert={()=>{this.setState({showAlert: true})}} alertConfig={(e)=>{this.setState({alertConfig: e})}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Popupchat />
                <Appfooter />

            </Fragment>

        )
    };
}

export default Userpage;