import React from "react";
import { FaChevronRight } from "react-icons/fa";
import ProfileCard from "../Components/ProfileCard";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";

const Dashboard = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Full-width ProfileCard outside of dashboard-container */}
      <ProfileCard
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="dashboard-container">
      <HelpButton lang={lang} />

        {/* Centered Action Buttons */}
        <div className="actions-section">
          <button
            className="action-button"
            onClick={() => navigate("/select-clinic")}
          >
            {translations[lang].bookAppointment}  <FaChevronRight className="icon" />
          </button>
          <button
            className="action-button"
            onClick={() => navigate("/modify-app")}
          >
            {translations[lang].modifyAppointment} <FaChevronRight className="icon" />
          </button>
          <button
            className="action-button"
            onClick={() => navigate("/check-in")}
          >
            {translations[lang].checkinAppointment} <FaChevronRight className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
