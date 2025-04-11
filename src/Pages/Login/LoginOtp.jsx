import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/Login.css";

const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (!/^[0-9]{4}$/.test(otp)) {
      setError("OTP must be a 4-digit number");
      return;
    }

    try {
      setError("");

      const response = await axios.post("http://localhost:5001/api/verify-otp", {
        email,
        otp,
      });

      if (response.data.verified) {
        navigate("/login/face-recognition");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Error verifying OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    try {
      await axios.post("http://localhost:5001/api/send-otp", { email });
      setResendMessage("OTP resent successfully!");
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setResendMessage("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">{/* Optional logo */}</div>
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="****"
            value={otp}
            onChange={handleChange}
            className="otp-input"
            maxLength={4}
          />
          {error && <p className="error-message">{error}</p>}
          {resendMessage && (
            <p className="resend-message">{resendMessage}</p>
          )}
          <p
            className="resend-otp"
            onClick={handleResend}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Resend OTP
          </p>
          <button type="submit" className="next-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOtp;
