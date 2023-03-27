import React, { useState } from "react";
import "../styles/Checkout.css";

import visa from "../assets/images/visa.png";
import momo from '../assets/images/momo.png';
import zalo from '../assets/images/zalo.png';

const Test = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRadioClick = (event) => {
    setSelectedOption(event.target.value);
    setShowDropdown(true);
  };

  return (
    <div className="container-xl mt-4 mb-5 px-5">
      <div className="row">
        <div className="col-xl-7">
          <div className="card mb-4 mb-xl-0">
            <div className="address">
              <label>SHIPPING ADDRESS</label>
              <div className="col-md-11">
                <p>Full name *</p>
                <input
                  type="text"
                  className="border"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="d-flex">
                <div className="col-md-4">
                  <p>Email address *</p>
                  <input
                    type="email"
                    className="border"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <p>Confirm email address *</p>
                  <input
                    type="email"
                    className="border"
                    placeholder="Enter confirmation email"
                    required
                  />
                </div>
              </div>
              <div className="col-md-11">
                <p>Phone number *</p>
                <input
                  type="phonenumber"
                  className="border"
                  placeholder="Enter your phone number"
                  style={{ width: 510 }}
                  required
                />
              </div>
              <div className="city-address">
                <div className="d-flex justify-content-between">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <div className="district">
                      <p>District *</p>
                      <select>
                        <option class="text-muted">Select district</option>
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
                <div className="d-flex justify-content-between">
                  <div className="col-md-4">
                    <div className="communes">
                      <p>Communes *</p>
                      <select>
                        <option class="text-muted">Select communes</option>
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
                  <div className="col-md-4">
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

              <div className="col-md-11">
                <p>Specific address (Street name & house number) *</p>
                <input
                  type="phonenumber"
                  className="border"
                  placeholder="Enter your specific address"
                  style={{ width: 510 }}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div className="card mb-4 mb-xl-0">
            <div className="payment">
              <label>PAYMENT METHOD</label>
            </div>

            <div className="border" style={{ display: "inherit" }}>
              <input
                type="radio"
                value="Credit"
                name="paymentOpt"
                checked={selectedOption === "Credit"}
                onClick={handleRadioClick}
                style={{ marginRight: "10px" }}
              />{" "}
              Credit Card
              <div style={{ paddingLeft: 165 }}>
                <img src={visa} alt="" />
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
            <div className="border" style={{ display: "inherit" }}>
              <input
                type="radio"
                value="Zalopay"
                name="paymentOpt"
                checked={selectedOption === "Zalopay"}
                onClick={handleRadioClick}
                style={{ marginRight: "10px" }}
              />{" "}
              Zalo Pay
              <div style={{ paddingLeft: 184 }}>
                <img src={zalo} alt="" />
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
              <input
                type="radio"
                value="Momo"
                name="paymentOpt"
                checked={selectedOption === "Momo"}
                onClick={handleRadioClick}
                style={{ marginRight: "10px" }}
              />{" "}
              Momo
              <div style={{ paddingLeft: 202 }}>
                <img src={momo} alt="" />
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

            {/* <div className="card-body">
              <div className=" subtotal ">
                <label>Subtotal</label>
                <span className="price">$20</span>
              </div>

              <div className="shipping">
                <label>Shipping</label>
                <select>
                  <option class="text-muted">
                    Standard-Delivery- &#36;5.00
                  </option>
                  <option class="text-muted">J&T Express- &#36;5.00</option>
                  <option class="text-muted">
                    Giaohangtietkiem- &#36;5.00
                  </option>
                </select>
              </div>
              <div className=" grand-total ">
                <h6>Grand Total</h6>
                <span className="price">$20</span>
              </div>
              <button className="checkout">Checkout Now</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
