import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";

import { doc, getDoc } from "firebase/firestore";
import logo from "../../assets/images/logoww.png";
import { db } from "../../firebase.config";
import { removeUserActive, setUserActive } from "../../redux/slices/authSlice";
import AdminRoute, { AdminLink } from "../../route/AdminOnly/AdminRoute";
import AfterLoggedIn, { AfterLoggedOut } from "../../route/AuthenRoute";
import "./Header.css";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const auth = getAuth();
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [displayName, setDisplayName] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (!headerRef.current) return;
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
  }, [headerRef]);

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

  const handleUsernameClick = () => {
    setShowOptions(!showOptions);
  };

  // Get currently logged in user
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);

        console.log(user.displayName);
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const userName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(userName);
        } else {
          setDisplayName(user.displayName);
        }

        const firstName = user.displayName
          ? user.displayName.split(" ")[0]
          : user.email.split("@")[0].charAt(0).toUpperCase() +
            user.email.split("@")[0].slice(1);

        setDisplayName(firstName);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userRole = userDocSnapshot.data().role;
          // Dispatch to the Redux store
          dispatch(
            setUserActive({
              email: user.email,
              userName: user.displayName ? user.displayName : firstName,
              userId: user.uid,
              userRole: userRole,
            })
          );
        }
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
              <ul className="menu">
                <li>
                  <NavLink
                    to="/home"
                    className={(navClass) =>
                      navClass.isActive ? "nav_active" : ""
                    }
                  >
                    {" "}
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav_active" : ""
                    }
                    to="/services"
                  >
                    {" "}
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav_active" : ""
                    }
                    to="/dogshop"
                  >
                    {" "}
                    Dog
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive ? "nav_active" : ""
                    }
                    to="/catshop"
                  >
                    {" "}
                    Cat
                  </NavLink>
                </li>
                  <li>
                <AdminLink>
                    <NavLink
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </NavLink>
                </AdminLink>
                  </li>
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
                <div
                  className="username"
                  onClick={handleUsernameClick}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  Hi, {displayName}
                  {showOptions && (
                    <div className="options">
                      <div onClick={() => navigate("/profile")}>Profile</div>
                      <div onClick={handleLogout}>Logout</div>
                    </div>
                  )}
                </div>

                <div className="mobile_menu">
                  <span>
                    <i class="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </AfterLoggedIn>
            <AfterLoggedOut>
              <button
                className={(navClass) =>
                  navClass.isActive ? "nav_active" : ""
                }
              >
                <Link to="/login"> Login</Link>
              </button>
            </AfterLoggedOut>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
