import React from "react";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import heroImg from "../assets/images/signup-img.png";
import "../styles/Signup.css";

const Signup = () => {
  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="7" md="7">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="5" md="5">
              <Form>
                <h1>Sign Up</h1>

                <input
                  type="text"
                  placeholder="Username"
                  style={{ marginTop: 18 }}
                />

                <input type="email" placeholder="Email address" />

                <input type="password" placeholder="Password" />

                <input type="file" />

                <button type="submit" className="signupbtn">
                  Sign Up
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
