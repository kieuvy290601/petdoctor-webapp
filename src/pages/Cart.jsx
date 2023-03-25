import React from "react";
import "../styles/Cart.css";

const Test = () => {
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
              Summary
            </div>
            <div className="card-body">
              <div className=" subtotal ">
                <label>Subtotal</label>
                <span className="price">$20</span>
              </div>

              <div className="shipping">
                <label>Shipping Method</label>
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
                {/* <select>
                  <option class="text-muted">
                    Standard-Delivery- &#36;5.00
                  </option>
                  <option class="text-muted">J&T Express- &#36;5.00</option>
                  <option class="text-muted">
                    Giaohangtietkiem- &#36;5.00
                  </option>
                </select> */}
              </div>

              <div className=" grand-total ">
                <h6>Grand Total</h6>
                <span className="price">$20</span>
              </div>
              <button className="checkout">Checkout Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
