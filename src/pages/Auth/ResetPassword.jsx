import React from "react";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";

import { Link } from "react-router-dom";
import heroImg from "../.././assets/images/reset.png";
import "../../styles/Login.css";

const Login = () => {
  return (
    <Helmet title={"Signup"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="5" md="5" style={{ marginLeft: 95 }}>
              <Form>
                <h1 style={{ marginTop: 80 }}>Reset Password</h1>

                <input
                  type="email"
                  placeholder="Email address"
                  style={{ marginTop: 18 }}
                  required
                />
                <button
                  type="submit"
                  className="button_login"
                  style={{ margin: "10px 0px" }}
                >
                  Send email
                </button>
                <div className="">
                  <Link to={`/login`}>
                    <div >
                      <i class="ri-arrow-left-line"></i>
                      <span class="text-muted px-2"> Go back</span>
                    </div>
                  </Link>
                </div>
              </Form>
            </Col>
            <Col lg="6" md="7">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
