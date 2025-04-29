import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSlidersH, FaHome, FaSignOutAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import "../Styles/ProfileCard.css";

const ProfileCard = ({ lang, onLanguageChange }) => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    axios
      .get(`https://seniorproject-uq3g.onrender.com/api/patient/${email}`)
      .then((res) => {
        setPatient(res.data);
        localStorage.setItem("FileNo", res.data.FileNo);
      })
      .catch((err) => console.error("Failed to fetch patient:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    localStorage.setItem("lang", newLang);
    onLanguageChange(newLang);
  };

  if (!patient) return null;

  return (
    <div className="profile-card">
      <div className="profile-info">
        <FaUserCircle className="profile-pic" />
        <div className="profile-details">
          <h2>{patient.FirstName} {patient.LastName}</h2>
          <p className="profile-text">ID: {patient.FileNo}</p>
          <p className="profile-text">{patient.Gender === "M" ? "Male" : "Female"}</p>
        </div>
      </div>

      <div className="buttons-container">
        <button className="profile-button" onClick={() => navigate("/dashboard")}>
          <FaHome />
        </button>

        <button className="profile-button" onClick={() => navigate("/update-info")}>
          <FaSlidersH />
        </button>

        <button className="profile-button" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>

        <button onClick={toggleLanguage} title="Switch Language" className="lang-toggle-btn">
          <MdLanguage />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
