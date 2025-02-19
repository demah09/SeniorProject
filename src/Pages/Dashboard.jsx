import React from "react";
import { FaChevronRight } from "react-icons/fa";
import ProfileCard from "../Components/ProfileCard"; // Import ProfileCard
import "../Styles/Dashboard.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      {/* Full-width Profile Section */}
      <ProfileCard name="Demah Raid" id="12987652" gender="Female" />

      {/* Centered Action Buttons */}
      <div className="actions-section">
        <button className="action-button">
          Book Appointment <FaChevronRight className="icon" />
        </button>
        <button className="action-button" onClick={ () => navigate("/modify-app")}>
          Modify Appointment <FaChevronRight className="icon" />
        </button>
        <button className="action-button" onClick={ () => navigate("/check-in")}>
          Check-in to Appointment <FaChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
