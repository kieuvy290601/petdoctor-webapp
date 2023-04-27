import { Route, Routes } from "react-router-dom";

import AccessDenied from "../pages/AccessDenied";
import AddProduct from "../pages/Admin/AddProduct/AddProduct.jsx";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import Signup from "../pages/Auth/Signup";
import Cart from "../pages/Cart";
import CatShop from "../pages/CatShop";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Checkout/Payment";
import PaymentSuccess from "../pages/Checkout/PaymentSuccess";
import DogShop from "../pages/DogShop";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Splash from "../pages/Splash";
import AdminRoute from "./AdminOnly/AdminRoute.jsx";
import AdminRouter from "./AdminOnly/AdminRouter.jsx";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="splash" element={<Splash />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="home" element={<Home />} />
      <Route path="accessdenied" element={<AccessDenied />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
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

      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="pay"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminRouter />
          </AdminRoute>
        }
      />
      <Route path="addproduct" element={<AddProduct />} />
    </Routes>
  );
};

export default Routers;
