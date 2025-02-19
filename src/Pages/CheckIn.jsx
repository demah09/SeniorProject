import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import ProfileCard from "../Components/ProfileCard";
import "../Styles/CheckIn.css";

const CheckIn = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate

  const handleCheckIn = () => {
    navigate("/success", { state: { message: "Checked-in Successfully" } });
  };

  return (
    <div className="check-in-container">
      {/* ProfileCard Component */}
      <ProfileCard name="Demah Raid" id="12987652" gender="Female" />

      {/* White Background Container */}
      <div className="white-background">
        {/* Check-in Info Section */}
        <div className="check-in-info">
          <h3>Clinic Location</h3>
          <p>Cardiology Department, 3rd Floor, Room 305</p>

          <h3>Appointment Date and Time</h3>
          <p>Friday, April 18 2025 at 14:30</p>

          <h3>Doctor Name and Speciality</h3>
          <p>Dr. Sarah Alqahtani, Cardiologist</p>

          {/* ✅ Check-in Button inside the blue box */}
          <div className="button-container">
            <button className="check-in-button" onClick={handleCheckIn}>
              Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;