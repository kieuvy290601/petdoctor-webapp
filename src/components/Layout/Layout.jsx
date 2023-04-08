import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../pages/Admin/SideBar/Sidebar";
import { selectUserRole } from "../../redux/slices/authSlice";
import Routers from "../../route/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "admin") {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <Routers />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <div>
          <Routers />
        </div>
        <Footer />
      </>
    );
  }
};

export default Layout;
