import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../../Components/ProfileCard";
import "../../Styles/SelectClinic.css"; // Reusing clinic styles
import HelpButton from "../../Components/HelpButton";
import translations from "../../i18n/translations";

const SelectDoctor = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const clinicName = localStorage.getItem("selectedClinic");
  const t = translations[lang] || translations.en;

  useEffect(() => {
    if (!clinicName) return;

    // Fetch Clinic_ID from clinic name
    axios.get("http://localhost:5001/api/clinics")
      .then((res) => {
        const clinic = res.data.find(c => c.Clinic_Name === clinicName);
        if (clinic) {
          axios.get(`http://localhost:5001/api/doctors/${clinic.Clinic_ID}`)
            .then((res) => setDoctors(res.data))
            .catch((err) => console.error("Error fetching doctors:", err));
        }
      })
      .catch((err) => console.error("Error fetching clinics:", err));
  }, [clinicName]);

  const handleSelectDoctor = (doctor) => {
    localStorage.setItem("selectedDoctor", doctor.Name);
    localStorage.setItem("Doctor_ID", doctor.Doctor_ID);
    localStorage.setItem("Clinic_ID", doctor.Clinic_ID);
    navigate("/select-datetime");
  };
 


  return (
    <div className="clinic-container">
      <ProfileCard
      lang={lang}
      onLanguageChange={onLanguageChange}
      />
      <HelpButton lang={lang}/>
      <div className="clinic-card">
      <p className="clinic-subtitle" style={{ color: "#fff", marginBottom: "20px" }}>
        {t.AvDoc} <strong>{clinicName}</strong>
      </p>
        {doctors.map((doctor) => (
          <button
            key={doctor.Doctor_ID}
            onClick={() => handleSelectDoctor(doctor)}
            className="clinic-button"
          >
            {doctor.Name}
          </button>
        ))}

        {doctors.length === 0 && (
          <p style={{ color: "#fff", marginTop: "10px" }}>
            No doctors available for this clinic.
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectDoctor;
