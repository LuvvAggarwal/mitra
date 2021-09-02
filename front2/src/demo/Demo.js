import React,{Component} from 'react';

import './demo.css';

const newDemoList = [
    {
        imageUrl: 'home.jpg',
        title: 'Home',
        url: 'home'
    },
    {
        imageUrl: 'badge.jpg',
        title: 'Badge',
        url: 'defaultbadge'
    },
    {
        imageUrl: 'member.jpg',
        title: 'Member',
        url: 'defaultmember'
    },
    {
        imageUrl: 'story.jpg',
        title: 'Storie',
        url: 'defaultstorie'
    },
    
    {
        imageUrl: 'group.jpg',
        title: 'Group',
        url: 'defaultgroup'
    },
    {
        imageUrl: 'group-page.jpg',
        title: 'Group Page',
        url: 'grouppage'
    },
    {
        imageUrl: 'user.jpg',
        title: 'User',
        url: 'userpage'
    },
    {
        imageUrl: 'author.jpg',
        title: 'Group',
        url: 'authorpage'
    },
    {
        imageUrl: 'email.jpg',
        title: 'Email',
        url: 'defaultemailbox'
    },
    {
        imageUrl: 'email-open.jpg',
        title: 'Email Open',
        url: 'defaultemailopen'
    },
    {
        imageUrl: 'message.jpg',
        title: 'Message',
        url: 'defaultmessage'
    },
    {
        imageUrl: 'job.jpg',
        title: 'Job',
        url: 'defaultjob'
    },
    {
        imageUrl: 'hotel.jpg',
        title: 'Hotel',
        url: 'defaulthotel'
    },
    {
        imageUrl: 'hotel-open.jpg',
        title: 'Hotel Page',
        url: 'defaulthoteldetails'
    },
    {
        imageUrl: 'event.jpg',
        title: 'Event',
        url: 'defaultevent'
    },
    {
        imageUrl: 'live.jpg',
        title: 'Live',
        url: 'defaultlive'
    },
    {
        imageUrl: 'noti.jpg',
        title: 'Notification',
        url: 'defaultnotification'
    },
    {
        imageUrl: 'video.jpg',
        title: 'Video',
        url: 'defaultvideo'
    },
    {
        imageUrl: 'analytics.jpg',
        title: 'Analytics',
        url: 'defaultanalytics'
    },
    
    {
        imageUrl: 'shop-3.jpg',
        title: 'Shop One',
        url: 'shop1'
    },
    {
        imageUrl: 'shop-1.jpg',
        title: 'Shop two',
        url: 'shop2'
    },
    
    {
        imageUrl: 'cart.jpg',
        title: 'Cart',
        url: 'cart'
    },
    {
        imageUrl: 'checkout.jpg',
        title: 'Checkout',
        url: 'checkout'
    },
    {
        imageUrl: 'single-product.jpg',
        title: 'Single Product 2',
        url: 'singleproduct'
    },
    {
        imageUrl: 'login.jpg',
        title: 'Login',
        url: 'login'
    },
    {
        imageUrl: 'register.jpg',
        title: 'Register',
        url: 'register'
    },
    {
        imageUrl: 'forgot.jpg',
        title: 'Forgot',
        url: 'forgot'
    },
    {
        imageUrl: 'coming-soon.jpg',
        title: 'Coming Soon',
        url: 'comingsoon'
    },
    {
        imageUrl: '404.jpg',
        title: '404',
        url: 'notfound'
    },
    {
        imageUrl: 'help-box.jpg',
        title: 'Help',
        url: 'helpbox'
    },
    {
        imageUrl: 'd-17.jpg',
        title: 'Settings',
        url: 'defaultsettings'
    },
    {
        imageUrl: 'd-15.jpg',
        title: 'Contact',
        url: 'contactinformation'
    },
    {
        imageUrl: 'd-16.jpg',
        title: 'Account',
        url: 'accountinformation'
    },
    {
        imageUrl: 'd-19.jpg',
        title: 'Payment',
        url: 'payment'
    },
    {
        imageUrl: 'd-18.jpg',
        title: 'Password',
        url: 'password'
    },
    {
        imageUrl: 'd-20.jpg',
        title: 'Social',
        url: 'socialaccount'
    },

]


