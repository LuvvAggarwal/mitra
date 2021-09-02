import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Cart extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active bg-white">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" >
                            <div className="row">
                                <div className="col-xl-12 cart-wrapper mb-4">
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                                                <div className="bg-pattern-div"></div>
                                                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">Cart <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">4 PRODUCT FOUND</span></h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-8 mb-3">
                                            <div className="table-content table-responsive">
                                                <table className="table text-center">
                                                    <thead className="bg-greyblue rounded-3">
                                                        <tr>
                                                            <th className="border-0 p-4">&nbsp;</th>
                                                            <th className="border-0 p-4 text-left">Product</th>
                                                            <th className="border-0 p-4">Price</th>
                                                            <th className="border-0 p-4">Quantity</th>
                                                            <th className="border-0 p-4">Total</th>
                                                            <th className="border-0 p-4">&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="product-thumbnail text-left ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="product-headline text-left wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss">Super skinny blazer</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-1" placeholder="1" min="1" /> 
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">$ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="product-remove text-right"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="product-thumbnail text-left ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="product-headline text-left wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss"> Jogging trousers</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-2" placeholder="1" min="1" />
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">$ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="product-remove text-right"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="product-thumbnail text-left ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="product-headline text-left wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss"> Grey blue leather backpack</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-3" placeholder="1" min="1" />
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">$ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="product-remove text-right"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="coupon float-left mb-2">
                                                <input type="text" className="input-code form-control h60 p-3" placeholder="Coupon Code.." />
                                                <a href="/cart" className="bg-dark text-white fw-600 text-uppercase font-xssss border-dark border rounded-3 border-size-md d-inline-block w175 p-3 text-center ls-3">Apply Coupon</a>
                                            </div>
                                            <a href="/cart" className="update-cart bg-dark float-right text-white fw-600 text-uppercase font-xssss border-dark border rounded-3 border-size-md d-inline-block w175 p-3 text-center ls-3">Update Cart</a>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="checkout-payment card border-0 mb-3 bg-greyblue p-4">
                                                <div className="cart-totals">
                                                    <h4 className="mont-font fw-600 font-md mb-5">Cart totals</h4>
                                                    <div className="table-content table-responsive">
                                                        <table className="table order-table">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="font-xsss pt-2 fw-600">Subtotal</td>
                                                                    <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">$196.00</td>  
                                                                </tr>
                                                                <tr>
                                                                    <td className="font-xsss pt-2 fw-600">Shipping</td>
                                                                    <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">
                                                                        <span>Flat rate: $20.00</span>
                                                                    </td>  
                                                                </tr>
                                                                <tr className="order-total">
                                                                    <td className="font-xsss pt-2 fw-600">Total</td>
                                                                    <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">
                                                                        <span className="product-price-wrapper">
                                                                            <span className="money fmont">$226.00</span>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <a href="/cart" className="bg-dark float-right text-white fw-600 text-uppercase font-xsss border-dark border rounded-3 border-size-md d-inline-block w-100 p-3 text-center ls-3">Proceed To Checkout</a>
                                        </div>
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

export default Cart;