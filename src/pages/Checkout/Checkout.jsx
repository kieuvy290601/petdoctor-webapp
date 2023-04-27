import React, { useState } from "react";

import "../../styles/Cart.css";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/Payment/CheckoutSummary";
import { saveShippingAddress } from "../../redux/slices/checkoutSlice";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  phone: "",
};

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getTotalAmount = () => {
  //   let shippingCost = 0;
  //   if (shippingOption === "Regular") {
  //     shippingCost = 6.75; // add $5 for standard shipping
  //   } else if (shippingOption === "Express") {
  //     shippingCost = 18.5; // add $10 for express shipping
  //   }
  //   const total = (totalAmount + shippingCost).toFixed(2); // round to 2 decimal places

  //   return total;
  //   // if (shippingOption === "Regular") {
  //   //   return totalAmount + 6.75; // add $5 for standard shipping
  //   // } else if (shippingOption === "Express") {
  //   //   return totalAmount + 18.5; // add $10 for express shipping
  //   // } else {
  //   //   return totalAmount; // no shipping selected
  //   // }
  // };

  // TODO: Set show shipping method

  // TODO: Set show payment method

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingAddress));
    navigate("/pay");
  };

  return (
    <div className="container-xl mt-4 mb-5">
      <div className="row">
        <div className="col-xl-6">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header d-flex" style={{ fontSize: 20 }}>
              <h5 className="pt-2">Shipping address</h5>
            </div>
            <form onSubmit={handleCheckout}>
              <div className="address">
                <div className="col-md-12">
                  <p>Full name *</p>
                  <input
                    type="text"
                    className="border"
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label>Address line 1</label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div className="col-md-12">
                  <label>Address line 2</label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div className="col-md-12">
                  <p>City *</p>
                  <input
                    type="text"
                    className="border"
                    placeholder="Enter your city name"
                    style={{ width: "100%" }}
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <p>District *</p>
                  <input
                    type="text"
                    className="border"
                    placeholder="Enter your district"
                    style={{ width: "100%" }}
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <p>Phone number *</p>
                  <input
                    type="phonenumber"
                    className="border"
                    placeholder="Enter your phone number"
                    style={{ width: "100%" }}
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>

                {/* <div className="col-md-12">
                  <p>Specific address (Street name & house number) *</p>
                  <input
                    type="text"
                    className="border"
                    placeholder="Enter your specific address"
                    style={{ width: "100%" }}
                    name="specificAddress"
                    value={shippingAddress.specificAddress}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div> */}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="checkout"
                type="submit"
              >
                Continute to Checkout &rarr;
              </motion.button>

              <Link to={`/cart`}>
                <button className="goback mt-3">Go back to Cart</button>
              </Link>
            </form>
          </div>
        </div>
        <div className="col-xl-6">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
