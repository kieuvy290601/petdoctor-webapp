import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import MediCare from "../pages/MediCare";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Splash from "../pages/Splash";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="splash" element={<Splash />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="medicare" element={<MediCare />} />
    </Routes>
  );
};

export default Routers;
