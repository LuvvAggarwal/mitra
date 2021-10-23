import React, { useState } from 'react'
import grpMember from "../api/groupMember"
const img_url = require("../utils/imgURL");

const InfoCardMultiBtn = (props) => {
    // const [profile_img_url, set_profile_img_url] = useState(data.profile_photo)
    // const [cover_img_url, set_cover_img_url] = useState(data.cover_photo)
    const { value, showAlert, alertConfig, btns, page  } = props;
    // console.log(AuthStr + '        TOKEN');

    const [data, setData] = useState(value)
    // const btnTextCtrl = () => {
    //     const req = data.requests ;
    //     const mem = data.members ;
    //     if(req.length == 0 && mem.length == 0){
    //         return "Request To Join"
    //     }
    //     if (req.length > 0) {
    //         return "Cancel Request"
    //     }
    //     if (mem.length > 0) {
    //         return "Leave"
    //     }
    // }

    // const btnCSSCtrl = () => {
    //     const req = data.requests ;
    //     const mem = data.members ;
    //     if(req.length == 0 && mem.length == 0){
    //         return "btn-primary"
    //     }
    //     if (req.length > 0) {
    //         return "bg-grey text-grey-800"
    //     }
    //     if (mem.length > 0) {
    //         return "btn-danger"
    //     }
    // }
    // const [btnText, setBtnText] = useState(btnTextCtrl);
    // const [btnCSS, setBtnCSS] = useState(btnCSSCtrl)
    const profile_photo = data.profile_photo ? img_url(data.profile_photo) : "/files/user.png"
    const cover_photo = data.cover_photo ? img_url(data.cover_photo) : "/files/group.png"

    return (
        <div key={data.id} className="col-md-6 col-sm-6 pe-2 ps-2">
            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                <div className="card-body position-relative h100 bg-image-cover bg-image-center"
                    style={{ backgroundImage: `url(${cover_photo})` }}>
                </div>
                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                    <a href={`/${page}`} ><figure className="avatar position-absolute w75 z-index-1 left-15" style={{ marginTop: `-40px` }}><img src={`${profile_photo}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 h75" /></figure></a>
                    <div className="clearfix"></div>
                    <h4 className="fw-700 font-xsss mt-3 mb-1">{data.name}</h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{data.email}</p>
                    <div className="d-flex align-items-center">
                        {btns.map((e)=>{
                          return  <button className={`btn ${e.css} text-center p-2 pe-4 ps-4 lh-24 w_100 ms-1 ls-3 d-inline-block rounded-xl font-xsss fw-700 ls-lg text-white`} onClick={e.func}>{e.text}</button>
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InfoCardMultiBtn;
