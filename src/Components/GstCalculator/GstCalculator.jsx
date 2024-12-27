import React, { useState, useEffect } from "react";
import "./GstCalculator.css";

const GstCalculator = () => {
  const [actualPrice, setActualPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [gstValue, setGstValue] = useState("");
  const [cgstValue, setCgstValue] = useState("");
  const [sgstValue, setSgstValue] = useState("");
  const [gstPercent, setGstPercent] = useState(3);

  // Logout function that removes authToken from localStorage
  const logout = () => {
    localStorage.removeItem("authToken");
    // Optionally, you can redirect to the login page or perform another action
    window.location.href = "/"; // Redirect to login page after logout
  };

  // Check if authToken exists in localStorage and handle accordingly
  // useEffect(() => {
  //   const authToken = localStorage.getItem("authToken");
  //   if (!authToken) {
  //     // If authToken is not found, redirect to login page
  //     window.location.href = "/";
  //   }
  // }, []);

  const calculateGST = () => {
    if (actualPrice && gstPercent) {
      const gst = (actualPrice * gstPercent) / 100;
      const finalPrice = parseFloat(actualPrice) + gst;
      const cgst = gst / 2;
      const sgst = gst / 2;

      setFinalPrice(finalPrice);
      setGstValue(gst);
      setCgstValue(cgst);
      setSgstValue(sgst);
    }
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setActualPrice(price);

    if (price === "") {
      setFinalPrice("");
      setGstValue("");
      setCgstValue("");
      setSgstValue("");
    } else {
      calculateGST();
    }
  };

  const handleGstPercentChange = (direction) => {
    if (direction === "increase" && gstPercent < 28) {
      setGstPercent(gstPercent + 1);
    } else if (direction === "decrease" && gstPercent > 0) {
      setGstPercent(gstPercent - 1);
    }
    calculateGST();
  };

  return (
    <div className="wrapper">
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
      <div className="wrapper2">
        <div className="card">
          <div className="title">Actual Price</div>
          <input
            type="number"
            id="actual_price"
            value={actualPrice}
            onChange={handlePriceChange}
          />
        </div>
        <div className="card">
          <div className="title">Final Price</div>
          <input type="number" id="final_price" value={finalPrice} disabled />
        </div>
        <div className="card">
          <div className="title">GST</div>
          <input type="number" id="gst_value" value={gstValue} disabled />
        </div>
        <div className="card">
          <div className="title">CGST</div>
          <input type="number" id="cgst_value" value={cgstValue} disabled />
        </div>
        <div className="card">
          <div className="title">SGST</div>
          <input type="number" id="sgst_value" value={sgstValue} disabled />
        </div>
        <div className="card gst">
          <button id="left" onClick={() => handleGstPercentChange("decrease")}>
            {"<"}
          </button>
          <div className="group">
            <span id="gst_percent">{gstPercent}</span>
            <span>%</span>
          </div>
          <button id="right" onClick={() => handleGstPercentChange("increase")}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GstCalculator;
