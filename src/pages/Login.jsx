import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";

import { doc, getDoc } from "firebase/firestore";
import heroImg from "../assets/images/loginImg.png";
import { setUserRole } from "../redux/slices/authSlice";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  // const [loading, setLoading] = useState("false");
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
      console.log("Successfully logged in");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.data().role;
      console.log(userRole);
      // if (userRole === "admin") {
      //   // setIsAdmin(true);
      //   // setUserRole("admin");
      //   console.log(userRole);
      // } else {
      //   // setIsAdmin(false);
      //   // setUserRole("user");

      //   console.log(userRole);
      // }

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
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "blue" }}>
                    {" "}
                    Sign Up
                  </Link>
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
