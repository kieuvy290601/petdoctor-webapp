import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";

import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logoww.png";
import { removeUserActive, setUserActive } from "../../redux/slices/authSlice";
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
  const photoURL = useSelector((state) => state.auth.photoURL);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [displayName, setDisplayName] = useState("");

  // Get currently logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const userName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(userName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          setUserActive({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
            userURL: user.photoURL,
          })
        );
      } else {
        setDisplayName("");
        dispatch(removeUserActive());
      }
    });
  }, [dispatch, displayName]);

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
              <span className="fav_icon">
                <i class="ri-heart-3-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <a href="#">Hi, {displayName}</a>
              <span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={photoURL || avatar}
                  alt=""
                />
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
