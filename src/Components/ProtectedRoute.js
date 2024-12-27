import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Check token in local storage
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
