import React, { useState } from "react";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Loading from "../../components/Loading/Loading";

import { Link } from "react-router-dom";
import heroImg from "../.././assets/images/reset.png";
import "../../styles/Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState("false");

  const auth = getAuth();


  const resetPassword = (e) => { 
    e.preventDefault();
    setLoading(true);


    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your email to reset your password");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Email reset not found");
        setLoading(false);
      });
  }

  return (
    <Helmet title={"Signup"}>
      {isLoading === true && email  && <Loading />}{" "}
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="5" md="5" style={{ marginLeft: 95 }}>
              <Form onSubmit={resetPassword}>
                <h1 style={{ marginTop: 80 }}>Reset Password</h1>

                <input
                  type="email"
                  placeholder="Email address"
                  style={{ marginTop: 18 }}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    <div>
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
