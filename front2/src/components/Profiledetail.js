import React,{Component} from 'react';


class Profiledetail extends Component {
    render() {
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-block p-4">
                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">{this.props.bio}</p>
                </div>
                {this.props.problem && <div className="card-body d-flex pt-0">
                    <i className="feather-aperture text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.props.problem}</h4>
                </div>}
                {this.props.address && <div className="card-body d-flex pt-0">
                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.props.address}</h4>
                </div>}
               {this.props.ph_number && <div className="card-body d-flex pt-0">
                    <i className="feather-phone text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.props.ph_number}</h4>
                </div>}
                <div className="card-body d-flex pt-0">
                    <i className="feather-mail text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.props.email}</h4>
                </div>
            </div>
        );
    }
}

export default Profiledetail;