import React from "react";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import heroImg from "../assets/images/signup-img.png";

import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  return (
    <Helmet title={"Signup"}>
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
                <h1 style={{ marginTop: 50 }}>Log In</h1>

                <input
                  type="email"
                  placeholder="Email address"
                  style={{ marginTop: 18 }}
                />

                <input type="password" placeholder="Password" />

                <button type="submit" className="login_btn">
                  Log In
                </button>

                <p>
                  Don't have an account? <Link to="/signup"> SignUp</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
