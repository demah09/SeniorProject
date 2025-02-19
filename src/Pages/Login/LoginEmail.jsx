import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css"; // Ensure this file contains the required styles

const LoginEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }
    
    setError("");
    navigate("/login/otp", { state: { email } });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          
        </div>
        <h2>Enter Your Registered Email</h2>
        <form onSubmit={handleSubmit}>
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
            onClick={() => {
              if (!email) {
                setError("Email is required");
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError("Invalid email format");
                return;
              }
              setError("");
              navigate("/login/otp", { state: { email } });
            }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;