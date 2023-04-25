import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../assets/images/splashImg.png";
import Helmet from "../components/Helmet/Helmet";
import AfterLoggedIn, { AfterLoggedOut } from "../route/AuthenRoute";
import "../styles/Splash.css";
import Home from "./Home";

const Splash = () => {
  return (
    <Helmet title={"Home"}>
      <AfterLoggedIn>
        <Home />
      </AfterLoggedIn>
      <AfterLoggedOut>
        <section className="hero_section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero_content">
                  <h2>WE CARE FOR YOUR PET</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                    pariatur ut commodi error asperiores natus sequi, facere
                    quae quia dolorum itaque!
                  </p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="signup_btn"
                  >
                    <Link to="/signup">SIGNUP NOW</Link>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="login_btn"
                  >
                    <Link to="/login">Login</Link>
                  </motion.button>
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="hero_img">
                  <img src={heroImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </AfterLoggedOut>
    </Helmet>
  );
};

export default Splash;
