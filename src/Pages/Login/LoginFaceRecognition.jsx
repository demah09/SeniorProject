import React from "react";
import { useNavigate } from "react-router-dom";

const FaceRecognition = () => {
  const navigate = useNavigate();

  return (
    <div className="face-recognition-container">
      <h1>Face Recognition happen here</h1>
      <button className="navigate-button" onClick={() => navigate("/dashboard")}>
        Login
      </button>
    </div>
  );
};

export default FaceRecognition;
