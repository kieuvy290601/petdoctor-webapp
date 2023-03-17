import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              {/* <img src={logo} alt="" /> */}
              <div>
                <h1 className="text-white">PETOPIA</h1>
              </div>
            </div>
            <p className="footer_text mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
              nobis. Molestias magni optio quam amet eum temporibus!
            </p>
          </Col>
          <Col lg="4" style={{ paddingLeft: 100 }}>
            <div className="footer_quick-links">
              <h4 className="quick-links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="4">
            <div className="footer_quick-links">
              <h4 className="quick-links-title">Contact</h4>
              <ListGroup className="footer_contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-2-fill"></i>
                  </span>
                  <p>638 Ngo Quyen, Son Tra, Vietnam</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-line"></i>
                  </span>
                  <p>+84827758723</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line"></i>
                  </span>
                  <p>vyntkgcd@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer_copyright">
              Copyright {year} developed by Vy Nguyen.{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
