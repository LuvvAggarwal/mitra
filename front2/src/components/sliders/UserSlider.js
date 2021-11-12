import React, { Component } from 'react';
import Slider from "react-slick";
import img_url from '../../utils/imgURL';
import follow from "../../api/follow"
const errorSetter = require("../../utils/errorSetter")
// SLIDER FOR ALL USERS - SPECIALS, NGO, COUNSALERS

class UserSlider extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            disable: false
        }
        
    }

    btnFunc = async (data, i) => {
        // const target = data[i];
        const access_token = localStorage.getItem("access_token");
        const AuthStr = 'Bearer '.concat(access_token);
        this.setState({disable: true});
        const following = data.following
        if (following.length > 0) {
            // console.log(following);
            await follow.delete("/" + following[0].id,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                let obj = data;
                obj.following.pop();
                const suggestedData =  this.state.data
                suggestedData[i] = obj;
                this.setState({data: suggestedData})
                // setBtnText("Follow");
                // setBtnCSS("btn-primary");
                // alert(message)
                
            }).catch((e) => {
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        } else {
            await follow.post("/" + data.id,{} ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                // alert(message)
                let obj = data;
                obj.following.push(payload);
                const suggestedData =  this.state.data
                suggestedData[i] = obj;
                this.setState({data: suggestedData})
            }).catch((e) => {
                // console.log(e.request);
                this.props.showAlert(true)
                this.props.alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })

        }
        this.setState({disable: false});
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
                    <h4 className="fw-400 font-xss mb-1">Suggested Users</h4>
                </div>
                <Slider {...settings}>
                    {this.state.data.map((value, index) => (
                        <div key={index} className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                            <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                               <a href={`/userProfile/${value.user_id}`}><figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w45 z-index-1"><img src={`${value.profile_photo ? img_url(value.profile_photo) : "/files/user.png"}`} alt="avater" className="float-right p-0 bg-white rounded-circle w45 h45 shadow-xss" /></figure></a>
                                <div className="clearfix"></div>
                                <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.name} </h4>
                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.type}</p>
                                <button disable={this.state.disable.toString()}  onClick={(e)=> this.btnFunc(value, index)} className={`btn text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white ${value.following.length > 0 ? "bg-danger" : "bg-success"}`}>{value.following.length > 0 ? "Unfollow" : "Follow"}</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}

export default UserSlider;