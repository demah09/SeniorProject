import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../Components/ProfileCard";
import ModifyBtn from "../Components/ModifyBtn";
import "../Styles/ModifyApp.css";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";


const ModifyApp = ({ lang, onLanguageChange }) => {
  const [appointments, setAppointments] = useState([]);
  const fileNo = localStorage.getItem("FileNo");
  const t = translations[lang] || translations.en;
  useEffect(() => {
    if (!fileNo) return;

    axios
      .get(`http://localhost:5001/api/appointments/${fileNo}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Failed to fetch appointments:", err));
  }, [fileNo]);

  return (
    <div className="modify-container">
      <ProfileCard 
      lang={lang}
      onLanguageChange={onLanguageChange}
      />
      <HelpButton lang={lang}/>

      <div className="appointments-container">
        {appointments.length > 0 ? (
          appointments.map((app, index) => (
            <div key={index} className="appointment-card">
              <h3>Clinic Location</h3>
              <p>
                {app.ClinicName} Department, {app.Floor} Floor, Room {app.Office}
              </p>

              <h3>Appointment Date and Time</h3>
              <p>{new Date(app.DOA).toLocaleString()}</p>

              <h3>Doctor Name and Speciality</h3>
              <p>
                Dr. {app.Name}, {app.Specialization}
              </p>

              <ModifyBtn appointmentId={app.Appt_ID} />
            </div>
          ))
        ) : (
          <p style={{ color: "black", textAlign: "center" }}>
            {t.NoApp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ModifyApp;
