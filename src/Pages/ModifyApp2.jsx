import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../Components/ProfileCard";
import "../Styles/ModifyApp2.css";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";

// Helper: Format date string to match input type="datetime-local"
function toLocalDatetimeInputString(dateStr) {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

const ModifyApp2 = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = location.state || {};

  const [appointment, setAppointment] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clinicName, setClinicName] = useState("");
  const t = translations[lang] || translations.en;

  // Fetch the existing appointment info on load
  useEffect(() => {
    if (!appointmentId) return;

    axios
      .get(`https://seniorproject-uq3g.onrender.com/api/appointment/${appointmentId}`)
      .then((res) => {
        const data = res.data;
        const datetimeLocal = toLocalDatetimeInputString(data.DOA);
        setAppointment(datetimeLocal);
        setDoctorName(data.DoctorName);
        setSpecialization(data.Specialization);
        setClinicName(data.ClinicName);
      })
      .catch((err) => {
        console.error("Error fetching appointment:", err);
        alert("Could not load appointment data.");
      });
  }, [appointmentId]);

  const handleConfirm = async () => {
    try {
      await axios.put(`https://seniorproject-uq3g.onrender.com/api/appointment/${appointmentId}`, {
        datetime: appointment,
      });

      navigate("/success", {
        state: { message: "Updates Confirmed" },
      });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update appointment.");
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`https://seniorproject-uq3g.onrender.com/api/appointment/${appointmentId}`);
      navigate("/success", {
        state: { message: "Appointment Canceled Successfully" },
      });
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="container">
      <ProfileCard lang={lang} onLanguageChange={onLanguageChange} />
      <HelpButton lang={lang} />

      <div className="appointment-card">
        <h3>Clinic Location</h3>
        <p>{clinicName} Department</p>

        <h3>Appointment Date and Time</h3>
        <input
          type="datetime-local"
          value={appointment}
          onChange={(e) => setAppointment(e.target.value)}
        />

        <h3>Doctor Name and Specialty</h3>
        <p>Dr. {doctorName}, {specialization}</p>

        <div className="button-group">
          <button className="confirm-btn" onClick={handleConfirm}>
            Apply Changes
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyApp2;
