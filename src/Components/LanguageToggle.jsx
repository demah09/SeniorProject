import React, { useState } from "react";
import { MdLanguage } from "react-icons/md";
import "../Styles/LanguageToggle.css";

const LanguageToggle = ({ onLanguageChange }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    onLanguageChange(newLang);
  };

  return (
    <button className="language-toggle-btn" onClick={toggleLanguage} title="Switch Language">
      <MdLanguage size={36} />


    </button>
  );
};

export default LanguageToggle;
