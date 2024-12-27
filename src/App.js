import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import GstCalculator from "./Components/GstCalculator/GstCalculator";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route
          path="/gst-calculator"
          element={
            <ProtectedRoute>
              <GstCalculator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
