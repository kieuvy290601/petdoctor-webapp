import React from "react";
import Helmet from "../components/Helmet/Helmet";

import "../styles/Cart.css";

import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import { cartActions, decreaseItemQuantity } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // TODO: Set show totol quantity
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [shippingOption, setShippingOption] = useState(null);

  const handleShippingOptionChange = (option) => {
    let shippingFee = 0;
    if (option === "Freeship") {
      shippingFee = 0;
    } else if (option === "Regular") {
      shippingFee = 6;
    } else if (option === "Express") {
      shippingFee = 18;
    }

    dispatch(cartActions.setShippingFee(shippingFee));
    setShippingOption(option);
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <Helmet title="Cart">
      <section>
        <Container>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 className="text-center">No product added</h2>
              <Link to={"/dogshop"}>
                <button
                  className="btn text-center mt-3 px-4"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  }}
                >
                  &larr; Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <Row>
              <Col lg="7">
                <div>
                  <Table bordered hover>
                    <thead className="thead">
                      <tr>
                        <th style={{ width: 200 }}>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody className="tbody">
                      {cartItems.map((item, index) => (
                        <tr key={item.prdId}>
                          <td className="pl-1">
                            <img
                              src={item.prdURL}
                              alt=""
                              style={{ width: "35%" }}
                            />
                          </td>
                          <td className="pl-1" style={{ width: "33%" }}>
                            <Link to={`/productdetail/${item.prdId}`}>
                              {item.prdName}
                            </Link>
                          </td>
                          <td style={{ paddingLeft: 0 }}>
                            <button
                              className="px-2 mx-2"
                              style={{
                                border: "none",
                                backgroundColor: "#f0f0f0",
                                borderRadius: 5,
                              }}
                              onClick={() =>
                                dispatch(decreaseItemQuantity(item.prdId))
                              }
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "#f0f0f0",
                                borderRadius: 5,
                              }}
                              className="px-2 mx-2"
                              onClick={() =>
                                dispatch(cartActions.addItemtoCart(item))
                              }
                            >
                              +
                            </button>
                          </td>
                          <td className="pl-1">
                            {(item.prdPrice * item.quantity).toFixed(2)}
                          </td>
                          <td className="pl-1">
                            <motion.span whileTap={{ scale: 1.2 }}>
                              <i
                                className="ri-delete-bin-2-line"
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() =>
                                  dispatch(
                                    cartActions.removeItemFromCart(item.prdId)
                                  )
                                }
                              ></i>
                            </motion.span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <button className="btn btn-danger" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                </div>
              </Col>
              <Col lg="5">
                <div className="card mb-4 mb-xl-0">
                  {" "}
                  <div className="card-header" style={{ fontSize: 20 }}>
                    Summary
                  </div>
                  <div className="card-body">
                    <div className="totalQuantity">
                      <label>Total Quantity</label>
                      <span className="price">{totalQuantity} items</span>
                    </div>
                    <div className="shipping">
                      <div className="d-flex">
                        <label>Shipping Method</label>
                        <span>
                          <i class="ri-arrow-down-s-line"></i>
                        </span>
                      </div>
                      <div>
                        <div className="border" style={{ width: "100%" }}>
                          <div className="text">
                            <input
                              type="radio"
                              value="Freeship"
                              checked={shippingOption === "Freeship"}
                              onChange={() =>
                                handleShippingOptionChange("Freeship")
                              }
                              name="shipping"
                              style={{ marginRight: "10px" }}
                              required
                            />
                            <p>Free Shipping</p>
                            <div style={{ paddingLeft: 212 }}>&#36; 0</div>
                          </div>
                          <p className="desc">7-30 business days</p>
                        </div>
                        <div className="border" style={{ width: "100%" }}>
                          <div className="text">
                            <input
                              type="radio"
                              value="Regular"
                              checked={shippingOption === "Regular"}
                              onChange={() =>
                                handleShippingOptionChange("Regular")
                              }
                              name="shipping"
                              style={{ marginRight: "10px" }}
                              required
                            />
                            <p>Regular Shipping</p>
                            <div style={{ paddingLeft: 172 }}>&#36; 6.75</div>
                          </div>
                          <p className="desc">3-14 business days</p>
                        </div>
                        <div className="border" style={{ width: "100%" }}>
                          <div className="text">
                            <input
                              type="radio"
                              value="Express"
                              checked={shippingOption === "Express"}
                              onChange={() =>
                                handleShippingOptionChange("Express")
                              }
                              name="shipping"
                              style={{ marginRight: "10px" }}
                              required
                            />
                            <p>Express Shipping</p>
                            <div style={{ paddingLeft: 165 }}>&#36; 18.50</div>
                          </div>
                          <p className="desc">1-3 business days</p>
                        </div>
                      </div>
                    </div>
                    <div className=" grand-total ">
                      <h6>Grand Total</h6>
                      <span className="price">${totalAmount}</span>{" "}
                    </div>

                    <Link to={`/checkout/`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="checkout"
                      >
                        Checkout Now
                      </motion.button>
                    </Link>

                    <Link to={`/dogshop/`}>
                      <button className="backtoshop my-2">Back to shop</button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/* <Link to={`/dogshop`}>
        {" "}
        <div className="back" style={{ marginTop: 20 }}>
          {" "}
          <span>
            <i class="ri-arrow-left-line"></i>{" "}
          </span>
          <span class="text-muted px-2"> Back to shop</span>{" "}
        </div>{" "}
      </Link> */}
    </Helmet>
  );
};

export default Cart;