class Demo extends Component {
    render() {
        return (
            <div>

            <div className="header-wrapper demo-style">
                <div className="container max-container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6"><a href="/" className="logo"><i className="feather-zap text-success display2-size me-3 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </a></div>
                        <div className="col-lg-6 col-md-6 col-sm-6 d-none d-lg-block">
                            <ul className="list-inline text-center mb-0 mt-2 pt-1">
                                <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#feature">Features</a></li>
                                <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#demo">Demo</a></li>
                                <li className="list-inline-item pe-4 ps-4"><a className="scroll-tiger" href="#contact">Contact</a></li>
                            </ul>

                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 text-right">
                            <a href="/" className="btn btn-lg btn-primary text-uppercase">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-wrapper vh-100 bscover demo-style" 
            style={{backgroundImage: `url("assets/images/demo/banner-bg-1.png")`}}>
                <div className="banner-content">
                    <div className="container max-container">
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-8">

                                <h2 className="title-text mb-5 mt-5"><b>Set up your <span>Social</span> website with Sociala.</b></h2>
                                <h4 className="d-inline-block">40 <span>Demo <br /> Websites</span></h4>
                                <h4 className="d-inline-block">12 <span>Custom <br /> Widgets</span></h4>
                                <h4 className="d-inline-block">54 <span>Awesome <br /> Components</span></h4>
                                <h4 className="d-inline-block">18 <span>Others <br />Inner Pages</span></h4>
                                <div className="clearfix"></div>
                                <a href="#demo" className="btn btn-lg btn-primary mr-4 text-uppercase mt-5">See DEMOs</a>


                                <div className="icon-scroll pos-bottom-center icon-white"></div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="section pb100 pt50 demo-style" id="feature">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <img src="assets/images/demo/com-1.png" alt="com" className="img-fluid" />
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <h2 className="title-text2 mb-4 mt-5"><b>Awesome Components Ready Elements and Templates.</b></h2>				<p>Sociala powers thousands of apps at some of the smartest companies around the world. Be a part of professional community.</p>
                            <a href="#demo" className="btn btn-lg btn-primary mr-4 text-uppercase mt-4">Components</a>
                        </div>
                    </div>
                </div>
            </div>


                <div className="section demo-style" id="mobile">
                    <div className="container max-container">
                        <div className="col-lg-12 p-5 rounded-3 bscover" 
                        style={{backgroundImage: `url("assets/images/demo/mobile-banner-2.png")`}}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-5 mt-5 mb-5">
                                        <h2 className="title-text2 mb-4"><b>Mobile Optimize Design for any Device</b></h2>
                                        <p>With beautifully designed custom post types to show off your works and collections.Sociala powers thousands of apps at some of the smartest companies around the world. Be a part of professional community</p>
                                        <a href="/" className="btn btn-lg btn-primary mr-4 text-uppercase mt-4">See Demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section pb50 pt100 demo-style" id="demo">
                    <div className="container-fluid max-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-4 text-center">
                                <h2 className="title-text2 mb-4"><b>Choose Demo</b></h2>
                                <p className="mb-5">Create a really awesome website, choose the version that will suit your requirements in a best way.</p>
                            </div>
                            <div className="clearfix"></div>
                            
                        </div>
                        <div className="row">
                            <div className="col-sm-12 mt-5"></div>
                            
                            {newDemoList.map((value , index) => (
                                // Start Single Demo 
                                <div key={index} className="col-lg-4 col-md-6 demo-item">
                                    <a href={`/${value.url} `}>
                                        <img src={`assets/images/demo/${value.imageUrl}`} alt="demo-i" className="w-100" />
                                        <span>{value.title}</span>
                                    </a>
                                </div>          
                                
                                // End Single Demo
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p100 bg-black demo-style" id="contact">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h2 className="title-text2 text-white mt-4"><b>Beautiful designs to get you started</b></h2>
                                <p className="text-white ml-5 mr-5">Create a really awesome website, choose the version that will suit your requirements in a best way.</p>
                                <div className="col-sm-12 text-center mt-5"><a href="/" className="btn-lg btn bg-white">PURCHASE NOW</a></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Demo;