import React from "react";
import ProfileCard from "../Components/ProfileCard";
import ModifyBtn from "../Components/ModifyBtn";
import "../Styles/ModifyApp.css";

const ModifyApp = () => {
  return (
    <div className="modify-container">
      {/* ProfileCard */}
      <ProfileCard name="Demah Raid" id="12987652" gender="Female" />

      {/* White container for the appointments */}
      <div className="appointments-container">
        {/* Appointment Card */}
        <div className="appointment-card">
          <h3>Clinic Location</h3>
          <p>Cardiology Department, 3rd Floor, Room 305</p>
          <h3>Appointment Date and Time</h3>
          <p>Friday, April 18 2025 at 14:30</p>
          <h3>Doctor Name and Speciality</h3>
          <p>Dr. Sarah Alqahtani, Cardiologist</p>
          <ModifyBtn/>
        </div>

        {/* More Appointment Cards (You can repeat similar structure for other appointments) */}
        <div className="appointment-card">
          <h3>Clinic Location</h3>
          <p>Dermatology Department, 2nd Floor, Room 256</p>
          <h3>Appointment Date and Time</h3>
          <p>Monday, May 12 2025 at 08:30</p>
          <h3>Doctor Name and Speciality</h3>
          <p>Dr. Ali Alhammam, Dermatologist</p>
          <ModifyBtn/>
        </div>

        <div className="appointment-card">
          <h3>Clinic Location</h3>
          <p>Cardiology Department, 3rd Floor, Room 305</p>
          <h3>Appointment Date and Time</h3>
          <p>Friday, June 18 2025 at 10:30</p>
          <h3>Doctor Name and Speciality</h3>
          <p>Dr. Sarah Alqahtani, Cardiologist</p>
          <ModifyBtn/>
        </div>
      </div>
    </div>
  );
};

export default ModifyApp;