import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Splash from "../pages/Splash";

const Routers = () => {
  return (
    <Routes>
      <Route path="splash" element={<Splash />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Splash />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
};

export default Routers;
