import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css"; // Ensure this file contains the required styles

const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (!/^[0-9]{4,6}$/.test(otp)) {
      setError("Invalid OTP format");
      return;
    }
    
    setError("");
    navigate("/login/face-recognition");

  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          
        </div>
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="****"
            value={otp}
            onChange={handleChange}
            className="otp-input"
            maxLength={6}
          />
          {error && <p className="error-message">{error}</p>}
          <p className="resend-otp">Resend OTP</p>
          <button type="submit" className="next-button">Next</button>
        </form>
      </div>
    </div>
  );
};

export default LoginOtp;