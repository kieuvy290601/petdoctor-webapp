import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import Loading from "../../components/Loading/Loading";

import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth } from "../../firebase.config";
import { db } from "../../firebase.config.js";

import { toast } from "react-toastify";
import heroImg from "../.././assets/images/loginImg.png";
import "../../styles/Signup.css";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValidEmail = (email) => {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    };

    // Check if the email is valid
    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      setLoading(false);
      return;
    }

    // Check if the email already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      toast.error("Email already exists");
      setLoading(false);
      return;
    }

    // Check if the password not have equal or moren than 6 characters
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      const user = userCredential.user;

      let role = "user";
      if (email === "admin@gmail.com") {
        // set admin role if email is admin email
        role = "admin";
      }
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
        role: role,
        createAt: Timestamp.now().toDate(),
      });

      //setLoading(true);
      console.log("Account created");
      toast.success("Account created");
      navigate("/home");
    } catch (error) {
      //setLoading(false);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Helmet title={"Signup"}>
      {isLoading && <Loading />}
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
                  required
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="button_signup">
                  Sign Up
                </button>

                <p>
                  Don't have an account?{" "}
                  <Link to="/login" style={{ color: "blue" }}>
                    {" "}
                    Log In
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

export default Signup;
