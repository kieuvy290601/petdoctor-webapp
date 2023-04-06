import React from "react";
import { Link } from "react-router-dom";

import "../styles/Cart.css";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)


  // TODO: Set show totol quantity
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className="container-xl mt-4 mb-5">
      <div className="row">
        <div className="col-xl-8">
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            <div className="card-header d-flex ">
              <h4>Shopping Cart</h4>
              <span>
                <i class="ri-delete-bin-6-line"></i>
              </span>
            </div>
            <div className="card-body">
              
              <div className="row  border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      alt=""
                      className="img-fluid"
                      src="https://i.imgur.com/1GrakTl.jpg"
                    />
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    &#36; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      alt=""
                      className="img-fluid"
                      src="https://i.imgur.com/ba3tvGm.jpg"
                    />
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    &#36; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
              <div className="row border-top">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      alt=""
                      className="img-fluid"
                      src="https://i.imgur.com/pHQ3xT3.jpg"
                    />
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    &#36; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/dogshop`}>
              <div className="back" style={{ marginTop: 20 }}>
                <span>
                  <i class="ri-arrow-left-line"></i>
                </span>
                <span class="text-muted px-2"> Back to shop</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header" style={{ fontSize: 20 }}>
              Summary
            </div>
            <div className="card-body">
              <div className="totalQuantity">
                <label>Total Quantity</label>
                <span className="price">{totalQuantity} items</span>
              </div>

              <div className=" grand-total ">
                <h6>Grand Total</h6>
                <span className="price">${totalAmount}</span>
              </div>
              <Link to={`/checkout/`}>
                <button className="checkout">Checkout Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
