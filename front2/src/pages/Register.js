import React, { Component, Fragment } from "react";
// import { Alert } from "react-bootstrap";
import auth from "../api/auth";
import AlertComp from "../components/Alert";
const Joi = require("joi")
const data_type = require("../validation/dataTypes");


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            terms: false,
            showAlert: false,
            alertConfig: {},
            disable: false
        };
    }

    createUser = async (e) => {
        const { name, email, password, confirm_password, terms } = this.state;
        const schema = Joi.object({
            email: data_type.email,
            name: data_type.str_250_req,
            password: data_type.password,
            terms: data_type.true_req,
        })
        const validate = {
            email: email,
            name: name,
            password: password,
            terms: terms
        }
        const { error } = schema.validate(validate)
        console.log(JSON.stringify(error));
        if (error) {
            this.setState({ showAlert: true })
            // this.setState({ error: error.details[0].message })
            this.setState({alertConfig : {variant: "danger", text: error.details[0].message, icon:"alert-octagon", strongText: "Error:"}})
        } else if (password !== confirm_password) {
            // this.setState({ showError: true })
            this.setState({ showAlert: true })
            this.setState({alertConfig : {variant: "danger", text: "Password should match confirm password.", icon:"alert-octagon", strongText: "Error:"}})
            // this.setState({ error: "Password should match confirm password." })
        } else {
            this.setState({ disable: true }, async () => {
                try {
                    const response = await auth.post("/signUp",
                        { name, email, password }
                    ).then((res) => {
                        // console.log(res.data.message);
                        this.setState({ disable: false })
                        // this.setState({ showSuccess: true })
                        this.setState({ showAlert: true })
                        this.setState({alertConfig : {variant: "success", text:e.response.data.message, icon:"check", strongText: "Success:"}})
                    }).catch((e) => {
                        this.setState({ disable: false })
                        // this.setState({ showError: true })
                        this.setState({ showAlert: true })
                        // this.setState({ error: e.response.data.message })
                        this.setState({alertConfig : {variant: "danger", text:e.response.data.message, icon:"alert-octagon", strongText: "Error:"}})
                    })

                } catch (e) {
                }
            })

        }
    }

    render() {
        return (
            <Fragment>
                {this.state.showAlert && <AlertComp config={this.state.alertConfig} show={true}></AlertComp>}
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Mitra </span> </a>
                        <button className="nav-menu me-0 ms-auto"></button>

                        <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</a>
                        <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</a>
                    </div>
                </div>


                <div className="row" style={{ marginTop: '55px' }}>
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("assets/images/bg-login.png")` }}></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">Create <br />your account</h2>
                                <form>

                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        <input type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" value={this.state.name} placeholder="Your Name"
                                            onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" value={this.state.email} placeholder="Your Email Address" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <input type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" value={this.state.password} placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" value={this.state.confirm_password} placeholder="Confirm Password" onChange={(e) => { this.setState({ confirm_password: e.target.value }) }} />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        <input type="checkbox" className="form-check-input mt-2" id="terms" onChange={(e) => {
                                            if (e.target.value == "on") this.setState({ terms: true })
                                            else {
                                                this.setState({ terms: false })
                                            }
                                        }} />
                                        <label className="form-check-label font-xsss text-grey-500">Accept Term and Conditions</label>

                                    </div>
                                </form>

                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1">
                                        <button className="form-control text-center style1-input text-white fw-600 bg-dark border-0 p-0" disabled={this.state.disable} onClick={this.createUser}>Register</button></div>
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Already have account <a href="/login" className="fw-700 ms-1">Login</a></h6>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </Fragment >
        );
    }
}

export default Register;