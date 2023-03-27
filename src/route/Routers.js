import { Route, Routes } from "react-router-dom";

import AddProduct from "../pages/AddProduct";
import DogPharm from "../pages/DogPharm";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Splash from "../pages/Splash";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../pages/Cart";
import Test from "../pages/Test";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="splash" element={<Splash />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="test" element={<Test />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="dogcare" element={<DogPharm />} />
      <Route path="cart" element={<Cart />} />

      <Route path="addproduct" element={<AddProduct />} />
    </Routes>
  );
};

export default Routers;
