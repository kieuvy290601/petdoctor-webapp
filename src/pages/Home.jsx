import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import landImg from "../assets/images/homepage-landing.png";
import "../styles/Home.css";

import CustomerRates from "../components/Customer Rate/CustomerRates";
import Services from "../services/Services";

const Home = () => {
  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="5" md="5">
              <div className="hero_content">
                <h2>Your Pet care center</h2>
                <p>
                  Before you bring home your pet, be sure you're <br />
                  ready to take care of it properly.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="signup_btn">
                  <Link to="/signup">Get started </Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="7" md="8">
              <div className="hero_img" style={{ width: 750 }}>
                <img src={landImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
      <CustomerRates />
    </Helmet>
  );
};

export default Home;
