import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import landImg from "../assets/images/homeImg.png";
import "../styles/Home.css";

import CustomerRates from "./CustomerRates";
import Services from "./Services";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="5" md="5">
              <div className="hero_content">
                <h2>We're Here to Care of </h2>
                <h2 style={{ color: "#006d77", fontSize: 75 }}>Little Pets</h2>
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
              <div className="hero_img" style={{ width: 729 }}>
                <img src={landImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
      <CustomerRates />
      <Subscribe />
    </Helmet>
  );
};

export default Home;
