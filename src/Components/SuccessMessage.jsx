import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "../Styles/SuccessMessage.css";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = () => {
  const location = useLocation(); //Get location from useLocation hook
  const navigate = useNavigate();

  // If state is not available, default message
  const message = location.state?.message || "Action Completed Successfully"; 

  return (
    <div className="success-container">
      <div className="success-box">
        <h1>{message}</h1> {/* Display the message */}
        <FaCheckCircle className="success-icon" />
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
