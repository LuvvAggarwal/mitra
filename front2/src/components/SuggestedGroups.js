import React, { Component } from 'react';
import img_url from '../utils/imgURL';

class SuggestedGroups extends Component {
    constructor(props) {
        super(props)
        // this.data = props.data/
    }
    render() {
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggested Groups</h4>
                    <a href="/groups" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                {this.props.data.map((value, index) => (
                    <div className="wrap" key={index}>
                        <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                            <figure className="avatar me-3"><img src={value.profile_photo ? img_url(value.profile_photo) : "/files/user.png"} alt="avater" className="shadow-sm rounded-circle w40 h40" /></figure>
                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {value.email} </span></h4>
                        </div>
                        <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                            <a href={"/groupProfile/" + value.group_id} className="p-2 lh-20 w100 bg-primary-gradiant text-white text-center font-xssss fw-600 ls-1 rounded-xl">View Profile</a>
                        </div>
                    </div>

                ))}


            </div>
        );
    }
}

export default SuggestedGroups;