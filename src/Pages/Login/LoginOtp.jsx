import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/LoginOtp.css";
import HelpButton from "../../Components/HelpButton";
import translations from "../../i18n/translations";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginOtp = ({ lang }) => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang] || translations.en;
  const email = location.state?.email;

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError(t.otpRequired);
      return;
    }

    if (!/^[0-9]{4}$/.test(otp)) {
      setError(t.otpInvalid);
      return;
    }

    try {
      setError("");
      const response = await axios.post("https://seniorproject-uq3g.onrender.com/api/verify-otp", {
        email,
        otp,
      });

      if (response.data.verified) {
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
      } else {
        setError(t.otpIncorrect);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(t.otpServerError);
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    try {
      await axios.post("https://seniorproject-uq3g.onrender.com/api/send-otp", { email });
      setResendMessage(t.otpResent);
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setResendMessage(t.otpResendFail);
    }
  };

  const toggleShowOtp = () => {
    setShowOtp((prev) => !prev);
  };

  return (
    <div className="login-container">
  <HelpButton lang={lang} />
  <div className="login-box">
    <h2>{t.enterOtp}</h2>
    <form onSubmit={handleSubmit} className="otp-form">
      <input
        type={showOtp ? "text" : "password"}
        placeholder="****"
        value={otp}
        onChange={handleChange}
        className="otp-input"
        maxLength={4}
      />
      <div className="otp-input-wrapper">
         <input
            type={showOtp ? "text" : "password"}
            placeholder="****"
            value={otp}
            onChange={handleChange}
            className="otp-input"
            maxLength={4}
        />
          <span className="otp-toggle" onClick={toggleShowOtp}>
              {showOtp ? <FaEyeSlash /> : <FaEye />}
          </span>
          </div>

      {error && <p className="error-message">{error}</p>}
      {resendMessage && <p className="resend-message">{resendMessage}</p>}
      
      <p className="resend-otp" onClick={handleResend}>
        {t.resend}
      </p>
      <button type="submit" className="next-button">
        {t.next}
      </button>
    </form>
  </div>
</div>

  );
};

export default LoginOtp;
