import React from "react";
import { Col, Container, Row } from "reactstrap";

import "./CustomerRate.css";

const CustomerRates = () => {
  return (
    <section className="customer_review">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section_title" style={{ fontWeight: 700 }}>
              Customer Reviews
            </h2>
          </Col>
          <Col>
            <section>
              <div class="row text-center d-flex align-items-stretch">
                <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                  <div class="card testimonial-card">
                    <div
                      class="card-up"
                      style={{ backgroundColor: "#c098be" }}
                    ></div>
                    <div class="avatar mx-auto bg-white">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                        class="rounded-circle img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <h4 class="mb-4">Maria Smantha</h4>
                      <hr />
                      <p class="dark-grey-text mt-4">
                        <i class="fas fa-quote-left pe-2"></i>Lorem ipsum dolor
                        sit amet eos adipisci, consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                  <div class="card testimonial-card">
                    <div
                      class="card-up"
                      style={{ backgroundColor: "#939ac4" }}
                    ></div>
                    <div class="avatar mx-auto bg-white">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                        class="rounded-circle img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <h4 class="mb-4">Lisa Cudrow</h4>
                      <hr />
                      <p class="dark-grey-text mt-4">
                        <i class="fas fa-quote-left pe-2"></i>Neque cupiditate
                        assumenda in maiores repudi mollitia architecto.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-0 d-flex align-items-stretch">
                  <div class="card testimonial-card">
                    <div
                      class="card-up"
                      style={{ backgroundColor: "#a191c7" }}
                    ></div>
                    <div class="avatar mx-auto bg-white">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                        class="rounded-circle img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <h4 class="mb-4">John Smith</h4>
                      <hr />
                      <p class="dark-grey-text mt-4">
                        <i class="fas fa-quote-left pe-2"></i>Delectus impedit
                        saepe officiis ab aliquam repellat rem unde ducimus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomerRates;
