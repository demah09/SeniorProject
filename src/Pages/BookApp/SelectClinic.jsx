import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "../../Components/ProfileCard";
import "../../Styles/SelectClinic.css";
import HelpButton from "../../Components/HelpButton";
import translations from "../../i18n/translations";

const SelectClinic = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const t = translations[lang] || translations.en;


  useEffect(() => {
    axios.get("https://seniorproject-uq3g.onrender.com/api/clinics")
      .then((res) => setClinics(res.data))
      .catch((err) => console.error("Error loading clinics:", err));
  }, []);

  const handleSelectClinic = (clinic) => {
    localStorage.setItem("selectedClinic", clinic.Clinic_Name);
    navigate("/select-doctor");
  };

  // Filter clinics based on search
  const filteredClinics = clinics.filter((clinic) =>
    clinic.Clinic_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show 3 clinics by default, or up to 7 when searching
  const clinicsToDisplay = searchTerm
    ? filteredClinics.slice(0, 5)
    : clinics.slice(0, 3);

  return (
    <div className="clinic-container">
      <ProfileCard 
      lang={lang}
      onLanguageChange={onLanguageChange}
      />
      <HelpButton lang={lang}/>
      <div className="clinic-card">
      <h2 className="clinic-title">{t.SelectClinic}</h2>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={t.Search}
            className="clinic-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        {clinicsToDisplay.map((clinic) => (
          <button
            key={clinic.Clinic_ID}
            onClick={() => handleSelectClinic(clinic)}
            className="clinic-button"
          >
            {clinic.Clinic_Name}
          </button>
        ))}

        {searchTerm && filteredClinics.length === 0 && (
          <p style={{ color: "#fff", marginTop: "10px" }}>No clinics found</p>
        )}
      </div>
    </div>
  );
};

export default SelectClinic;
