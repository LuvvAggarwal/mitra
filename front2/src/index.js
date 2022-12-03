/*
लोकाभिरामं रणरंगधीरं राजीवनेत्रं रघुवंशनाथं ।
कारुण्यरूपं करुणाकरं तं श्रीरामचन्द्रं शरणं प्रपद्ये ॥32॥

मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम ।
वातात्मजं वानरयूथमुख्यं श्रीराम दूतं शरणं प्रपद्ये ॥33॥

|| श्री सीतारामचंद्र प्रीतिअर्थे समर्पणं अस्तु ||
|| श्री सीतारामचंद्र अर्पणम अस्तु ||
*/

// React Required
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { UserContextProvider } from './context/UserContext';
// Create Import File
import './main.scss';

// Common Layout
import Info from './info/info';
import Home from './pages/Home';

import Badge from './pages/Badge';
import Group from './pages/Groups';
import User from './pages/Users';
import Counsaler from './pages/Counsaler';
import NGO from './pages/NGO';
import Search  from './pages/Search';
import Storie from './pages/Storie';
import Member from './pages/Member';
import Email from './pages/Email';
import Emailopen from './pages/Emailopen';
import Settings from './pages/Settings';
import UpdateProfile from './pages/UpdateProfile';
import Contactinfo from './pages/Contactinfo';
import Socialaccount from './pages/Socialaccount';
import Password from './pages/Password';
import Payment from './pages/Payment';
import Notification from './pages/Notification';
import Helpbox from './pages/Helpbox';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Notfound from './pages/Notfound';
// import CreateGroup from './pages/CreateGroup';
import ShopOne from './pages/ShopOne';
import ShopTwo from './pages/ShopTwo';
import ShopThree from './pages/ShopThree';
import Singleproduct from './pages/Singleproduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Chat from './pages/Chat';
import Live from './pages/Live';
import Job from './pages/Job';
import Event from './pages/Event';
import Hotel from './pages/Hotel';
import Popular from './pages/Popular';
import Comingsoon from './pages/Comingsoon';


import Grouppage from './pages/Grouppage';
import Userpage from './pages/Userpage';
import Authorpage from './pages/Authorpage';
import Hotelsingle from './pages/Hotelsingle';
import Analytics from './pages/Analytics';
import Verify from './pages/Verify';
import AuthenticateGoogle from './pages/AuthenticateGoogle';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CreateGroup from './pages/CreateGroup';
import Booking from './pages/Booking';

// const app_config = require("./config/app_config")

const Root = () => {

    return (
        <UserContextProvider>
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Info} />
                    <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
                    {/* <Route path={`${process.env.PUBLIC_URL}/verify/:id`}><Verify/></Route> */}
                    <Route exact path={`${process.env.PUBLIC_URL}/verify/:id`} component={Verify} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultbadge`} component={Badge} />
                    <Route exact path={`${process.env.PUBLIC_URL}/groups`} component={Group} />
                    <Route exact path={`${process.env.PUBLIC_URL}/createGroup`} component={CreateGroup} />
                    <Route exact path={`${process.env.PUBLIC_URL}/users`} component={User} />
                    <Route exact path={`${process.env.PUBLIC_URL}/counsalers`} component={Counsaler} />
                    <Route exact path={`${process.env.PUBLIC_URL}/ngos`} component={NGO} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultstorie`} component={Storie} />
                    <Route exact path={`${process.env.PUBLIC_URL}/notifications`} component={Notification} />
                    <Route exact path={`${process.env.PUBLIC_URL}/groupProfile/:id`} component={Grouppage} />
                    <Route exact path={`${process.env.PUBLIC_URL}/userProfile/:id`} component={Userpage} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultemailopen`} component={Emailopen} />
                    <Route exact path={`${process.env.PUBLIC_URL}/setting`} component={Settings} />
                    <Route exact path={`${process.env.PUBLIC_URL}/popular`} component={Popular} />
                    <Route exact path={`${process.env.PUBLIC_URL}/booking/id=:id`} component={Booking} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultanalytics`} component={Analytics} />

                    <Route exact path={`${process.env.PUBLIC_URL}/search/:q`} component={Search} />
                    <Route exact path={`${process.env.PUBLIC_URL}/updateProfile`} component={UpdateProfile} />

                    <Route exact path={`${process.env.PUBLIC_URL}/defaultmember`} component={Member} />
                    <Route exact path={`${process.env.PUBLIC_URL}/contactinformation`} component={Contactinfo} />
                    <Route exact path={`${process.env.PUBLIC_URL}/authenticate/google`} component={AuthenticateGoogle}/>
                    <Route exact path={`${process.env.PUBLIC_URL}/socialaccount`} component={Socialaccount} />
                    <Route exact path={`${process.env.PUBLIC_URL}/password`} component={Password} />
                    <Route exact path={`${process.env.PUBLIC_URL}/payment`} component={Payment} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultnotification`} component={Notification} />
                    <Route exact path={`${process.env.PUBLIC_URL}/helpbox`} component={Helpbox} />
                    <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                    <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register} />
                    <Route exact path={`${process.env.PUBLIC_URL}/forgot`} component={Forgot} />
                    <Route exact path={`${process.env.PUBLIC_URL}/notfound`} component={Notfound} />

                    <Route exact path={`${process.env.PUBLIC_URL}/shop1`} component={ShopOne} />
                    <Route exact path={`${process.env.PUBLIC_URL}/shop2`} component={ShopTwo} />
                    <Route exact path={`${process.env.PUBLIC_URL}/shop3`} component={ShopThree} />
                    <Route exact path={`${process.env.PUBLIC_URL}/singleproduct`} component={Singleproduct} />
                    <Route exact path={`${process.env.PUBLIC_URL}/cart`} component={Cart} />
                    <Route exact path={`${process.env.PUBLIC_URL}/checkout`} component={Checkout} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultmessage`} component={Chat} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultlive`} component={Live} />

                    <Route exact path={`${process.env.PUBLIC_URL}/defaultjob`} component={Job} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaultevent`} component={Event} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaulthotel`} component={Hotel} />

                    <Route exact path={`${process.env.PUBLIC_URL}/authorpage`} component={Authorpage} />
                    <Route exact path={`${process.env.PUBLIC_URL}/comingsoon`} component={Comingsoon} />
                    <Route exact path={`${process.env.PUBLIC_URL}/defaulthoteldetails`} component={Hotelsingle} />

                </Switch>
            </BrowserRouter>
        </UserContextProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();