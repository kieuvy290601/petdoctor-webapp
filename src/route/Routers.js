import { Route, Routes } from "react-router-dom";

import AddProduct from "../pages/AddProduct";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Cart from "../pages/Cart";
import CatShop from "../pages/CatShop";
import Checkout from "../pages/Checkout";
import DogShop from "../pages/DogShop";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Splash from "../pages/Splash";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/Auth/ResetPassword";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="splash" element={<Splash />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="home" element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="productdetail/:prdId" element={<ProductDetail />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="dogshop" element={<DogShop />} />
      <Route path="catshop" element={<CatShop />} />
      <Route path="cart" element={<Cart />} />

      <Route path="addproduct" element={<AddProduct />} />
    </Routes>
  );
};

export default Routers;
