import React from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/slices/authSlice";
import Routers from "../../route/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../SideBar/Sidebar";

const Layout = () => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "admin") {
    return (
      // <div>
      //   <div className="row">
      //     <div className="col" style={{}}>
      //       <Sidebar />
      //     </div>
      //     <div className="col-sm-9">
      //       <Routers />
      //     </div>
      //   </div>
      // </div>

      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div style={{ height: "100%" }}>
          <Sidebar style={{ overflowY: "auto" }} />
        </div>
        <div style={{ width: "100vw", height: "100%", overflowY: "auto" }}>
          <Routers />
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
