import React, { Component } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import Slider from "react-slick";
import grpMember from '../../api/groupMember';
import img_url from '../../utils/imgURL';
const errorSetter = require("../../utils/errorSetter");
class GroupSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            disable: false
        }

    }
    btnTextCtrl = (data) => {
        const req = data.requests ;
        const mem = data.members ;
        if(req.length == 0 && mem.length == 0){
            return "Request"
        }
        if (req.length > 0) {
            return "Cancel"
        }
        if (mem.length > 0) {
            return "Leave"
        }
    }

    btnCSSCtrl = (data) => {
        const req = data.requests ;
        const mem = data.members ;
        if(req.length == 0 && mem.length == 0){
            return "bg-success"
        }
        if (req.length > 0) {
            return "bg-light text-grey-800"
        }
        if (mem.length > 0) {
            return "bg-danger"
        }
    }

    btnFunc = async (data, i) => {
        // const target = data[i];
        const access_token = localStorage.getItem("access_token");
        const AuthStr = 'Bearer '.concat(access_token);
        this.setState({disable: true})
        const req = data.requests ;
        const mem = data.members ;
        if (req.length > 0) {
            // alert("=      = req");
            await grpMember.delete(`/req/id=${req[0].id}/rec=${req[0].request_reciever}/sen=${req[0].request_sender}`,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                let obj = data;
                // console.log(obj);
                obj.requests.pop();
                const suggestedData = this.state.data;
                suggestedData[i] = obj;
                this.setState({data: suggestedData})
               
            }).catch((e) => {
                // console.log("error>>>>>>>>>>>>>>>>>>");
                // console.log(e);
                // console.log(e.response);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        } else if(mem.length > 0){
            await grpMember.delete("/id=" + mem[0].id ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.members.pop();
                const suggestedData = this.state.data;
                suggestedData[i] = obj;
                this.setState({data: suggestedData})
            }).catch((e) => {
                // console.log("error>>>>>>>>>>>>>>>>>>");
                // console.log(e);
                // console.log(e.response);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }else if(mem.length == 0 && req.length == 0){
            await grpMember.post("/addReq/" + data.id,{request_reciever: data.created_by} ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.requests.push(payload);
                const suggestedData = this.state.data;
                suggestedData[i] = obj;
                this.setState({data: suggestedData})
            }).catch((e) => {
                // console.log("error>>>>>>>>>>>>>>>>>>");
                // console.log(e);
                // console.log(e.response);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
        this.setState({disable: false})
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
          this.setState({data: this.props.data});
        }
      }

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
                    {this.state.data.map((value, index) => (
                        <div key={index} className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                            <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                <a href={`/userProfile/${value.user_id}`}><figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w45 z-index-1"><img src={`${value.profile_photo ? img_url(value.profile_photo) : "/files/user.png"}`} alt="avater" className="float-right p-0 bg-white rounded-circle w45 h45 shadow-xss" /></figure></a>
                                <div className="clearfix"></div>
                                <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.name} </h4>
                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.type}</p>
                                <button disable={this.state.disable.toString()} onClick={(e) => this.btnFunc(value, index)} className={`btn text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white ${this.btnCSSCtrl(value)}`}>{this.btnTextCtrl(value)}</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}

export default GroupSlider;