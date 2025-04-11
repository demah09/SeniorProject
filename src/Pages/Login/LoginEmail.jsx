import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/Login.css";

const LoginEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:5001/api/send-otp", { email });
      navigate("/login/otp", { state: { email } });
    } catch (err) {
      if (err.response?.status === 404) {
        setError("This email is not registered in the system.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container" />
        <h2>Enter Your Registered Email</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={handleChange}
            className="email-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button
            type="button"
            className="next-button"
            onClick={handleNext}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;
