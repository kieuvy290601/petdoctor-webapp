import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/Cart.css";

import momo from "../assets/images/momo.png";
import visa from "../assets/images/visa.png";
import zalo from "../assets/images/zalo.png";
import { useSelector } from "react-redux";

const Cart = () => {
  // TODO: Set show modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TODO: Set show payment options
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRadioClick = (event) => {
    setSelectedOption(event.target.value);
    setShowDropdown(true);
  };

  // TODO: Set show shipping method

  const [isShippingMethodsVisible, setIsShippingMethodsVisible] =
    useState(false);

  const toggleShippingMethodsVisibility = () => {
    setIsShippingMethodsVisible(!isShippingMethodsVisible);
  };

  // TODO: Set show payment method

  const [isPaymentMethodsVisible, setIsPayMethodsVisible] = useState(false);

  const togglePaymentMethodsVisibility = () => {
    setIsPayMethodsVisible(!isPaymentMethodsVisible);
  };


  // TODO: Set show totol quantity
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

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
            <div className="back" style={{ marginTop: 20 }}>
              <span>
                <i class="ri-arrow-left-line"></i>
              </span>
              <span class="text-muted px-2"> Back to shop</span>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header" style={{ fontSize: 20 }}>
              Delivery address
            </div>
            <div className="card-body">
              <div className="delivery">
                <p className="mb-2" style={{ color: "#6c757d" }}>
                  Name: Nguyễn Thị Kiều Vy
                  <br /> Phone number: (+84) 827758723
                  <br />
                  Address: Thôn Đại Tâm, Xã Gio Sơn, Huyện Gio Linh, Quảng Trị
                </p>
              </div>
              <Button className="deli" onClick={handleShow}>
                Change address
              </Button>
              <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>SHIPPING ADDRESS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="address">
                    <div className="col-md-12">
                      <p>Full name *</p>
                      <input
                        type="text"
                        className="border"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <p>Phone number *</p>
                      <input
                        type="phonenumber"
                        className="border"
                        placeholder="Enter your phone number"
                        style={{ width: 655 }}
                        required
                      />
                    </div>
                    <div className="city-address">
                      <div className="d-flex">
                        <div className="col-md-6">
                          <div className="city">
                            <p>City *</p>
                            <select>
                              <option class="text-muted">Select city</option>
                              <option class="text-muted">
                                Standard-Delivery- &#36;5.00
                              </option>
                              <option class="text-muted">
                                J&T Express- &#36;5.00
                              </option>
                              <option class="text-muted">
                                Giaohangtietkiem- &#36;5.00
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="district">
                            <p>District *</p>
                            <select>
                              <option class="text-muted">
                                Select district
                              </option>
                              <option class="text-muted">
                                Standard-Delivery- &#36;5.00
                              </option>
                              <option class="text-muted">
                                J&T Express- &#36;5.00
                              </option>
                              <option class="text-muted">
                                Giaohangtietkiem- &#36;5.00
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="city-address">
                      <div className="d-flex">
                        <div className="col-md-6">
                          <div className="communes">
                            <p>Communes *</p>
                            <select>
                              <option class="text-muted">
                                Select communes
                              </option>
                              <option class="text-muted">
                                Standard-Delivery- &#36;5.00
                              </option>
                              <option class="text-muted">
                                J&T Express- &#36;5.00
                              </option>
                              <option class="text-muted">
                                Giaohangtietkiem- &#36;5.00
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="postalcode">
                            <p>Postal code *</p>
                            <input
                              type="text"
                              className="border"
                              placeholder="Enter your postal code"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <p>Specific address (Street name & house number) *</p>
                      <input
                        type="phonenumber"
                        className="border"
                        placeholder="Enter your specific address"
                        style={{ width: 655 }}
                        required
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="mr-4">
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="success" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <br />
          <div className="card mb-4 mb-xl-0">
            <div className="card-header" style={{ fontSize: 20 }}>
              Summary
            </div>
            <div className="card-body">
              <div className="totalQuantity">
                <label>Total Quantity</label>
                <span className="price">{ totalQuantity} items</span>
              </div>
              <div className=" subtotal ">
                <label>Subtotal</label>
                <span className="price">${totalAmount}</span>
              </div>

              <div className="shipping">
                <div
                  className="d-flex"
                  onClick={toggleShippingMethodsVisibility}
                >
                  {" "}
                  {/* Add onClick event to the div containing the "Shipping Method" text */}
                  <label>Shipping Method</label>
                  <span>
                    <i class="ri-arrow-down-s-line"></i>
                  </span>
                </div>
                {isShippingMethodsVisible && (
                  <div>
                    <div className="border">
                      <div className="text">
                        <input
                          type="radio"
                          value="Freeship"
                          name="shipping"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <p>Free Shipping</p>
                        <div style={{ paddingLeft: 115 }}>&#36; 0</div>
                      </div>
                      <p className="desc">7-30 business days</p>
                    </div>
                    <div className="border">
                      <div className="text">
                        <input
                          type="radio"
                          value="Regular"
                          name="shipping"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <p>Regular Shipping</p>
                        <div style={{ paddingLeft: 75 }}>&#36; 6.75</div>
                      </div>
                      <p className="desc">3-14 business days</p>
                    </div>
                    <div className="border">
                      <div className="text">
                        <input
                          type="radio"
                          value="Express"
                          name="shipping"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <p>Express Shipping</p>
                        <div style={{ paddingLeft: 67 }}>&#36; 18.50</div>
                      </div>
                      <p className="desc">1-3 business days</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="payment">
                <div
                  className="d-flex"
                  onClick={togglePaymentMethodsVisibility}
                >
                  <label>Payment Method</label>
                  <span>
                    <i class="ri-arrow-down-s-line"></i>
                  </span>
                </div>
                {isPaymentMethodsVisible && (
                  <div>
                    <div className="border" style={{ display: "inline-block" }}>
                      <div style={{ display: "inline-flex" }}>
                        <input
                          type="radio"
                          value="Credit"
                          name="paymentOpt"
                          checked={selectedOption === "Credit"}
                          onClick={handleRadioClick}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Credit Card
                        <div style={{ paddingLeft: 96 }}>
                          <img src={visa} alt="" />
                        </div>
                      </div>

                      {/* <p>Credit Card</p> */}
                      {showDropdown && selectedOption === "Credit" && (
                        <div>
                          <hr />
                          <input
                            type="number"
                            className="detail"
                            placeholder="Card number"
                          />
                          <br />
                          <input
                            type="text"
                            className="detail"
                            placeholder="Name on card"
                          />
                          <br />
                          <input
                            type="text"
                            pattern="\d{2}/\d{2}"
                            className="detail"
                            placeholder="Experation date (MM/YY)"
                          />
                          <br />
                          <input className="detail" placeholder="CVV" />
                        </div>
                      )}
                    </div>
                    <div className="border" style={{ display: "inline-block" }}>
                      <div style={{ display: "inline-flex" }}>
                        <input
                          type="radio"
                          value="Zalopay"
                          name="paymentOpt"
                          checked={selectedOption === "Zalopay"}
                          onClick={handleRadioClick}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Zalo Pay
                        <div style={{ paddingLeft: 117 }}>
                          <img src={zalo} alt="" />
                        </div>
                      </div>
                      {/* <p>Credit Card</p> */}
                      {showDropdown && selectedOption === "Zalopay" && (
                        <div>
                          <hr />
                          <input
                            type="number"
                            className="detail"
                            placeholder="Card number"
                          />
                          <br />
                          <input
                            type="text"
                            className="detail"
                            placeholder="Name on card"
                          />
                          <br />
                          <input
                            type="text"
                            pattern="\d{2}/\d{2}"
                            className="detail"
                            placeholder="Experation date (MM/YY)"
                          />
                          <br />
                          <input className="detail" placeholder="CVV" />
                        </div>
                      )}
                    </div>
                    <div className="border" style={{ display: "inherit" }}>
                      <div style={{ display: "inline-flex" }}>
                        <input
                          type="radio"
                          value="Momo"
                          name="paymentOpt"
                          checked={selectedOption === "Momo"}
                          onClick={handleRadioClick}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Momo
                        <div style={{ paddingLeft: 136 }}>
                          <img src={momo} alt="" />
                        </div>
                      </div>
                      {/* <p>Credit Card</p> */}
                      {showDropdown && selectedOption === "Momo" && (
                        <div>
                          <hr />
                          <input
                            type="number"
                            className="detail"
                            placeholder="Card number"
                          />
                          <br />
                          <input
                            type="text"
                            className="detail"
                            placeholder="Name on card"
                          />
                          <br />
                          <input
                            type="text"
                            pattern="\d{2}/\d{2}"
                            className="detail"
                            placeholder="Experation date (MM/YY)"
                          />
                          <br />
                          <input className="detail" placeholder="CVV" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className=" grand-total ">
                <h6>Grand Total</h6>
                <span className="price">${ totalQuantity}</span>
              </div>
              <button className="checkout">Checkout Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
