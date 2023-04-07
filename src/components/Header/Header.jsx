import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";

import logo from "../../assets/images/logoww.png";
import { removeUserActive, selectIsLoggedIn, setUserActive } from "../../redux/slices/authSlice";
import AfterLoggedIn, { AfterLoggedOut } from "../HiddenNavBar/HiddenNav";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = useSelector((state) => state.auth.user);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");

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

  // Get currently logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // const uid = user.uid;
        console.log(user.displayName);
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
  }, []);

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
              {/* <ul className="menu">
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
              </ul> */}
              <ul className="menu">
                <NavLink
                  to="/home"
                  className={(navClass) =>
                    navClass.isActive ? "nav_active" : ""
                  }
                >
                  {" "}
                  Home
                </NavLink>

                <NavLink
                  className={(navClass) =>
                    navClass.isActive ? "nav_active" : ""
                  }
                  to="/services"
                >
                  {" "}
                  Services
                </NavLink>
                <NavLink
                  className={(navClass) =>
                    navClass.isActive ? "nav_active" : ""
                  }
                  to="/dogshop"
                >
                  {" "}
                  Dog
                </NavLink>
                <NavLink
                  className={(navClass) =>
                    navClass.isActive ? "nav_active" : ""
                  }
                  to="/catshop"
                >
                  {" "}
                  Cat
                </NavLink>

                <AfterLoggedIn>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav_active" : ""
                    }
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </AfterLoggedIn>
                
              </ul>
            </div>

            {/* TODO: Nav_icons  */}
            <AfterLoggedIn>
              <div className="nav_icons">
                <span className="fav_icon" onClick={handleLogout}>
                  <i class="ri-heart-3-line"></i>
                  <span className="badge">1</span>
                </span>
                <span className="cart_icon" onClick={navigateToCart}>
                  <i class="ri-shopping-cart-line"></i>
                  <span className="badge"></span>
                </span>
                <a href="/profile">Hi, {displayName}</a>
                <div className="mobile_menu">
                  <span>
                    <i class="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </AfterLoggedIn>
            <AfterLoggedOut>
              <NavLink
                className={(navClass) =>
                  navClass.isActive ? "nav_active" : ""
                }
                to="/login"
              >
                {" "}
                Login
              </NavLink>
            </AfterLoggedOut>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
