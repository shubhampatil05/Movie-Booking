import React from "react";
import { Outlet, Navigate } from "react-router";

const Protected = () => {
  const token = localStorage.getItem("jwtToken");

  return token ? <Outlet /> : <Navigate to="/logIn" />;
};

export default Protected;
