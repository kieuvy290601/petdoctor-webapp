import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

import heroImg from "../assets/images/signup-img.png";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("false");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    //setLoading(false);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(user);
      //setLoading(false);
      console.log("Successfully logged in");
      navigate("/home");
    } catch (error) {
      // setLoading(false);
      console.error(error.message);
    }
  };

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
              <Form onSubmit={login}>
                <h1 style={{ marginTop: 50 }}>Log In</h1>

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: 18 }}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="button_login">
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
