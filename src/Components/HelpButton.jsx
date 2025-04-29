import React, { useState } from "react";
import "../Styles/HelpButton.css";
import { RiCustomerService2Fill } from "react-icons/ri";
import translations from "../i18n/translations";

const HelpButton = ({ lang }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const t = translations[lang] || translations.en;;

  const handleClick = () => {
    setFadeOut(false);
    setShowPopup(true);
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setShowPopup(false), 300);
  };

  return (
    <>
      <button className="help-btn" onClick={handleClick}>
        <RiCustomerService2Fill size={28} />
      </button>

      {showPopup && (
        <div className={`popup ${fadeOut ? "fade-out" : ""}`}>
          <button className="close-btn" onClick={handleClose}>×</button>
          <div className="popup-content">
            <RiCustomerService2Fill size={20} className="popup-icon" />
            <span>{t.assistance}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
