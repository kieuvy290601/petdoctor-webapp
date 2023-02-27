import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";

import logo from "../../assets/images/logoww.png";
import "./Header.css";

const Header = () => {
  const headerRef = useRef(null);
  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeader();
    return () => window.removeEventListener("scroll", stickyHeader);
  });

  return (
    <header className="header" ref={headerRef}>
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
