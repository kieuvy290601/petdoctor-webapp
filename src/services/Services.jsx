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
