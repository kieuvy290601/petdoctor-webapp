import React from "react";
import { Col, Container, Row } from "reactstrap";

import "../styles/Subscribe.css";

const Subscribe = () => {
  return (
    <section className="subscribe" style={{ background: "var(--hero-bg)" }}>
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="subscribe_title" style={{ fontWeight: 700 }}>
              Subscribe{" "}
              <span style={{ color: "#5faf91", fontWeight: 700 }}>
                Our Newsletter
              </span>{" "}
              <br />& Get News Related Pet Care
            </h2>
          </Col>
          <Col>
            <section>
              <form
                class="form-inline d-flex"
                style={{ justifyContent: "center" }}
              >
                <div class="form-group" style={{ width: 400 }}>
                  <input
                    class="form-control"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                  />
                </div>
                <div class="form-group">
                  <button
                    type="button"
                    class="btn text-white btn-rounded"
                    style={{ backgroundColor: "#5faf91" }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Subscribe;
