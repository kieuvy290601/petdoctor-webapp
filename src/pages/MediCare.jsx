import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductsList from "../components/UI/ProductsList";

const Medicare = () => {
  return (
    <section className="all_products">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section_title">All Products</h2>
          </Col>
          <ProductsList />
        </Row>
      </Container>
      <div></div>
    </section>
  );
};

export default Medicare;
