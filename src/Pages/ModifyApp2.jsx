import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../Components/ProfileCard"; 
import "../Styles/ModifyApp2.css";

const ModifyApp2 = () => {
  const [appointment, setAppointment] = useState("");
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const handleConfirm = () => {
    navigate("/success", {
      state: { message: "Updates Confirmed" },
    });
  };

  const handleCancel = () => {
    navigate("/success", {
      state: { message: "Appointment has been successfully canceled." },
    });
    setAppointment(""); // Reset input field
  };

  return (
    <div className="container">
      {/* Profile Section */}
      <ProfileCard name="Demah Raid" id="12987652" gender="Female" />

      {/* Appointment Modification Section */}
      <div className="appointment-card">
        <h3>Clinic Location</h3>
        <p>Cardiology Department, 3rd Floor, Room 305</p>

        <h3>Appointment Date and Time</h3>
        <input
          type="datetime-local"
          value={appointment}
          onChange={(e) => setAppointment(e.target.value)}
        />

        <h3>Doctor Name and Specialty</h3>
        <p>Dr. Sarah Alqahtani, Cardiologist</p>

        {/* Buttons */}
        <div className="button-group">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
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