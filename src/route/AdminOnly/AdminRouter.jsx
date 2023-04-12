import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../pages/Admin/AddProduct/AddProduct";
import AllProduct from "../../pages/Admin/AllProducts/AllProduct";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Orders from "../../pages/Admin/Orders/Orders";
import ManagerUers from "../../pages/Admin/ManagerUsers/ManagerUsers";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="allproduct" element={<AllProduct />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="orders" element={<Orders />} />
      <Route path="/users" element={<ManagerUers />} />
    </Routes>
  );
};

export default AdminRouter;
