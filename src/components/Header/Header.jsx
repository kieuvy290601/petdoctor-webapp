import { getAuth, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";

import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logoww.png";
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
    path: "dogshop",
    display: "Dog",
  },
  {
    path: "catshop",
    display: "Cat",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = useSelector((state) => state.auth.user);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logout successfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Something went wrong");
      });
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            {/* TODO: Logo web */}
            <div className="logo">
              <div>
                <Link to="/profile">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div>
                <h1>PETOPIA</h1>
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
              <span className="fav_icon" onClick={handleLogout}>
                <i class="ri-heart-3-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={avatar} alt="" />
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
