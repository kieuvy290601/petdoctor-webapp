import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../../styles/Checkout.css";

const CheckoutSummary = () => {
  const [shippingOption, setShippingOption] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingFee = useSelector((state) => state.cart.shippingFee);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const displayedCartItems = showAllItems ? cartItems : cartItems.slice(0, 2);

  const handleShowAllItems = () => {
    setShowAllItems(true);
  };

  const handleShowLessItems = () => {
    setShowAllItems(false);
  };

  return (
    <div>
      {/* <!-- Profile picture card--> */}
      <div className="card  mb-4 mb-xl-0">
        <div className="card-header" style={{ fontSize: 20 }}>
          Checkout Summary
        </div>
        <div className="card-body">
          <div className="totalQuantity">
            <label>Total Quantity</label>
            <span className="price">{totalQuantity} items</span>
          </div>
          <div className="totalQuantity">
            <label>Shipping Method</label>
            <span className="price">${shippingFee}</span>
          </div>

          <div>
            {cartItems.lenght === 0 ? (
              <>
                <p>No item in your cart.</p>
                <button className="--btn">
                  <Link to="/#products">Back To Shop</Link>
                </button>
              </>
            ) : (
              <div>
                {displayedCartItems.map((item, index) => {
                  const { prdId, prdName, prdPrice, quantity, prdURL } = item;
                  return (
                    <div
                      className="card mb-2"
                      key={prdId}
                      style={{
                        border: "1px solid var(--primary-color)",
                        padding: 10,
                      }}
                    >
                      <div className="d-flex">
                        <img
                          src={prdURL}
                          alt=""
                          style={{ width: "20%", margin: "0% 5%" }}
                        />

                        <div className="mt-2">
                          <Link to={`/productdetail/${prdId}`}>
                            <h6 style={{ fontWeight: "bold" }}>{prdName}</h6>
                          </Link>
                          <p>Quantity: {quantity}</p>
                          <p>Unit price: ${prdPrice}</p>
                          <p>Set price: ${prdPrice * quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!showAllItems && cartItems.length > 2 && (
                  <button className="--btn" onClick={handleShowAllItems}>
                    Show more
                  </button>
                )}
                {showAllItems && (
                  <button className="--btn" onClick={handleShowLessItems}>
                    Show less
                  </button>
                )}
              </div>
            )}
          </div>
          <hr />

          <div className=" grand-total ">
            <h6>Grand Total</h6>
            <span className="price">${totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
