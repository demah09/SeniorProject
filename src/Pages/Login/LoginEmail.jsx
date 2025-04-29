import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/LoginEmail.css";
import HelpButton from "../../Components/HelpButton";
import translations from "../../i18n/translations";

const LoginEmail = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const recognizedEmail = localStorage.getItem("Email");
    const recognizedFirstName = localStorage.getItem("FirstName");
    if (recognizedEmail) setEmail(recognizedEmail);
    if (recognizedFirstName) setFirstName(recognizedFirstName);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => setEmail(e.target.value);

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
      <HelpButton lang={lang} />
      <div className="login-card">
        {firstName && (
          <h3 className="login-greeting">{t.hello || "Hello"} {firstName}</h3>
        )}
        <h2 className="login-title">{t.enterEmail}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          <input
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={handleChange}
            className="email-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="button" className="next-button" onClick={handleNext}>
            {t.next}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;
