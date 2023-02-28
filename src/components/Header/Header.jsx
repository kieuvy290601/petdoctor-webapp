import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Row } from "reactstrap";

import logo from "../../assets/images/logoww.png";
import user from "../../assets/images/user-icon.png";
import "./Header.css";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "services",
    display: "Services",
  },
  {
    path: "medicare",
    display: "Medi-Care",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

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
            {/* TODO: Logo web */}
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

            {/* TODO: Nav_links */}
            <div className="navigaion">
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* TODO: Nav_icons  */}
            <div className="nav_icons">
              <span className="fav_icon">
                <i class="ri-heart-3-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart_icon">
                <i class="ri-shopping-cart-line"></i>
                <span className="badge">1</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={user} alt="" />
              </span>
              <div className="mobile_menu">
                <span>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
