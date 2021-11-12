import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
// import { Link } from 'react-router-dom';
import auth from "../api/auth"
const errorSetter = require("../utils/errorSetter")
class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Verifing"
        }
        // console.log("test");
    }
    componentDidMount() {
        window.addEventListener('load', this.verify);
    }

    verify = async() => {
    const path = this.props.location.pathname;
    // console.log(path);
    try {
        const response = await auth.put(path).then(res => {
            this.setState({ text: "Verified" });
            // return 
        })
    } catch (error) {
        // console.log(path);
        this.setState({ text: errorSetter(error) });
    }

}
render() {
    return (
        <Fragment>
            <div>
                {this.state.text}
                {this.state.text == "Verified" && 
                    <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                }
            </div>
        </Fragment>
    );
}
}

export default Verify;