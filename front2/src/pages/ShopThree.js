import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

const productList = [
    {
        imageUrl: 'product.png',
        name: 'Textured Sleeveless Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Adjustable Shoulder Straps',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Neck Strappy Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Scoop-Neck Strappy',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Butler Stool Ladder',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Textured Sleeveless Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Adjustable Shoulder Straps',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Neck Strappy Camisole',
        price:'449'
    },
    {
        imageUrl: 'product.png',
        name: 'Scoop-Neck Strappy',
        price:'449'
    },
]



class ShoThree extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-white right-chat-active">
            
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                                                <div className="bg-pattern-div"></div>
                                                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">Shop <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">32 PRODUCT FOUND</span></h2>
                                            </div>
                                        </div>

                                    
                                        <div className="col-lg-12 mt-3">
                                            <h4 className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1">32 Product found</h4>
                                            <select className="searchCat float-right sort"> <option value="">Default Sorting</option><option value="151781441596 ">Fashion</option><option value="139119624252 ">- Men</option><option value="139118313532 ">- Women</option><option value="139360141372 ">Electronics</option><option value="152401903676 ">Home &amp; Garden</option><option value="138866720828 ">- Decor</option><option value="138866917436 ">- Lighting</option></select>
                                        </div>

                                        {productList.map((value , index) => (

                                        <div key={index} className="col-lg-4 col-md-6" >
                                            <div className="card w-100 border-0 mt-4">
                                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                                    <a href="/singleproduct"><img src={`assets/images/${value.imageUrl}`} alt="product" className="w-100 mt-0 mb-0 p-5" /></a>
                                                </div>
                                                <div className="card-body w-100 p-0 text-center">
                                                    <h2 className="mt-2 mb-1"><a href="/singleproduct" className="text-black fw-700 font-xsss lh-26">{value.name}</a></h2>
                                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">${value.price}</h6>
                                                </div>                                
                                            </div>
                                        </div>

                                        ))}

                                        
                                        <div className="col-lg-12 mt-3 mb-5 text-center"><a href="/shop3" className="fw-700 text-white font-xssss text-uppercase ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bg-current w150">Load More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>            
                </div>
                <Popupchat />
                <Appfooter /> 
            </Fragment>
        );
    }
}

export default ShoThree;