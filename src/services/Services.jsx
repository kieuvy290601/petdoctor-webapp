import { motion } from "framer-motion";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import serviceData from "../assets/data/serviceData";

import "../styles/Services.css";

const Services = () => {
  return (
    <section className="Services">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section_title" style={{ fontWeight: 700 }}>
              We World's
              {
                <span style={{ color: "#5faf91", fontWeight: 700 }}>
                  {" "}
                  Best Team{" "}
                </span>
              }{" "}
              For Pet Services
            </h2>
          </Col>
          {serviceData.map((item, index) => (
            <Col key={index}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="service_item"
                style={{ background: `${item.bg}` }}
              >
                <span>
                  <i class={item.icon}></i>
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
export default Services;
