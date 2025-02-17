import React from "react";
import { Route, Routes } from "react-router";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import { Toaster } from "react-hot-toast";
import ProtectRoutes from "./components/Helper/ProtectRoutes";
import Home from "./pages/App/Home";
import Loader from "./components/Loader/Loader";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectRoutes><Signin /></ProtectRoutes>} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectRoutes><Loader><Home/></Loader></ProtectRoutes>} />
      </Routes>
    </div>
  );
};

export default App;
