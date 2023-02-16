import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { Container, Row } from "reactstrap";
import logo from "../../assets/images/logoww.png";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <div>
                <Link to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div>
                <h1>PET DOCTOR</h1>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
