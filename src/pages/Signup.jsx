import React, { useState } from "react";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

import { Link } from "react-router-dom";
import heroImg from "../assets/images/signup-img.png";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(false);

  const signup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
    } catch (error) {}
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
              <Form onSubmit={signup}>
                <h1>Sign Up</h1>

                <input
                  type="text"
                  placeholder="Username"
                  style={{ marginTop: 18 }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <button type="submit" className="button_signup">
                  Sign Up
                </button>

                <p>
                  Don't have an account? <Link to="/login"> Log In</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
