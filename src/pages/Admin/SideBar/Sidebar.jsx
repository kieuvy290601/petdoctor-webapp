import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logoww.png";
import "./Sidebar.css";

const Sidebar = () => {

  const sidebarLinks = document.querySelectorAll(
    ".sidebar_link li a",
  );

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  return (
    <div className={"sidebav_container"}>
      <div className="nav_heading">
        <div className="nav_brand">
          <img src={logo} alt="" srcset="" />
          <h2>PETOPIA</h2>
        </div>
      </div>
      <div className="nav-menu">
        <ul className="sidebar_link">
          <li className="link">
            <Link
              to="/admin/dashboard"
              className="sidebar_link-item"
              style={{ marginTop: 20 }}
            >
              Dashboard
            </Link>
          </li>
          <li className="link">
            <Link to="/admin/users" className="sidebar_link-item">
              Manage Users
            </Link>
          </li>
          <li className="link">
            <Link to="/admin/addproduct" className="sidebar_link-item">
              Products
            </Link>
          </li>

          
          <li className="link">
            <Link to="/admin/orders" className="sidebar_link-item">
              View Orders
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-footer">
        <ul>
          <li>
            <Link
              to="/logout"
              className="sidebar_link-item"
              style={{ display: "flex" }}
            >
              <i
                className="ri-logout-box-r-line"
                style={{ marginRight: 10 }}
              ></i>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
