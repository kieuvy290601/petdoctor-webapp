import React from "react";
import Helmet from "../components/Helmet/Helmet";

import "../styles/Cart.css";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import { cartActions, decreaseItemQuantity } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // TODO: Set show totol quantity
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount).toFixed(2);

  return (
    <Helmet title="Cart">
      <section>
        <Container>
          <Row>
            <Col lg="8">
              {cartItems.length === 0 ? (
                <h2 className="text-center">No product added</h2>
              ) : (
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
                          {item.prdName}
                        </td>

                        {/* <td>
                          <a href="#" className="p-3">
                            -
                          </a>
                          {item.quantity}
                          <a href="#" className="p-3">
                            +
                          </a>
                        </td> */}
                        <td className="pl-1">
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
                        {/* <td>
                          <motion.span whileTap={{ scale: 0.9 }}>
                            <i
                              className="ri-delete-bin-2-line"
                              style={{ color: "red" }}
                            ></i>
                          </motion.span>
                        </td> */}
                        <td className="pl-1">
                          <motion.span whileTap={{ scale: 0.9 }}>
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
              )}
            </Col>
            <Col lg="4">
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
                  <div className=" grand-total ">
                    <h6>Grand Total</h6>
                    <span className="price">${totalAmount}</span>{" "}
                  </div>

                  <Link to={`/checkout/`}>
                    <button className="checkout">Checkout Now</button>
                  </Link>

                  <Link to={`/dogshop/`}>
                    <button className="backtoshop my-2">Back to shop</button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
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
