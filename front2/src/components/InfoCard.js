import React, { useState } from 'react'
import follow from "../api/follow"
const img_url = require("../utils/imgURL");
const errorSetter = require("../utils/errorSetter")
const InfoCard = (props) => {
    // const [profile_img_url, set_profile_img_url] = useState(data.profile_photo)
    // const [cover_img_url, set_cover_img_url] = useState(data.cover_photo)
    const { value, variant, showAlert, alertConfig } = props;
    // console.log(AuthStr + '        TOKEN');

    const [data, setData] = useState(value)
    const btnTextCtrl = () => {
        if (data.following)
                return data.following.length > 0 ? "Unfollow" : "Follow"
    }

    const btnCSSCtrl = () => {
        if (data.following)
            return data.following.length > 0 ? "btn-danger" : "btn-primary"
    }
    const [btnText, setBtnText] = useState(btnTextCtrl);
    const [btnCSS, setBtnCSS] = useState(btnCSSCtrl)
    const profile_photo = data.profile_photo ? img_url(data.profile_photo) : "/files/user.png"
    const cover_photo = data.cover_photo ? img_url(data.cover_photo) : "/files/group.png"
    const btnFunc = async (i) => {
        // const target = data[i];
        const access_token = localStorage.getItem("access_token");
        const AuthStr = 'Bearer '.concat(access_token);

        const following = data.following
        if (following.length > 0) {
            // console.log(following);
            await follow.delete("/" + following[0].id,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                showAlert(true)
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                let obj = data;
                obj.following.pop();
                setData(obj)
                setBtnText("Follow");
                setBtnCSS("btn-primary");
            }).catch((e) => {
                showAlert(true)
                alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        } else {
            await follow.post("/" + data.id,{} ,{ headers: { 'Authorization': AuthStr } }
            ).then((res) => {
                const payload = res.data.data.payload;
                const message = res.data.message;
                // console.log("res >>>>>>>>>>>");
                // console.log(res);
                showAlert(true)
                alertConfig({ variant: "success", text: message, icon: "check", strongText: "Success:" })
                // following.push(payload);
                let obj = data;
                obj.following.push(payload);
                setData(obj)
                setBtnText("Unfollow")
                setBtnCSS("btn-danger");
            }).catch((e) => {
                console.log(e.request);
                showAlert(true)
                alertConfig({ variant: "danger", text: errorSetter(e), icon: "alert-octagon", strongText: "Error:" })
            })
        }
    }




    return (
        <div key={data.id} className="col-md-6 col-sm-6 pe-2 ps-2">
            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                <div className="card-body position-relative h100 bg-image-cover bg-image-center"
                    style={{ backgroundImage: `url("${cover_photo}")` }}>
                </div>
                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                    <a href={`/userProfile/${data.user_id}`} ><figure className="avatar position-absolute w75 z-index-1 left-15" style={{ marginTop: `-40px` }}><img src={`${profile_photo}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 h75" /></figure></a>
                    <div className="clearfix"></div>
                    <h4 className="fw-700 font-xsss mt-3 mb-1">{data.name}</h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{data.email}</p>
                    <span className="position-absolute right-15 top-0 d-flex align-items-center">
                        <button className={`btn ${btnCSS} text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl font-xsss fw-700 ls-lg text-white`} onClick={btnFunc}>{btnText}</button>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default InfoCard
