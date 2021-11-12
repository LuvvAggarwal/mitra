import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import './info.css';

const benefits = [
    {
        bg: "#fa1986",
        icon: "ti-user",
        title: "Guidance",
        desc: "Counsolers can provide guidance that help you overcome your problem"
    },
    {
        bg: "#faa719",
        icon: "ti-shine",
        title: "Inspiration",
        desc: "Get Inspired from users who have faced similiar situations"
    },
    {
        bg: "#3184ff",
        icon: "ti-thumb-up",
        title: "Help",
        desc: "Get help from other users when you really need it"
    },
    {
        bg: "#0be072",
        icon: "ti-stats-up",
        title: "Improve Life",
        desc: "Improve your life by overcoming your problem"
    },
]


class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            about: false,
            benefits: false
        }
    }

    render() {
        return (
            <div>

                <div className="header-wrapper bg-white demo-style">
                    <div className="container max-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6"><a href="/" className="logo"><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Mitra</span> </a></div>
                            <div className="col-lg-6 col-md-6 col-sm-6 d-none d-lg-block">
                                <ul className="list-inline text-center mb-0 mt-2 pt-1">
                                    <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#about">About</a></li>
                                    <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#benefit">Benefits</a></li>
                                    <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#contact">Contact Us</a></li>
                                </ul>

                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 text-right">
                                <a href="/register" className="btn btn-lg btn-primary text-uppercase">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <video autoPlay id="hero-video" loop muted>
                        <source src="assets/images/hero-video.mp4" type="video/mp4" ></source>
                    </video>

                    <div className="banner-wrapper bscover demo-style hero-con">
                        <div className="container max-container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="text-white heading">
                                        <span className="d-inline-block fredoka-font ls-3 fw-600 text-current logo-text mb-0">Meetra</span>
                                        <p className="mt-1 font-xxl">Friend for everyone</p>
                                    </h1>
                                    <a href="/login" className="btn btn-lg btn-primary mr-4 text-uppercase animate__animated animate__backInLeft animate__delay-1s animate__slow mt-3">Login</a>
                                    <a href="/register" className="btn btn-lg animate__animated animate__backInRight bg-white ms-4 text-uppercase animate__delay-1s animate__slow mt-3">Register</a>

                                    {/* <div className="icon-scroll pos-bottom-center icon-white"></div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="section demo-style" id="about">
                    <div className="container ms-0 me-0" style={{ width: "100%", maxWidth: "100%", padding: "0" }}>
                        <h2 className="title-text2 mb-3 mt-2 text-align-center"><b>About</b></h2>
                        {/* <p className="mb-5">Mitra as a platform have 3 user types</p> */}
                        <div className="row text-white me-0 ms-0">
                            <ScrollAnimation animateIn="animate__slideInUp" className="col-md-4 col-12 col-sm-12" style={{
                                    minHeight: "100%",
                                    background: "linear-gradient(90deg, rgba(112,24,60,0.35) 0%, rgba(130,10,10,0.35) 35%, rgba(84,32,11,0.35) 100%), url(assets/images/divyang.jpeg)",
                                    backgroundSize: "cover",
                                    height: "350px",
                                }}>
                                    <h2 className="fw-700 text-white m-h">Specials</h2>
                                    <p className="fw-400 lh-24">Specials are those users which are currently having social, mental or physical problem.Due to these problem there life is impacted adversly</p>

                            </ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInDown" className="col-md-4 col-12 col-sm-12" style={{
                                    minHeight: "100%",
                                    background: "linear-gradient(90deg, rgba(12,67,142,0.5) 0%, rgba(10,41,130,0.5) 35%), url(assets/images/counsoler.jpg)",
                                    backgroundSize: "cover",
                                    height: "350px",
                                }}>
                                    <h2 className="fw-700 text-white m-h">Counsoler</h2>
                                    <p className="fw-400 lh-24">Counsolers are those users which have faced similar social, mental or physical problem.But now they are doing good in life.</p>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" className="col-md-4 col-12 col-sm-12" style={{
                                minHeight: "100%",
                                background: "linear-gradient(90deg, rgba(37,230,22,0.5) 0%, rgba(3,124,17,0.5) 35%), url(assets/images/ngo.jpg)",
                                backgroundSize: "cover",
                                height: "350px",
                            }}>
                                <h2 className="fw-700 text-white m-h">NGOs</h2>
                                <p className="fw-400 lh-24">NGOs are institutions that help users which are currently having social, mental or physical problem. With their help users can have better life</p>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>


                <div className="section demo-style" id="benefit">
                    <div className="container-fluid max-container">
                        <h2 className="title-text2 mb-3 mt-2 text-align-center"><b>Benefits</b></h2>
                        <div className="row">

                            {benefits.map((value, index) => {
                                return (
                                    <ScrollAnimation animateIn="animate__fadeInDown" delay="100" duration="2" key={index} className="col-sm-6 col-md-3 p-0 h150 me-0 ms-0 text-white" style={{ background: value.bg }}>
                                        <div className="pt-4 pb-4 ps-2 pe-2 d-flex align-items-center">
                                            <i className={value.icon + " me-3 heading"}></i>
                                            <div>
                                                <h4 className="text-white fw-700">{value.title}</h4>
                                                <p className="lh-20">{value.desc}</p>
                                            </div>
                                        </div>
                                    </ScrollAnimation>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="p50 bg-black demo-style" id="contact">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <ScrollAnimation animateIn="animate__slideInLeft" className="title-text2 text-white mt-4"><b>Improve Your Life</b></ScrollAnimation>
                                <p className="text-white ml-5 mr-5">By joining Mitra now and overcoming your problems!</p>
                                <ScrollAnimation animateIn="animate__pulse" offset="170" duration="1.5" className="col-sm-12 text-center mt-3 mb-3"><a href="/register" className="btn-lg btn bg-white">JOIN NOW</a></ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Demo;